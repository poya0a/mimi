(($)=>{

  class Compolete {
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
    main(){}
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
  const newCompolete = new Compolete();

  newCompolete.init();

})(jQuery);