<?
include_once('./header.php');

$userId = $_POST['userId'];
$userPw = $_POST['userPw'];

$sql = "SELECT * FROM mimi_member";
$result = mysqli_query($conn,$sql);

if( mysqli_num_rows($result) > 0){
  while($row = mysqli_fetch_array($result)){
    if( $userId==$row['userid'] && $userPw==$row['userpw'] ){   
      setcookie('userId', $row['userid'],time()+(60*60*24*1),'/');
      $json_data = '{"아이디":"'.$row['userid'].'", "이름":"'.$row['username'].'"}';
    }
  }
}

echo $json_data;

include_once('./footer.php');
?>