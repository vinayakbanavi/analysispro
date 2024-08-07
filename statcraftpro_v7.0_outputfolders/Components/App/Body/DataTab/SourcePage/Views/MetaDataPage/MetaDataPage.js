// Maintains the tablehead movement in sync with the table body on horizontal scroll
$(document).on("metadatatableappended", function () {
  $("#metadata_table_body")
    .off("scroll")
    .on("scroll", function () {
      $("#metadata #metadata_table>thead").css("left", -$("#metadata #metadata_table_body").scrollLeft()); // Fix the thead relative to the body scrolling
      $("#metadata #metadata_table>thead .index_header:nth-child(1)").css("left", $("#metadata #metadata_table_body").scrollLeft()); // Fix the first cell of the header
    });

  // Handle right-click on elements
  $("#metadata_table .data-row").off("contextmenu").on("contextmenu", function (event) {
    event.preventDefault();

    const noofrowsselected = $("#metadata_table .data-row.selected").length

    // If only one row is selected or if more than one row is selected and the current element was not already clicked
    if (noofrowsselected == 1 || (noofrowsselected > 1 && !$(this).hasClass('selected'))) {
      // Remove the 'selected' class from all rows
      $("#metadata_table .data-row").removeClass('selected');
    }

    $(this).addClass("selected");
    
    // Collect the rowid of all selected rows into an array
    let selectedRowIds = $("#metadata_table .data-row.selected").map(function() {
      return $(this).attr("rowid");
    }).get();
    
    showMetaDataPageContextMenu(event);
    // Store the reference to the clicked element
    $("#metadataPageContextMenu").attr("activecontext", selectedRowIds.join(","));
  });

  metaDataRowsEvents();
});

// generate the table and append it to metadata_container

// Call the function to set the column widths
function setColumnWidths(tableid) {
  // Get the table
  const table = document.getElementById(tableid);

  // Get all header cells
  const headers = table.querySelectorAll(".column_header");

  // Get data cells in the first row
  const firstRowCells = table.querySelectorAll("tbody tr:first-child .data-cell");

  // Iterate over both headers and firstRowCells at the same time
  firstRowCells.forEach((cell, index) => {
    const header = headers[index];
    const cellWidth = cell.offsetWidth;

    if (cellWidth !== header.offsetWidth) {
      header.style.minWidth = cellWidth + "px";
    }
  });
}

// Function to load metadata and set column widths
function loadMetaData() {
  let tablename = $("#datatab-sourceselection-searchbar").val();
  let meta_data = getMetaData(tablename);
  if (tablename === "select source" || tablename === "" || tablename === null || !meta_data) {
    return false;
  } else {
    let metadatatable = generateMetaDataTable(meta_data);
    $("#metadata").html("");
    $("#metadata").append(metadatatable);
    $(document).trigger("metadatatableappended");
    setColumnWidths("metadata_table");
  }
}

function getMetaData(tablename) {
  return metadata[tablename];
}

function metaDataRowsEvents() {
  var selectedRows = [];

  // Handle row click for selection
  $("#metadata_table")
    .off("click", ".data-row")
    .on("click", ".data-row", function (event) {
      // Prevent text selection
      event.preventDefault();

      var rowId = $(this).attr("rowid");

      if (event.shiftKey) {

        // blur all the inputs inside rows
        $('#metadata_table .data-cell').blur()

        // Multiple row selection with Shift key
        $(this).toggleClass("selected");
        if ($(this).hasClass("selected")) {
          selectedRows.push(rowId);
        } else {
          selectedRows = selectedRows.filter((id) => id !== rowId);
        }

      } else {
        // Single row selection 
        if (!$(this).hasClass("selected")) {


          // Deselect all other rows
          $(".data-row.selected").removeClass("selected");
          selectedRows = [];

          // Select the clicked row
          $(this).addClass("selected");
          selectedRows.push(rowId);
        } 
        
        else {

          if ($(this).find('.data-cell:focus').length > 0) {
            // A child element with the class 'data-cell' is focused
            return;

          } else {
              // No child element with the class 'data-cell' is focused
  
              // Already selected, deselect it
              $(this).removeClass("selected");
              selectedRows = selectedRows.filter((id) => id !== rowId);
          }
        }
      }

      console.log("Selected Rows:", selectedRows);
    });

  // Handle keydown events for the metadata table
  $(document).on("keydown", function (event) {
    if (event.key === "Escape") {
      $(".data-row.selected").removeClass("selected");
      selectedRows = [];
      console.log("Deselected all rows");
    }
  });

  // Handle click event for .data-cell
  $("#metadata_table")
    .off("click", ".data-cell")
    .on("click", ".data-cell", function (event) {
      // Allow event propagation to the row

      if($('#metadata_table .data-row.selected').length > 1)
      {
        $(this).blur();
      }
    });

  // Handle click event for .data-cell
  $("#metadata_table")
    .off("keyup", ".data-cell")
    .on("keyup", ".data-cell", function (event) {
      setColumnWidths("metadata_table");
    });

  // Add the no-select class to the table
  $("#metadata_table").addClass("no-select");

  // Hide context menu on click outside
  $(document).on("click", function (event) {
    if (!$(event.target).closest("#metadata_table .data-row").length && !$(event.target).closest("#metadataPageContextMenu").length ) {
      $("#metadata_table .data-row").removeClass('selected');
    }
  });
}
