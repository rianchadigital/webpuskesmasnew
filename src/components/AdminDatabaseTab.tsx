import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Copy, 
  Check, 
  Server, 
  ExternalLink, 
  FileCode, 
  ShieldCheck, 
  CheckCircle2,
  Table,
  UploadCloud,
  Globe,
  GitBranch,
  Terminal,
  RotateCw,
  AlertCircle,
  FileSpreadsheet,
  Rocket,
  Download
} from 'lucide-react';
import { databaseTablesInfo } from '../config/database';
import { gasService } from '../services/gasService';

export const AdminDatabaseTab: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'gas' | 'hostinger' | 'mysql'>('gas');

  // GAS State
  const [gasUrl, setGasUrl] = useState<string>('');
  const [isTestingGas, setIsTestingGas] = useState<boolean>(false);
  const [gasTestResult, setGasTestResult] = useState<{ success: boolean; message: string; database?: string } | null>(null);
  const [copiedGasCode, setCopiedGasCode] = useState<boolean>(false);
  const [copiedGitCommands, setCopiedGitCommands] = useState<boolean>(false);
  const [copiedHtaccess, setCopiedHtaccess] = useState<boolean>(false);

  // MySQL State
  const [copiedEnv, setCopiedEnv] = useState<boolean>(false);
  const [copiedPhp, setCopiedPhp] = useState<boolean>(false);
  const [activeConfigTab, setActiveConfigTab] = useState<'env' | 'php'>('env');
  const [dbHost, setDbHost] = useState('localhost');
  const [dbPort, setDbPort] = useState('3306');
  const [dbName, setDbName] = useState('u1234567_puskesmas');
  const [dbUser, setDbUser] = useState('u1234567_puskesmas_user');
  const [dbPass, setDbPass] = useState('Puskesmas@2026!Kuat');
  const [tableSearch, setTableSearch] = useState('');

  useEffect(() => {
    const saved = gasService.getUrl();
    if (saved) {
      setGasUrl(saved);
      // Auto test saved URL
      gasService.testConnection(saved).then(res => {
        setGasTestResult({
          success: res.success,
          message: res.message,
          database: res.data?.database
        });
      });
    }
  }, []);

  const handleSaveAndTestGas = async () => {
    if (!gasUrl.trim()) {
      gasService.setUrl('');
      setGasTestResult({
        success: false,
        message: 'Silakan masukkan URL Aplikasi Web Google Apps Script (berakhiran /exec).'
      });
      return;
    }

    setIsTestingGas(true);
    setGasTestResult(null);

    gasService.setUrl(gasUrl);
    const result = await gasService.testConnection(gasUrl);
    setIsTestingGas(false);
    setGasTestResult({
      success: result.success,
      message: result.message,
      database: result.data?.database
    });
  };

  const gasCodeSnippet = `/**
 * BACKEND GOOGLE APPS SCRIPT (GAS) PUSKESMAS KEPULAUAN SERIBU SELATAN
 * Terhubung Google Spreadsheet sebagai Database & CMS
 */
var SHEET_PENGUMUMAN = "Pengumuman";
var SHEET_PENGADUAN = "Pengaduan_Saran";
var SHEET_BUKU_TAMU = "Buku_Tamu";
var SHEET_PENGUNJUNG = "Statistik_Pengunjung";
var SHEET_ANTREAN = "Antrean_Online";
var SHEET_LAYANAN = "Layanan";

function setupDatabaseSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  getOrCreateSheet(ss, SHEET_PENGUMUMAN);
  getOrCreateSheet(ss, SHEET_PENGADUAN);
  getOrCreateSheet(ss, SHEET_BUKU_TAMU);
  getOrCreateSheet(ss, SHEET_PENGUNJUNG);
  getOrCreateSheet(ss, SHEET_ANTREAN);
  getOrCreateSheet(ss, SHEET_LAYANAN);
  Logger.log("Database berhasil disiapkan!");
}

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "ping";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var result = { status: "success", action: action, database: ss.getName() };
  if (action === "get_pengumuman") {
    result.data = getSheetDataAsObjects(ss, SHEET_PENGUMUMAN);
  } else if (action === "get_pengaduan") {
    result.data = getSheetDataAsObjects(ss, SHEET_PENGADUAN);
  } else {
    result.message = "Koneksi GAS Puskesmas Seribu Selatan AKTIF";
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents || "{}");
  var action = data.action || "record_visit";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var result = { status: "success", action: action };
  if (action === "tambah_pengaduan") {
    var s = getOrCreateSheet(ss, SHEET_PENGADUAN);
    var tik = "TIK-" + Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyyMMdd") + "-" + s.getLastRow();
    s.appendRow([tik, new Date().toISOString(), data.nama, data.kontak, data.pulau, data.kategori, data.isi, "Menunggu", "-"]);
    result.ticket = tik;
  }
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function getSheetDataAsObjects(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet || sheet.getLastRow() <= 1) return [];
  var rows = sheet.getDataRange().getValues();
  var headers = rows[0];
  var list = [];
  for (var i = 1; i < rows.length; i++) {
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[String(headers[j]).toLowerCase()] = rows[i][j];
    }
    list.push(obj);
  }
  return list;
}`;

  const gitBashCommands = `# 1. Inisialisasi Git di komputer lokal Anda
git init
git add .
git commit -m "feat: website puskesmas kepulauan seribu selatan dengan GAS & Hostinger"
git branch -M main

# 2. Hubungkan ke Repositori GitHub Anda (Ganti dengan URL GitHub Anda)
git remote add origin https://github.com/USERNAME/puskesmas-seribu-selatan.git
git push -u origin main`;

  const htaccessSnippet = `<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteCond %{HTTPS} off
  RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>`;

  const copyText = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const gasSpreadsheetTabs = [
    { name: 'Pengumuman', cols: 'ID, Tanggal, Judul, Kategori, Ringkasan, Konten, Penulis, Status, Prioritas', desc: 'Menyimpan warta pengumuman rekrutmen & informasi dadakan' },
    { name: 'Pengaduan_Saran', cols: 'Nomor_Tiket, Waktu_Kirim, Nama_Pelapor, Kontak_HP, Pulau_Asal, Kategori, Isi_Laporan, Status, Tanggapan', desc: 'Menyimpan tiket aspirasi, kritik & saran masyarakat pulau' },
    { name: 'Buku_Tamu', cols: 'ID, Waktu, Nama, Asal_Instansi, Email_HP, Tujuan_Kunjungan, Kesan_Pesan', desc: 'Buku tamu digital pengunjung dinas / instansi kesehatan' },
    { name: 'Statistik_Pengunjung', cols: 'Tanggal, Total_Hits, Halaman_Populer, Kunjungan_Beranda, Kunjungan_Pelayanan', desc: 'Pelacak jumlah hit pengunjung web per hari' },
    { name: 'Antrean_Online', cols: 'Nomor_Antrean, Waktu_Daftar, NIK, Nama_Pasien, No_HP, Faskes_Tujuan, Poli_Tujuan, Tanggal, Status', desc: 'Pendaftaran antrean berobat online masyarakat' },
    { name: 'Layanan', cols: 'ID, Nama_Layanan, Klaster_ILP, Hari_Buka, Jam_Operasional, Tarif, Persyaratan', desc: 'Daftar poliklinik dan rujukan maritim' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-sky-950 rounded-3xl p-6 text-white border border-teal-800/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30">
                Google Apps Script &amp; Spreadsheet
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Hostinger &amp; GitHub Ready
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <FileSpreadsheet className="w-6 h-6 text-teal-400" />
              Database GAS &amp; Panduan Deploy Hostinger
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
              Solusi database gratis tanpa biaya server bulanan menggunakan Google Spreadsheet, terintegrasi skrip Google Apps Script (GAS) dan siap di-UP ke hosting Hostinger via GitHub.
            </p>
          </div>

          {/* Tab Switcher Buttons */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-900/80 border border-slate-700/80 gap-1 text-xs font-bold">
            <button
              onClick={() => setActiveMainTab('gas')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
                activeMainTab === 'gas'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Database GAS</span>
            </button>

            <button
              onClick={() => setActiveMainTab('hostinger')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
                activeMainTab === 'hostinger'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Deploy Hostinger &amp; Git</span>
            </button>

            <button
              onClick={() => setActiveMainTab('mysql')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition cursor-pointer ${
                activeMainTab === 'mysql'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>MySQL (Alternatif)</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: GOOGLE APPS SCRIPT (GAS) & SPREADSHEET DATABASE */}
      {/* ========================================================================= */}
      {activeMainTab === 'gas' && (
        <div className="space-y-6">
          {/* Connection Configuration Box */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-600" />
                  Koneksi Web App URL Google Apps Script
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Masukkan Web App URL (berakhiran <code className="text-teal-700 font-mono font-bold">/exec</code>) hasil deployment Google Apps Script Anda.
                </p>
              </div>

              {/* Status Badge */}
              <div>
                {gasTestResult?.success ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Database Terhubung
                  </span>
                ) : gasUrl ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    Belum Terverifikasi
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold">
                    Mode Offline / Belum Disetel
                  </span>
                )}
              </div>
            </div>

            {/* URL Input Form */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                value={gasUrl}
                onChange={(e) => setGasUrl(e.target.value)}
                className="flex-1 w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono focus:ring-2 focus:ring-teal-500 focus:outline-hidden"
              />
              <button
                onClick={handleSaveAndTestGas}
                disabled={isTestingGas}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-md transition disabled:opacity-50 cursor-pointer"
              >
                {isTestingGas ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Menguji Koneksi...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Simpan &amp; Tes Koneksi</span>
                  </>
                )}
              </button>
            </div>

            {/* Test Result Message Box */}
            {gasTestResult && (
              <div className={`p-4 rounded-2xl text-xs font-medium flex items-start gap-3 ${
                gasTestResult.success 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                {gasTestResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{gasTestResult.message}</p>
                  {gasTestResult.database && (
                    <p className="text-[11px] text-emerald-700 mt-0.5">Nama Spreadsheet: {gasTestResult.database}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 6 Step Guide on How to Setup Google Spreadsheet */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                  Langkah-Langkah Pembuatan Database Spreadsheet (Hanya 3 Menit)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ikuti langkah mudah di bawah ini untuk membuat database dan mengaktifkan Web App Google Apps Script.
                </p>
              </div>
              <a
                href="https://sheets.new"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-50 text-teal-700 hover:bg-teal-100 text-xs font-bold border border-teal-200 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka Google Sheets Baru</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">1</span>
                <h4 className="font-bold text-slate-900">Buat Google Spreadsheet</h4>
                <p className="text-slate-600 leading-relaxed">
                  Buka <strong>sheets.new</strong> di akun Google Anda. Beri nama file: <span className="font-mono text-teal-800">Database Puskesmas Kepulauan Seribu Selatan</span>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">2</span>
                <h4 className="font-bold text-slate-900">Buka Menu Apps Script</h4>
                <p className="text-slate-600 leading-relaxed">
                  Di Google Spreadsheet, klik menu <strong>Ekstensi</strong> &gt; pilih <strong>Apps Script</strong>. Hapus seluruh kode bawaan di editor.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">3</span>
                <h4 className="font-bold text-slate-900">Tempelkan Kode Code.gs</h4>
                <p className="text-slate-600 leading-relaxed">
                  Salin seluruh kode dari kotak <strong>Kode Google Apps Script (Code.gs)</strong> di bawah, lalu tempelkan ke editor Apps Script.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">4</span>
                <h4 className="font-bold text-slate-900">Jalankan setupDatabaseSheets</h4>
                <p className="text-slate-600 leading-relaxed">
                  Pilih fungsi <strong>setupDatabaseSheets</strong> di toolbar atas, klik <strong>Jalankan</strong>. Izinkan akses saat Google meminta persetujuan pertama kali.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">5</span>
                <h4 className="font-bold text-slate-900">Deploy sebagai Web App</h4>
                <p className="text-slate-600 leading-relaxed">
                  Klik tombol <strong>Terapkan (Deploy)</strong> &gt; <strong>Deployment baru</strong>. Pilih tipe <strong>Aplikasi Web</strong>. Setel Akses ke <strong>Siapa Saja (Anyone)</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <span className="w-6 h-6 rounded-lg bg-teal-600 text-white font-bold flex items-center justify-center text-xs">6</span>
                <h4 className="font-bold text-slate-900">Salin URL &amp; Tempel ke Web</h4>
                <p className="text-slate-600 leading-relaxed">
                  Salin <strong>URL Aplikasi Web (Web App URL)</strong> yang berakhiran <code className="text-teal-700">/exec</code>, lalu tempelkan ke input di atas dan klik Simpan.
                </p>
              </div>
            </div>
          </div>

          {/* Copyable Code.gs Box */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-teal-400" />
                <h4 className="font-bold text-sm text-white">Kode Google Apps Script (Code.gs)</h4>
                <span className="text-[10px] px-2 py-0.5 rounded bg-teal-900 text-teal-300 font-mono">
                  google-apps-script/Code.gs
                </span>
              </div>
              <button
                onClick={() => copyText(gasCodeSnippet, setCopiedGasCode)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                {copiedGasCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedGasCode ? 'Kode Tersalin!' : 'Salin Seluruh Kode'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 font-mono text-[11px] text-teal-200/90 overflow-x-auto max-h-72 border border-slate-800 leading-relaxed">
              {gasCodeSnippet}
            </pre>
          </div>

          {/* Spreadsheet Tables Structure Preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Table className="w-5 h-5 text-teal-600" />
              <h3 className="text-base font-bold text-slate-900">
                Struktur 6 Tab Sheet yang Dibuat Otomatis
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {gasSpreadsheetTabs.map((tab, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-teal-800 font-mono">{tab.name}</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">Tab #{idx+1}</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{tab.desc}</p>
                  <p className="text-[10px] font-mono text-slate-400 bg-white p-1.5 rounded border border-slate-200 overflow-x-auto">
                    {tab.cols}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PANDUAN DEPLOY HOSTINGER & GITHUB (UP WEBSITE) */}
      {/* ========================================================================= */}
      {activeMainTab === 'hostinger' && (
        <div className="space-y-6">
          {/* Quick Overview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Rocket className="w-5 h-5 text-sky-600" />
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Panduan Menaikkan (UP) Website ke Hostinger &amp; GitHub
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ikuti panduan berikut agar website aktif live di nama domain Anda sendiri dengan sertifikat SSL gratis.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Method A */}
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-600 text-white text-[10px] font-bold uppercase">Metode 1 (Rekomendasi Cepat)</span>
                  <span className="text-xs font-bold text-sky-900">5 Menit Selesai</span>
                </div>
                <h4 className="font-black text-sm text-slate-900">Upload Folder dist ke Hostinger File Manager</h4>
                <ol className="list-decimal list-inside text-xs text-slate-700 space-y-1.5 leading-relaxed">
                  <li>Jalankan <code className="bg-sky-100 px-1 py-0.5 rounded font-mono font-bold">npm run build</code> di komputer Anda.</li>
                  <li>Buka folder <code className="font-mono font-bold">dist</code> yang terbentuk, kompres isinya menjadi <code className="font-mono font-bold">dist.zip</code>.</li>
                  <li>Login ke <strong>hPanel Hostinger</strong> &gt; buka <strong>File Manager</strong> domain Anda.</li>
                  <li>Buka folder <code className="font-mono font-bold">public_html</code>, upload <code className="font-mono">dist.zip</code> lalu Extract.</li>
                  <li>Pastikan file <code className="font-mono">index.html</code> dan <code className="font-mono">.htaccess</code> berada tepat di <code className="font-mono">public_html</code>.</li>
                </ol>
              </div>

              {/* Method B */}
              <div className="p-5 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase">Metode 2 (Developer CI/CD)</span>
                  <span className="text-xs font-bold text-indigo-900">Otomatis Setiap Push</span>
                </div>
                <h4 className="font-black text-sm text-slate-900">GitHub Actions Auto Deploy FTP</h4>
                <ol className="list-decimal list-inside text-xs text-slate-700 space-y-1.5 leading-relaxed">
                  <li>Buat repositori baru di <strong>GitHub</strong> dan push kode proyek ini.</li>
                  <li>Di hPanel Hostinger, catat <strong>FTP Host, Username, Password</strong>.</li>
                  <li>Di GitHub: Buka <strong>Settings &gt; Secrets and variables &gt; Actions</strong>.</li>
                  <li>Tambahkan 3 secret: <code className="font-mono">FTP_SERVER</code>, <code className="font-mono">FTP_USERNAME</code>, <code className="font-mono">FTP_PASSWORD</code>.</li>
                  <li>Workflow <code className="font-mono">.github/workflows/deploy-hostinger.yml</code> akan otomatis meng-UP website setiap git push!</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Git Terminal Commands Snippet */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-sky-400" />
                <h4 className="font-bold text-sm text-white">Perintah Push Kode ke GitHub</h4>
              </div>
              <button
                onClick={() => copyText(gitBashCommands, setCopiedGitCommands)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                {copiedGitCommands ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedGitCommands ? 'Perintah Tersalin!' : 'Salin Perintah Git'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-sky-300 overflow-x-auto border border-slate-800 leading-relaxed">
              {gitBashCommands}
            </pre>
          </div>

          {/* Apache .htaccess Snippet */}
          <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="w-5 h-5 text-amber-400" />
                <div>
                  <h4 className="font-bold text-sm text-white">Konfigurasi .htaccess untuk Hostinger (SPA Routing)</h4>
                  <p className="text-[11px] text-slate-400">Tersedia di <code className="font-mono text-amber-300">public/.htaccess</code> (mencegah error 404 saat refresh halaman)</p>
                </div>
              </div>
              <button
                onClick={() => copyText(htaccessSnippet, setCopiedHtaccess)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
              >
                {copiedHtaccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHtaccess ? 'Tersalin!' : 'Salin .htaccess'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-amber-200/90 overflow-x-auto border border-slate-800 leading-relaxed">
              {htaccessSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MYSQL DATABASE (ALTERNATIF / OPTIONAL) */}
      {/* ========================================================================= */}
      {activeMainTab === 'mysql' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              Konfigurasi Database MySQL / MariaDB (Hosting cPanel)
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Jika di masa depan Anda ingin beralih dari Google Spreadsheet ke database relasional MySQL di cPanel/Hostinger, skema database SQL lengkap dengan 14 tabel telah disediakan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">DB Host</span>
                <input
                  type="text"
                  value={dbHost}
                  onChange={(e) => setDbHost(e.target.value)}
                  className="w-full mt-1 font-mono font-bold text-slate-800 bg-transparent"
                />
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">DB Name</span>
                <input
                  type="text"
                  value={dbName}
                  onChange={(e) => setDbName(e.target.value)}
                  className="w-full mt-1 font-mono font-bold text-slate-800 bg-transparent"
                />
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">DB User</span>
                <input
                  type="text"
                  value={dbUser}
                  onChange={(e) => setDbUser(e.target.value)}
                  className="w-full mt-1 font-mono font-bold text-slate-800 bg-transparent"
                />
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 uppercase font-bold">DB Password</span>
                <input
                  type="text"
                  value={dbPass}
                  onChange={(e) => setDbPass(e.target.value)}
                  className="w-full mt-1 font-mono font-bold text-slate-800 bg-transparent"
                />
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/assets/database/skema_puskesmas_niagahoster.sql"
                download="skema_puskesmas_seribu_selatan.sql"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Unduh File Skema SQL (14 Tabel)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
