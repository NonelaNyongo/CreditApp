// Variables to hold the date ranges
var minDate, maxDate;

// Custom filtering function which will search data between two dates
$.fn.dataTable.ext.search.push(
	function( settings, data, dataIndex ) {

        // Start date
        var min = minDate.val();
        if ( min !== null ){
            // Workaround for DateTime returning date with Timestamp and UTC offset
            min = new Date(min.toDateString());
        };

        // End date
		var max = maxDate.val();
		if ( max !== null ){
		    // Workaround for DateTime returning date with Timestamp and UTC offset
            max = new Date(max.toDateString());
        };

        var date = new Date( data[2] );
        // Workaround for DateTime returning date with Timestamp and UTC offset
        date = new Date(date.toDateString());

		if (
			( min === null && max === null ) ||
			( min === null && date <= max ) ||
			( min <= date   && max === null ) ||
			( min <= date   && date <= max )
		) {
			return true;
		}
		return false;
	}
);

$(document).ready(function() {
	// Create date inputs
    minDate = new DateTime($('#min'), {
        format: 'DD/MM/YYYY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'DD/MM/YYYY'
    });

	// DataTables initialisation
	var table = $('#meetings_table').DataTable({
        scrollY: 350,
        scrollX: true,
        scrollCollapse: true,
        paging: true,
        'dom': 'lrtip',
        fixedHeader: {
            header: true,
            footer: true
        }
    });

     // Custom search on Initiatives when searchField is changed
     $('#searchField').on( 'keyup', function () {
        var regExSearch = '\\b' + this.value; // Regular Expression to search from the beginning of a word
        table
            .columns( 1 )
            .search(regExSearch, true, false )
            .draw();
    });


    // When the little X on search input is clicked
    $('#searchField').on('input', function (e) {
        table.search('').columns().search('').draw();
        table.draw();
    });

    // Filter the table on dates
	$('#run_filter').on('click', function (e) {
        e.preventDefault();
        table.draw();
        // $('#resetFilters').toggle(); // If needed set "display: none;"
    });

    // Reset the table and clear the date fields
    $('#resetFilter, #resetFilters').click(function(e) {
		e.preventDefault();
        $('#min').val("");
        $('#max').val("");
		minDate.val("");
		maxDate.val("");
		$('#searchField').val("");
        $('#run_filter').trigger('click');
        table.search('').columns().search('').draw();
    });

    // Refresh the table when add meeting button pressed
	$('#meeting_form').on('submit', function() {
	    location.reload(true);
	});
});

/*  This prevents form from resubmitting data when page is refreshed
    causing duplicate entries in the database. Maybe learn about the
    Post/Redirect/Get (PRG) design pattern to avoid this issue?
*/
if ( window.history.replaceState ) {
    window.history.replaceState( null, null, window.location.href );
}