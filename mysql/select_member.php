<?
include_once('./header.php');
$sql = "SELECT * FROM mimi_member";
$result = mysqli_query($conn, $sql);

$arr = array();

if(mysqli_num_rows($result) > 0){
  while($row = mysqli_fetch_array($result) ){
      array_push($arr, array(
        '번호' => $row['idx'],
        '이름' => $row['username'],
        '아이디' => $row['userid'],
        '비밀번호' => $row['userpw'],
        '문자/이메일 수신동의' => $row['userreceive'],
        '주소' => $row['useraddress'],
        '휴대폰' => $row['userphone'],
        '이메일' => $row['useremail'],
        '생년월일' => $row['userbirthday'],
        '추가항목' => $row['userservice'],
        '이용약관 동의' => $row['userdate']
      ));
  }
}

$jsonData = json_encode($arr, JSON_UNESCAPED_UNICODE);

echo $jsonData;


include_once('./footer.php');
?>