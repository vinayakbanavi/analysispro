function getObjectFromTable(tableId) {
    // Get the table element
    let table = document.getElementById(tableId);

    // Initialize an object to store column data
    let columnData = {};

    // Get all rows in the table body
    let rows = table.querySelectorAll('tbody tr');

    // Get all header cells in the table
    let headerCells = table.querySelectorAll('thead th');

    // Extract column names from header cells
    let columns = Array.from(headerCells).map(cell => cell.textContent.trim());

    // Iterate over each column
    columns.forEach(column => {
        // Initialize an empty array for each column
        columnData[column] = [];

        // Iterate over each row
        rows.forEach(row => {
            // Get the cell corresponding to the current column
            let cell = row.querySelector(`td:nth-child(${columns.indexOf(column) + 1})`);

            // Add the cell's text content to the array for the current column
            columnData[column].push(cell.textContent.trim());
        });
    });

    // Return the generated object
    return columnData;
}





// to querymetainfo
// Find the tbody element
// const tbody = document.getElementById('metadata_table_body');

// // Find the specific data cell where variablename="marital" and columnname="datatype"
// const cell = tbody.querySelector('.data-cell[variablename="marital"][columnname="datatype"]');

// // Extract the value of the data attribute from the cell
// const dataType = cell.getAttribute('data');

// // Now, dataType contains the value of the data attribute where variablename is "marital"
// console.log(dataType);