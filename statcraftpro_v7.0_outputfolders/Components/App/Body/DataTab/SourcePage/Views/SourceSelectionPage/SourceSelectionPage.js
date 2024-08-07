// Maintains the tablehead movement in sync with the table body on horizontal scroll
$(document).on("sourcelisttableappended", function () {
  $("#sourcelist_table_body")
    .off("scroll")
    .on("scroll", function () {
      $("#sourcelist #sourcelist_table>thead").css("left", -$("#sourcelist #sourcelist_table_body").scrollLeft()); // Fix the thead relative to the body scrolling
      $("#sourcelist #sourcelist_table>thead .index_header:nth-child(1)").css("left", $("#sourcelist #sourcelist_table_body").scrollLeft()); // Fix the first cell of the header
    });

  $("#sourcelist_table").off("click").on("click", ".data-row", function () {
    const sourcename = $(this).attr("sourcename");
    // Handle the click event, for example:
    // alert(`You clicked on ${sourcename}`);

    $("#datatab-sourceselection-searchbar").val(sourcename);
    $("#datatab-sourceselection-searchbar").attr("activesource", sourcename);

    $("#analysistab-sourceselection-searchbar").val(sourcename);
    $("#analysistab-sourceselection-searchbar").attr("activesource", sourcename);

    $("#view_controls").show();
    $("#datatab-sourcelist-container").toggle();
    $(document).trigger("newsourceselected");

    // Or you can perform other actions like highlighting the row
    $("#sourcelist_table .data-row").css("backgroundColor", "");
    $(this).css("backgroundColor", "#628c8c");
  });

  // Handle right-click on elements
  $("#sourcelist_table .data-row").off("contextmenu").on("contextmenu", function (event) {
    event.preventDefault();
    $("#sourcelist_table .data-row").css("backgroundColor", "");
    $(this).css("backgroundColor", "#628c8c");
    showSourcePageContextMenu(event);
    // Store the reference to the clicked element
    $("#sourcePageContextMenu").attr("activecontext", $(this).attr("sourcename"));
  });
});

// generate the table and append it to sourcelist_container

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

// Function to load sourcelist and set column widths
function loadsourcelist() {
  let tablename = $("#datatab-sourceselection-searchbar").val();
  let sourcelist_data = getsourcelist();
  if (tablename !== "select source" || tablename === "" || tablename === null || !sourcelist_data) {
    return false;
  } else {
    let sourcelisttable = generateSourceListTable(sourcelist_data);
    $("#sourcelist").html("");
    $("#sourcelist").append(sourcelisttable);
    $(document).trigger("sourcelisttableappended");
    setColumnWidths("sourcelist_table");
  }
}

function getsourcelist() {
  return sourcelistdata;
}
