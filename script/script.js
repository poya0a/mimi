(($)=>{

  class mimi {
    init(){
      this.header();
      this.section1();
      this.section2();
      this.section3();
      this.section4();
      this.section5();
      this.section6();
      this.section7();
      this.section8();
      this.section9();
      this.section10();
      this.footer();
      this.quickMenu();
      this.goTopBox();
    }

    header(){

      //스크롤 이벤트
      let result = '';
      let newTop=$(window).scrollTop();
      let oldTop=newTop;

      $(window).scroll(()=>{

        $('.mobile-btn').removeClass('on');
        $('.inner-bottom').removeClass('mobile');

        newTop=$(window).scrollTop();
        result=oldTop-newTop>0?'UP':'DOWN';

        if(result==='UP'){
          $('#header').removeClass('hide');
          $('#header').addClass('on');
        }

        if(result==='DOWN'){
          $('#header, .inner-bottom, .main-btn').removeClass('on');
          $('#header').addClass('hide');
          $('.sub, .sub-depth2').fadeOut(0);
        }

        if($(window).scrollTop()===0){
          $('#header, .mobile-btn, .user-menu-list').removeClass('on');
        }
        oldTop = newTop;
      });

      $('.mobile-btn').on({
        click:function(){
          
          $(this).toggleClass('on');

          if($(window).scrollTop()===0){
            $('.inner-bottom').toggleClass('mobile');
          }
          else {
            $('.inner-bottom').toggleClass('on');
          }
        }
      });

      $('.main-btn').on({
        mouseenter:function(){
          $('.main-btn, .user-menu-list').removeClass('on');
          $('.sub').fadeOut(0); 
          $(this).addClass('on');
          $(this).next().fadeIn(300); 
        },
        focusin:function(){
          $('.main-btn, .user-menu-list').removeClass('on');
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
      
      $('.col24').on({
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
    
    section1(){

      // 메인 슬라이트
      let cnt=0;
      let setId=null;
      let setId2=null;
      let winW=$(window).width();
      let result='';
      let dragStart=null;
      let dragEnd=null;
      let mouseDown=false;
      let touchStart=null;
      let touchEnd=null;
      
      $(window).resize(function(){
        winW=$(window).width();
        return winW;
      });

      function mainSlide(){
        $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},800,'easeOutExpo',function(){
          cnt>9?cnt=0:cnt;
          cnt<0?cnt=9:cnt;
          $('#section1 .slide-wrap').stop().animate({left:-winW*cnt},0)
        });
        pageBtn();
      }

      function nextCount(){
        cnt++;
        mainSlide();
      }

      function prevCount(){
        cnt--;
        mainSlide();
      }
      
      function autoTimer(){
        setId=setInterval(nextCount,6000);
      }
      autoTimer();

      // 페이지 버튼
      function pageBtn(){
        $('.page-btn').removeClass('on');
        $('.page-btn').eq(cnt>9?cnt=0:cnt).addClass('on');
      }

      // 정지 함수
      function pausefn(){

        let tCnt=0;

        clearInterval(setId);
        clearInterval(setId2);

        $('.pause-btn').children().attr('class','fa fa-play');

          setId2=setInterval(function(){
            tCnt++;  
            if(tCnt>6){ 
              clearInterval(setId); 
              clearInterval(setId2);
              nextCount();
              playfn();
            }
          },1000);
      }
      
      //재생 함수
      function playfn(){
        $('.pause-btn').children().attr('class','fa fa-pause');
        autoTimer();
      }

      $('.slide-prev-btn').on({
        click:function(){
          if(!$('#section1 .slide-wrap').is(':animated')){
            prevCount();
            pausefn();
          }
        }
      });

      $('.slide-next-btn').on({
        click:function(){
          if(!$('#section1 .slide-wrap').is(':animated')){
            nextCount();
            pausefn();
          }
        }
      });

      //페이지 버튼 이벤트
      $('.page-btn').each(function(index){
        $(this).click(function(){
          if(!$('#section1 .slide-wrap').is(':animated')){
            cnt=index;
            mainSlide();
            pausefn();
          }
        });
      })

      //정시/재생 버튼 이벤트
      $('.pause-btn').on({
        click:function(e){
          e.preventDefault();

          if($(this).children().hasClass('fa-pause')){
            pausefn();
         
            $(this).children().removeClass('fa-pause');
            $(this).children().addClass('fa-play');
          }
          if($(this).children().hasClass('fa-play')){
            playfn();
            
            $(this).children().removeClass('fa-play');
            $(this).children().addClass('fa-pause');
          }
        }
      });

      //터치 스와이프
      $('#section1 .slide-container').on({
        mousedown:function(e){
          pausefn();

          touchStart=e.clientX;
          dragStart=e.clientX-$('#section1 .slide-wrap').offset().left-winW;
          mouseDown=true;
          
        },

        mouseup:function(e){
          touchEnd=e.clientX;

          result=touchStart-touchEnd>0?'NEXT':'PREV'

          if(Math.abs(touchStart-touchEnd) > 10){
            if(result==='NEXT'){
              if(!$('#section1 .slide-wrap').is(':animated')){
              nextCount();
              pausefn();
              }
            }
            if(result==='PREV'){
              if(!$('#section1 .slide-wrap').is(':animated')){
              prevCount();
              pausefn();
              }
            }
          }
          mouseDown=false;

        },

        mouseleave:function(e){
          if(!mouseDown){return;}
          touchEnd=e.clientX;
           result=touchStart-touchEnd>0?'NEXT':'PREV';
           if(Math.abs(touchStart-touchEnd) > 10){
            if(result==='NEXT'){
              if(!$('#section1 .slide-wrap').is(':animated')){
              nextCount();
              pausefn();
              }
            }
            if(result==='PREV'){
              if(!$('#section1 .slide-wrap').is(':animated')){
              prevCount();
              pausefn();
              }
            }
          }
           mouseDown=false;
         },

         mousemove:function(e){
          if(!mouseDown){return;}
          dragEnd=e.clientX
          $('#section1 .slide-wrap').css({left:dragEnd-dragStart});
        }

      });

      // 모바일 터치 이벤트
      $('#section1 .slide-container').on({
        touchstart: function(e){
          pausefn();

          touchStart=e.originalEvent.changedTouches[0].clientX;                        
          dragStart=e.originalEvent.changedTouches[0].clientX-$('#section1 .slide-wrap').offset().left-winW;
          mouseDown=true;
        },

        touchend:function(e){
            touchEnd=e.originalEvent.changedTouches[0].clientX;  
            result=touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
            if(Math.abs(touchStart-touchEnd) > 10){
              if(result==='NEXT'){
                if(!$('#section1 .slide-wrap').is(':animated')){
                  nextCount();
                  pausefn();
                }                  
              }
              if(result==='PREV'){
                if(!$('#section1 .slide-wrap').is(':animated')){
                  prevCount();
                  pausefn();
                }
              }
            }
            mouseDown=false;
        },

        touchmove: function(e){
            if(!mouseDown){return;}
            dragEnd=e.originalEvent.changedTouches[0].clientX;
            $('#section1 .slide-wrap').css({left:dragEnd-dragStart});
        }
      });

    }
    
    section2(){

      let winH=$(window).height();
      let sec2Top=$('#section2').offset().top-winH;

      $(window).resize(function(){
        winH=$(window).height();
        return winH;
      });

      $(window).scroll(function(){
        sec2Top=$('#section2').offset().top-winH;
        if($(window).scrollTop()>sec2Top){
          $('#section2').addClass('sec2ani');
          return;
        }
        if($(window).scrollTop()===0){
          $('#section2').removeClass('sec2ani');
          return;
        }
      });

    }
    
    section3(){

      let cnt=0;
      let tCnt=0;
      let setId=null;
      let setId2=null;
      let result='';
      let dragStart=null;
      let dragEnd=null;
      let mouseDown=false;
      let touchStart=null;
      let touchEnd=null;
      let winW=$(window).width();
      let slideWrapW=$('#section3 .slide-wrap').width();
      let slideW=slideWrapW/20

      $(window).resize(function(){
        slideWrapW=$('#section3 .slide-wrap').width();
        return slideWrapW;
      });
      
      //슬라이드
      function sec3Slide(){
        slideW=slideWrapW/20
        $('#section3 .slide-wrap').stop().animate({left:-slideW*cnt},800,function(){
          cnt>9?cnt=0:cnt;
          cnt<0?cnt=9:cnt;
          $('#section3 .slide-wrap').stop().animate({left:-slideW*cnt},0)
        });
        numberCount();
      }

      function nextCount(){
        cnt++;
        sec3Slide();
      }

      function prevCount(){
        cnt--;
        sec3Slide();
      }

      function autoTimer(){
        setId=setInterval(nextCount,6000);
      }
      autoTimer();

      function numberCount(){
        $('.count').removeClass('on');
        $('.count').eq(cnt>9?cnt=0:cnt).addClass('on');
      }

      // 정지 함수
      function pausefn(){
        tCnt=0;

        clearInterval(setId);
        clearInterval(setId2);

        $('.sec3-pause-btn').children().attr('class','fa fa-play');

          setId2=setInterval(function(){
            tCnt++;  
            if(tCnt>6){ 
              clearInterval(setId); 
              clearInterval(setId2);
              nextCount();
              playfn();
            }
          },1000);
      }
      
      //재생 함수
      function playfn(){
        autoTimer();
        $('.sec3-pause-btn').children().attr('class','fa fa-pause');
      }

      //정시/재생 버튼 이벤트
      $('.sec3-pause-btn').on({
        click:function(e){
          e.preventDefault();
          if($(this).children().hasClass('fa-pause')){
            pausefn();
         
            $(this).children().removeClass('fa-pause');
            $(this).children().addClass('fa-play');
          }
          else {
            playfn();
            
            $(this).children().removeClass('fa-play');
            $(this).children().addClass('fa-pause');
          }
        }
      });

      //터치 스와이프
      $('#section3 .slide-view').on({
        mousedown:function(e){
          pausefn();

          touchStart=e.clientX;
          dragStart=e.clientX-$('#section3 .slide-wrap').offset().left-winW;
          mouseDown=true;
          
        },

        mouseup:function(e){
          touchEnd=e.clientX;

          result=touchStart-touchEnd>0?'NEXT':'PREV'

          if(Math.abs(touchStart-touchEnd) > 10){
            if(result==='NEXT'){
              if(!$('#section3 .slide-wrap').is(':animated')){
              nextCount();
              pausefn();
              }
            }
            if(result==='PREV'){
              if(!$('#section3 .slide-wrap').is(':animated')){
              prevCount();
              pausefn();
              }
            }
          }
          mouseDown=false;

        },

        mouseleave:function(e){
          if(!mouseDown){return;}
          touchEnd=e.clientX;
           result=touchStart-touchEnd>0?'NEXT':'PREV';
           if(Math.abs(touchStart-touchEnd) > 10){
            if(result==='NEXT'){
              if(!$('#section3 .slide-wrap').is(':animated')){
              nextCount();
              pausefn();
              }
            }
            if(result==='PREV'){
              if(!$('#section3 .slide-wrap').is(':animated')){
              prevCount();
              pausefn();
              }
            }
          }
           mouseDown=false;
         },

         mousemove:function(e){
          if(!mouseDown){return;}
          dragEnd=e.clientX
          $('#section3 .slide-wrap').css({left:dragEnd-dragStart});
        }

      });

      $('#section3 .slide-view').on({
        touchstart: function(e){
          pausefn();

          touchStart=e.originalEvent.changedTouches[0].clientX;                        
          dragStart=e.originalEvent.changedTouches[0].clientX-$('#section3 .slide-wrap').offset().left-winW;
          mouseDown=true;
        },

        touchend:function(e){
            touchEnd=e.originalEvent.changedTouches[0].clientX;  
            result=touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
            if(Math.abs(touchStart-touchEnd) > 10){
              if(result==='NEXT'){
                if(!$('#section3 .slide-wrap').is(':animated')){
                  nextCount();
                  pausefn();
                }                  
              }
              if(result==='PREV'){
                if(!$('#section3 .slide-wrap').is(':animated')){
                  prevCount();
                  pausefn();
                }
              }
            }
            mouseDown=false;
        },

        touchmove: function(e){
            if(!mouseDown){return;}
            dragEnd=e.originalEvent.changedTouches[0].clientX;
            $('#section3 .slide-wrap').css({left:dragEnd-dragStart});
        }
      });

    }
    
    section4(){

      let winH=$(window).height();
      let sec4Top=$('#section4').offset().top-winH;

      $(window).resize(function(){
        winH=$(window).height();
        return winH;
      });

      $(window).scroll(function(){
        sec4Top=$('#section4').offset().top-winH;
        if($(window).scrollTop()>sec4Top){
          $('#section4').addClass('sec4ani');
          return;
        }
        if($(window).scrollTop()===0){
          $('#section4').removeClass('sec4ani');
          $('.content-item').removeClass('selected');
          return;
        }
      });

      $('.content-item').on({
        click:function(){
          $('.content-item').removeClass('selected');
          $(this).addClass('selected');
        }
      });

    }
    
    section5(){

      let idx=0;
      let winW=$(window).width();
      let cols=5;
      let imgWH=winW/cols;
      let n=$('#section5 .gallery-item').length;
      let h=$('#section5 .gallery-item.hide').length;
      let rows=Math.ceil((n-h)/cols);
      let scr=false;
      const galleryItem=$('#section5 .gallery-item');
      const sec5Top=$('#section5').offset().top-$(window).height();

      $(window).scroll(function(){
        if($(window).scrollTop()>=sec5Top){
          if(scr===false){
            scr=true;
            $('#section5').addClass('sec5ani');
          }
        }
        if($(window).scrollTop()===0){
          scr=false;
          $('#section5').removeClass('sec5ani');
        }
      });

      setTimeout(galleryMain, 100);

      $(window).resize(function(){
        galleryMain();
      });

      $('#section5 .sec5-btn').each(function(index){
          $(this).on({
            click: function(e){
              e.preventDefault();
               idx=index;
               galleryMain();
               $('#section5 .sec5-btn').removeClass('on');
               $('#section5').removeClass('sec5ani');
               $(this).addClass('on');
            }           
          });
      });        

      function galleryMain(){

        winW=$(window).width();
        
        if(winW>=1500){
          cols=5;
        }
        else if(winW>=1280){
          cols=4;
        }
        else if(winW>=1024){
          cols=3;
        }
        else if(winW>=600){
          cols=2;
        }
        else {cols=1;}

        imgWH=winW/cols;

        galleryItem.removeClass('zoom');
        galleryItem.stop().animate({width:imgWH,height:imgWH},'easeInOutExpo').removeClass('hide');
        $('.gallery-item, .img-wrap').css({width:imgWH});
        
        if(idx===0){
          switch(cols){
            case 5:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(1).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*4,top:imgWH*0}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*2,top:imgWH*1}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*3,top:imgWH*1}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*4,top:imgWH*1}, 300);
            break;
            case 4:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(1).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*2,top:imgWH*1}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*3,top:imgWH*1}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*1,top:imgWH*2}, 300);
            break;
            case 3:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(1).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*2,top:imgWH*1}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*1,top:imgWH*2}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*2,top:imgWH*2}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
            case 2:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(1).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*1,top:imgWH*2}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*1,top:imgWH*3}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*4}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*1,top:imgWH*4}, 300);
            break;
            default:
             galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
             galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
             galleryItem.eq(2).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
             galleryItem.eq(3).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
             galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*4}, 300);
             galleryItem.eq(5).show().stop().animate({left:imgWH*0,top:imgWH*5}, 300);
             galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*6}, 300);
             galleryItem.eq(7).show().stop().animate({left:imgWH*0,top:imgWH*7}, 300);
             galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*8}, 300);
             galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*9}, 300);
          }
        }
        else if(idx===1){

          galleryItem.eq(1).hide().addClass('hide');
          galleryItem.eq(2).hide().addClass('hide');
          galleryItem.eq(5).hide().addClass('hide');
          galleryItem.eq(7).hide().addClass('hide');
          galleryItem.eq(8).hide().addClass('hide');
          galleryItem.eq(9).hide().addClass('hide');

          switch(cols){
            case 5:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
            break;
            case 4:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
            break;
            case 3:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
            break;
            case 2:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
            break;
            default:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
          }
        }
        else if(idx===2){

          galleryItem.eq(1).hide().addClass('hide');
          galleryItem.eq(3).hide().addClass('hide');
          galleryItem.eq(5).hide().addClass('hide');

          switch(cols){
            case 5:
              
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*4,top:imgWH*0}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
            break;
            case 4:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*2,top:imgWH*1}, 300);
            break;
            case 3:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*2,top:imgWH*1}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
            break;
            case 2:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*1,top:imgWH*2}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
            break;
            default:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*0,top:imgWH*4}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*5}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*6}, 300);
          }
          
        }
        else if(idx===3){
          
          galleryItem.eq(0).hide().addClass('hide');
          galleryItem.eq(6).hide().addClass('hide');
          galleryItem.eq(7).hide().addClass('hide');
          galleryItem.eq(8).hide().addClass('hide');
          galleryItem.eq(9).hide().addClass('hide');

          switch(cols){
            case 5:
              
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*4,top:imgWH*0}, 300);
            break;
            case 4:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
            break;
            case 3:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
            break;
            case 2:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
            break;
            default:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*0,top:imgWH*4}, 300);
          }
        }
        else if(idx===4){

          galleryItem.eq(0).hide().addClass('hide');
          galleryItem.eq(2).hide().addClass('hide');
          galleryItem.eq(3).hide().addClass('hide');
          galleryItem.eq(5).hide().addClass('hide');
          galleryItem.eq(6).hide().addClass('hide');
          galleryItem.eq(7).hide().addClass('hide');
          galleryItem.eq(8).hide().addClass('hide');

          switch(cols){
            case 5:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
            break;
            case 4:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
            break;
            case 3:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
            break;
            case 2:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
            break;
            default:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
          }
        }
        else if(idx===5){

          galleryItem.eq(2).hide().addClass('hide');
          galleryItem.eq(5).hide().addClass('hide');
          galleryItem.eq(6).hide().addClass('hide');
          galleryItem.eq(7).hide().addClass('hide');


          switch(cols){
            case 5:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(1).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*4,top:imgWH*0}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
            break;
            case 4:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(1).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
            break;
            case 3:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(1).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*2,top:imgWH*1}, 300);
            break;
            case 2:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(1).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*1,top:imgWH*2}, 300);
            break;
            default:
              galleryItem.eq(0).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(4).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*4}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*5}, 300);
          }
          
        }
        else if(idx===6){

          galleryItem.eq(0).hide().addClass('hide');
          galleryItem.eq(4).hide().addClass('hide');

          switch(cols){
            case 5:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*4,top:imgWH*0}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*2,top:imgWH*1}, 300);
            break;
            case 4:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*3,top:imgWH*0}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*2,top:imgWH*1}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*3,top:imgWH*1}, 300);
            break;
            case 3:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*2,top:imgWH*0}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*2,top:imgWH*1}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*1,top:imgWH*2}, 300);
            case 2:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*1,top:imgWH*0}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*1,top:imgWH*1}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*1,top:imgWH*2}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*1,top:imgWH*3}, 300);
            break;
            default:
              galleryItem.eq(1).show().stop().animate({left:imgWH*0,top:imgWH*0}, 300);
              galleryItem.eq(2).show().stop().animate({left:imgWH*0,top:imgWH*1}, 300);
              galleryItem.eq(3).show().stop().animate({left:imgWH*0,top:imgWH*2}, 300);
              galleryItem.eq(5).show().stop().animate({left:imgWH*0,top:imgWH*3}, 300);
              galleryItem.eq(6).show().stop().animate({left:imgWH*0,top:imgWH*4}, 300);
              galleryItem.eq(7).show().stop().animate({left:imgWH*0,top:imgWH*5}, 300);
              galleryItem.eq(8).show().stop().animate({left:imgWH*0,top:imgWH*6}, 300);
              galleryItem.eq(9).show().stop().animate({left:imgWH*0,top:imgWH*7}, 300);
          }
          
        }

        h=$('#section5 .gallery-item.hide').length;
        rows=Math.ceil((n-h)/cols);
        $('#section5 .gallery-list').stop().animate({height:imgWH*rows},300);

        galleryItem.addClass('zoom');

      }

    }
    
    section6(){

      let winH=$(window).height();
      let sec6Top=$('#section6').offset().top-winH;
      let piece1=.95;
      let piece2=.7;
      let piece3=.65;
      let piece4=.8;

      let sum1=0;
      let sum2=0;
      let sum3=0;
      let sum4=0;

      let cnt=0;
      let setId=0;
      
      let t=false;

      $(window).resize(function(){
        winH=$(window).height();
        return winH;
      });

      $(window).scroll(function(){
        sec6Top=$('#section6').offset().top-winH;
          if($(window).scrollTop()===0){
            cnt=0;
            sum1=0;
            sum2=0;
            sum3=0;
            sum4=0;
            t=false;
            clearInterval(setId);
            $('#section6').removeClass('sec6ani');
            $('.count-num').text('');
          }
          if($(window).scrollTop()>sec6Top){
            if(t===false){
              t=true;
              $('#section6').addClass('sec6ani');
              autoTimer();
            }           
          }
      });

      function countfn(){
        cnt++;
        if(cnt>=100){clearInterval(setId)}

        sum1+=piece1;
        $('.count-num').eq(0).text(Math.round(sum1)+'%');

        sum2+=piece2;
        $('.count-num').eq(1).text(Math.round(sum2)+'%');

        sum3+=piece3;
        $('.count-num').eq(2).text(Math.round(sum3)+'%');

        sum4+=piece4;
        $('.count-num').eq(3).text(Math.round(sum4)+'%');
      }

      function autoTimer(){
        setId=setInterval(countfn,20);
      }
      
    }
    
    section7(){

      let winH=$(window).height();
      let sec7Top=$('#section7').offset().top-winH;
      let t=false;

      $(window).resize(function(){
        winH=$(window).height();
        return winH;
      });

      $(window).scroll(function(){
        sec7Top=$('#section7').offset().top-winH;
        if($(window).scrollTop()>sec7Top){
          $('#section7').addClass('sec7ani');
          return;
        }
        if($(window).scrollTop()===0){
          $('#section7').removeClass('sec7ani');
          $('.card-btn, .select-btn-wrap').removeClass('selected');
          return;
        }
      });

      $('.card-btn').on({
        click:function(){
          if(t===false){
            $(this).parent().css({zIndex:2});
            $(this).addClass('selected');
            $(this).next().addClass('selected');
            t=true;
          }
          else {
            $('.introduction-item').css({zIndex:1});
            $('.card-btn, .select-btn-wrap').removeClass('selected');
            t=false;
          }
          
          $('.introduction-item').css({zIndex:1});
          $('.card-btn, .select-btn-wrap').removeClass('selected');
          $(this).parent().css({zIndex:2});
          $(this).addClass('selected');
          $(this).next().addClass('selected');
          t=true;
        }
      });

      $('.select-cancel-btn').on({
        click:function(){
          if(t===true){
            $('.introduction-item').css({zIndex:1});
            $('.card-btn').removeClass('selected');
            $('.select-btn-wrap').removeClass('selected');
            t=false;
          }
        }
      });

    }
    
    section8(){

      let cnt=0;
      let setId=null;
      let setId2=null;
      let result='';
      let dragStart=null;
      let dragEnd=null;
      let mouseDown=false;
      let touchStart=null;
      let touchEnd=null;
      let winW=$(window).width();
      let slideWarpW=$('#section8 .slide-wrap').width();
      let slideW=slideWarpW/21;

      $(window).resize(function(){
        slideWarpW=$('#section8 .slide-wrap').width();
        return slideWarpW;
      });

      //슬라이드
      function sec8Slide(){
        slideW=slideWarpW/21;
        $('#section8 .slide-wrap').stop().animate({left:-slideW*cnt},600,function(){
          cnt>10?cnt=0:cnt;
          cnt<0?cnt=10:cnt;
          $('#section8 .slide-wrap').stop().animate({left:-slideW*cnt},0)
        });
      }

      function nextCount(){
        cnt++;
        sec8Slide();
      }

      function prevCount(){
        cnt--;
        sec8Slide();
      }

      function autoTimer(){
        setId=setInterval(nextCount,5000);
      }
      autoTimer();

      function pausefn(){

        let tCnt=0;

        clearInterval(setId);
        clearInterval(setId2);

          setId2=setInterval(function(){
            tCnt++;  
            if(tCnt>5){ 
              clearInterval(setId); 
              clearInterval(setId2);
              nextCount();
              autoTimer();
            }
          },1000);
      }

      $('.sec8-slide-prev-btn').on({
        click:function(){
          if(!$('#section8 .slide-wrap').is(':animated')){
            prevCount();
            pausefn();
          }
        }
      });

      $('.sec8-slide-next-btn').on({
        click:function(){
          if(!$('#section8 .slide-wrap').is(':animated')){
            nextCount();
            pausefn();
          }
        }
      });

      // 터치 스와이프
      $('#section8 .slide-view').on({
        mousedown:function(e){
          pausefn();

          touchStart=e.clientX;
          dragStart=e.clientX-$('#section8 .slide-wrap').offset().left-winW;
          mouseDown=true;
          
        },

        mouseup:function(e){
          touchEnd=e.clientX;

          result=touchStart-touchEnd>0?'NEXT':'PREV'

          if(Math.abs(touchStart-touchEnd) > 10){
            if(result==='NEXT'){
              if(!$('#section8 .slide-wrap').is(':animated')){
              nextCount();
              pausefn();
              }
            }
            if(result==='PREV'){
              if(!$('#section8 .slide-wrap').is(':animated')){
              prevCount();
              pausefn();
              }
            }
          }
          mouseDown=false;

        },

        mouseleave:function(e){
          if(!mouseDown){return;}
          touchEnd=e.clientX;
           result=touchStart-touchEnd>0?'NEXT':'PREV';
           if(Math.abs(touchStart-touchEnd) > 10){
            if(result==='NEXT'){
              if(!$('#section8 .slide-wrap').is(':animated')){
              nextCount();
              pausefn();
              }
            }
            if(result==='PREV'){
              if(!$('#section8 .slide-wrap').is(':animated')){
              prevCount();
              pausefn();
              }
            }
          }
           mouseDown=false;
         },

         mousemove:function(e){
          if(!mouseDown){return;}
          dragEnd=e.clientX
          $('#section8 .slide-wrap').css({left:dragEnd-dragStart});
        }

      });

      $('#section8 .slide-view').on({
        touchstart: function(e){
          pausefn();

          touchStart=e.originalEvent.changedTouches[0].clientX;                        
          dragStart=e.originalEvent.changedTouches[0].clientX-$('#section8 .slide-wrap').offset().left-winW;
          mouseDown=true;
        },

        touchend:function(e){
            touchEnd=e.originalEvent.changedTouches[0].clientX;  
            result=touchStart-touchEnd > 0 ? 'NEXT' : 'PREV';
            if(Math.abs(touchStart-touchEnd) > 10){
              if(result==='NEXT'){
                if(!$('#section8 .slide-wrap').is(':animated')){
                  nextCount();
                  pausefn();
                }                  
              }
              if(result==='PREV'){
                if(!$('#section8 .slide-wrap').is(':animated')){
                  prevCount();
                  pausefn();
                }
              }
            }
            mouseDown=false;
        },

        touchmove: function(e){
            if(!mouseDown){return;}
            dragEnd=e.originalEvent.changedTouches[0].clientX;
            $('#section8 .slide-wrap').css({left:dragEnd-dragStart});
        }
      });

    }
    
    section9(){

      let winH=$(window).height();
      let sec9Top=$('#section9').offset().top-winH;

      $(window).resize(function(){
        winH=$(window).height();
        return winH;
      });

      $(window).scroll(function(){
        sec9Top=$('#section9').offset().top-winH;
        if($(window).scrollTop()>sec9Top){
          $('#section9').addClass('sec9ani');
          return;
        }
        if($(window).scrollTop()===0){
          $('#section9').removeClass('sec9ani');
          return;
        }
      });
    }

    section10(){

      let winH=$(window).height();
      let sec10Top=$('#section10').offset().top-winH;

      $(window).resize(function(){
        winH=$(window).height();
        return winH;
      });

      $(window).scroll(function(){
        sec10Top=$('#section10').offset().top-winH;
        if($(window).scrollTop()>sec10Top){
          $('#section10').addClass('sec10ani');
          $('.send-cube').addClass('cube-ani1');
          return;
        }
        if($(window).scrollTop()===0){
          $('#section10, .success-message').removeClass('sec10ani');
          $('.send-cube').removeClass('cube-ani1');
          $('.send-cube').removeClass('cube-ani2');
          return;
        }
      });

      $('.submit-btn').on({
        click:function(){
          $('.success-message').addClass('sec10ani');
          $('.send-cube').addClass('cube-ani2');
        }
      });

    }
    
    footer(){}

    quickMenu(){

      let quickTop=($(window).height()-$('#quickMenu').height())/1.2;
      let sec2Focus=$('#section2').offset().top;
      let sec3Focus=$('#section3').offset().top;
      let sec4Focus=$('#section4').offset().top;
      let sec7Focus=$('#section7').offset().top;

      $(window).scroll(function(){
        $('#quickMenu').stop().animate({top:quickTop+$(window).scrollTop()},'easeOutExpo');
      });

      $('.quick1').on({
        click:function(){
          $('html,body').stop().animate({scrollTop:sec2Focus},500);
        }
      });

      $('.quick2').on({
        click:function(){
          $('html,body').stop().animate({scrollTop:sec3Focus},500);
        }
      });

      $('.quick3').on({
        click:function(){
          $('html,body').stop().animate({scrollTop:sec4Focus},500);
        }
      });

      $('.quick4').on({
        click:function(){
          $('html,body').stop().animate({scrollTop:sec7Focus},500);
        }
      });
      
    }

    goTopBox(){

      let winH=$(window).height();
      let sec10Top=$('#section10').offset().top-winH;

      $(window).resize(function(){
        winH=$(window).height();
        return winH;
      });

      $(window).scroll(function(){
        sec10Top=$('#section10').offset().top-winH;
        if($(window).scrollTop()>sec10Top){
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
  const newMimi = new mimi();

  newMimi.init();

})(jQuery);