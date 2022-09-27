<?PHP

include_once('./header.php');

$nameData     = $_POST['nameData']; 
$idData       = $_POST['idData'];
$pwData       = $_POST['pwData']; 
$receiveData  = $_POST['receiveData']; 
$addressData  = $_POST['addressData']; 
$phoneData    = $_POST['phoneData']; 
$emailData    = $_POST['emailData']; 
$birthdayData = $_POST['birthdayData']; 
$serviceData  = $_POST['serviceData']; 
$dateData     = $_POST['dateData']; 

$sql = "INSERT INTO mimi_member (username, userid, userpw, userreceive, useraddress, userphone, useremail, userbirthday, userservice, userdate) 
VALUE ('$nameData','$idData','$pwData','$receiveData','$addressData','$phoneData','$emailData','$birthdayData','$serviceData','$dateData')";

$result = mysqli_query($conn, $sql);

if(!$result){  
  die("데이터 입력 실패");
}
else {
  echo('데이터 입력 성공');
}


include_once('./footer.php');
?>