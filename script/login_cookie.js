(($)=>{

  class Login {
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
      
      $('.submit-btn').on({
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
              url:'../mysql/login_cookie.php',
              method:'POST',
              data: formData
            })
            .then((response)=>{      
              if( response.data === '') {
                modal('아이디, 비밀번호를 확인해 주세요.');
              }
              else {
                localStorage.setItem('userId', `{"아이디": "${response.data.아이디}", "이름": "${response.data.이름}"}` );
                location.href = '../index.html';
              }
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
  const newLogin = new Login();

  newLogin.init();

})(jQuery);