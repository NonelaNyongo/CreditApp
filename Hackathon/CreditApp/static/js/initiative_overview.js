//This will store a copy of all fields
var initiatives = [];

//Will store filtered data in another list
var filtered_initiatives = [];

//These are set to default values for when the page is first loaded. These would change when the dropdown for number of rows is changed.
var startcounter = 0;
var endcounter=5;
var increment_counter = 5;

//This is to ensure the table data is copied as soon as the page loads
window.populate_initiatives();

//Create copy of all table rows
function populate_initiatives(){
    //Creates an object for our table
    let table = document.getElementById("InitiativeOverviewTable");

    //creates an object for the number of rows in the table
    let tr = table.getElementsByTagName("tr");
    //Copies every element in each row and push it to the initiatives list
    for(let i=1;i<tr.length;i++){
        let td = tr[i].getElementsByTagName("td");
        let tdArray = [];
        for(let j=0;j<td.length;j++){
            if(j==0){
                tdArray.push(td[j].innerHTML);
            }
            else{
                tdArray.push(td[j].innerText);
            }

        }
        initiatives.push(tdArray);

    }
    //filtered initiatives becomes a copy of initiatives. This is the list where all changes would occur.
    filtered_initiatives = [...initiatives];
    display(initiatives)

}

//Display certain number of rows at a time
function display(filtered_list){
    //Table is cleared and then re-populated with the filtered data
    clear_table();
    //Creates an object for our table
    let table = document.getElementById("InitiativeOverviewTable");

    //Insert a row for each record in the filtered list
    for(let i=startcounter;i<endcounter;i++){
        let row = table.insertRow(i+1);
        for(let j = 0;j<filtered_list[i].length-1;j++){
            let cell1 = row.insertCell(j);
            cell1.innerHTML = filtered_list[i][j];
        }
    }
}

//Remove all table rows
function clear_table(){
    //Creates an object for our table
    let table = document.getElementById("InitiativeOverviewTable");

    //creates an object for the number of rows in the table
    let tr = table.getElementsByTagName("tr");

    //Remove all table rows except heading
    for(let i=1;i<tr.length;i++){
        tr[i].remove();
        i--;
    }
}


//Initialises the counters. These counters are used for navigation
function init_counter(filtered_initiatives){
    if(filtered_initiatives.length !=0 && filtered_initiatives.length>=increment_counter){
        startcounter = 0;
        endcounter = startcounter+increment_counter;
    }

    else{
        startcounter = 0;
        endcounter = filtered_initiatives.length;
    }
}

//Initialises the number of rows to be displayed
function setIncrement(){
    //Increment is pulled from the drop down list on the UI
    var inc = document.getElementById("n_rows");
    var inc_counter = inc.options[inc.selectedIndex].value;
    console.log(typeof(inc_counter)+inc_counter);
    increment_counter = parseInt(inc_counter);
    init_counter(filtered_initiatives);
    display(filtered_initiatives);

}

//This adjusts the counter during navigation of pages
function setCounter(nav){

    if(nav=="next" && endcounter < filtered_initiatives.length){

        startcounter+=increment_counter;
        if((initiatives.length-startcounter)<increment_counter){
            endcounter=initiatives.length;
        }
        else{
            endcounter+=increment_counter;
        }
    }
    else if(nav == "previous" && startcounter!=0){
        startcounter -=increment_counter;
        endcounter = startcounter+increment_counter;
    }

    navigate();
}

//This is called after setCounter to display the next page
function navigate(){

    //Clear table
    clear_table()

    //Creates an object for our table
    let table = document.getElementById("InitiativeOverviewTable");

    //creates an object for the number of rows in the table
    let tr = table.getElementsByTagName("tr");

    for(let i=0;i<tr.length;i++){
        tr[i].remove;
    }

    let pos = 1;
    for(let i=startcounter;i<endcounter;i++){
        let row = table.insertRow(pos);
        pos++;
        for(let j = 0;j<filtered_initiatives[i].length-1;j++){
            let cell1 = row.insertCell(j);
            cell1.innerHTML = filtered_initiatives[i][j];
        }
    }
}


//Reset function for dropdowns
function reset(){
    let ts = document.getElementById("TrackingStatus");
    ts.value = "";

    let cl = document.getElementById("Clusters");
    cl.value = "";

    let c0 = document.getElementById("Capability");
    c0.value = "";

    let sortby = document.getElementById("sort");
    sortby.value = "newest";
    Sort();
    searchFunction();
    }



//Checks which dropdown option is selected for Tracking Status
function ts_func(){
    var ts_select = document.getElementById("TrackingStatus");
    var ts = ts_select.options[ts_select.selectedIndex].value;
    return ts;
};

//Checks which dropdown option is selected for Clusters
function cluster_func(){
    var clust_select = document.getElementById("Clusters");
    var clust = clust_select.options[clust_select.selectedIndex].value;
    return clust;
}

//Checks which dropdown option is selected for Capabilities
function cap_func(){
    var cap_select = document.getElementById("Capability");
    var cap0 = cap_select.options[cap_select.selectedIndex].value;
    return cap0;
}

//Listens for Radio Button
var radio = "InitiativeName";
document.addEventListener('input',(e)=>{
if(e.target.getAttribute('id')=="InitiativeName"){radio="InitiativeName"}
if(e.target.getAttribute('id')=="ITOwner"){radio="ITOwner"}
if(e.target.getAttribute('id')=="PrimaryArchitect"){radio="PrimaryArchitect"}
});

//Search function
function searchFunction() {

      //Table is first cleared
      clear_table();

      // Declare variables
      let input, filter, table, tr, td, i, txtValue, rad;

      //collects the inputted text to search for and converts it to uppercase
      input = document.getElementById("search_input");
      filter = input.value.toUpperCase();
      filtered_initiatives = [];

      //Calls functions and stores which dropdown options were chosen
      var ts = ts_func();
      var cluster = cluster_func();
      var cap0 = cap_func();

      switch(radio){
        //rad represents the index within the initiative[i] list that you would find the value of each of these fields
        //rad basically looks for the field that you want to search by, and allows you to check it's value
        case 'InitiativeName': rad = 1; break;
        case 'ITOwner': rad = 5; break;
        case 'PrimaryArchitect': rad = 6; break;
      }

       //for loop that loops through initiatives (which is a list, containing lists of different initiative's info)
      for(let i=0; i<initiatives.length; i++){
            //initiative[i] is a list that holds the information for a specific initiative
            //initiatives[i][rad] accesses the value of the field we are searching by (eg initiative[i][1] gives us init_name)
            //The indexOf() method returns the position of the first occurrence the inputted text we are filtering by
            //The indexOf(filter) = 0 means that the field starts with the inputted text
            //initiatives[i][rad].toUpperCase()[0]==filter[0] means the field begins with the searched filter

            //split the value we are searching by, by the spaces in it
            list_to_search = initiatives[i][rad].split(" ")

            //this allows you to view options as long as the word you searched for is in the field
            for(word in list_to_search){
                //Filters out the initiatives list based on the radio button, dropdowns and the search text.
                if((list_to_search[word].toUpperCase().indexOf(filter)==0 || filter == "")
                    && (initiatives[i][2] == ts || ts == "") && (initiatives[i][3] == cluster || cluster == "") && (initiatives[i][4].includes(cap0) || cap0 == "")
                   ){
                        filtered_initiatives.push(initiatives[i]);
                        break;
                      }
            }

      }
      //Calls init_counter to initialise the start and end points for navigation
      init_counter(filtered_initiatives);
      display(filtered_initiatives);
}

//Sort Function. It comes in sorted from the DB therefore only changes when the dropdown changes
function Sort(){
    clear_table();
    for(let i=0; i<filtered_initiatives.length-1;i++){
        for(let j=i+1;j<filtered_initiatives.length;j++){
                let z = filtered_initiatives[i];
                filtered_initiatives[i] = filtered_initiatives[j];
                filtered_initiatives[j] = z;
        }
    }
    init_counter(filtered_initiatives)
    display(filtered_initiatives);
}