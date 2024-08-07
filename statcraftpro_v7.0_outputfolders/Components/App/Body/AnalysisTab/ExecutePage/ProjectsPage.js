$(document).ready(function () {
  // Controllbar Functionalities And Events

  $("#analysistab-sourceselection-searchbar").on("keyup", function () {
    $("#analysistab-sourcelist-container").show();
    let searchtext = $(this).val().toLowerCase();

    let matchingsourcenamelist = sourcenamelist.filter(function (sourcename) {
      return sourcename.toLowerCase().includes(searchtext);
    });

    setTimeout(function () {
      generateSourceNameList(matchingsourcenamelist);
    }, 100);
  });

  $("#analysistab-sourceselection-searchbar")
    .off("click")
    .on("click", function () {
      if ($(this).val() === "select source") {
        $(this).val("");
        $(this).attr("activesource", "select source");
      }
    })
    .on("blur", function () {
      if ($(this).val() === "") {
        $(this).val("select source");
        $(this).attr("activesource", "select source");
      } else if ($(this).val() !== $(this).attr("activesource")) {
        $(this).val($(this).attr("activesource"));
      }
    });

  $("#analysistab-sourcelist-dropdown").click(function () {
    generateSourceNameList(sourcenamelist);
    $("#analysistab-sourcelist-container").toggle();
  });

  // Hide the selection list if clicked outside
  $(document).click(function (event) {
    if (!$(event.target).closest("#analysistab-sourcelist-dropdown, #analysistab-sourcelist-container").length) {
      $("#analysistab-sourcelist-container").hide();
    }
  });

});
