// Maintains the tablehead movement in sync with the table body on horizontal scroll
$(document).on("filterstableappended", function () {
  $("#filters_table_body")
    .off("scroll")
    .on("scroll", function () {
      $("#filters #filters_table>thead").css("left", -$("#filters #filters_table_body").scrollLeft()); // Fix the thead relative to the body scrolling
      $("#filters #filters_table>thead .index_header:nth-child(1)").css("left", $("#filters #filters_table_body").scrollLeft()); // Fix the first cell of the header
    });
});

// generate the table and append it to filters_container

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

// Function to load filters and set column widths
function loadFilters() {
  let tablename = $("#datatab-sourceselection-searchbar").val();
  let filtersdata = getFilters(tablename);
  if (tablename === "select source" || tablename === "" || tablename === null || !filtersdata) {
    return false;
  } else {
    let filterstable = generateFiltersTable(filtersdata);
    $("#filters").html("");
    $("#filters").append(filterstable);
    $(document).trigger("filterstableappended");
    setColumnWidths("filters_table");
  }
}

function getFilters(tablename) {
  return filtersdata[tablename];
}
