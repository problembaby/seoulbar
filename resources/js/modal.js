
	if (typeof jQuery === "undefined") throw new Error("Modal requires jQuery.");
	$(document).ready(function(){
			$(document).on('click','.modal-btn',function(){
					var op = $(this);
					var lp = $("#" + $(this).attr("aria-controls"));
					var lpObj = lp.children(".modal_pop_inner");
					var lpObjClose = lp.find(".modal_pop_close");
					var lpObjTabbable = lpObj.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
					var lpObjTabbableFirst = lpObjTabbable && lpObjTabbable.first();
					var lpObjTabbableLast = lpObjTabbable && lpObjTabbable.last();
					var lpOuterObjHidden = $(".skip-links, .masthead, .initial-content, .search-content, .page__footer");
					var all = $(".masthead, .page__footer").add(lp);
					var tabDisable;
					var nowScrollPos = $(window).scrollTop();

					$("body").css("top", - nowScrollPos).addClass("scroll-off").on("scroll touchmove mousewheel", function(event){
							event.preventDefault();
					});

					function lpClose() {
							$("body").removeClass("scroll-off").css("top", "").off("scroll touchmove mousewheel");
							$(window).scrollTop(nowScrollPos);
							if (tabDisable === true) lpObj.attr("tabindex", "-1");
							all.removeClass("on");
							$('html').removeClass('noScroll')	// 메인 스크롤 삭제 추가
							lpOuterObjHidden.removeAttr("aria-hidden");
							op.focus();
							$(document).off("keydown.lp_keydown");
					}

					$(this).blur();
					all.addClass("on");
					lpOuterObjHidden.attr("aria-hidden", "true");
					lpObjTabbable.length ? lpObjTabbableFirst.focus().on("keydown", function(event) {
							if (event.shiftKey && (event.keyCode || event.which) === 9) {
									event.preventDefault();
									lpObjTabbableLast.focus();
							}
					}) : lpObj.attr("tabindex", "0").focus().on("keydown", function(event){
							tabDisable = true;
							if ((event.keyCode || event.which) === 9) event.preventDefault();
					});

					lpObjTabbableLast.on("keydown", function(event) {
							if (!event.shiftKey && (event.keyCode || event.which) === 9) {
									event.preventDefault();
									lpObjTabbableFirst.focus();
							}
					});

					lpObjClose.on("click", lpClose);

					lp.on("click", function(event){
							if (event.target === event.currentTarget) {
									lpClose();
							}
					});

					$(document).on("keydown.lp_keydown", function(event) {
							var keyType = event.keyCode || event.which;

							if (keyType === 27 && lp.hasClass("on")) {
								lpClose();
							}
					});
			});
	});
