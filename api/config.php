<?php
/**
 * ==============================================================================
 * KONFIGURASI DATABASE MYSQL HOSTINGER
 * Puskesmas Kepulauan Seribu Selatan
 * ==============================================================================
 * 
 * Silakan sesuaikan informasi di bawah ini sesuai detail database MySQL yang dibuat
 * di hPanel Hostinger (Menu: Databases -> MySQL Databases):
 */

// Host Database MySQL (Di Hostinger umumnya 'localhost')
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');

// Port MySQL default
define('DB_PORT', getenv('DB_PORT') ?: '3306');

// Nama Database yang dibuat di Hostinger hPanel (contoh: u123456789_puskesmas)
define('DB_NAME', getenv('DB_NAME') ?: 'u123456789_puskesmas');

// Username database MySQL Hostinger (contoh: u123456789_admin)
define('DB_USER', getenv('DB_USER') ?: 'u123456789_admin');

// Password database MySQL Hostinger
define('DB_PASS', getenv('DB_PASSWORD') ?: 'KataSandiHostinger123#');

// Charset database UTF-8
define('DB_CHARSET', 'utf8mb4');

// URL Base website (opsional, untuk penanganan CORS)
define('ALLOWED_ORIGIN', getenv('ALLOWED_ORIGIN') ?: '*');
