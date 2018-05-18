$(document).ready(function() {
  //Mobile
  mobile = checkmobile();
  function checkmobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return true;
    }
    return false;
  }
  //Hider
  $(".fa-sync").hide();
  $(".fa-arrow-left").hide();
  //Moblier
  if (mobile) {
    $(".fa-arrow-right").click(function() {
      $(".fa-arrow-right").animate({
        opacity: 0
      }, 200, function() {
        $(".fa-arrow-left").css("left", "0vw")
        $(".fa-arrow-left").show();
        $(".fa-arrow-right").hide();
        $(".fa-arrow-left").animate({
          opacity: 1,
        }, 200, function() {
          $(".fa-arrow-left").animate({left: "90vw"});
          $(".settings").animate({left: "0vw"});
          $(".fa-arrow-right").animate({left: "0vw"});
        });
      });
    });

    $(".fa-arrow-left").click(function() {
      $(".fa-arrow-left").animate({
        opacity: 0
      }, 200, function() {
        $(".fa-arrow-right").css("left", "20vw")
        $(".fa-arrow-left").hide();
        $(".fa-arrow-right").show();
        $(".fa-arrow-right").animate({
          opacity: 1
        }, 200, function() {
          $(".fa-arrow-right").animate({left: "0vw"});
          $(".settings").animate({left: "-100vw"});
        });
      });
    });
  } else {
    //Menue Out
    $(".fa-arrow-right").click(function() {
      $(".fa-arrow-right").animate({
        opacity: 0
      }, 200, function() {
        $(".fa-arrow-left").css("left", "0vw")
        $(".fa-arrow-left").show();
        $(".fa-arrow-right").hide();
        $(".fa-arrow-left").animate({
          opacity: 1
        }, 200, function() {
          $(".fa-arrow-left").animate({left: "22vw"});
          $(".settings").animate({left: "0vw"});
          $(".fa-arrow-right").animate({left: "0vw"});
        });
      });
    });

    //Menue In
    $(".fa-arrow-left").click(function() {
      $(".fa-arrow-left").animate({
        opacity: 0
      }, 200, function() {
        $(".fa-arrow-right").css("left", "20vw")
        $(".fa-arrow-left").hide();
        $(".fa-arrow-right").show();
        $(".fa-arrow-right").animate({
          opacity: 1
        }, 200, function() {
          $(".fa-arrow-right").animate({left: "0vw"});
          $(".settings").animate({left: "-22vw"});
        });
      });
    });
  }
  //change Text
  $('#textarea').keyup(function() {
    $('#inhalt').html($(this).val());
  });
  //change Vers
  $('#versInp').keyup(function() {
    $('.vers').html($(this).val());
  });
  //Input File Image
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        console.log(e.target.result)
        if (e.target.result.indexOf("image") !== -1) {
          $('html, body').css('background', "url(" + e.target.result + ") no-repeat center center fixed");
        } else {
          showerror();
        }

      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $('#uploadbtn').click(function() {
    $('#imgInp').click();
  });

  $("#imgInp").change(function() {
    readURL(this);
  });
  //Input URL Image
  $("#imgTex").change(function() {
    if (this.value.match(/\.(jpeg|jpg|gif|png)$/) != null) {
    $('html, body').css('background', "url(" + this.value + ") no-repeat center center fixed");
  }else {
    showerror();
  }
  });
  //Input Paste Image
  var CLIPBOARD = new CLIPBOARD_CLASS("imgpaste", true);

  function CLIPBOARD_CLASS(canvas_id, autoresize) {
    var _self = this;

    document.addEventListener('paste', function(e) {
      if($("#imgpaste").is(":focus")){
        $(".fa-sync").show();
        _self.paste_auto(e);
      }
    }, false);

    this.paste_auto = function(e) {
      if (e.clipboardData) {
        var items = e.clipboardData.items;
        if (!items)
          return;
        var count = 0;
        for (var i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            var blob = items[i].getAsFile();
            var URLObj = window.URL || window.webkitURL;
            var source = URLObj.createObjectURL(blob);
            $('html, body').css('background', "url(" + source + ") no-repeat center center fixed");
            $(".fa-sync").hide();
            count++;
          }
        }
        if(count == 0){
          $(".fa-sync").hide();
          showerror();
        }
        e.preventDefault();
      }
    };
  }
  //shows an error
  function showerror() {
    $("#pasteerror").animate({
      opacity: 1
    }, 1000);
    setTimeout(function() {
      $("#pasteerror").animate({
        opacity: 0
      }, 1000);
    }, 3000);
  }
});
