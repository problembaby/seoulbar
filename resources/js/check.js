    $(document).on('click', 'input:checkbox, input:radio', function (e) {
      let $inp = $(this); // Local variable
      if ($inp.next().is("label")) {
        let name = $inp.attr("name");
        if ($inp.attr("type") === "radio") {
          $("input:radio[name='" + name + "']").each(function () {
            $(this).next().removeClass('on');
          });
        }
        if (name) {
          $("input[name='" + name + "']").each(function () {
            if ($(this).is(":checked")) {
              $(this).next().addClass('on');
            } else {
              $(this).next().removeClass('on');
            }
          });
        } else {
          if ($inp.is(":checked")) {
            $inp.next().addClass('on');
          } else {
            $inp.next().removeClass('on');
          }
        }
      }
    });
  
    $(document).on('change', 'input:radio', function (e) {
      let $this = $(this);
      if ($this.prop('checked')) {
        let $thisId = $this.attr('id');
        let $thisGroup = $this.attr('name');
        $("input[name='" + $thisGroup + "']").siblings('label').removeClass('on');
        $this.siblings('label').each(function () {
          if ($(this).attr('for') === $thisId) {
            $(this).addClass('on');
          }
        });
      } else {
        $this.next('label').removeClass('on');
      }
    }).change();
  
    if ($('input[type=checkbox], input[type=radio]').length) {
      $('input[type=checkbox], input[type=radio]').each(function () {
        if ($(this).prop('checked')) {
          let selObjName = $(this).attr('id');
          $('label').each(function () {
            if ($(this).attr('for') === selObjName) {
              $(this).addClass('on');
            }
          });
        }
      });
    }
  