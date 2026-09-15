import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Copy, 
  Check, 
  Server, 
  ExternalLink, 
  Layers, 
  FileCode, 
  ShieldCheck, 
  HelpCircle,
  HardDrive,
  KeyRound,
  FileCheck
} from 'lucide-react';
import { databaseTablesInfo } from '../config/database';

export const AdminDatabaseTab: React.FC = () => {
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedPhp, setCopiedPhp] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);
  const [activeConfigTab, setActiveConfigTab] = useState<'env' | 'php'>('env');

  // Interactive config state
  const [dbHost, setDbHost] = useState('localhost');
  const [dbPort, setDbPort] = useState('3306');
  const [dbName, setDbName] = useState('u1234567_puskesmas');
  const [dbUser, setDbUser] = useState('u1234567_puskesmas_user');
  const [dbPass, setDbPass] = useState('Puskesmas@2026!Kuat');

  const [tableSearch, setTableSearch] = useState('');

  const envSnippet = `# Konfigurasi Database Niagahoster (cPanel MySQL)
DB_HOST=${dbHost}
DB_PORT=${dbPort}
DB_NAME=${dbName}
DB_USER=${dbUser}
DB_PASSWORD=${dbPass}`;

  const phpSnippet = `<?php
// config/database.php (Hosting cPanel Niagahoster)
define('DB_HOST', '${dbHost}');
define('DB_PORT', '${dbPort}');
define('DB_NAME', '${dbName}');
define('DB_USER', '${dbUser}');
define('DB_PASS', '${dbPass}');
define('DB_CHARSET', 'utf8mb4');

try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET,
        DB_USER,
        DB_PASS,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
    );
} catch (PDOException $e) {
    die("Koneksi gagal: " . $e->getMessage());
}
?>`;

  const copyToClipboard = (text: string, type: 'env' | 'php' | 'path') => {
    navigator.clipboard.writeText(text);
    if (type === 'env') {
      setCopiedEnv(true);
      setTimeout(() => setCopiedEnv(false), 2500);
    } else if (type === 'php') {
      setCopiedPhp(true);
      setTimeout(() => setCopiedPhp(false), 2500);
    } else {
      setCopiedPath(true);
      setTimeout(() => setCopiedPath(false), 2500);
    }
  };

  const filteredTables = databaseTablesInfo.filter(
    (t) => t.name.toLowerCase().includes(tableSearch.toLowerCase()) || t.description.toLowerCase().includes(tableSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 rounded-3xl p-6 text-white border border-sky-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-400/30">
                MySQL & MariaDB
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Siap Hosting Niagahoster
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <Database className="w-6 h-6 text-sky-400" />
              Database SQL Puskesmas (Hosting Niagahoster)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-normal leading-relaxed">
              Berkas skema database SQL lengkap beserta 14 tabel dan data bawaan (Profil, Faskes 4 Pulau, Layanan Poliklinik, 5 Klaster ILP, Jadwal Dokter, Nakes, dan Berita) telah di-generate dan siap di-import langsung ke phpMyAdmin di cPanel Niagahoster Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="/assets/database/puskesmas_niagahoster.sql"
              download="puskesmas_niagahoster.sql"
              className="px-4 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg hover:shadow-sky-500/25 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Unduh File .SQL (61 KB)</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3-Step Setup Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-black text-xs flex items-center justify-center">
            01
          </div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <Server className="w-4 h-4 text-sky-600" />
            Buat Database di cPanel
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Login ke cPanel Niagahoster, klik menu <strong>MySQL® Database Wizard</strong>. Masukkan nama database (misal: <code className="bg-slate-100 px-1 py-0.5 rounded text-sky-700 font-mono text-[11px]">puskesmas</code>), buat username dan password, lalu centang <strong>"ALL PRIVILEGES"</strong>.
          </p>
        </div>

        {/* Step 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">
            02
          </div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <FileCode className="w-4 h-4 text-emerald-600" />
            Import via phpMyAdmin
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Buka menu <strong>phpMyAdmin</strong> di cPanel. Pilih nama database yang baru dibuat di panel kiri, klik tab <strong>Import</strong> di bagian atas, pilih berkas <code className="bg-slate-100 px-1 py-0.5 rounded text-emerald-700 font-mono text-[11px]">puskesmas_niagahoster.sql</code>, lalu klik <strong>Go / Kirim</strong>.
          </p>
        </div>

        {/* Step 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3 relative overflow-hidden">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">
            03
          </div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <KeyRound className="w-4 h-4 text-purple-600" />
            Hubungkan Aplikasi
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Salin konfigurasi koneksi di bawah ke berkas <code className="bg-slate-100 px-1 py-0.5 rounded text-purple-700 font-mono text-[11px]">.env</code> atau <code className="bg-slate-100 px-1 py-0.5 rounded text-purple-700 font-mono text-[11px]">config/database.php</code> dengan memasukkan nama database, user, dan password yang dibuat di cPanel.
          </p>
        </div>
      </div>

      {/* File Information & Quick Access */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Lokasi Berkas di Server</span>
            <code className="text-xs font-mono font-bold text-slate-800">/database/puskesmas_niagahoster.sql</code>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => copyToClipboard('/database/puskesmas_niagahoster.sql', 'path')}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            {copiedPath ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPath ? 'Tersalin' : 'Salin Path'}</span>
          </button>

          <a
            href="/assets/database/puskesmas_niagahoster.sql"
            download="puskesmas_niagahoster.sql"
            className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Unduh File SQL</span>
          </a>
        </div>
      </div>

      {/* Interactive Connection String Generator */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-sky-600" />
              Generator Konfigurasi Koneksi Niagahoster
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Sesuaikan dengan data akun cPanel Niagahoster Anda untuk menghasilkan kode konfigurasi siap pakai.
            </p>
          </div>

          {/* Config Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveConfigTab('env')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeConfigTab === 'env' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Format .env
            </button>
            <button
              onClick={() => setActiveConfigTab('php')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeConfigTab === 'php' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Format PHP (cPanel)
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">DB Host (Niagahoster)</label>
            <input
              type="text"
              value={dbHost}
              onChange={(e) => setDbHost(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:outline-hidden focus:border-sky-500"
              placeholder="localhost"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">Default: localhost</span>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">DB Port</label>
            <input
              type="text"
              value={dbPort}
              onChange={(e) => setDbPort(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:outline-hidden focus:border-sky-500"
              placeholder="3306"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">Default: 3306</span>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Database</label>
            <input
              type="text"
              value={dbName}
              onChange={(e) => setDbName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:outline-hidden focus:border-sky-500"
              placeholder="u1234567_puskesmas"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">cPanel prefix + nama</span>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Username Database</label>
            <input
              type="text"
              value={dbUser}
              onChange={(e) => setDbUser(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:outline-hidden focus:border-sky-500"
              placeholder="u1234567_admin"
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">cPanel prefix + user</span>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Kata Sandi Database</label>
            <input
              type="text"
              value={dbPass}
              onChange={(e) => setDbPass(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs focus:bg-white focus:outline-hidden focus:border-sky-500"
              placeholder="Kata sandi..."
            />
            <span className="text-[10px] text-slate-400 mt-0.5 block">Password user DB</span>
          </div>
        </div>

        {/* Code Snippet Display with Copy Button */}
        <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 text-xs font-mono text-slate-200 overflow-x-auto">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
            <span>{activeConfigTab === 'env' ? '.env' : 'config/database.php'}</span>
            <button
              onClick={() => copyToClipboard(activeConfigTab === 'env' ? envSnippet : phpSnippet, activeConfigTab)}
              className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-sans font-bold text-xs transition flex items-center gap-1.5"
            >
              {(activeConfigTab === 'env' ? copiedEnv : copiedPhp) ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Tersalin ke Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Kode</span>
                </>
              )}
            </button>
          </div>
          <pre className="whitespace-pre">{activeConfigTab === 'env' ? envSnippet : phpSnippet}</pre>
        </div>
      </div>

      {/* 14 Database Tables Explorer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-600" />
              Daftar 14 Tabel Database ({filteredTables.length} dari {databaseTablesInfo.length} Tabel)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Seluruh tabel telah dilengkapi tipe data MySQL InnoDB, UTF8mb4, relasi, dan data awal terintegrasi.
            </p>
          </div>

          <input
            type="text"
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            placeholder="Cari nama tabel..."
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:outline-hidden focus:border-sky-500 w-full sm:w-60"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredTables.map((t, idx) => (
            <div key={t.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-100 text-sky-800 font-mono font-bold text-[11px] flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="font-mono font-bold text-sm text-sky-900">{t.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-mono text-[10px]">
                  {t.columns.length} kolom
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>

              <div className="flex flex-wrap gap-1 pt-1">
                {t.columns.map((col) => (
                  <span key={col} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-600">
                    {col}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
