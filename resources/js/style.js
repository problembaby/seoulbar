

$(document).ready(function () {


  //데이터피커  
  $(".datepicker").datepicker({
    dateFormat: 'yy-mm-dd', // 달력 포맷
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월',], // 월 텍스트
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월',], //월 툴팁
    dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'], // 요일텍스트
    dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일',], //요일툴팁
    showMonthAfterYear: true,
    //showOtherMonths:true, // 달력에 앞뒤 날짜표시

  });



  // 스크롤바가 있는지 확인하고 패딩을 적용하는 함수
  function adjustPaddingForScrollbar() {
    const scrollbarWidth = 7; // body 스크롤바 너비
    const bodyHasVerticalScroll = $('body')[0].scrollHeight > window.innerHeight;

    if (bodyHasVerticalScroll) {
      //스크롤 있을때
      $('body').css('paddingRight', '0px');
    } else {
      //스크롤 없을때
      $('body').css('paddingRight', `${scrollbarWidth}px`);
    }
  }

  // 페이지 로드와 리사이즈 이벤트에 대응
  $(window).on('load resize', adjustPaddingForScrollbar);



  //onlyNumber 클래스 추가시 숫자만 입력 하게 하는 함수
  $('.onlyNumber').on('input', function () {
    if (!$(this).val().match(/^[0-9]*$/)) {
      alert('숫자만 입력해주세요.');
      $(this).val($(this).val().replace(/[^0-9]/g, ''));

    }
  })

  // main-tab on 오버스크롤 가운데 고정 (모바일만 적용)
  const mainTab = $('.main-tab');
  const ulOn = $('.board-menu__ul li.on');
  if (ulOn.length) {
    mainTab.scrollLeft(ulOn.offset().left - (mainTab.width() / 2) + (ulOn.width() / 2));
  }

  //모바일시 탭 드롭다운
  $('.tab-dropdown').on('click', 'li', function (e) {
    $(this).parent().toggleClass('opened');

  });


  // #menuBtn 메뉴 드롭 이벤트
  $("#menuBtn").click(function (e) {
    e.stopPropagation(); //버블링방지
    let expanded = $(this).attr("aria-expanded") === "true" || false;
    $(this).attr("aria-expanded", !expanded);
    $("#lnb").fadeToggle('fast').attr("aria-hidden", expanded); // #lnb의 표시 상태를 전환합니다.
  });

  $(".gnbClose").click(function () {
    $("#menuBtn").attr("aria-expanded", false);
    $("#lnb").fadeOut('fast').attr("aria-hidden", true); // #lnb를 숨깁니다.
  });

  //외부 클릭 시 이벤트
  $(document).click(function () {
    $('#menuBtn').attr("aria-expanded", false);
    $('#lnb').fadeOut('fast').attr("aria-hidden", true);

  });

  // #lnb 내부 클릭 시 이벤트 버블링 막기
  $("#lnb").click(function (e) {
    e.stopPropagation();
  });

  // .dropdown 클릭 이벤트
  $("#lnb .dropdown").click(function (e) {
    e.preventDefault(); // 기본 이벤트를 막습니다.
    let expanded = $(this).attr("aria-expanded") === "true" || false;
    $(this).attr("aria-expanded", !expanded);
    if ($(this).hasClass('on')) {
      $(this).removeClass('on');
      $(this).siblings('.menu-depth2').slideUp('fast'); // .menu-depth2를 슬라이드 업합니다.
    } else {
      $(this).addClass('on');
      $(this).siblings('.menu-depth2').slideDown('fast'); // .menu-depth2를 슬라이드 다운합니다.
    }
  });


  //체크박스 스위치
  $('.chk-switch').change(function () {
    let id = $(this).attr('id');
    let chkConf = $(this).siblings('.chk-switch__conf');

    if ($(this).is(':checked')) {
      chkConf.show();
    } else {
      chkConf.hide();
    }
  });


  // 북마크 버튼 클릭 이벤트 
  $('.bookmark, .btn-bookmark').click(function () {
    $(this).toggleClass('on');
    if ($(this).hasClass('on')) {
      alert('관심사업에 등록되었습니다');
    } else {
      alert('관심사업에 등록이 취소되었습니다');
    }
  });


  $('.btn-ww').click(function () {
    $('.main-card').toggleClass('wideScreen');
    $(this).toggleClass('on');
  });

});


// 챗봇 사이즈 조절
function adjustChatbotWidth() {
  if ($(window).width() <= 1024) {
    $('.main-card').addClass('fullScreen');
  } else {
    $('.main-card').removeClass('fullScreen');
  }
}

// 페이지 로드 시 함수 실행
$(document).ready(adjustChatbotWidth);
// 윈도우 리사이즈 시 함수 실행
$(window).resize(adjustChatbotWidth);



// 셀렉트 박스 토글 기능
function toggleSelectBox() {
  $(document).on("click", "select", function () {
    $(this).toggleClass("on");
  });
}

// 위로 드롭다운 셀렉트 기능
function setupTopDropSelect() {
  $(document).on('click', '.select_topDrop .selected', function (event) {
    event.preventDefault();
    let $this = $(this);
    let $list = $this.next('ul.list');

    if ($this.hasClass('on')) {
      $this.removeClass('on').children('a').attr('aria-expanded', 'false');
      $list.slideUp();
    } else {
      $('.select_topDrop .selected').removeClass('on').children('a').attr('aria-expanded', 'false');
      $('.select_topDrop ul.list').slideUp();
      $this.addClass('on').children('a').attr('aria-expanded', 'true');
      $list.slideDown();
    }
  });

  // 드롭다운 외부 클릭 시 닫기
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.select_topDrop').length) {
      $('.select_topDrop > .selected.on').removeClass('on');
      $('.select_topDrop > .selected a').attr('aria-expanded', 'false');
      $('.select_topDrop ul.list').slideUp();
    }
  });
}

// 탭 기능 설정
function setupTabFunction(tabSelector, sheetSelector) {
  $(document).on('click', tabSelector + ' > li', function (e) {
    e.preventDefault();
    let $tabList = $(tabSelector);
    $tabList.find('> li').removeClass('on').children('a').removeAttr('title');
    $(this).addClass('on').children('a').attr('title', '선택됨');
    $(sheetSelector + ' > li').removeClass('show').eq($(this).index()).addClass('show');

    //메인 풀페이지 스크롤 이슈 해결
    if( $.fn.fullpage.reBuild ) {$.fn.fullpage.reBuild();}

    //포커스 유지
    $(this).children('a').focus();
  });
}

// 탭 기능 활성화
function activateTabs() {
  setupTabFunction("#fnTabList1", "#fnTabSheet1");
  setupTabFunction("#fnTabList2", "#fnTabSheet2");
  setupTabFunction("#fnTabList3", "#fnTabSheet3");
}

// 탭이 있는 경우 드롭다운 설정
// function setupTabDropdown() {
//   let tabDropdown = $('.search-tab01');
//   tabDropdown.addClass('tab-dropdown').on('click', 'li', function (e) {
//     $(this).parent().toggleClass('opened');
//     console.log('click');
//   });
// }


$(function () {
  $('.upload_text').val('미리보여줄 텍스트.');
  $('.input_file').change(function () {
    var i = $(this).val();
    $('.upload_text').val(i);
  });
});




// 각각의 기능 호출
toggleSelectBox();
setupTopDropSelect();
activateTabs();
//setupTabDropdown();  // 탭 모바일시 드롭다운  

//#header 가 70px 스크롤되었을떄 sticky 클래스 추가
$(window).scroll(function () {
  if ($(window).scrollTop() > 100) {
    $('#header').addClass('sticky');
    $("#contents").css('padding-top', '70px'); //헤더 높이만큼 패딩 추가
  } else {
    $('#header').removeClass('sticky');
    $("#contents").css('padding-top', '0');
  }
});

