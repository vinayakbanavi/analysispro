var metadataPageContextMenu;

$(document).ready(function () {
//Meta Data Page
  metadataPageContextMenu = $("#metadataPageContextMenu");
  $(document).on("click", hideMetaDataPageContextMenu);
  $(window).on("resize", hideMetaDataPageContextMenu);
  $(document).on("scroll", hideMetaDataPageContextMenu);

  // Hide context menu on click outside
  $(document).on("click", function (event) {
    if (!$(event.target).closest("#metadataPageContextMenu").length) {
      hideMetaDataPageContextMenu();
      // $("#metadata_table .data-row").removeClass('selected');
      metadataPageContextMenu.attr("activecontext", "");
    }
  });

  // Handle clicks on menu options
  $("#metadataPageContextMenu > .menu-option").on("click", function () {
    alert("clicked: " + $(this).attr("id"));
    hideMetaDataPageContextMenu();
  });

});

// Meta Data page context menu
function showMetaDataPageContextMenu(event) {
  event.preventDefault();

  const windowWidth = $(window).width();
  const windowHeight = $(window).height();
  const menuWidth = metadataPageContextMenu.outerWidth();
  const menuHeight = metadataPageContextMenu.outerHeight();

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

  metadataPageContextMenu.css({
    display: "flex",
    top: top + "px",
    left: left + "px",
  });
}

function hideMetaDataPageContextMenu() {
  metadataPageContextMenu.hide();
}


function toggleContextMenuOption(optionname)
{
    const singleRowSelected = false;
    
}