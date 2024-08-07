// Maintains the tablehead movement in sync with the table body on horizontal scroll
$(document).on("sourcedatatableappended", function () {
  $("#sourcedata_table_body")
    .off("scroll")
    .on("scroll", function () {
      $("#datagrid #sourcedata_table>thead").css("left", -$("#datagrid #sourcedata_table_body").scrollLeft()); //fix the thead relative to the body scrolling
      $("#datagrid  #sourcedata_table>thead .index_header:nth-child(1)").css("left", $("#datagrid #sourcedata_table_body").scrollLeft()); //fix the first cell of the header
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

function loadSourceData() {
  let tablename = $("#datatab-sourceselection-searchbar").val();
  let table_data = getTableData(tablename);
  if (tablename === "select source" || tablename === "" || tablename === null || !table_data) {
    return false;
  } else {
    let table = generateTable(table_data);
    $("#datagrid").html(table);
    $(document).trigger("sourcedatatableappended");
    setColumnWidths("sourcedata_table");
  }
}

function getTableData(tablename) {
  return tabledata[tablename];
}
