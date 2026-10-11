/**
 * =========================================================================================
 * GOOGLE APPS SCRIPT (GAS) - DATABASE BACKEND PUSKESMAS KEPULAUAN SERIBU SELATAN
 * Terintegrasi Google Spreadsheet sebagai Database & CMS Web Resmi
 * =========================================================================================
 * 
 * FITUR TERBARU:
 * 1. Manajemen Data Kesehatan (10 Penyakit Terbanyak ICD-10 & Rekap Kunjungan Faskes Bulanan)
 * 2. Manajemen Data SDM (Tenaga Kesehatan, Standar ABK, Eksisting, PNS/PPPK/Non-ASN, Penempatan Pulau)
 * 3. Pengumuman & Rekrutmen Terpadu
 * 4. Pengaduan & Aspirasi Masyarakat Pulau
 * 5. Buku Tamu Digital & Statistik Kunjungan Web
 * 6. Antrean Online Faskes
 * 
 * PETUNJUK CARA PASANG (DEPLOY):
 * 1. Buat Google Spreadsheet baru di Google Drive Anda (beri nama "Database Puskesmas Seribu Selatan").
 * 2. Di Spreadsheet, klik menu: "Ekstensi" (Extensions) > "Apps Script".
 * 3. Hapus semua kode default di editor, lalu TEMPEL (PASTE) SELURUH KODE DI BAWAH INI.
 * 4. Pada bar toolbar atas editor Apps Script, pilih fungsi "setupDatabaseSheets" lalu klik tombol "Jalankan" (Run).
 *    (Beri izin akses saat Google meminta persetujuan pertama kali).
 *    Fungsi ini otomatis membuat 8 tab sheet lengkap dengan contoh data operasional riil.
 * 5. Klik tombol biru "Terapkan" (Deploy) di kanan atas > "Deployment baru" (New deployment).
 * 6. Pilih jenis: "Aplikasi Web" (Web app).
 *    - Deskripsi: API Web Puskesmas Seribu Selatan v2.5
 *    - Jalankan sebagai (Execute as): Saya (Me / email Anda)
 *    - Siapa yang memiliki akses (Who has access): Siapa saja (Anyone) -> WAJIB agar website publik bisa mengakses
 * 7. Klik "Terapkan" (Deploy). Salin "URL Aplikasi Web" (Web App URL, berakhiran /exec).
 * 8. Tempelkan URL tersebut ke Dashboard Admin Website Puskesmas pada menu "Database GAS & Spreadsheet".
 * =========================================================================================
 */

// Konstanta Nama Sheet
var SHEET_PENGUMUMAN = "Pengumuman";
var SHEET_PENGADUAN = "Pengaduan_Saran";
var SHEET_BUKU_TAMU = "Buku_Tamu";
var SHEET_PENGUNJUNG = "Statistik_Pengunjung";
var SHEET_ANTREAN = "Antrean_Online";
var SHEET_LAYANAN = "Layanan";
var SHEET_SDM = "Data_SDM_Formasi";
var SHEET_KESEHATAN_MORBIDITAS = "Kesehatan_10_Penyakit";
var SHEET_KESEHATAN_KUNJUNGAN = "Kesehatan_Kunjungan_Faskes";

/**
 * Inisialisasi awal seluruh lembar kerja (Jalankan sekali di editor Apps Script)
 */
function setupDatabaseSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Sheet Pengumuman
  var sPengumuman = getOrCreateSheet(ss, SHEET_PENGUMUMAN);
  if (sPengumuman.getLastRow() === 0) {
    sPengumuman.appendRow(["ID", "Tanggal", "Judul", "Kategori", "Ringkasan", "Konten", "Penulis", "Status", "Prioritas"]);
    formatHeaderRow(sPengumuman, "#0d9488"); // Teal color
    sPengumuman.appendRow([
      "PENG-001",
      Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
      "Rekrutmen Tenaga Kesehatan Tambahan Penempatan Pulau Pari & Lancang",
      "Rekrutmen",
      "Puskesmas Kepulauan Seribu Selatan membuka kesempatan bagi perawat dan bidan untuk bergabung dalam tim pelayanan kesehatan terpadu kepulauan.",
      "Persyaratan: STR aktif, bersedia ditempatkan di pulau pemukiman kepulauan seribu selatan, diutamakan memiliki sertifikat BTCLS/APN. Lamaran dikirim via email puskesmas.",
      "Bagian Kepegawaian",
      "Aktif",
      "Penting"
    ]);
  }

  // 2. Sheet Data SDM (Formasi Tenaga Medis, Nakes & Penunjang)
  var sSDM = getOrCreateSheet(ss, SHEET_SDM);
  if (sSDM.getLastRow() === 0) {
    sSDM.appendRow([
      "ID", "Jabatan", "Kategori", "Kualifikasi", "Standar_ABK", "Jumlah_Eksisting", 
      "Status_PNS", "Status_PPPK", "Status_PPPK_PW", "Status_NonPNS", "Status_PJLP", "Total_Status",
      "Lokasi_Induk", "Lokasi_Lancang", "Lokasi_Pari", "Lokasi_Untung_Jawa", "Keterangan"
    ]);
    formatHeaderRow(sSDM, "#1d4ed8"); // Royal Blue
    var sdmSample = [
      ["sdmk-1", "Dokter Umum", "Tenaga Medis", "Profesi Dokter (S.Ked + dr.)", 8, 8, 5, 2, 0, 1, 0, 8, 5, 1, 1, 1, "Terpenuhi 100% (Standar ABK Kemenkes)"],
      ["sdmk-2", "Dokter Gigi", "Tenaga Medis", "Profesi Dokter Gigi (SKG + drg.)", 3, 3, 2, 1, 0, 0, 0, 3, 2, 0, 0, 1, "Terpenuhi 100% (Pelayanan Poli Gigi Terjadwal)"],
      ["sdmk-3", "Perawat (Ners & Vokasi D3)", "Tenaga Keperawatan", "S.Kep, Ners / D3 Keperawatan", 16, 16, 8, 5, 1, 2, 0, 16, 10, 2, 2, 2, "Terpenuhi 100% (Siaga 24 Jam & Rawat Inap)"],
      ["sdmk-4", "Bidan (Kebidanan)", "Tenaga Kebidanan", "D3 / D4 / S.Tr.Keb / Profesi Bidan", 12, 12, 6, 4, 0, 2, 0, 12, 6, 2, 2, 2, "Terpenuhi 100% (Persalinan 24 Jam & KIA-KB)"],
      ["sdmk-5", "Apoteker & Tenaga Teknis Kefarmasian", "Tenaga Kefarmasian", "Profesi Apoteker (Apt.) / D3 Farmasi", 4, 4, 2, 1, 0, 1, 0, 4, 3, 0, 1, 0, "Terpenuhi 100% (Pengelolaan Farmasi & Gudang Obat)"],
      ["sdmk-6", "Pranata Laboratorium Kesehatan (ATLM)", "Tenaga Biomedis & Lab", "D3 / D4 Analis Kesehatan (ATLM)", 3, 3, 1, 1, 0, 1, 0, 3, 3, 0, 0, 0, "Terpenuhi 100% (Pemeriksaan Lab Rutin & TCM TB)"],
      ["sdmk-7", "Nutrisionis / Tenaga Gizi", "Tenaga Gizi", "S.Tr.Gz / S.Gz / D3 Gizi", 3, 3, 2, 1, 0, 0, 0, 3, 2, 0, 1, 0, "Terpenuhi 100% (Konsultasi Gizi & Skrining Stunting)"],
      ["sdmk-8", "Sanitarian / Tenaga Sanitasi Lingkungan", "Tenaga Kesmas & Lingkungan", "D3 / D4 / S.Kes Sanitasi Lingkungan", 3, 3, 2, 1, 0, 0, 0, 3, 2, 0, 0, 1, "Terpenuhi 100% (Inspeksi Air Tawar, TTU & PSN Bahari)"],
      ["sdmk-9", "Epidemiolog Kesehatan & Promkes", "Tenaga Kesmas & Lingkungan", "SKM Epidemiologi / Promosi Kesehatan", 2, 2, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, "Terpenuhi 100% (Surveilans Penyakit & Edukasi Warga)"],
      ["sdmk-10", "Perekam Medis & Informasi Kesehatan (RMIK)", "Tenaga Keteknisian Medis", "D3 Rekam Medis (RMIK)", 3, 3, 1, 2, 0, 0, 0, 3, 3, 0, 0, 0, "Terpenuhi 100% (Digitalisasi Rekam Medis RME / SIMPUS)"],
      ["sdmk-11", "Tenaga Administrasi, IT, Pengemudi & PJLP", "Tenaga Administrasi & Penunjang", "S1 / D3 Manajemen / Akuntansi / Komputer / Pelaut", 8, 8, 2, 2, 1, 0, 3, 8, 5, 1, 1, 1, "Terpenuhi 100% (Tata Usaha, TI & Kapal Evakuasi 24 Jam)"]
    ];
    for (var r = 0; r < sdmSample.length; r++) {
      sSDM.appendRow(sdmSample[r]);
    }
  }

  // 3. Sheet Kesehatan 10 Penyakit Terbanyak
  var sMorbiditas = getOrCreateSheet(ss, SHEET_KESEHATAN_MORBIDITAS);
  if (sMorbiditas.getLastRow() === 0) {
    sMorbiditas.appendRow(["Tahun", "Peringkat", "Kode_ICD", "Nama_Penyakit", "Kategori", "Jumlah_Kasus", "Kasus_Pria", "Kasus_Wanita", "Persentase", "Tren"]);
    formatHeaderRow(sMorbiditas, "#b91c1c"); // Crimson Red
    var morbidSample = [
      [2026, 1, "J06.9", "Infeksi Saluran Pernapasan Akut (ISPA)", "Respirasi", 1420, 710, 710, 24.8, "stable"],
      [2026, 2, "I10", "Hipertensi Primer (Esensial)", "Kardiovaskular", 980, 420, 560, 17.1, "up"],
      [2026, 3, "E11", "Diabetes Melitus Tipe 2", "Endokrin / Metabolik", 640, 270, 370, 11.2, "up"],
      [2026, 4, "K29.7", "Gastritis & Dispepsia", "Gastrointestinal", 580, 260, 320, 10.1, "stable"],
      [2026, 5, "L23", "Dermatitis Alergi & Infeksi Kulit Bahari", "Dermatologi", 460, 280, 180, 8.0, "down"],
      [2026, 6, "M79.1", "Mialgia / Nyeri Otot & Sendi Nelayan", "Muskuloskeletal", 410, 310, 100, 7.2, "stable"],
      [2026, 7, "J00", "Nasofaringitis Akut (Common Cold)", "Respirasi", 390, 195, 195, 6.8, "down"],
      [2026, 8, "R50.9", "Febris (Demam Tanpa Sebab Spesifik)", "Gejala Umum", 310, 160, 150, 5.4, "down"],
      [2026, 9, "A09", "Diare & Gastroenteritis Infeksius", "Gastrointestinal", 280, 145, 135, 4.9, "down"],
      [2026, 10, "K02.9", "Karies Gigi & Penyakit Pulpa", "Kesehatan Gigi", 255, 120, 135, 4.5, "stable"]
    ];
    for (var m = 0; m < morbidSample.length; m++) {
      sMorbiditas.appendRow(morbidSample[m]);
    }
  }

  // 4. Sheet Kesehatan Kunjungan Faskes Bulanan
  var sKunjungan = getOrCreateSheet(ss, SHEET_KESEHATAN_KUNJUNGAN);
  if (sKunjungan.getLastRow() === 0) {
    sKunjungan.appendRow([
      "Tahun", "Bulan", "Bulan_Index", "Puskesmas_Kecamatan", "Pustu_Pari", "Pustu_Lancang", 
      "Pustu_Untung_Jawa", "Poskes_Payung", "Total_Kunjungan", "Peserta_BPJS", "Non_BPJS", "Rujukan_RSUD"
    ]);
    formatHeaderRow(sKunjungan, "#047857"); // Emerald Green
    var visitSample = [
      [2026, "Januari", 1, 680, 240, 180, 290, 45, 1435, 1260, 175, 18],
      [2026, "Februari", 2, 650, 225, 175, 280, 40, 1370, 1210, 160, 14],
      [2026, "Maret", 3, 710, 250, 190, 305, 48, 1503, 1320, 183, 22],
      [2026, "April", 4, 695, 235, 185, 295, 42, 1452, 1285, 167, 16],
      [2026, "Mei", 5, 730, 260, 195, 315, 50, 1550, 1375, 175, 20],
      [2026, "Juni", 6, 720, 255, 190, 310, 47, 1522, 1345, 177, 19],
      [2026, "Juli", 7, 760, 275, 205, 330, 52, 1622, 1440, 182, 24],
      [2026, "Agustus", 8, 745, 265, 200, 325, 49, 1584, 1400, 184, 21],
      [2026, "September", 9, 715, 250, 190, 300, 44, 1499, 1325, 174, 17],
      [2026, "Oktober", 10, 700, 245, 185, 300, 45, 1475, 1300, 175, 18],
      [2026, "November", 11, 690, 240, 180, 295, 43, 1448, 1280, 168, 16],
      [2026, "Desember", 12, 740, 270, 195, 320, 51, 1576, 1390, 186, 23]
    ];
    for (var v = 0; v < visitSample.length; v++) {
      sKunjungan.appendRow(visitSample[v]);
    }
  }

  // 5. Sheet Pengaduan & Saran
  var sPengaduan = getOrCreateSheet(ss, SHEET_PENGADUAN);
  if (sPengaduan.getLastRow() === 0) {
    sPengaduan.appendRow(["Nomor_Tiket", "Waktu_Kirim", "Nama_Pelapor", "Kontak_HP", "Pulau_Asal", "Kategori", "Isi_Laporan", "Status", "Tanggapan_Petugas"]);
    formatHeaderRow(sPengaduan, "#2563eb");
    sPengaduan.appendRow([
      "TIK-" + Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyyMMdd") + "-001",
      Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
      "Masyarakat Pulau Tidung",
      "0812XXXXXXXX",
      "Pulau Tidung",
      "Pelayanan Rawat Jalan",
      "Terima kasih atas pelayanan ramah dari dokter dan perawat di IGD saat pemeriksaan malam hari.",
      "Selesai",
      "Terima kasih atas apresiasinya. Puskesmas berkomitmen menjaga mutu layanan siaga 24 jam."
    ]);
  }

  // 6. Sheet Buku Tamu
  var sBukuTamu = getOrCreateSheet(ss, SHEET_BUKU_TAMU);
  if (sBukuTamu.getLastRow() === 0) {
    sBukuTamu.appendRow(["ID", "Waktu", "Nama", "Asal_Instansi", "Email_HP", "Tujuan_Kunjungan", "Kesan_Pesan"]);
    formatHeaderRow(sBukuTamu, "#4f46e5");
    sBukuTamu.appendRow([
      "GUEST-001",
      Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
      "Dinas Kesehatan DKI Jakarta",
      "Dinkes Provinsi DKI",
      "dinkes@jakarta.go.id",
      "Supervisi Organisasi & Pelayanan Faskes Kepulauan",
      "Penerapan struktur Pergub DKI 14 dan Integrasi Layanan Primer tertib dan terhubung."
    ]);
  }

  // 7. Sheet Statistik Pengunjung Web
  var sPengunjung = getOrCreateSheet(ss, SHEET_PENGUNJUNG);
  if (sPengunjung.getLastRow() === 0) {
    sPengunjung.appendRow(["Tanggal", "Total_Hits", "Halaman_Populer", "Kunjungan_Beranda", "Kunjungan_Pelayanan", "Kunjungan_Jadwal"]);
    formatHeaderRow(sPengunjung, "#059669");
    sPengunjung.appendRow([
      Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd"),
      1,
      "beranda",
      1,
      0,
      0
    ]);
  }

  // 8. Sheet Antrean Online
  var sAntrean = getOrCreateSheet(ss, SHEET_ANTREAN);
  if (sAntrean.getLastRow() === 0) {
    sAntrean.appendRow(["Nomor_Antrean", "Waktu_Daftar", "NIK", "Nama_Pasien", "No_HP", "Faskes_Tujuan", "Poli_Tujuan", "Tanggal_Berobat", "Status"]);
    formatHeaderRow(sAntrean, "#d97706");
  }

  // 9. Sheet Layanan
  var sLayanan = getOrCreateSheet(ss, SHEET_LAYANAN);
  if (sLayanan.getLastRow() === 0) {
    sLayanan.appendRow(["ID", "Nama_Layanan", "Klaster_ILP", "Hari_Buka", "Jam_Operasional", "Tarif", "Persyaratan", "Keterangan"]);
    formatHeaderRow(sLayanan, "#0284c7");
    sLayanan.appendRow(["LAY-01", "Poli Pemeriksaan Umum", "Klaster 3 (Dewasa & Lansia)", "Senin - Jumat", "07.30 - 16.00 WIB", "Gratis (KTP DKI/BPJS)", "KTP/KK, BPJS Aktif", "Puskesmas Tidung & Pustu Pulau"]);
    sLayanan.appendRow(["LAY-02", "Instalasi Gawat Darurat (IGD) & Rujukan", "Lintas Klaster", "Setiap Hari (24 Jam)", "24 Jam Non-Stop", "Gratis", "Gawat darurat tanpa syarat", "Siaga Respon Cepat Medis"]);
    sLayanan.appendRow(["LAY-03", "Poli Kesehatan Ibu & Anak (KIA/KB)", "Klaster 2 (Ibu & Anak)", "Senin - Jumat", "07.30 - 15.00 WIB", "Gratis", "Buku KIA, KTP/BPJS", "Pemeriksaan USG & Imunisasi"]);
  }

  Logger.log("Setup Database Sheets Berhasil Disiapkan!");
}

/**
 * Endpoint HTTP GET
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "ping";
  var result = {};

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    switch (action) {
      case "ping":
        result = {
          status: "success",
          message: "Koneksi Google Apps Script Puskesmas Kepulauan Seribu Selatan AKTIF",
          timestamp: new Date().toISOString(),
          version: "2.5.0",
          database: ss.getName(),
          tables: [
            SHEET_SDM,
            SHEET_KESEHATAN_MORBIDITAS,
            SHEET_KESEHATAN_KUNJUNGAN,
            SHEET_PENGUMUMAN,
            SHEET_PENGADUAN,
            SHEET_BUKU_TAMU,
            SHEET_PENGUNJUNG,
            SHEET_LAYANAN
          ]
        };
        break;

      case "get_all":
        result = {
          status: "success",
          data: {
            sdm: getSheetDataAsObjects(ss, SHEET_SDM),
            morbiditas: getSheetDataAsObjects(ss, SHEET_KESEHATAN_MORBIDITAS),
            kunjungan: getSheetDataAsObjects(ss, SHEET_KESEHATAN_KUNJUNGAN),
            pengumuman: getSheetDataAsObjects(ss, SHEET_PENGUMUMAN),
            pengaduan: getSheetDataAsObjects(ss, SHEET_PENGADUAN),
            layanan: getSheetDataAsObjects(ss, SHEET_LAYANAN),
            stats: getVisitorSummary(ss)
          }
        };
        break;

      case "get_sdm":
        result = {
          status: "success",
          data: getSheetDataAsObjects(ss, SHEET_SDM)
        };
        break;

      case "get_kesehatan":
        result = {
          status: "success",
          data: {
            morbiditas: getSheetDataAsObjects(ss, SHEET_KESEHATAN_MORBIDITAS),
            kunjungan: getSheetDataAsObjects(ss, SHEET_KESEHATAN_KUNJUNGAN)
          }
        };
        break;

      case "get_pengumuman":
        result = {
          status: "success",
          data: getSheetDataAsObjects(ss, SHEET_PENGUMUMAN)
        };
        break;

      case "get_pengaduan":
        result = {
          status: "success",
          data: getSheetDataAsObjects(ss, SHEET_PENGADUAN)
        };
        break;

      case "get_buku_tamu":
        result = {
          status: "success",
          data: getSheetDataAsObjects(ss, SHEET_BUKU_TAMU)
        };
        break;

      case "get_stats":
        result = {
          status: "success",
          data: getVisitorSummary(ss)
        };
        break;

      default:
        result = {
          status: "error",
          message: "Action '" + action + "' tidak dikenali"
        };
    }
  } catch (err) {
    result = {
      status: "error",
      message: err.toString()
    };
  }

  return createJsonResponse(result);
}

/**
 * Endpoint HTTP POST
 */
function doPost(e) {
  var result = {};

  try {
    var requestData = {};
    if (e.postData && e.postData.contents) {
      try {
        requestData = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        requestData = e.parameter || {};
      }
    } else {
      requestData = e.parameter || {};
    }

    var action = requestData.action || (e.parameter ? e.parameter.action : "record_visit");
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    switch (action) {
      // 1. Simpan Seluruh Formasi Data SDM (Batch Sync dari Admin)
      case "save_sdm":
        var sSDM = getOrCreateSheet(ss, SHEET_SDM);
        var sdmItems = requestData.data || [];
        if (Array.isArray(sdmItems) && sdmItems.length > 0) {
          // Clear data lama (tetap simpan header)
          var lastRowSDM = sSDM.getLastRow();
          if (lastRowSDM > 1) {
            sSDM.getRange(2, 1, lastRowSDM - 1, sSDM.getLastColumn()).clearContent();
          }
          // Tulis data baru
          for (var i = 0; i < sdmItems.length; i++) {
            var itm = sdmItems[i];
            var pns = Number(itm.statusPNS) || 0;
            var pppk = Number(itm.statusPPPK) || 0;
            var pppkPw = Number(itm.statusPPPKPW) || 0;
            var nonPns = Number(itm.statusNonPNS) || 0;
            var pjlp = Number(itm.statusPJLP) || 0;
            var totalStatus = pns + pppk + pppkPw + nonPns + pjlp;

            sSDM.appendRow([
              itm.id || ("sdmk-" + (i + 1)),
              itm.jabatan || "-",
              itm.kategori || "-",
              itm.kualifikasi || "-",
              Number(itm.standarABK) || 0,
              Number(itm.jumlahEksisting) || totalStatus,
              pns,
              pppk,
              pppkPw,
              nonPns,
              pjlp,
              totalStatus,
              Number(itm.lokasiPuskesmasInduk) || 0,
              Number(itm.lokasiPustuLancang) || 0,
              Number(itm.lokasiPustuPari) || 0,
              Number(itm.lokasiPustuUntungJawa) || 0,
              itm.keterangan || "-"
            ]);
          }
        }
        result = {
          status: "success",
          message: "Data SDM berhasil disimpan ke Google Spreadsheet",
          total: sdmItems.length
        };
        break;

      // 2. Simpan Data Kesehatan Morbiditas & Kunjungan (Batch Sync dari Admin)
      case "save_kesehatan":
        if (requestData.morbiditas && Array.isArray(requestData.morbiditas)) {
          var sMorb = getOrCreateSheet(ss, SHEET_KESEHATAN_MORBIDITAS);
          var lastMorb = sMorb.getLastRow();
          if (lastMorb > 1) {
            sMorb.getRange(2, 1, lastMorb - 1, sMorb.getLastColumn()).clearContent();
          }
          var mList = requestData.morbiditas;
          for (var m = 0; m < mList.length; m++) {
            var mo = mList[m];
            sMorb.appendRow([
              mo.year || mo.tahun || 2026,
              mo.rank || (m + 1),
              mo.code || mo.kode_icd || "-",
              mo.name || mo.nama_penyakit || "-",
              mo.category || mo.kategori || "-",
              Number(mo.cases || mo.jumlah_kasus) || 0,
              Number(mo.maleCases || mo.kasus_pria) || 0,
              Number(mo.femaleCases || mo.kasus_wanita) || 0,
              Number(mo.percentage || mo.persentase) || 0,
              mo.trend || mo.tren || "stable"
            ]);
          }
        }

        if (requestData.kunjungan && Array.isArray(requestData.kunjungan)) {
          var sKunj = getOrCreateSheet(ss, SHEET_KESEHATAN_KUNJUNGAN);
          var lastKunj = sKunj.getLastRow();
          if (lastKunj > 1) {
            sKunj.getRange(2, 1, lastKunj - 1, sKunj.getLastColumn()).clearContent();
          }
          var vList = requestData.kunjungan;
          for (var v = 0; v < vList.length; v++) {
            var vi = vList[v];
            sKunj.appendRow([
              vi.year || vi.tahun || 2026,
              vi.month || vi.bulan || "-",
              Number(vi.monthIndex || vi.bulan_index) || (v + 1),
              Number(vi.puskesmasKecamatan) || 0,
              Number(vi.pustuPari) || 0,
              Number(vi.pustuLancang) || 0,
              Number(vi.pustuUntungJawa) || 0,
              Number(vi.poskesPayung) || 0,
              Number(vi.total || vi.total_kunjungan) || 0,
              Number(vi.bpjs || vi.peserta_bpjs) || 0,
              Number(vi.nonBpjs || vi.non_bpjs) || 0,
              Number(vi.rujukanRsud || vi.rujukan_rsud) || 0
            ]);
          }
        }

        result = {
          status: "success",
          message: "Data Kesehatan berhasil diperbarui ke Google Spreadsheet"
        };
        break;

      // 3. Tambah Pengaduan Masyarakat
      case "tambah_pengaduan":
        var sPengaduan = getOrCreateSheet(ss, SHEET_PENGADUAN);
        var ticketNum = "TIK-" + Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyyMMdd") + "-" + (sPengaduan.getLastRow());
        var nowStr = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
        
        sPengaduan.appendRow([
          ticketNum,
          nowStr,
          requestData.nama || "Masyarakat Anonim",
          requestData.kontak || "-",
          requestData.pulau || "Pulau Tidung",
          requestData.kategori || "Umum",
          requestData.isi || requestData.pesan || "-",
          "Menunggu Tanggapan",
          "-"
        ]);

        result = {
          status: "success",
          message: "Pengaduan berhasil disampaikan ke database spreadsheet",
          ticket: ticketNum
        };
        break;

      // 4. Tambah Pengumuman Baru
      case "tambah_pengumuman":
        var sPengumuman = getOrCreateSheet(ss, SHEET_PENGUMUMAN);
        var pId = "PENG-" + (sPengumuman.getLastRow());
        var pDate = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

        sPengumuman.appendRow([
          pId,
          pDate,
          requestData.judul || "Pengumuman",
          requestData.kategori || "Pengumuman",
          requestData.ringkasan || "-",
          requestData.konten || "-",
          requestData.penulis || "Admin Puskesmas",
          requestData.status || "Aktif",
          requestData.prioritas || "Normal"
        ]);

        result = {
          status: "success",
          message: "Pengumuman baru berhasil dipublikasikan ke spreadsheet",
          id: pId
        };
        break;

      // 5. Rekam Kunjungan Web
      case "record_visit":
        var page = requestData.page || "beranda";
        var today = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");
        var sVisit = getOrCreateSheet(ss, SHEET_PENGUNJUNG);
        var dataRows = sVisit.getDataRange().getValues();
        var foundRow = -1;

        for (var idx = 1; idx < dataRows.length; idx++) {
          if (String(dataRows[idx][0]).substring(0, 10) === today) {
            foundRow = idx + 1;
            break;
          }
        }

        if (foundRow > 0) {
          var currentHits = Number(sVisit.getRange(foundRow, 2).getValue()) || 0;
          sVisit.getRange(foundRow, 2).setValue(currentHits + 1);
        } else {
          sVisit.appendRow([today, 1, page, page === "beranda" ? 1 : 0, page === "pelayanan" ? 1 : 0, page === "jadwal" ? 1 : 0]);
        }

        result = {
          status: "success",
          message: "Kunjungan dicatat"
        };
        break;

      default:
        result = {
          status: "error",
          message: "Action POST '" + action + "' tidak dikenali"
        };
    }
  } catch (err) {
    result = {
      status: "error",
      message: err.toString()
    };
  }

  return createJsonResponse(result);
}

// ======================= HELPER FUNCTIONS =======================

function getOrCreateSheet(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

function formatHeaderRow(sheet, headerBgColor) {
  var range = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  range.setFontWeight("bold");
  range.setFontColor("#ffffff");
  range.setBackground(headerBgColor || "#0f766e");
  range.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
}

function getSheetDataAsObjects(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() <= 1) {
    return [];
  }

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var result = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      var key = String(headers[j]).toLowerCase().replace(/[^a-z0-9]/g, "_");
      obj[key] = row[j];
    }
    result.push(obj);
  }

  return result;
}

function getVisitorSummary(ss) {
  var sheet = ss.getSheetByName(SHEET_PENGUNJUNG);
  if (!sheet || sheet.getLastRow() <= 1) {
    return { totalHits: 0, todayHits: 0, totalRecords: 0 };
  }

  var data = sheet.getDataRange().getValues();
  var total = 0;
  var todayHits = 0;
  var today = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");

  for (var i = 1; i < data.length; i++) {
    var count = Number(data[i][1]) || 0;
    total += count;
    if (String(data[i][0]).substring(0, 10) === today) {
      todayHits = count;
    }
  }

  return {
    totalHits: total,
    todayHits: todayHits,
    totalRecords: data.length - 1
  };
}

function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
