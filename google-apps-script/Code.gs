/**
 * =========================================================================================
 * GOOGLE APPS SCRIPT (GAS) - DATABASE BACKEND PUSKESMAS KEPULAUAN SERIBU SELATAN
 * Terintegrasi Google Spreadsheet sebagai Database & CMS Web Resmi
 * =========================================================================================
 * 
 * PETUNJUK CARA PASANG (DEPLOY):
 * 1. Buat Google Spreadsheet baru di Google Drive Anda (beri nama "Database Puskesmas Seribu Selatan").
 * 2. Di Spreadsheet, klik menu: "Ekstensi" (Extensions) > "Apps Script".
 * 3. Hapus semua kode default di editor, lalu TEMPEL (PASTE) SELURUH KODE DI BAWAH INI.
 * 4. Pada bar toolbar atas editor Apps Script, pilih fungsi "setupDatabaseSheets" lalu klik tombol "Jalankan" (Run).
 *    (Beri izin akses saat Google meminta persetujuan pertama kali).
 *    Fungsi ini otomatis membuat 6 tab sheet: Pengumuman, Pengaduan_Saran, Buku_Tamu, Statistik_Pengunjung, Antrean_Online, Layanan.
 * 5. Klik tombol biru "Terapkan" (Deploy) di kanan atas > "Deployment baru" (New deployment).
 * 6. Pilih jenis: "Aplikasi Web" (Web app).
 *    - Deskripsi: API Web Puskesmas v1
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
      "Puskesmas Kecamatan Kepulauan Seribu Selatan membuka kesempatan bagi perawat dan bidan untuk bergabung dalam tim pelayanan kesehatan terpadu kepulauan.",
      "Persyaratan: STR aktif, bersedia ditempatkan di pulau pemukiman kepulauan seribu selatan, diutamakan memiliki sertifikat BTCLS/APN. Lamaran dikirim via email puskesmas.",
      "Bagian Kepegawaian",
      "Aktif",
      "Penting"
    ]);
  }

  // 2. Sheet Pengaduan & Saran
  var sPengaduan = getOrCreateSheet(ss, SHEET_PENGADUAN);
  if (sPengaduan.getLastRow() === 0) {
    sPengaduan.appendRow(["Nomor_Tiket", "Waktu_Kirim", "Nama_Pelapor", "Kontak_HP", "Pulau_Asal", "Kategori", "Isi_Laporan", "Status", "Tanggapan_Petugas"]);
    formatHeaderRow(sPengaduan, "#2563eb"); // Blue color
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

  // 3. Sheet Buku Tamu
  var sBukuTamu = getOrCreateSheet(ss, SHEET_BUKU_TAMU);
  if (sBukuTamu.getLastRow() === 0) {
    sBukuTamu.appendRow(["ID", "Waktu", "Nama", "Asal_Instansi", "Email_HP", "Tujuan_Kunjungan", "Kesan_Pesan"]);
    formatHeaderRow(sBukuTamu, "#4f46e5"); // Indigo color
    sBukuTamu.appendRow([
      "GUEST-001",
      Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss"),
      "Dinas Kesehatan DKI Jakarta",
      "Dinkes Provinsi DKI",
      "dinkes@jakarta.go.id",
      "Supervisi ILP 5 Klaster Kepulauan",
      "Penerapan integrasi layanan primer berjalan tertib dan terhubung antar pulau."
    ]);
  }

  // 4. Sheet Statistik Pengunjung Web
  var sPengunjung = getOrCreateSheet(ss, SHEET_PENGUNJUNG);
  if (sPengunjung.getLastRow() === 0) {
    sPengunjung.appendRow(["Tanggal", "Total_Hits", "Halaman_Populer", "Kunjungan_Beranda", "Kunjungan_Pelayanan", "Kunjungan_Jadwal"]);
    formatHeaderRow(sPengunjung, "#059669"); // Emerald color
    sPengunjung.appendRow([
      Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd"),
      1,
      "beranda",
      1,
      0,
      0
    ]);
  }

  // 5. Sheet Antrean Online
  var sAntrean = getOrCreateSheet(ss, SHEET_ANTREAN);
  if (sAntrean.getLastRow() === 0) {
    sAntrean.appendRow(["Nomor_Antrean", "Waktu_Daftar", "NIK", "Nama_Pasien", "No_HP", "Faskes_Tujuan", "Poli_Tujuan", "Tanggal_Berobat", "Status"]);
    formatHeaderRow(sAntrean, "#d97706"); // Amber color
  }

  // 6. Sheet Layanan
  var sLayanan = getOrCreateSheet(ss, SHEET_LAYANAN);
  if (sLayanan.getLastRow() === 0) {
    sLayanan.appendRow(["ID", "Nama_Layanan", "Klaster_ILP", "Hari_Buka", "Jam_Operasional", "Tarif", "Persyaratan", "Keterangan"]);
    formatHeaderRow(sLayanan, "#0284c7"); // Sky color
    sLayanan.appendRow(["LAY-01", "Poli Pemeriksaan Umum", "Klaster 3 (Dewasa & Lansia)", "Senin - Jumat", "07.30 - 16.00 WIB", "Gratis (KTP DKI/BPJS)", "KTP/KK, BPJS Aktif", "Puskesmas Tidung & Pustu Pulau"]);
    sLayanan.appendRow(["LAY-02", "Instalasi Gawat Darurat (IGD) & Rujukan", "Lintas Klaster", "Setiap Hari (24 Jam)", "24 Jam Non-Stop", "Gratis", "Gawat darurat tanpa syarat", "Siaga Respon Cepat Medis"]);
    sLayanan.appendRow(["LAY-03", "Poli Kesehatan Ibu & Anak (KIA/KB)", "Klaster 2 (Ibu & Anak)", "Senin - Jumat", "07.30 - 15.00 WIB", "Gratis", "Buku KIA, KTP/BPJS", "Pemeriksaan USG & Imunisasi"]);
  }

  Logger.log("Setup Database Sheets Berhasil Diselesaikan!");
}

/**
 * Endpoint HTTP GET
 * Digunakan untuk mengambil data: pengumuman, pengaduan, visitor stats, antrean, dll.
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
          version: "2.0.0",
          database: ss.getName()
        };
        break;

      case "get_all":
        result = {
          status: "success",
          data: {
            pengumuman: getSheetDataAsObjects(ss, SHEET_PENGUMUMAN),
            pengaduan: getSheetDataAsObjects(ss, SHEET_PENGADUAN),
            layanan: getSheetDataAsObjects(ss, SHEET_LAYANAN),
            stats: getVisitorSummary(ss)
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
 * Digunakan untuk menyimpan data: kirim pengaduan, buat pengumuman, tambah antrean, catat kunjungan.
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
      // 1. Rekam Kunjungan Pengunjung Web (Visitor Tracker)
      case "record_visit":
        var page = requestData.page || "beranda";
        var today = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd");
        var sVisit = getOrCreateSheet(ss, SHEET_PENGUNJUNG);
        var dataRows = sVisit.getDataRange().getValues();
        var foundRow = -1;

        for (var i = 1; i < dataRows.length; i++) {
          if (String(dataRows[i][0]).substring(0, 10) === today) {
            foundRow = i + 1;
            break;
          }
        }

        if (foundRow > 0) {
          var currentHits = Number(sVisit.getRange(foundRow, 2).getValue()) || 0;
          sVisit.getRange(foundRow, 2).setValue(currentHits + 1);
          if (page === "beranda") {
            var bHits = Number(sVisit.getRange(foundRow, 4).getValue()) || 0;
            sVisit.getRange(foundRow, 4).setValue(bHits + 1);
          } else if (page === "pelayanan") {
            var pHits = Number(sVisit.getRange(foundRow, 5).getValue()) || 0;
            sVisit.getRange(foundRow, 5).setValue(pHits + 1);
          } else if (page === "jadwal") {
            var jHits = Number(sVisit.getRange(foundRow, 6).getValue()) || 0;
            sVisit.getRange(foundRow, 6).setValue(jHits + 1);
          }
        } else {
          sVisit.appendRow([today, 1, page, page === "beranda" ? 1 : 0, page === "pelayanan" ? 1 : 0, page === "jadwal" ? 1 : 0]);
        }

        result = {
          status: "success",
          message: "Kunjungan berhasil dicatat",
          page: page,
          date: today
        };
        break;

      // 2. Tambah Pengaduan / Aspirasi / Saran
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

      // 3. Tambah Pengumuman Baru (Khusus Admin)
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
          requestData.penulis || "Humas Puskesmas",
          "Aktif",
          requestData.prioritas || "Biasa"
        ]);

        result = {
          status: "success",
          message: "Pengumuman berhasil ditambahkan ke database spreadsheet",
          id: pId
        };
        break;

      // 4. Tambah Buku Tamu
      case "tambah_buku_tamu":
        var sBuku = getOrCreateSheet(ss, SHEET_BUKU_TAMU);
        var bId = "GUEST-" + (sBuku.getLastRow());
        var bDate = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");

        sBuku.appendRow([
          bId,
          bDate,
          requestData.nama || "-",
          requestData.instansi || "-",
          requestData.kontak || "-",
          requestData.tujuan || "-",
          requestData.pesan || "-"
        ]);

        result = {
          status: "success",
          message: "Buku tamu berhasil disimpan",
          id: bId
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

// =========================================================================
// HELPER FUNCTIONS
// =========================================================================

function getOrCreateSheet(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

function formatHeaderRow(sheet, hexColor) {
  var header = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  header.setBackground(hexColor);
  header.setFontColor("#ffffff");
  header.setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function getSheetDataAsObjects(ss, sheetName) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() <= 1) return [];

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
    return { totalHits: 0, todayHits: 0, rows: [] };
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
