var table = document.getElementById('table');

// Make every row clickable. Send information from selected row to form
for(var i = 1; i < table.rows.length; i++)
{
    table.rows[i].onclick = function()
    {
            document.getElementById("c_id").value = this.cells[0].innerHTML;
            document.getElementById("c_name").value = this.cells[1].innerHTML;
    };
}


//Clear input fields when clear button is clicked
document.getElementById('clear_btn').onclick = function() {
    document.getElementById('c_name').value = '';
    document.getElementById('c_id').value = '';
}

//Not working
//Clear search when button is clicked
document.getElementById('clear_search_btn').onclick = function() {
    document.getElementById('search_input').value = '';
    searchFunction();
}

//Search function
function searchFunction() {
    var input, filter, table, tr, td, i, txtValue; // Declare variables
    input = document.getElementById("search_input");
    filter = input.value.toUpperCase();
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = ""; // If we get a match display row
            } else {
                tr[i].style.display = "none"; // If we don't get a match hide row
            }
        }
    }
}

// If the "add" switch changes
function add_checked() {
    if (document.getElementById('edit_switch').checked) {
        document.getElementById('edit_switch').checked = false;
        document.getElementById('submit_btn').disabled = false;
        document.getElementById("c_name").disabled = false;
        document.getElementById("mode").value = "add";
    }

    else {
        if ( document.getElementById('add_switch').checked ) {
            document.getElementById('submit_btn').disabled = false;
            document.getElementById("c_name").disabled = false;
            document.getElementById("mode").value = "add";
        }

        else {
            document.getElementById('submit_btn').disabled = true;
            document.getElementById("c_name").disabled = true;
            document.getElementById("mode").value = "none";
        }
    }
}

// If the "edit" switch changes
function edit_checked() {
    if (document.getElementById('add_switch').checked) {
        document.getElementById('add_switch').checked = false;
        document.getElementById("submit_btn").disabled = false;
        document.getElementById("c_name").disabled = false;
        document.getElementById("mode").value = "edit";
    }

    else {
        if ( document.getElementById('edit_switch').checked ) {
            document.getElementById('submit_btn').disabled = false;
            document.getElementById("c_name").disabled = false;
            document.getElementById("mode").value = "edit";
        }

        else {
            document.getElementById('submit_btn').disabled = true;
            document.getElementById("c_name").disabled = true;
            document.getElementById("mode").value = "none";
        }
    }
}

/*  This prevents form from resubmitting data when page is refreshed
    causing duplicate entries in the database. Maybe learn about the
    Post/Redirect/Get (PRG) design pattern to avoid this issue?
*/
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}
