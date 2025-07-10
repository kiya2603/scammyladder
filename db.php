<?php
$host = 'localhost';
$port = 8889; // Default port MAMP di Mac
$user = 'root'; // Default username MAMP
$pass = 'root'; // Default password MAMP
$dbname = 'scammyladder';

$conn = new mysqli($host, $user, $pass, $dbname, $port);

if ($conn->connect_error) {
    die("❌ Koneksi gagal: " . $conn->connect_error);
}
?>
