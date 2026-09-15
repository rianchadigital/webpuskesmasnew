import zlib
import struct
import math
import os

def create_slider_png(output_path, width=1280, height=720):
    # Pre-allocate buffer [height][width][3]
    # We will build pixel by pixel for crisp architectural visualization
    pixels = bytearray(width * height * 3)

    def set_pixel(x, y, r, g, b):
        if 0 <= x < width and 0 <= y < height:
            idx = (y * width + x) * 3
            pixels[idx] = r
            pixels[idx+1] = g
            pixels[idx+2] = b

    def fill_rect(x1, y1, x2, y2, r, g, b):
        x1 = max(0, min(width, int(x1)))
        x2 = max(0, min(width, int(x2)))
        y1 = max(0, min(height, int(y1)))
        y2 = max(0, min(height, int(y2)))
        for y in range(y1, y2):
            idx = (y * width + x1) * 3
            count = x2 - x1
            pixels[idx : idx + count * 3] = bytes([r, g, b]) * count

    # 1. Sky Gradient (Bright blue to fresh light cyan-teal at horizon)
    for y in range(height):
        ratio = y / height
        # sky from y=0 to y=520
        if y < 500:
            sky_r = int(140 + (220 - 140) * (y / 500))
            sky_g = int(190 + (245 - 190) * (y / 500))
            sky_b = int(240 + (255 - 240) * (y / 500))
            for x in range(width):
                idx = (y * width + x) * 3
                pixels[idx] = sky_r
                pixels[idx+1] = sky_g
                pixels[idx+2] = sky_b

    # 2. Ground / Pavement & Grass in foreground
    # Pavement (y=500 to 720)
    for y in range(500, height):
        ratio = (y - 500) / 220
        gr = int(180 - 40 * ratio)
        gg = int(185 - 40 * ratio)
        gb = int(190 - 40 * ratio)
        for x in range(width):
            idx = (y * width + x) * 3
            pixels[idx] = gr
            pixels[idx+1] = gg
            pixels[idx+2] = gb

    # Grass band on right and near fence
    fill_rect(0, 485, width, 525, 60, 160, 80)
    # Cobblestone pavement line details
    for y in range(530, height, 18):
        for x in range(0, width, 32):
            offset = 16 if (y // 18) % 2 == 0 else 0
            fill_rect(x + offset, y, x + offset + 30, y + 15, 160, 165, 170)

    # 3. Building Architecture
    # Puskesmas Building Coordinates
    # Tower Left: x=140 to x=360, y=140 to y=500
    # Main Wing: x=360 to x=1060, y=160 to y=500
    # Guard Post Right: x=1070 to x=1180, y=360 to y=500

    # Main Wing Background (Warm off-white structure)
    fill_rect(360, 160, 1060, 500, 242, 245, 243)

    # Green Roof Parapet / Fascia (Vibrant Puskesmas Green)
    fill_rect(350, 150, 1070, 178, 22, 163, 74) # Dark emerald
    fill_rect(355, 153, 1065, 172, 34, 197, 94) # Bright green fascia
    fill_rect(355, 153, 1065, 156, 134, 239, 172) # Highlight line

    # Left Tower (Charcoal Grey Granite Tower with Signage)
    fill_rect(140, 120, 360, 500, 55, 65, 75)
    # Left Tower Right bevel
    fill_rect(350, 120, 360, 500, 40, 48, 56)
    # Tower Roof Cap (Mint green border)
    fill_rect(135, 115, 365, 128, 34, 197, 94)

    # Level Floors Separators in Main Wing
    # Floor 3: y=178 to y=280
    # Floor 2: y=280 to y=380
    # Floor 1: y=380 to y=500
    fill_rect(360, 275, 1060, 285, 210, 215, 220) # Floor 2/3 beam
    fill_rect(360, 375, 1060, 385, 200, 205, 210) # Floor 1/2 beam

    # Green Decorative Laser-Cut Sunshade Screens (Floors 2 & 3: x=400 to 1020, y=185 to 370)
    # Green screen background
    fill_rect(400, 185, 1020, 370, 16, 140, 65)
    # Windows underneath
    for col in range(410, 1010, 75):
        # Floor 3 window
        fill_rect(col, 195, col + 60, 268, 60, 130, 180)
        # Floor 2 window
        fill_rect(col, 290, col + 60, 362, 60, 130, 180)

    # Vertical Green Louver Screen Pattern
    for x in range(400, 1020, 8):
        # Organic green decorative vertical slats
        fill_rect(x, 185, x + 3, 370, 34, 197, 94)
    # Cross patterns on screen
    for y in range(185, 370, 30):
        fill_rect(400, y, 1020, y + 2, 22, 163, 74)

    # Level 1 (Ground Floor: Entrance, Glass Doors, Reception)
    fill_rect(380, 385, 1040, 495, 235, 240, 245)
    # Entrance Porch Canopy (Green & Glass)
    fill_rect(460, 385, 780, 400, 34, 197, 94)
    fill_rect(480, 400, 760, 495, 80, 150, 190) # Blue glass entrance
    # Glass Door Frames
    for d in [480, 550, 620, 690, 760]:
        fill_rect(d, 400, d + 4, 495, 240, 240, 240)
    # Ground Floor side windows
    for w in [820, 900, 970]:
        fill_rect(w, 410, w + 55, 480, 100, 160, 200)

    # Right Guard Post (Pos Jaga / Keamanan)
    fill_rect(1080, 390, 1180, 500, 240, 245, 245)
    fill_rect(1075, 380, 1185, 392, 34, 197, 94) # Green roof
    fill_rect(1095, 410, 1165, 460, 70, 140, 180) # Glass window

    # Left Tower Health Signage (3D Green Letters & Hexagon Logo)
    # Health Logo on tower at x=230, y=150, size=60
    hx = 250
    hy = 170
    # Draw green hexagon
    for dy in range(-30, 31):
        span = int(35 * (1 - abs(dy) / 45))
        fill_rect(hx - span, hy + dy, hx + span, hy + dy + 1, 34, 197, 94)
    # White cross inside
    fill_rect(hx - 5, hy - 20, hx + 5, hy + 20, 255, 255, 255)
    fill_rect(hx - 20, hy - 5, hx + 20, hy + 5, 255, 255, 255)
    # Center green dot
    fill_rect(hx - 3, hy - 3, hx + 3, hy + 3, 22, 163, 74)

    # Text blocks on Left Tower: "PUSKESMAS KECAMATAN KEPULAUAN SERIBU SELATAN"
    # We render bold green simulated typographic lines matching the real signage!
    text_lines = [
        (220, 150), # PUSKESMAS
        (255, 140), # KECAMATAN
        (290, 160), # KEPULAUAN
        (325, 120), # SERIBU
        (360, 135), # SELATAN
    ]
    for y_pos, line_width in text_lines:
        x_start = 250 - line_width // 2
        # Text letter segments
        for seg in range(x_start, x_start + line_width, 14):
            fill_rect(seg, y_pos, seg + 10, y_pos + 16, 74, 222, 128) # Bright emerald text
            fill_rect(seg + 1, y_pos + 1, seg + 9, y_pos + 15, 240, 253, 244) # 3D highlight

    # Front Perimeter Fence (White low wall with black iron grills)
    fill_rect(40, 485, width - 40, 505, 245, 245, 245) # White wall base
    for x in range(50, width - 50, 16):
        fill_rect(x, 460, x + 3, 485, 40, 45, 50) # Black railings
    fill_rect(40, 460, width - 40, 463, 40, 45, 50) # Railing top bar

    # Front Main Gate opening (x=450 to 750)
    fill_rect(450, 460, 750, 490, 140, 190, 240) # open transparent
    # Re-draw the pavement in the opening
    for y in range(460, 505):
        for x in range(450, 750):
            idx = (y * width + x) * 3
            pixels[idx] = 175
            pixels[idx+1] = 180
            pixels[idx+2] = 185

    # Decorative Trees & Shrubs
    def draw_shrub(cx, cy, radius):
        for dy in range(-radius, radius):
            for dx in range(-radius, radius):
                if dx*dx + dy*dy <= radius*radius:
                    px = cx + dx
                    py = cy + dy
                    if 0 <= px < width and 0 <= py < height:
                        idx = (py * width + px) * 3
                        pixels[idx] = 30 + (dx % 15)
                        pixels[idx+1] = 130 + (dy % 25)
                        pixels[idx+2] = 50

    draw_shrub(110, 490, 30)
    draw_shrub(365, 495, 25)
    draw_shrub(1040, 495, 25)
    draw_shrub(1210, 490, 35)

    # Encode to PNG
    def chunk(tag, data):
        return struct.pack('>I', len(data)) + tag + data + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    header = b'\x89PNG\r\n\x1a\n'
    ihdr = chunk(b'IHDR', struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0))
    raw = b''.join(b'\x00' + pixels[y*width*3:(y+1)*width*3] for y in range(height))
    idat = chunk(b'IDAT', zlib.compress(raw, level=6))
    iend = chunk(b'IEND', b'')

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'wb') as f:
        f.write(header + ihdr + idat + iend)
    print(f"Generated PNG: {output_path} ({width}x{height})")

if __name__ == '__main__':
    create_slider_png('public/slider.png')
    create_slider_png('public/assets/slider.png')
