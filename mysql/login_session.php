<?
include_once('./header.php');

$userId = $_POST['userId'];
$userPw = $_POST['userPw'];

$sql = "SELECT * FROM mimi_member WHERE userid='$userId' AND userpw='$userPw'";
$result = mysqli_query($conn,$sql);

if( mysqli_num_rows($result) > 0){
  $row = mysqli_fetch_array($result);

  session_start();
  $session_id = session_id();

  $json_data = '{"세션":"'.$session_id.'", "아이디":"'.$row['userid'].'", "이름":"'.$row['username'].'"}';
}

echo $json_data;

include_once('./footer.php');
?>