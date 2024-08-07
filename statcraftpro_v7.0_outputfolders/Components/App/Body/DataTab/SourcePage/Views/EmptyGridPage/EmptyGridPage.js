// Maintains the tablehead movement in sync with the table body on horizontal scroll
$(document).on("emptygridtableappended", function () {
  $("#emptygrid_table_body")
    .off("scroll")
    .on("scroll", function () {
      $("#emptygrid #emptygrid_table>thead").css("left", -$("#emptygrid #emptygrid_table_body").scrollLeft()); //fix the thead relative to the body scrolling
      $("#emptygrid  #emptygrid_table>thead .index_header:nth-child(1)").css("left", $("#emptygrid #emptygrid_table_body").scrollLeft()); //fix the first cell of the header
    });
});

// Data Grid genereation
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

function loadEmptyGrid() {
  let tablename = $("#datatab-sourceselection-searchbar").val();
  if (tablename === "select source" || tablename === "" || tablename === null) {
    let table = generateEmptyTable();
    $("#emptygrid").html(table);
    $(document).trigger("emptygridtableappended");
    setColumnWidths("emptygrid_table");
  }
}
