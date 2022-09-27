<?
include_once('./header.php');

$userId = $_POST['userId'];
$userPw = $_POST['userPw'];

$sql = "DELETE FROM mimi_member WHERE userid='$userId'";
mysqli_query($conn, $sql);

include_once('./footer.php');
?>