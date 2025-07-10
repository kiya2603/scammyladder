<?php
require_once 'db.php';
echo "✔ Koneksi OK<br>";

$res = $conn->query("SHOW TABLES");
while ($row = $res->fetch_array()) {
  echo "📁 Tabel: " . $row[0] . "<br>";
}
?>
