$(document).ready(function () {
  main.init();
  main.fullpageScript();
  $(window).resize(main.handleResize);

  // 네비게이션 스크립트
  $('#customNav ul li a').on('click', function(e) {
    e.preventDefault();
    var anchor = $(this).parent().data('menuanchor');
    $.fn.fullpage.moveTo(anchor);

    // 네비게이션 클릭 시 active 클래스 제어
    $('#customNav ul li').removeClass('active');
    $(this).parent().addClass('active');

    // 이동한 섹션의 상단으로 바로 스크롤
    var section = $('[data-anchor="' + anchor + '"]');
    $('html, body').animate({
        scrollTop: section.offset().top - 70
    }, 400); // 스크롤 애니메이션 시간 
});
});



const main = (function () {

  function animateFromTo(selector, fromProps, toProps) {
    gsap.fromTo(selector, fromProps, toProps);
  }

  function initializeFullpage() {
    $('#fullpage').fullpage({
      autoScrolling: false,
      keyboardScrolling: true,
      anchors: ['firstPage', 'secondPage'],
      navigationPosition: 'right',
      navigationTooltips: ['Main', '지원사업'],
      showActiveTooltip: true,
      sectionSelector: ".section",
      navigation: false,
      slidesNavigation: true,
      scrollOverflow: false,
      recordHistory: false, // 해시 안붙게
      scrollBar: false, // 스크롤바 사용 여부 확인
      controlArrows: false,
      loopTop: false,
      loopBottom: false,
      normalScrollElements: '.menu-list, .scrollbar, .chatbot, .modal_pop, .right-menu__inner, .ai-message, .total-search__list, .event-list, .mainsSearchBox, .main-popup, .ui-widget.ui-widget-content, .main-conf, .voice-wrap, .calendar, .calendar-content, .tt-menu, .keywords-section, .search-input, .integrated-search-area, .ai-section', // 스크롤이 가능한 요소

      onLeave: function (origin, destination, direction) {
        //$('#header').toggle(destination === 1);
        /* 
                if (destination === 1 && direction === 'up') {
                  window.location.hash = 'firstPage';
                  return false; // 첫 번째 페이지에서 위로 스크롤시 이동을 막음
              } */

        if (destination === 2) {

          // if( $.fn.fullpage.reBuild ) {$.fn.fullpage.reBuild();}

          $('.ui-autocomplete').css('display', 'none'); // 검색어 자동완성 숨김
        }
      },

      afterLoad: function (anchorLink, index) {
        // 현재 페이지의 앵커에 해당하는 네비게이션 항목에 active 클래스 추가
        $('#customNav ul li').removeClass('active');
        $('#customNav ul li[data-menuanchor="' + anchorLink + '"]').addClass('active');
      }
    });

    $.fn.fullpage.isInitialized = true;
  }

  return {
    init: function () {
      this.animateInitialElements();
      this.animateMouseScroll();
      this.animateButtonAI();
      this.animateButtonBox();
    },

    animateInitialElements: function () {
      const bgElements = [
        { selector: "#section1 .bg .bg01", delay: 0.3, duration: 2 },
        { selector: "#section1 .bg .bg02", delay: 0.5, duration: 1.5 },
        { selector: "#section1 .bg .bg03", delay: 0.7, duration: 1 }
      ];

      bgElements.forEach(element => {
        animateFromTo(element.selector, { opacity: 0, y: 10, rotation: -180 }, { delay: element.delay, duration: element.duration, opacity: 1, y: 0, rotation: 0, ease: Power3.easeInOut });
      });

      const elementsToAnimate = [
        { selector: ".searchWrap_tit", delay: 0.8 }, // 검색 타이틀
        { selector: ".searchWrap_con", delay: 1.3 }, // 검색 박스
       // { selector: ".main-calendar", delay: 1.4 }, //캘린더 
        { selector: ".scroll-icon", delay: 1.8 } // 마우스
      ];

      elementsToAnimate.forEach(element => {
        animateFromTo(element.selector, { opacity: 0, y: 10 }, { delay: element.delay, duration: 1, opacity: 1, y: 0, ease: Power3.easeInOut });
      });
    },

    animateMouseScroll: function () {
      animateFromTo("#mouse-scroll", { opacity: 0, y: 10 }, {
        delay: 1.5, duration: 1, opacity: 1, y: 0, onComplete: () => {
          gsap.to("#mouse-scroll", { y: '+=5', repeat: -1, yoyo: true, duration: 1, ease: Power3.easeInOut });
        }, ease: Power3.easeInOut
      });
    },

    animateButtonAI: function () {
      animateFromTo(".searchWrap .btn_ai", { opacity: 0, y: -200, rotation: 360 }, { delay: 2, duration: 1, opacity: 1, y: 0, rotation: 0, ease: Bounce.easeOut });
    },

    animateButtonBox: function () {
      gsap.timeline({ defaults: { delay: 3, duration: 0.5, opacity: 0, y: 50, ease: Power3.easeOut } })
        .fromTo(".btnBox", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.2 });
    },

    fullpageScript: function () {
      if ($(window).width() <= 1300) {
        $('#header').show();
        if ($.fn.fullpage.destroy) {
          $.fn.fullpage.destroy('all');
        }
      } else if (!$.fn.fullpage.isInitialized) {
        initializeFullpage();
      }
    },



    handleResize: function () {
      if ($.fn.fullpage.isInitialized) {
        $.fn.fullpage.destroy('all');
        $.fn.fullpage.isInitialized = false;
      }
      main.fullpageScript();
    }
  };
})();
