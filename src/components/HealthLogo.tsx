import React from 'react';

interface HealthLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
  subtextColor?: string;
  className?: string;
  showMotto?: boolean;
}

export const HealthLogo: React.FC<HealthLogoProps> = ({
  size = 'md',
  showText = false,
  textColor = 'text-slate-900',
  subtextColor = 'text-emerald-700',
  className = '',
  showMotto = false
}) => {
  const sizeMap = {
    xs: { box: 'w-7 h-7', icon: 28, text: 'text-xs', sub: 'text-[9px]' },
    sm: { box: 'w-9 h-9', icon: 36, text: 'text-sm', sub: 'text-[10px]' },
    md: { box: 'w-11 h-11', icon: 44, text: 'text-base', sub: 'text-xs' },
    lg: { box: 'w-14 h-14', icon: 56, text: 'text-lg', sub: 'text-xs' },
    xl: { box: 'w-20 h-20', icon: 80, text: 'text-xl', sub: 'text-sm' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Official Indonesian Health / Puskesmas Hexagonal Emblem */}
      <div className={`relative shrink-0 ${currentSize.box} transition-transform hover:scale-105 duration-200`}>
        <svg
          viewBox="0 0 200 220"
          className="w-full h-full drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagonal Outer Border (Lampiran 2 - Permenkes RI) */}
          <polygon
            points="100,10 188,59 188,161 100,210 12,161 12,59"
            fill="#ffffff"
            stroke="#055c18"
            strokeWidth="9"
            strokeLinejoin="round"
          />

          {/* Solid Green Greek Medical Cross */}
          <path
            d="M 74,44 L 126,44 L 126,88 L 170,88 L 170,132 L 126,132 L 126,176 L 74,176 L 74,132 L 30,132 L 30,88 L 74,88 Z"
            fill="#055c18"
          />

          {/* White House Roof Chevron (Melambangkan Rumah Sehat / Puskesmas) */}
          <path
            d="M 66,133 L 126,87 L 172,123"
            stroke="#ffffff"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />

          {/* Two Interlocking White Rings (Kemitraan & Siklus Keluarga Sehat) */}
          <g>
            <circle
              cx="115"
              cy="117"
              r="9"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.2"
            />
            <circle
              cx="129"
              cy="117"
              r="9"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.2"
            />
          </g>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
            Pemerintah Provinsi DKI Jakarta
          </span>
          <span className={`font-extrabold font-display tracking-tight ${currentSize.text} ${textColor}`}>
            Puskesmas Kepulauan Seribu Selatan
          </span>
          {showMotto ? (
            <span className={`font-serif-elegant italic text-[11px] mt-0.5 ${subtextColor}`}>
              "Kesehatan Anda Tujuan Kami, Kebahagiaan Anda Kepuasan Kami"
            </span>
          ) : (
            <span className={`font-semibold ${currentSize.sub} ${subtextColor}`}>
              Kecamatan Kepulauan Seribu Selatan
            </span>
          )}
        </div>
      )}
    </div>
  );
};
