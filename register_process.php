<?php
session_start();
require_once 'db.php';

$username = trim($_POST['username'] ?? '');
$email = strtolower(trim($_POST['email'] ?? ''));
$password = $_POST['password'] ?? '';
$confirm_password = $_POST['confirm_password'] ?? '';

if ($password !== $confirm_password) {
    echo "<script>alert('Password tidak cocok'); history.back();</script>";
    exit;
}

// Cek email sudah digunakan
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo "<script>alert('Email sudah digunakan'); history.back();</script>";
    exit;
}
$stmt->close();

// Simpan user baru
$hashed = password_hash($password, PASSWORD_DEFAULT);
$stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $email, $hashed);

if ($stmt->execute()) {
    $_SESSION['user_id'] = $stmt->insert_id;
    $_SESSION['username'] = $username;
    $_SESSION['email'] = $email;
    header("Location: home.php");
    exit;
} else {
    echo "<script>alert('Registrasi gagal'); history.back();</script>";
    exit;
}
?>
