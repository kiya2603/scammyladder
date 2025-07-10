<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $nama = htmlspecialchars($_POST["nama"]);
  $email = htmlspecialchars($_POST["email"]);
  $pesan = htmlspecialchars($_POST["pesan"]);

  $to = "ftmhjazz13@gmail.com"; // GANTI dengan email kamu
  $subject = "Pesan dari $nama";
  $message = "Nama: $nama\nEmail: $email\n\nPesan:\n$pesan";
  $headers = "From: $email";

  if (mail($to, $subject, $message, $headers)) {
    header("Location: home.html?saran=success&user=" . urlencode($nama));
    exit();
  } else {
    echo "Maaf, pesan gagal dikirim. Coba lagi nanti.";
  }
}
?>
