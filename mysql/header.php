<?PHP

$dbservername   ='localhost';
$dbusername     ='dodam5';
$dbuserpassword ='wndms0818!';
$dbname         ='dodam5';

$conn = mysqli_connect($dbservername,$dbusername,$dbuserpassword,$dbname);
mysqli_set_charset($conn, 'utf8');

if(!$conn){
  die('데이터 베이스 접속 실패');
}

?>