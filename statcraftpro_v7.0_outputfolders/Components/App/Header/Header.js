$(document).ready(function () {
  $("#menuIcon").click(function () {

    let activetab = $(this).attr("activetab");

    if (activetab == "home-tab") {
      menuicon.removeClass("change");
      return;
    }
    let menuicon = $("#menuIcon");
    let tabmenu = $(`#${activetab}-menu`);

    let isMenuBarHidden = tabmenu.attr('ishidden');

    if(isMenuBarHidden == "true")
    {
      tabmenu.attr('ishidden', "false");
      menuicon.addClass("change");
      tabmenu.show().animate({ width: "200px" }, 400);
    }
    else{
      tabmenu.attr('ishidden', "true");
      menuicon.removeClass("change");
      tabmenu.animate({ width: "0" }, 400, function () {
        $(this).hide(); // Hide menu after animation
      });
    }
  });

  function showMenuBar(activetab) {
    let tabmenu = $(`#${activetab}-menu`);

    $("#menuIcon").attr("activetab", activetab);

    if (activetab == "home-tab") {
      $("#menuIcon").removeClass("change");
      return;
    }

    $("#menuIcon").addClass("change");
    $(tabmenu).css({ width: "200px" }).show();
  }


  function toggleMenuIcon(activetab)
  {
    let tabmenu = $(`#${activetab}-menu`);
    let menuicon = $("#menuIcon");
    menuicon.attr("activetab", activetab);

    if (activetab == "home-tab") {
      $("#menuIcon").removeClass("change");
      return;
    }

    let isMenuBarHidden = tabmenu.attr('ishidden');

    if(isMenuBarHidden == "true")
    {
      menuicon.removeClass("change");
    }
    else{
      menuicon.addClass("change");
    }

  }

  // Menu Bar Buttons { Tab Switching }
  $(".menubar-button").click(function () {

    var tabToShow = $(this).attr("show");

    // Hide all tabs
    $(".tab-container").hide();

    // Show the selected tab
    $("#" + tabToShow).show();

    // showMenuBar(tabToShow);
    toggleMenuIcon(tabToShow);

    // Remove active class from all buttons
    $(".menubar-button").removeClass("active");

    // Add active class to the clicked button
    $(this).addClass("active");
  });
});
