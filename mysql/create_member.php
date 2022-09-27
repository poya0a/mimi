<?PHP

include_once('./header.php');

$sql = "CREATE TABLE IF NOT EXISTS mimi_member (
  idx          INT(11)      NOT NULL AUTO_INCREMENT COMMENT '자동증가 고유번호',
  username     VARCHAR(50)  NOT NULL                COMMENT '이름',
  userid       VARCHAR(20)  NOT NULL                COMMENT '아이디',
  userpw       VARCHAR(20)  NOT NULL                COMMENT '비밀번호',
  userreceive  VARCHAR(10)  NOT NULL                COMMENT '문자/이메일 수신동의',
  useraddress  VARCHAR(500)                         COMMENT '주소',
  userphone    VARCHAR(11)                          COMMENT '휴대폰',
  useremail    VARCHAR(300)                         COMMENT '이메일',
  userbirthday VARCHAR(10)                          COMMENT '생년월일',
  userservice  VARCHAR(10)  NOT NULL                COMMENT '이용약관/개인정보 수집, 이용 동의',
  userdate     DATE         NOT NULL                COMMENT '가입일',
  PRIMARY KEY (idx)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3 COMMENT='미미 회원 가입 테이블'";

$result = mysqli_query($conn, $sql);

if(!$result){
  die('테이블 생성 실패');
}

else{
  echo('테이블 생성 성공');
}

include_once('./footer.php');

?>
