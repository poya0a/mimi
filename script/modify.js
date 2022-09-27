(($)=>{

  class Modify {
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
          mouseleave:function(){
            $('.main-btn').removeClass('on');
            $('.sub').fadeOut(0); 
          },
          focusout:function(){
            $('.main-btn').removeClass('on');
            $('.sub').fadeOut(0);
          }
      });
  
      $('.sub-btn').on({
          mouseenter: function(){
            $('.sub-depth2').fadeOut(0); 
            $(this).next().fadeIn(300);
          },
          focusin:function(){
            $('.sub-depth2').fadeOut(0); 
            $(this).next().fadeIn(300);
          }
      });

      $('.sub-odd').on({
        mouseleave: function(){
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

      const getCookie=(name)=>{
        let temp = [];
        let obj = [];
        let found = '';
        
        if(document.cookie==='') return;
        temp = document.cookie.split(';');
        temp.map((item, idx)=>{
             obj[idx] = {
                name:  item.split('=')[0].trim(),
                value: item.split('=')[1].trim()
             } 
        });  

        obj.map((item)=>{
            if(item.name === name){
               found = item.value;
            }
        });
        return found;
      }

      function loginEvent(){
        if(localStorage.length <= 0 ) return;
        if(document.cookie==='') return;

        const localData = JSON.parse(localStorage.getItem('userId')); 
        
        let result = getCookie('PHPSESSID');
        if( result === undefined || localData === null ) return;
        if( result === localData.세션 ){
          $('.modify-btn').text(localData.이름 + '님');
        }
      }

      loginEvent();

      $('.logout-btn').on({
        click:function(){

        let value = getCookie('PHPSESSID');
        let newDate = new Date();

        newDate.setDate(newDate.getDate()-1);            
        document.cookie = `${'PHPSESSID'}=${value}; path=/; expires=${newDate.toUTCString()};`;

        localStorage.removeItem('userId');
        location.href = './index.html';
        }
      });

    }
    main(){

      function modal(message){
        $('.modal-message').text(message);
        $('#modal').addClass('show');
      }
      
      $('.modal-close').on({
         click:function(){
           $('#modal').removeClass('show');
         }
      });

      const getCookie=(name)=>{
        let temp = [];
        let obj = [];
        let found = '';
        
        if(document.cookie==='') return;
        temp = document.cookie.split(';');
        temp.map((item, idx)=>{
             obj[idx] = {
                name:  item.split('=')[0].trim(),
                value: item.split('=')[1].trim()
             } 
        });  

        obj.map((item)=>{
            if(item.name === name){
               found = item.value;
            }
        });
        return found;
      }

      $('.out-btn').on({
        click:function(e){
         e.preventDefault();

         let idVal = $('#inputId').val();
         let pwVal = $('#inputPw').val();

         if(idVal===''||pwVal===''){
           if(idVal===''){
            modal('아이디를 입력해 주세요.');
            return;
           }
           else if(pwVal===''){
            modal('비밀번호를 입력해 주세요.');
            return;
           }
         }
         
         else {

          let formData = new FormData();

          formData.append('userId', idVal);
          formData.append('userPw', pwVal);

          axios({
            url:'../mysql/delete_member.php',
            method:'POST',
            data: formData
          })
          .then((response)=>{
            alert('회원 탈퇴가 정상적으로 처리되었습니다.');

            let value = getCookie('PHPSESSID');
            let newDate = new Date();
    
            newDate.setDate(newDate.getDate()-1);            
            document.cookie = `${'PHPSESSID'}=${value}; path=/; expires=${newDate.toUTCString()};`;
    
            localStorage.removeItem('userId');

            location.href = '../index.html';
          })
          .catch((error)=>{
            console.log(error);
          });

         }

        }
      });

    }
    footer(){}
    goTopBox(){

      let winH=$(window).height();
      let footerTop=$('#footer').offset().top-winH;

      $(window).resize(function(){
        winH=$(window).height();
        return winH;
      });

      $(window).scroll(function(){
        footerTop=$('#footer').offset().top-winH;
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
  const newModify = new Modify();

  newModify.init();

})(jQuery);