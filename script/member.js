(($)=>{

  class Member {
    init(){
      this.header();
      this.main();
      this.footer();
      this.goTopBox();
    }

    header(){

      $('.menu-btn').on({
        click:function(){
          $('.main-menu-wrap').toggleClass('on');
          $(this).toggleClass('on');
        },
        focusin:function(){
          $('.main-menu-wrap').toggleClass('on');
          $(this).toggleClass('on');
        }
      });

      $('.main-btn').on({
        mouseenter:function(){
          $('.main-btn').removeClass('on');
          $('.sub').fadeOut(0); 
          $(this).addClass('on');
          $(this).next().fadeIn(300);
        },
        focusin:function(){
          $('.main-btn').removeClass('on');
          $('.sub').fadeOut(0); 
          $(this).addClass('on');
          $(this).next().fadeIn(300); 
        }
      });
  
      $('#nav').on({
          mouseleave(){
            $('.main-btn').removeClass('on');
            $('.sub').fadeOut(0); 
          },
          focusout:function(){
            $('.main-btn').removeClass('on');
            $('.sub').fadeOut(0);
          }
      });
  
      $('.sub-btn').on({
          mouseenter:function(){
            $('.sub-depth2').fadeOut(0); 
            $(this).next().fadeIn(300);
          },
          focusin:function(){
            $('.sub-depth2').fadeOut(0); 
            $(this).next().fadeIn(300);
          }
      });

      $('.sub-odd').on({
        mouseleave:function(){
          $('.sub-depth2').fadeOut(0); 
        },
        focusout:function(){
          $('.sub-depth2').fadeOut(0);
        }
      });

      $('.user-btn').on({
        click:function(){
          $('.user-menu-list').toggleClass('on');
        }
      });

    }
    main(){

      let idCheck           = false;
      let idConfirmCheck    = false;
      let pwCheck1          = false;
      let pwCheck2          = false;
      let pwCheck3          = false;
      let pwComfirmCheck    = false;
      let codenum           = '';
      let codeCheck         = false;
      let emailCheck        = false;
      let emailComfirmCheck = false;
      let yearCheck         = false;
      let monthCheck        = false;
      let dateCheck         = false;
      let birthday120Check  = false;
      let birthdayCheck     = false;

      let winH = $(window).height();
      let mainTop = $('#main').offset().top-winH;

      $(window).resize(()=>{
        winH = $(window).height();
        return winH;
      });

      $(window).scroll(()=>{
        mainTop = $('#main').offset().top-winH;
        if($(window).scrollTop()>mainTop){
          $('.move-box, .cube-box').addClass('cube-ani');
          return;
        }
        else {
          $('.move-box, .cube-box').removeClass('cube-ani');
          return;
        }
      });

      // 이름
      $('#inputName').on({
        keyup:function(){
         $(this).val($(this).val().toString().replace(/([^A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]*)/g,''));
        }
      });

      // 아이디
       $('#inputId').on({
        mousedown:function(){
          $('.guide-id').show();
        },

        keyup:function(e){
          e.preventDefault();
  
          let regExp = /^((?=.*[A-Za-z])+(?=.*[0-9])*)[^\s][A-Za-z0-9]{5,}$/g;
          let idValue = $(this).val().toString();

          $('.guide-id').show();
        
          if(idValue===''){ 
            $('.guide-id p').eq(0).removeClass('error');
            $('.guide-id p').eq(1).removeClass('error');
            $('.guide-id p').eq(0).removeClass('success');
            $('.guide-id p').eq(1).removeClass('success');
          }
          else{ 
            if(regExp.test(idValue)===true) {
              $('.guide-id p').eq(0).removeClass('error');
              $('.guide-id p').eq(0).addClass('success');
              idCheck=true;
            }
            else if(regExp.test(idValue)===false) {
              $('.guide-id p').eq(0).removeClass('success'); 
              $('.guide-id p').eq(0).addClass('error')
              idCheck;
            }
          }
        }
       });

       // 아이디 중복확인
       function idConfirmBtn(){

        let idVal = $('#inputId').val();
        // php
        axios({
          url:'../mysql/select_member.php',
          method:'GET'
        })
        .then((response)=>{
          let memberList = [];
          memberList = response.data
          let result = memberList.map((item)=>item.아이디===idVal);
          
          if(result.includes(true)){
            $('.guide-id p').eq(1).removeClass('success');
            $('.guide-id p').eq(1).addClass('error');
            modal('이미 등록된 아이디입니다.');
            idConfirmCheck;
          }
          else {
            $('.guide-id p').eq(1).removeClass('error');
            $('.guide-id p').eq(1).addClass('success');
            alert('사용 가능한 아이디입니다.');
            idConfirmCheck = true;
          }
        })
        .catch((error)=>{
          console.log('axios 실패 ', error );
        });

       }

       $('.id-confirm-btn').on({
        click:function(e){
          e.preventDefault();
        
          let regExp = /^((?=.*[A-Za-z])+(?=.*[0-9])*)[^\s][A-Za-z0-9]{5,}$/g;
          let idValue = $('#inputId').val().toString();
        
          if(idValue===''){
              $('.guide-id p').eq(0).removeClass('error');
              $('.guide-id p').eq(0).removeClass('success');
              modal('아이디를 입력해주세요.');
          }
          else{ 
              if( regExp.test(idValue)===true) {
                $('.guide-id p').eq(0).removeClass('error');
                $('.guide-id p').eq(0).addClass('success');
                idCheck=true;
                idConfirmBtn();
              }
              else if( regExp.test(idValue)===false) {
                $('.guide-id p').eq(0).removeClass('success');
                $('.guide-id p').eq(0).addClass('error');
                modal('6자 이상의 영문 혹은 영문과 숫자를 조합만 가능합니다.');
                idCheck;
              }
          }
        }
       });

      // 비밀번호
      $('#inputPw').on({
        mousedown:function(){
          $('.guide-pw').show();
        },
        keyup:function(e){
          e.preventDefault();
 
          let regExp1 = /.{10,}/; 
          let regExp2 = /((?=.*[A-Za-z])+((?=.*[0-9])+|(?=.*[!@#$%&*_-])+)+)[^\s][A-Za-z0-9!@#$%&*_-]{7,}/;
          let regExp3 = /(.)\1\1/; 
          let pwValue = $(this).val().toString();
        
          $('.guide-pw').show();

          if(pwValue===''){
            $('.guide-pw p').eq(0).removeClass('error');
            $('.guide-pw p').eq(0).removeClass('success');
          }
          else{
            if(regExp1.test(pwValue)){
              $('.guide-pw p').eq(0).removeClass('error');
              $('.guide-pw p').eq(0).addClass('success');
              pwCheck1 = true;
            }
            else{
             $('.guide-pw p').eq(0).removeClass('success');
              $('.guide-pw p').eq(0).addClass('error');
              pwCheck1
            }
          }
        
          if(pwValue===''){
            $('.guide-pw p').eq(1).removeClass('error');
            $('.guide-pw p').eq(1).removeClass('success');
          }
          else{
            if(regExp2.test(pwValue)){
              $('.guide-pw p').eq(1).removeClass('error');
              $('.guide-pw p').eq(1).addClass('success');
              pwCheck2 = true;
            }
            else{
              $('.guide-pw p').eq(1).removeClass('success');
              $('.guide-pw p').eq(1).addClass('error');
              pwCheck2
            }
          }
        
          if(pwValue===''){
            $('.guide-pw p').eq(2).removeClass('error');
            $('.guide-pw p').eq(2).removeClass('success');
          }
          else{
            if(regExp3.test(pwValue)){
              $('.guide-pw p').eq(2).removeClass('success');
              $('.guide-pw p').eq(2).addClass('error');
              pwCheck3
            }
            else{
              $('.guide-pw p').eq(2).removeClass('error');
              $('.guide-pw p').eq(2).addClass('success');
              pwCheck3 = true;
            }
          }
        }
      });

      // 비밀번호 확인
      $('#inputPwConfirm').on({
        mousedown:function(){
          $('.guide-password-confirm').show();
        },
        keyup:function(e){
          e.preventDefault();
          let pwValue = $('#inputPw').val().toString();
          let pwConfirmValue = $('#inputPwConfirm').val().toString();
    
          $('.guide-password-confirm').show();
    
          if(pwConfirmValue===''){
            $('.guide-password-confirm p').removeClass('error');
            $('.guide-password-confirm p').removeClass('success');
          }
          else{
            if(pwConfirmValue===pwValue){
              $('.guide-password-confirm p').removeClass('error');
              $('.guide-password-confirm p').addClass('success');
              pwComfirmCheck = true;
            }
            else{
              $('.guide-password-confirm p').removeClass('success');
              $('.guide-password-confirm p').addClass('error');
              pwComfirmCheck;
            }
          }
        }
       });

      // 주소
      $('.address-btn').on({
        click:function(e){
          e.preventDefault();
          new daum.Postcode({
            oncomplete: function(data) {
   
              $('#inputAddress1').val(`${data.zonecode}`);
              $('#inputAddress2').val(`${data.address}`);
              $('#inputAddress3').focus();
   
              $('.address-btn > span').text('재검색');
            }
          }).open();
        }
      });

      // 휴대폰
      $('#inputPhone').on({
        keyup:function(e){
          let PhoneValue = $(this).val();
          let regExp = /[^0-9]/g;
   
          $('#inputPhone').val(PhoneValue.replace(regExp,''));
      
          if(PhoneValue===''){
            $(this).removeClass('error');
            $('.phone-btn').removeClass('on');
          }
          else{
            if(PhoneValue.length>=10){
              $('.phone-btn').addClass('on');
            }
            else{
              $('.phone-btn').removeClass('on');}
            }
          }
      });

      $('.phone-btn').on({
        click:function(e){
          e.preventDefault();
          
          let PhoneValue=$('#inputPhone').val();
          let regExp=/^01[0|6|7|8|9]+\d{3,4}\d{4}$/;
          let num = Math.floor(Math.random()*900000+100000);
          
          if( $('#inputPhone').val()<10) return;
        
          if(regExp.test(PhoneValue)===false){
            $('.code-num').addClass('on');
            $('#inputCode, .code-confirm-btn').hide();
            $('.receive-info').show();
            modal('잘못된 휴대폰 번호 입니다. 확인 후 다시 시도 해 주세요.');
            $(this).addClass('on');
          }
          else{
            $('.code-num, .code-confirm-btn').addClass('on');
            $('.receive-info').show();
            $(this).removeClass('on');
            $('#inputPhone').prop('disabled',true);
            modal(`인증번호 (${num}) 가 발송되었습니다.`);
            $('#inputCode').prop('disabled',false);
            $('.code-box').removeClass('off');
            $('.guide-receive').hide();
            $('#inputCode').val('');
            countTimer();
            codenum = num.toString();
          }
        }
      });

      //휴대폰 인증번호 확인
      $('#inputCode').on({
        keyup:function(e){
          e.preventDefault();
          $(this).val($(this).val().toString().replace(/[^0-9]/g,''));
          }
      });

      $('.code-confirm-btn').on({
        click:function(e){
          e.preventDefault();
          
          let CodeValue = $('#inputCode').val();
  
          if(CodeValue===codenum){
            $('.receive-info').hide();
            $('.guide-receive p').removeClass('error');
            $('.guide-receive').show()
            $('.guide-receive p').addClass('success');
            $('.guide-receive p').text('인증번호 확인완료');
            modal('인증이 완료되었습니다.');
            clearInterval(setId);
            $('#inputCode').prop('disabled',true);
            $('#countdown').html('');
            $(this).removeClass('on');
            $('.phone-btn').addClass('on');
            $('.code-box').addClass('off');
            codeCheck = true;
            return;
          }
          else{
            $('.receive-info').hide();
            $('.guide-receive p').removeClass('success');
            $('.guide-receive').show()
            $('.guide-receive p').addClass('error');
            $('.guide-receive p').text('인증번호를 확인해 주세요');
            $('#inputPhone').prop('disabled',false);
            codeCheck;
            return;
          }
        }
      });

      let setId = 0;

      function countTimer(){
      
      let minutes = 2;
      let seconds = 60;
      
        setId = setInterval(function(){
          seconds--;
          if(seconds<0){
            minutes--;
            seconds=59;
            if(minutes<0){
              clearInterval(setId);
              $('#inputCode').prop('disabled',true);
              $('.code-box').addClass('off');
              $('.code-confirm-btn').removeClass('on');
              modal('인증 제한 시간이 지났습니다.');
              $('#countdown').html('');
              $('.phone-btn').addClass('on');
              $('.code-confirm-btn').removeClass('on');
              $('#inputPhone').prop('disabled',false);
              $('#inputCode').prop('disabled',true);
              $('.code-box').addClass('off');
              return;
            }
          }

          $('#countdown').html(minutes+':'+(seconds<10?('0'+seconds):seconds));
       
        },1000);

      }

      // 이메일
      function emailComfirmBtn(){
   
        let emailVal = $('#inputEmail').val();
    
        axios({
          url:'../mysql/select_member.php',
          method:'GET'
        })
        .then((response)=>{
          let memberList = [];
          memberList = response.data
          let result = memberList.map((item)=>item.이메일===emailVal);
          
          if(result.includes(true)){
            modal('이미 등록된 이메일입니다.');
            emailComfirmCheck;
          }
          else {
            alert('사용이 가능한 이메일입니다.');
            emailComfirmCheck = true;
          }
        })
        .catch((error)=>{
          console.log('axios 실패 ', error );
        });
   
      }


      $('.email-confirm-btn').on({
        click:function(e){
          e.preventDefault();
          
          let inputEmailValue = $('#inputEmail').val();
          let regExpEmail = /^[A-Za-z0-9]([\-\_\\\.]?[A-Za-z0-9])*@[A-Za-z0-9]([\-\_\\\.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/g;

          if(inputEmailValue===''){
            modal('이메일을 입력해 주세요.');
          }

          if(regExpEmail.test(inputEmailValue)===false){
            modal('잘못된 이메일 형식입니다.');
            emailCheck;
          }
          else{
            emailComfirmBtn();
            emailCheck = true;
          }
        }
      });

      // 생년월일
      function inputBoxRegExpCheck(value){
        let regExp=/[^0-9]/g;
        return value.trim().replace(regExp,'');
      }

      function birthdayValCheck(){

        let nowYear  = new Date().getFullYear();
        let nowMonth = new Date().getMonth()+1;
        let nowDate  = new Date().getDate();
    
        let today = new Date(nowYear,nowMonth,nowDate);
        
        if( $('#year').val()==='' || $('#month').val()==='' || $('#date').val()===''){
          return;
        }
        let year  = $('#year').val().trim().toString();  
        let month = $('#month').val().trim().toString();  
        let date  = $('#date').val().trim().toString(); 
        let birthLastDate = new Date(year,month,0);
    
        if($('#year').val()===''&&$('#month').val()===''&&$('#date').val()===''){
          $('.guide-birthday p').hide();
          return;
        }
        else{
          if(!/^(?:19[0-9][0-9]|2[0-9][0-9][0-9])$/g.test(year)){ 
            $('.guide-birthday p').show().text('태어난 년도 4자리를 정확하게 입력해 주세요.');
            yearCheck;
            return;
          }
          else{            
            $('.guide-birthday p').hide();
            yearCheck = true;
        
            if(!/^(?:0?[1-9]|1[0-2])$/g.test(month)){
              $('.guide-birthday p').show().text('태어난 월을 정확하게 입력해 주세요.'); 
              monthCheck;               
              return;
            }
            else{  
              $('.guide-birthday p').hide();
              monthCheck = true;
        
              if(!/^(?:0?[1-9]|1[0-9]|2[0-9]|3[0-1])$/g.test(date)||date > birthLastDate.getDate() ){
                $('.guide-birthday p').show().text('태어난 일을 정확하게 입력해 주세요.');
                dateCheck;
                return;
              }
              else{                       
                $('.guide-birthday-confirm p').hide();
                dateCheck = true;
      
                const nowYear120 = new Date(nowYear-120, nowMonth, nowDate);
                const birthDay  = new Date(year, month, date);
      
                if(birthDay>today){
                  $('.guide-birthday p').show().text('생년월일이 잘못 입력되었습니다.');
                  birthdayCheck;
                  return;
                }
                else{
                  $('.guide-birthday p').hide();
                  birthdayCheck  = true;
                }
                                
                if(birthDay<nowYear120){
                  $('.guide-birthday p').show().text('생년월일을 다시 한 번 확인해 주세요.');
                  birthday120Check;
                  return;
                }
                else{
                  $('.guide-birthday p').hide();
                  birthday120Check  = true;
                }
              }
            }
          }
        }
      }   
    
       $('#year').on({
        keyup:function(){        
          $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout:function(){
          birthdayValCheck();
        }
       });
    
       $('#month').on({
        keyup:function(){
          $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout:function(){
          birthdayValCheck();
        },
        focusin:function(){
          birthdayValCheck();
        }
       });
    
       $('#date').on({
        keyup:function(){
          $(this).val(inputBoxRegExpCheck($(this).val()));
        },
        focusout:function(){
          birthdayValCheck();
        },
        focusin:function(){
          birthdayValCheck();
        }
       });

      // 서비스 이용약관 / 개인정보 수집, 이용 동의 / 모두 동의
      $('#chkAll').on({
        change:function(){
          if( $(this).is(':checked') ){
            $('.agree-btn').prop('checked',true);
          }
          else{
            $('.agree-btn').prop('checked',false);
          }
        }
      });
      
      $('.agree-btn').on({
        change:function(){
          if($('#agreeBtn1').is(':checked')===false||$('#agreeBtn2').is(':checked')===false){
            $('#chkAll').prop('checked',false);
          }
          else{
            $('#chkAll').prop('checked', true);
          }
        }
      });

      $('.disagree-btn').on({
        change:function(){
          if($('#disareeBtn1').is(':checked')===true||$('#disareeBtn2').is(':checked')===true){
            $('#chkAll').prop('checked',false);
          }
        }
      });

      // 모달창
      function modal(message){
        $('.modal-message').text(message);
        $('#modal').addClass('show');
       }
      
       $('.modal-close').on({
         click:function(){
           $('#modal').removeClass('show');
         }
       });

       // 회원 가입
       $('.submit-btn').on({
         click:function(e){
          e.preventDefault();

          let nameVal          = $('#inputName').val();
          let idVal            = $('#inputId').val();
          let pwVal            = $('#inputPw').val();
          let pwConfirmVal     = $('#inputPwConfirm').val();
          let receiveVal       = '';
          let addressVal       = $('#inputAddress1').val()+''+$('#inputAddress2').val()+''+$('#inputAddress3').val();
          let phoneVal         = $('#inputPhone').val();
          let emailVal         = $('#inputEmail').val();
          let birthdayVal      = $('#year').val()+'-'+$('#month').val()+'-'+$('#date').val();
          let birthdayInputVal = $('#year').val()+$('#month').val()+$('#date').val();
          let serviceVal       = '';
          let dateVal          = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();

          if($('#yes').is(':checked')){
            receiveVal = $('#yes').val();
          }
          else {
            receiveVal = $('#no').val();
          }

          if($('.agree-btn').is(':checked')){
            serviceVal = $('.agree-btn').val();
          }

          if(nameVal===''||idVal===''||idCheck===false||idConfirmCheck===false||pwVal===''||pwCheck1===false||pwCheck2===false||pwCheck3===false||pwConfirmVal===''||pwComfirmCheck===false||($('#yes').is(':checked')===false&&$('#no').is(':checked')===false)||(phoneVal!==''&&codeCheck===false)||(emailVal!==''&&emailComfirmCheck===false)||(birthdayInputVal!==''&&yearCheck===false)||(birthdayInputVal!==''&&monthCheck===false)||(birthdayInputVal!==''&&dateCheck===false)||(birthdayInputVal!==''&&birthdayCheck===false)||(birthdayInputVal!==''&&birthday120Check===false)||$('.agree-btn').is(':checked')===false){
            if(nameVal===''){
              modal('이름을 입력해 주세요.');
              $('#inputName').focus();
              return;
            }
            else if(idVal===''){
              modal('아이디를 입력해 주세요.');
              $('#inputId').focus();
              return;
            }
            else if(idCheck===false){
              modal('아이디를 올바르게 입력해 주세요.');
              $('#inputId').focus();
              return;
            }
            else if(idConfirmCheck===false){
              modal('아이디 중복을 확인해 주세요.');
              $('#inputId').focus();
              return;
            }
            else if(pwVal===''){
              modal('비밀번호를 입력해 주세요.');
              $('#inputPw').focus();
              return;
            }
            else if(pwCheck1===false||pwCheck2===false||pwCheck3===false){
              modal('비밀번호를 올바르게 입력해 주세요.');
              $('#inputPw').focus();
              return;
            }
            else if(pwConfirmVal===''){
              modal('비밀번호를 한번 더 입력해 주세요.');
              $('#inputPwConfirm').focus();
              return;
            }
            else if(pwComfirmCheck===false){
              modal('비밀번호가 일치하지 않습니다.');
              $('#inputPwConfirm').focus();
              return;
            }
            else if($('#yes').is(':checked')===false&&$('#no').is(':checked')===false){
              modal('문자/이메일 수신동의 여부를 선택해 주세요.');
              $('.receive').focus();
              return;
            }
            else if(phoneVal!==''&&codeCheck===false){
              modal('휴대폰 인증을 완료해 주세요.');
              $('#inputPhone').focus();
              return;
            }
            else if(emailVal!==''&&emailComfirmCheck===false){
              modal('이메일 중복을 확인해 주세요.');
              $('#inputEmail').focus();
              return;
            }
            else if((birthdayInputVal!==''&&yearCheck===false)||(birthdayInputVal!==''&&monthCheck===false)||(birthdayInputVal!==''&&dateCheck===false)||(birthdayInputVal!==''&&birthdayCheck===false)||(birthdayInputVal!==''&&birthday120Check===false)){
              modal('생년월일을 확인해 주세요.');
              $('#inputEmail').focus();
              return;
            }
            else if($('.agree-btn').is(':checked')===false){
              modal('서비스 이용약관과 개인정보 수집, 이용에 동의해 주세요.');
              $('.border').focus();
              return;
             }
            return;
          }
          else {

            let tem = {
              nameData     : nameVal,
              idData       : idVal,
              pwData       : pwVal,
              receiveData  : receiveVal,
              addressData  : addressVal,
              phoneData    : phoneVal,
              emailData    : emailVal,
              birthdayData : birthdayVal,
              serviceData  : serviceVal,
              dateData     : dateVal
            };

            localStorage.setItem(tem.nameData, JSON.stringify(tem));
            
            let formData = new FormData();
            formData.append('nameData', nameVal);
            formData.append('idData', idVal);
            formData.append('pwData', pwVal);
            formData.append('receiveData', receiveVal);
            formData.append('addressData', addressVal);
            formData.append('phoneData', phoneVal);
            formData.append('emailData', emailVal);
            formData.append('birthdayData', birthdayVal);
            formData.append('serviceData', serviceVal);
            formData.append('dateData', dateVal);
                    
            axios({
              url: '../mysql/response_member.php',
              method: 'POST',
              data: formData
            })
            .then((response)=>{
              format();
              location.href = '../complete/index.html'
            })
            .catch((error)=>{
              alert('AJAX 실패', error);
              console(error)
            });
          }

          function format(){

            $('#inputName').val('');
            $('#inputId').val('');
            $('#inputPw').val('');
            $('#inputPwConfirm').val('');
            $('.input-address').val('');
            $('#inputPhone').val('');
            $('#inputCode').val('');
            $('#inputEmail').val('');
            $('.birthday').val('');
            receiveVal = '';
            serviceVal = '';

            $('#yes').prop('checked',false);
            $('#no').prop('checked',false);
            $('.agree-btn').prop('checked',false);
            $('.disagree-btn').prop('checked',false);
            $('#chkAll').prop('checked',false);

            $('.guide-text').hide();
            $('.guide-text p').removeClass('success');
            $('.guide-text p').removeClass('error');

            $('.phone-btn, .code-confirm-btn').removeClass('on');
            $('.code-num, .receive-info, .countdown').hide();
            $('.address-btn > span').text('주소검색');
            $('.phone-btn').addClass('on');
            $('#inputPhone').prop('disabled',false);
            $('.guide-birthday p').hide();
          }

         }
       });

    }
    footer(){}
    goTopBox(){

      let winH = $(window).height();
      let footerTop = $('#footer').offset().top-winH;

      $(window).resize(()=>{
        winH=$(window).height();
        return winH;
      });

      $(window).scroll(()=>{
        footerTop = $('#footer').offset().top-winH;
        if($(window).scrollTop()>footerTop){
          $('#goTopBox').fadeIn(500);
          return;
        }
        else {
          $('#goTopBox').fadeOut(500);
          return;
        }
      });

      $('.top-btn').on({
        click:function(){
          $('html,body').stop().animate({scrollTop:0},600);
        }
      });

    }

  }
  const newMember = new Member();

  newMember.init();

})(jQuery);