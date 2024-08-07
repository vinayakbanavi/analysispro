$(document).ready(function () {

  // Menu Bar Buttons { Page Switching }
  $(".analyses-tab-menu-option").click(function () {
    var pageToShow = $(this).attr("show");

    // Hide all pages
    $(".analyses-tab-page").hide();

    // Show the selected tab
    $("#" + pageToShow).show();

    // Remove active class from all buttons
    $(".analyses-tab-menu-option").removeClass("active");

    // Add active class to the clicked button
    $(this).addClass("active");
  });
});
