$(document).ready(function () {
  // 탭이 변경될 때 실행되는 이벤트
  $(document).on('shown.bs.tab', 'button[data-bs-toggle="pill"]', function (e) {
    // 모든 li 요소에서 on 클래스를 제거
    $('li.nav-item').removeClass('on');
    
    // 활성화된 탭의 부모 li 요소에 on 클래스를 추가
    $(e.target).closest('li.nav-item').addClass('on');
  });

  // 모바일시 탭 드롭다운
  $(document).on('click', '.tab-dropdown li', function (e) {
    $(this).parent().toggleClass('opened');
  });

  // 브라우저 크기 변경 시 드롭다운 초기화
  $(window).resize(function () {
    if ($(window).width() > 1024) {
      $('.tab-dropdown').removeClass('opened');
    }
  });

  // 1024px 이하일 때 메뉴 토글 버튼 클릭시 #offcanvasRight에 .offcanvas 추가
  // 모바일시 로드시 창 안나오는 문제 수정
  $(document).on('click', '.gnbMenuToggle', function () {
    $('#offcanvasRight').addClass('offcanvas');
  });

  // 줌 125%일때 body에 클래스 추가
  function getZoomLevel() {
    // window.devicePixelRatio로 줌 비율 확인
    const zoomLevel = Math.round(window.devicePixelRatio * 100);
    return zoomLevel;
  }

  function applyZoomCSS() {
    const zoomLevel = getZoomLevel();

    if (zoomLevel === 125) {
      document.body.classList.add('zoom-125');
    } else {
      document.body.classList.remove('zoom-125');
    }
  }

  window.addEventListener('load', applyZoomCSS);
  window.addEventListener('resize', applyZoomCSS);

  // onlyNumber 클래스 추가시 숫자만 입력 하게 하는 함수
  $(document).on('input', '.onlyNumber', function () {
    if (!$(this).val().match(/^[0-9]*$/)) {
      alert('숫자만 입력해주세요.');
      $(this).val($(this).val().replace(/[^0-9]/g, ''));
    }
  });

  // main-tab on 오버스크롤 가운데 고정 (모바일만 적용)
  const mainTab = $('.main-tab');
  const ulOn = $('.board-menu__ul li.on');
  if (ulOn.length) {
    mainTab.scrollLeft(ulOn.offset().left - (mainTab.width() / 2) + (ulOn.width() / 2));
  }

  // .dropdown 클릭 이벤트
  $(document).on('click', '#lnb .dropdown', function (e) {
    e.preventDefault(); // 기본 이벤트를 막습니다.
    let expanded = $(this).attr('aria-expanded') === 'true' || false;
    $(this).attr('aria-expanded', !expanded);
    if ($(this).hasClass('on')) {
      $(this).removeClass('on');
      $(this).siblings('.menu-depth2').slideUp('fast'); // .menu-depth2를 슬라이드 업합니다.
    } else {
      $(this).addClass('on');
      $(this).siblings('.menu-depth2').slideDown('fast'); // .menu-depth2를 슬라이드 다운합니다.
    }
  });

  // 체크박스 스위치
  $(document).on('change', '.chk-switch', function () {
    let chkConf = $(this).siblings('.chk-switch__conf');
    if ($(this).is(':checked')) {
      chkConf.show();
    } else {
      chkConf.hide();
    }
  });

  // 셀렉트 박스 토글 기능
  $(document).on('click', 'select', function () {
    $(this).toggleClass('on');
  });

  // 위로 드롭다운 셀렉트 기능
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

  // 탭 기능 설정
  function setupTabFunction(tabSelector, sheetSelector) {
    $(document).on('click', tabSelector + ' > li', function (e) {
      e.preventDefault();
      let $tabList = $(tabSelector);
      $tabList.find('> li').removeClass('on').children('a').removeAttr('title');
      $(this).addClass('on').children('a').attr('title', '선택됨');
      $(sheetSelector + ' > li').removeClass('show').eq($(this).index()).addClass('show');

      // 포커스 유지
      $(this).children('a').focus();
    });
  }

  // 탭 기능 활성화
  function activateTabs() {
    setupTabFunction("#fnTabList1", "#fnTabSheet1");
    setupTabFunction("#fnTabList2", "#fnTabSheet2");
    setupTabFunction("#fnTabList3", "#fnTabSheet3");
  }

  // 각각의 기능 호출
  activateTabs();
  setupTopDropSelect();
});