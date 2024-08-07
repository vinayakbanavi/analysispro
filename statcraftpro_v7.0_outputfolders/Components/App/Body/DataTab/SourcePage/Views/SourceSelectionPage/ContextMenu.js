var sourcePageContextMenu;

$(document).ready(function () {


//Source Page
  sourcePageContextMenu = $("#sourcePageContextMenu");
  $(document).on("click", hideSourcePageContextMenu);
  $(window).on("resize", hideSourcePageContextMenu);
  $(document).on("scroll", hideSourcePageContextMenu);

  // Hide context menu on click outside
  $(document).on("click", function (event) {
    if (!$(event.target).closest("#sourcePageContextMenu").length) {
      hideSourcePageContextMenu();
      sourcePageContextMenu.attr("activecontext", "");
      // $('.clicked-element').removeClass('clicked-element');
      $("#sourcelist_table .data-row").css("backgroundColor", "");
    }
  });

  // Handle clicks on menu options
  $("#sourcePageContextMenu>.menu-option").on("click", function () {
    alert("clicked: " + $(this).attr("id"));
    hideSourcePageContextMenu();
  });
});

// Source Page Context Menu
function showSourcePageContextMenu(event) {
  event.preventDefault();

  const windowWidth = $(window).width();
  const windowHeight = $(window).height();
  const menuWidth = sourcePageContextMenu.outerWidth();
  const menuHeight = sourcePageContextMenu.outerHeight();

  let top = event.pageY;
  let left = event.pageX;

  // Adjust if going out of right boundary
  if (left + menuWidth > windowWidth) {
    left = windowWidth - menuWidth;
  }

  // Adjust if going out of bottom boundary
  if (top + menuHeight > windowHeight) {
    top = windowHeight - menuHeight;
  }

  sourcePageContextMenu.css({
    display: "flex",
    top: top + "px",
    left: left + "px",
  });
}

function hideSourcePageContextMenu() {
  sourcePageContextMenu.hide();
}