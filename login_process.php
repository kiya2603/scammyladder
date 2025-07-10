<?php
session_start();
require_once 'db.php';

$email = trim(strtolower($_POST['email'] ?? ''));
$password = $_POST['password'] ?? '';

if (!$email || !$password) {
    header("Location: login.html?error=empty");
    exit;
}

$stmt = $conn->prepare("SELECT id, username, password FROM users WHERE LOWER(email) = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows === 1) {
    $stmt->bind_result($id, $username, $hashed_password);
    $stmt->fetch();

    if (password_verify($password, $hashed_password)) {
        // login sukses
        header("Location: home.html?user=" . urlencode($username));
        exit;
    }
}

header("Location: login.html?error=invalid");
exit;
