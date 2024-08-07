function generateEmptyTable() {
  // Create a table element
  let table = $('<table class="emptygrid_table" id="emptygrid_table">');

  // Create table header (thead)
  let thead = $('<thead class="table_head">');
  let tr = $('<tr class="header_row">');

  // Index column header
  let th = $('<th class="index_header">').text("");
  tr.append(th);

  // Calculate the number of columns (200vw / 100px)
  let numColumns = Math.floor(($(window).width() * 4) / 100);

  // Create header cells for each column
  for (let i = 0; i < numColumns; i++) {
    // Create header cell with column index as text
    let th = $('<th class="column_header">').text(`Col ${i + 1}`);

    // Append the header cell to the table row
    tr.append(th);
  }

  // Append the table row to the thead
  thead.append(tr);

  // Append the thead to the table
  table.append(thead);

  // Create table body (tbody)
  let tbody = $('<tbody class="table_body" id="emptygrid_table_body">');

  // Calculate the number of rows (200vh / 25px)
  let numRows = Math.floor(($(window).height() * 4) / 25);

  // Create rows and cells for the table body
  for (let i = 0; i < numRows; i++) {
    let tr = $('<tr class="data-row">');

    // Index column cell
    let td = $('<td class="index-cell">').text(i + 1);
    tr.append(td);

    // Create empty cells for each column
    for (let j = 0; j < numColumns; j++) {
      // Create empty cell
      let td = $('<td class="data-cell">').text("");

      // Append the cell to the table row
      tr.append(td);
    }

    // Append the table row to the tbody
    tbody.append(tr);
  }

  // Append the tbody to the table
  table.append(tbody);

  // Return the generated table
  return table;
}

function generateSourceListTable(data) {
  // Create a table element
  let table = $('<table class="sourcelist_table" id="sourcelist_table">');

  // Create table header (thead)
  let thead = $('<thead class="table_head">');
  let tr = $('<tr class="header_row">');

  // index column
  let th = $('<th class="index_header">').text("");
  tr.append(th);

  // Iterate over the first array in data to create table headers
  data[0].forEach((columnName, index) => {
    if (index !== 0) {
      // Skip first value since it is index
      let th = $('<th class="column_header">').text(columnName); // Create header cell with column name
      tr.append(th); // Append the header cell to the table row
    }
  });

  thead.append(tr); // Append the table row to the thead
  table.append(thead); // Append the thead to the table

  // Create table body (tbody)
  let tbody = $('<tbody class="table_body" id = "sourcelist_table_body">');

  // Iterate over the remaining arrays in data to create table rows
  for (let i = 1; i < data.length; i++) {
    let tr = $('<tr class="data-row">');
    tr.attr("rowid", data[i][0]); // Add rowid attribute to data-row element
    tr.attr("sourcename", data[i][1]);

    // index column
    let td = $('<td class="index-cell">').text(i);
    tr.append(td);

    // Iterate over each value in the current array to create table cells
    for (let j = 1; j < data[i].length; j++) {
      let td = $('<td class="data-cell">').text(data[i][j]); // Create cell with corresponding value
      tr.append(td); // Append the cell to the table row
    }

    tbody.append(tr); // Append the table row to the tbody
  }

  table.append(tbody); // Append the tbody to the table

  return table; // Return the generated table
}

function generateTable(data) {
  // Create a table element
  let table = $('<table class="sourcedata_table" id="sourcedata_table">');

  // Create table header (thead)
  let thead = $('<thead class="table_head">');
  let tr = $('<tr class="header_row">');

  // index column
  let th = $('<th class="index_header">').text("");
  tr.append(th);

  // Iterate over the first array in data to create table headers
  data[0].forEach((columnName, index) => {
    if (index !== 0) {
      // Skip first value since it is index
      let th = $('<th class="column_header">').text(columnName); // Create header cell with column name
      tr.append(th); // Append the header cell to the table row
    }
  });

  thead.append(tr); // Append the table row to the thead
  table.append(thead); // Append the thead to the table

  // Create table body (tbody)
  let tbody = $('<tbody class="table_body" id="sourcedata_table_body">');

  // Iterate over the remaining arrays in data to create table rows
  for (let i = 1; i < data.length; i++) {
    let tr = $('<tr class="data-row">');
    tr.attr("rowid", data[i][0]); // Add rowid attribute to data-row element

    // index column
    let td = $('<td class="index-cell">').text(i);
    tr.append(td);

    // Iterate over each value in the current array to create table cells
    for (let j = 1; j < data[i].length; j++) {
      let td = $('<td class="data-cell">').text(data[i][j]); // Create cell with corresponding value
      tr.append(td); // Append the cell to the table row
    }

    tbody.append(tr); // Append the table row to the tbody
  }

  table.append(tbody); // Append the tbody to the table

  return table; // Return the generated table
}

function generateMetaDataTable(data) {
  // Create a table element
  let table = $('<table class="metadata_table" id="metadata_table">');

  // Create table header (thead)
  let thead = $('<thead class = "table_head">');
  let tr = $('<tr class ="header_row">');

  // index column
  let th = $('<th class="index_header">').text("");
  tr.append(th);

  // Iterate over the first array in data to create table headers
  data[0].forEach((columnName, index) => {
    if (index !== 0) {
      // Skip first value since it is index
      let th = $('<th class="column_header">').text(columnName); // Create header cell with column name
      tr.append(th); // Append the header cell to the table row
    }
  });

  thead.append(tr); // Append the table row to the thead
  table.append(thead); // Append the thead to the table

  // Create table body (tbody)
  let tbody = $('<tbody class="table_body" id = "metadata_table_body">');

  // Iterate over the remaining arrays in data to create table rows
  for (let i = 1; i < data.length; i++) {
    let tr = $('<tr class="data-row">');
    tr.attr("rowid", data[i][0]); // Add rowid attribute to data-row element
    tr.attr("variablename", data[i][1]); // Add rowid attribute to data-row element
    
    // index column
    let td = $('<td class="index-cell">').text(i);
    tr.append(td);

    // Iterate over each value in the current array to create table cells
    for (let j = 1; j < data[i].length; j++) {
      let celldata = data[i][j];
      let variablename = data[i][1];
      let columnname = data[0][j].toLowerCase();
      

      let td= $('<td class="data-cell">');

      // allow user input
      td
        .attr("variablename", variablename)
        .attr("columnname", columnname)
        .attr("data", celldata)

      if(columnname == "variable" || columnname == "variablelabel" || columnname == "decimal")
      {
        td  
          .attr("contenteditable", true)
          .attr("autocomplete", "off")
          .attr("spellcheck", false)
          .text(celldata); 
      }

      else if(columnname == "datatype")
      {

        var options = {
          "numeric": "Numeric",
          "string": "String",
          "date":"Date",
          "datetime":"Date Time"
          };

        td.text(celldata);
      }

      else{
        // no option of input
        td.text(celldata);
      }
      tr.append(td); // Append the cell to the table row
    }

    tbody.append(tr); // Append the table row to the tbody
  }

  table.append(tbody); // Append the tbody to the table

  return table; // Return the generated table
}

function generateFiltersTable(data) {
  // Create a table element
  let table = $('<table class="filters_table" id="filters_table">');

  // Create table header (thead)
  let thead = $('<thead class="table_head">');
  let tr = $('<tr class="header_row">');

  // index column
  let th = $('<th class="index_header">').text("");
  tr.append(th);

  // Iterate over the first array in data to create table headers
  data[0].forEach((columnName, index) => {
    if (index !== 0) {
      // Skip first value since it is index
      let th = $('<th class="column_header">').text(columnName); // Create header cell with column name
      tr.append(th); // Append the header cell to the table row
    }
  });

  thead.append(tr); // Append the table row to the thead
  table.append(thead); // Append the thead to the table

  // Create table body (tbody)
  let tbody = $('<tbody class="table_body" id = "filters_table_body">');

  // Iterate over the remaining arrays in data to create table rows
  for (let i = 1; i < data.length; i++) {
    let tr = $('<tr class="data-row">');
    tr.attr("rowid", data[i][0]); // Add rowid attribute to data-row element

    // index column
    let td = $('<td class="index-cell">').text(i);
    tr.append(td);

    // Iterate over each value in the current array to create table cells
    for (let j = 1; j < data[i].length; j++) {
      let td = $('<td class="data-cell">').text(data[i][j]); // Create cell with corresponding value
      tr.append(td); // Append the cell to the table row
    }

    tbody.append(tr); // Append the table row to the tbody
  }

  table.append(tbody); // Append the tbody to the table

  return table; // Return the generated table
}
