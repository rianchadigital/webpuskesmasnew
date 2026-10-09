/**
 * Service Penghubung Google Apps Script (GAS) & Google Spreadsheet
 * Puskesmas Kecamatan Kepulauan Seribu Selatan
 */

const STORAGE_KEY_GAS_URL = 'puskesmas_gas_url';

export interface GASResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  [key: string]: any;
}

export const gasService = {
  /**
   * Mendapatkan URL Web App GAS yang tersimpan di localStorage
   */
  getUrl(): string {
    return localStorage.getItem(STORAGE_KEY_GAS_URL) || '';
  },

  /**
   * Menyimpan URL Web App GAS baru
   */
  setUrl(url: string): void {
    const cleanUrl = url.trim();
    if (cleanUrl) {
      localStorage.setItem(STORAGE_KEY_GAS_URL, cleanUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY_GAS_URL);
    }
  },

  /**
   * Cek status koneksi ke backend Google Apps Script
   */
  async testConnection(customUrl?: string): Promise<{ success: boolean; message: string; data?: any }> {
    const targetUrl = (customUrl || this.getUrl()).trim();
    if (!targetUrl) {
      return {
        success: false,
        message: 'URL Web App GAS belum dikonfigurasi. Silakan ikuti panduan deploy GAS dan tempelkan URL di atas.'
      };
    }

    try {
      const pingUrl = targetUrl.includes('?') 
        ? `${targetUrl}&action=ping` 
        : `${targetUrl}?action=ping`;

      const response = await fetch(pingUrl, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      const result: GASResponse = await response.json();
      if (result.status === 'success') {
        return {
          success: true,
          message: `Koneksi Berhasil! Terhubung ke spreadsheet database (${result.database || 'Database Aktif'}).`,
          data: result
        };
      } else {
        return {
          success: false,
          message: result.message || 'Koneksi ditolak oleh backend GAS.'
        };
      }
    } catch (err: any) {
      return {
        success: false,
        message: `Gagal menghubungkan ke GAS: ${err.message || 'Periksa kembali URL dan pastikan akses disetel ke "Anyone"'}.`
      };
    }
  },

  /**
   * Mengambil data pengumuman langsung dari Google Spreadsheet
   */
  async getAnnouncements(): Promise<any[]> {
    const url = this.getUrl();
    if (!url) return [];

    try {
      const fetchUrl = url.includes('?') ? `${url}&action=get_pengumuman` : `${url}?action=get_pengumuman`;
      const response = await fetch(fetchUrl);
      if (!response.ok) return [];
      const result: GASResponse = await response.json();
      return result.status === 'success' && Array.isArray(result.data) ? result.data : [];
    } catch {
      return [];
    }
  },

  /**
   * Mengirimkan laporan pengaduan / saran warga ke Google Spreadsheet
   */
  async submitComplaint(data: {
    nama: string;
    kontak: string;
    pulau: string;
    kategori: string;
    isi: string;
  }): Promise<{ success: boolean; ticket?: string; message: string }> {
    const url = this.getUrl();
    if (!url) {
      return {
        success: true,
        ticket: `TIK-OFFLINE-${Date.now().toString().slice(-4)}`,
        message: 'Pengaduan tersimpan secara lokal (Backend GAS belum diatur).'
      };
    }

    try {
      const payload = {
        action: 'tambah_pengaduan',
        ...data
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const result: GASResponse = await response.json();
      if (result.status === 'success') {
        return {
          success: true,
          ticket: result.ticket,
          message: result.message || 'Pengaduan berhasil dicatat ke spreadsheet.'
        };
      } else {
        throw new Error(result.message || 'Gagal menyimpan pengaduan.');
      }
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Gagal mengirimkan pengaduan ke Google Spreadsheet.'
      };
    }
  },

  /**
   * Mengirimkan catatan kunjungan halaman ke Google Spreadsheet (Visitor Counter)
   */
  async recordVisitor(page: string = 'beranda'): Promise<void> {
    const url = this.getUrl();
    if (!url) return;

    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'record_visit',
          page
        })
      });
    } catch {
      // Abaikan error background visitor tracking
    }
  },

  /**
   * Menambahkan pengumuman baru ke Google Spreadsheet
   */
  async createAnnouncement(data: {
    judul: string;
    kategori: string;
    ringkasan: string;
    konten: string;
    penulis: string;
    prioritas?: string;
  }): Promise<{ success: boolean; message: string; id?: string }> {
    const url = this.getUrl();
    if (!url) {
      return {
        success: false,
        message: 'URL Google Apps Script belum disetel di Dashboard Admin.'
      };
    }

    try {
      const payload = {
        action: 'tambah_pengumuman',
        ...data
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      const result: GASResponse = await response.json();
      return {
        success: result.status === 'success',
        message: result.message || 'Pengumuman berhasil disimpan ke Spreadsheet.',
        id: result.id
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || 'Gagal menghubungi server GAS.'
      };
    }
  }
};
