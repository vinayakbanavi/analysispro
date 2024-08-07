$(document).ready(function () {

  // Menu Bar Buttons { Page Switching }
  $(".data-tab-menu-option").click(function () {
    var pageToShow = $(this).attr("show");

    // Hide all pages
    $(".data-tab-page").hide();

    // Show the selected tab
    $("#" + pageToShow).show();

    // Remove active class from all buttons
    $(".data-tab-menu-option").removeClass("active");

    // Add active class to the clicked button
    $(this).addClass("active");
  });
});
