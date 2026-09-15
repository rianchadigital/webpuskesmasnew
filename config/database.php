<?php
/**
 * Konfigurasi Koneksi Database MySQL / MariaDB
 * Khusus Web Hosting cPanel Niagahoster
 * Puskesmas Kecamatan Kepulauan Seribu Selatan
 */

// Pengaturan kredensial database dari cPanel Niagahoster
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');       // Di Niagahoster cPanel umumnya 'localhost'
define('DB_PORT', getenv('DB_PORT') ?: '3306');            // Port default MySQL
define('DB_NAME', getenv('DB_NAME') ?: 'u1234567_puskesmas'); // Sesuaikan dengan nama DB di cPanel
define('DB_USER', getenv('DB_USER') ?: 'u1234567_puskesmas_user'); // Sesuaikan dengan User DB
define('DB_PASS', getenv('DB_PASSWORD') ?: 'KataSandiKuat123#'); // Password user database
define('DB_CHARSET', 'utf8mb4');

class Database {
    private static $instance = null;
    private $pdo;

    private function __construct() {
        $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET
        ];

        try {
            $this->pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // Catat log kesalahan tanpa mengekspos kredensial ke publik
            error_log("Database connection error: " . $e->getMessage());
            die(json_encode([
                'status' => 'error',
                'message' => 'Gagal terhubung ke database Niagahoster: ' . $e->getMessage()
            ]));
        }
    }

    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance->pdo;
    }
}

// Fungsi pembantu eksekusi query
function getDb() {
    return Database::getInstance();
}
