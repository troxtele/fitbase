jQuery(document).ready(function ($) {
  $("#fitbase-code-form").on("submit", function (e) {
    e.preventDefault();
    var code = $("#fitbase-code-input").val();

    if (code !== "") {
      $.ajax({
        url: fitbaseCode.ajaxUrl,
        type: "POST",
        data: {
          action: "validate_fitbase_code",
          code: code,
        },
        success: function (response) {
          if (response.success) {
            var redirectUrl = response.data;
            window.location.href = redirectUrl;
            // when success
            $("#fitbase-code-input").val("");
            $(".cst-label").removeClass("-translate-y-[1.8rem] scale-[0.85]");
            $(".cross").removeClass("cst-visible");
          } else {
            $("#fitbase-code-result")
              .html("Der Code ist ungültig")
              .addClass("error");
            // added code ***********
            $("#fitbase-code-input").css({
              border: "1px solid #e50051",
            });
            $(".cst-label").addClass("cst-input-label");
          }
        },
        error: function () {
          $("#fitbase-code-result")
            .html("Error occurred. Please try again.")
            .addClass("error");
          // added code ***********
          $("#fitbase-code-input").addClass("cst-input-border");
          $(".cst-label").addClass("cst-input-label");
        },
      });
    } else {
      $("#fitbase-code-result")
        .html("Gib zuerst einen Code ein")
        .addClass("error");

      $("#fitbase-code-input").css({
        border: "1px solid #e50051",
      });
      $(".cst-label").addClass("cst-input-label");
    }
  });
  // clear input field
  $(".cross").on("click", () => {
    $(".cst-input").val("");
    $(".cst-label").removeClass("-translate-y-[1.8rem] scale-[0.85]");
    $(".cross").removeClass("cst-visible");

    $("#fitbase-code-result").removeClass("error");
    $("#fitbase-code-input").css({
      border: "1px solid #6B7986",
    });
    $(".cst-label").removeClass("cst-input-label");
  });
  // if the input has value
  $(".cst-input").on("input", () => {
    if ($(".cst-input").val() !== "") {
      $(".cst-label").addClass("-translate-y-[1.8rem] scale-[0.85]");
      $(".cross").addClass("cst-visible");
      $(".cst-label").removeClass("cst-input-label");
    } else {
      $(".cst-label").removeClass("-translate-y-[1.8rem] scale-[0.85]");
      $(".cross").removeClass("cst-visible");
    }
  });
  // input on focus
  $("#fitbase-code-input").focus(() => {
    $("#fitbase-code-input").css({ border: "1px solid #003BB3" });
    $(".cst-label").css({ color: "#003BB3" });
    $("#fitbase-code-result").removeClass("error");
    $(".cst-label").removeClass("cst-input-label");
  });
  // input on focus out
  $("#fitbase-code-input").focusout(() => {
    $("#fitbase-code-input").css({ border: "1px solid #6B7986" });
    $(".cst-label").css({ color: "#6B7986" });
  });
});
