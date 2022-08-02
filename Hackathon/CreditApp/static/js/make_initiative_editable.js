//Krithi
//this file contains functions linked to the onclick of specific buttons and dropdowns on view_init_details.html

//this function makes all fields in accordian item 1 editable
function edit_1_onclick(){

    //the code below changes a field from disabled, to enabled. This allows you to move from view mode to edit mode
    document.getElementById("txt_initiativeName").disabled = false;
    document.getElementById("select_cluster").disabled = false;
    document.getElementById("select_segment").disabled = false;
    document.getElementById("select_health").disabled = false;
    document.getElementById("txt_business_unit").disabled = false;
    document.getElementById("select_country").disabled = false;
    document.getElementById("select_init_stage").disabled = false;
    document.getElementById("select_capability_0").disabled = false;

    //only enable editing if it is not empty
    if(document.getElementById("select_capability_1").value != ""){
        document.getElementById("select_capability_1").disabled = false;
    }
    //only enable editing if it is not empty
    if(document.getElementById("select_capability_2").value != ""){
        document.getElementById("select_capability_2").disabled = false;
    }

    document.getElementById("select_purpose").disabled = false;
    document.getElementById("select_tracking_status").disabled = false;
    document.getElementById("txt_tracking_reason").disabled = false;
    document.getElementById("txt_log_date").disabled = false;
    //the code below hides the edit button, and moves to edit mode - revealing the cancel and confirm button
    document.getElementById("edit_1_btn").hidden= true;
    document.getElementById("confirm-btn-1").hidden= false;
    document.getElementById("cancel-btn-1").hidden = false;

}

function display_segments(clusters_list, segments_list){
    document.getElementById("select_segment").disabled = false;
    //console.log(clusters_list)
    //console.log("Hello")
    //console.log(segments_list)

    //empty current selection of segment
    refToSegment = document.getElementById("select_segment");
    refToSegment.innerHTML = "";

    //get selected cluster
    selected_cluster = document.getElementById("select_cluster").value;
    //list of linked segments to the selected cluster
    linked_list = [];


    //segment list in form [segment_id,segment_name,cluster_name,segment_id,segment_name,cluster_name,......]
    //a single entry in db takes 3 spaces in array
    //c=2 means we start at cluster_fk for first entry in db, c+=3 moves to cluster_fk for second entry, and so on...
    for(let c=2; c<segments_list.length; c+=3){
        //if the fk cluster name for that entry = the selected cluster name then add the segment name to the list
        if(segments_list[c]==selected_cluster){
            //c-1 takes you to the index that holds the name of that entry
            linked_list.push(segments_list[c-1]);
        }
    }


    //for loop to populate the segment options with values related to the selected cluster
    for(i in linked_list){
        var item = linked_list[i];
        //creating an option in the dropdown
        var element = document.createElement("option");
        //setting the option's text and value to the name stored in the linked list
        element.text = item;
        element.value = item;
        //adding this option to the dropdown
        refToSegment.add(element)
    }

    //if there is nothing linked to the select capability 0
    if(linked_list.length==0){
        //clear choice of capability 1 and disable it
        refToSegment.innerHTML = "";
        document.getElementById("select_segment").disabled = true;
    }


}

//function that is called to initially populate dropdowns with items linked to current details
function display_all_linked_lists(cap_0_list, cap_1_list, cap_2_list, clusters_list, segments_list){
    console.log("in the function")
    display_cap_1(cap_0_list, cap_1_list, cap_2_list,false);
    display_cap_2(cap_1_list, cap_2_list,false);
    display_segments(clusters_list, segments_list);
}

//once a capability 0 has been selected, populate the capability 1 options with those options linked to the selected cap_0
function display_cap_1(cap_0_list, cap_1_list, cap_2_list, ifchange){
    document.getElementById("select_capability_1").disabled = false;
    //get reference to dropdown for capability 2
    refToCap2 = document.getElementById("select_capability_2");
    //get reference to dropdown for capability 1
    refToCap1 = document.getElementById("select_capability_1");

    //if this function is triggered by a change in cap_0 that is selected then
    if (ifchange == true){
        console.log("in if")
        refToCap1.innerHTML = "";
        $("#select_capability_1").empty();
        //empty current selected option of cap_2 and make it disabled until a capability 1 has been selected
        refToCap2.innerHTML = "";
    }

    //get selected capability_0
    cap_0_name = document.getElementById("select_capability_0").value;
    cap_0_id = -1;
    //list of linked cap_1's to the selected cap_0
    linked_list = [];

    //for loop to get the capability_0_id for the selected capability_0
    //c in range 0 to cap_0_list.length-1
    for(c in cap_0_list){
        if(cap_0_list[c]==cap_0_name){
            //id's in range 1 to cap_0_list.length, therefore we must add 1 to the value of c in order to get cap_0_id
            cap_0_id = parseInt(c)+1;
            break;
        }

    }

    //cap_1_list in form [cap_1_id,cap_1_name,cap_0_fk,cap_1_id,cap_1_name,cap_0_fk,......]
    //a single entry in db takes 3 spaces in array
    //c=2 means we start at cap_0_fk for first entry in db, c+=3 moves to cap_0_fk for second entry, and so on...
    for(let c=2; c<cap_1_list.length; c+=3){
        //if the fk for that entry = the selected capability 0's id then add the capability_1 name to the list
        if(cap_1_list[c]==cap_0_id){
            //c-1 takes you to the index that holds the name of that entry
            linked_list.push(cap_1_list[c-1]);
            console.log(cap_1_list[c])
        }
    }

    //variable to hold the value of whatever is the selected cap_1
    var selected_cap_1 = "";

    //if this function is not triggered by a change of any cap_0 and is instead triggered by clicking the edit button on view_init_details.html
    if (ifchange == false){
        //get the value of the current selected cap_1
        selected_cap_1 = refToCap1.options[refToCap1.selectedIndex].value;
    }

    //for loop to populate the cap_1 options with values related to the selected cap_0
    for(i in linked_list){
        var item = linked_list[i];


        //creating an option in the dropdown
        if(item!=selected_cap_1){
            var element = document.createElement("option");
            //setting the option's text and value to the name stored in the linked list
            element.text = item;
            element.value = item;
            //adding this option to the dropdown
            console.log(item);
            refToCap1.add(element)
        }
    }

    //if there is nothing linked to the select capability 0
    if(linked_list.length==0){
        //clear choice of capability 1 and disable it
        refToCap1.innerHTML = "";
        document.getElementById("select_capability_1").disabled = true;
    }

    if (ifchange == true){
        display_cap_2(cap_1_list,cap_2_list,ifchange);
    }


}

//once a capability 1 has been selected, populate the capability 2 options with those options linked to the selected cap_1
function display_cap_2(cap_1_list,cap_2_list,ifchange){
    //enable editing for cap_2
    document.getElementById("select_capability_2").disabled = false;


    //get selected capability_1
    cap_1_name = document.getElementById("select_capability_1").value;
    //initialising variable to store the cap_id of the selected cap_1 (-1 is a default value, not actual value)
    cap_1_id = -1;
    //list of linked cap_2's to the selected cap_1
    linked_list = [];

    //for loop to get the capability_1_id for the selected capability_1
    //cap_1_list in form [cap_1_id,cap_1_name,cap_0_fk,cap_1_id,cap_1_name,cap_0_fk,......]
    //a single entry in db takes 3 spaces in array
    //c=1 means we start at cap_1_name for first entry in db, c+=3 moves to cap_1_name for second entry, and so on...
    for(let c=1; c<cap_1_list.length; c+=3){
        if(cap_1_list[c]==cap_1_name){
            cap_1_id = cap_1_list[c-1]
            //console.log(cap_1_id)
            break;
        }
    }

    //cap_2_list in form [cap_2_id,cap_2_name,cap_1_fk,cap_2_id,cap_2_name,cap_1_fk,......]
    //a single entry in db takes 3 spaces in array
    //c=2 means we start at cap_1_fk for first entry in db, c+=3 moves to cap_1_fk for second entry, and so on...
    for(let c=2; c<cap_2_list.length; c+=3){
        if(cap_2_list[c]==cap_1_id){
            //c-1 takes you to the index that holds the name of that entry
            linked_list.push(cap_2_list[c-1]);
        }
    }

    //get reference to dropdown for capability 2
    refToCap2 = document.getElementById("select_capability_2");
    var selected_cap_2 = "";

    if (ifchange == false){
        selected_cap_2 = refToCap2.options[refToCap2.selectedIndex].value;
    }

    //clears selected option before repopulating
    if (ifchange == true){
        refToCap2.innerHTML = "";
    }



    //if there are no cap_2 options linked to the selected cap_1 then disable cap_2 dropdown
    if(linked_list.length==0){
        refToCap2.innerHTML = "";
        document.getElementById("select_capability_2").disabled = true;
    }
    //if there are linked cap_2 options to the selected cap_1
    else{
        //for loop to populate the cap_2 options with values related to the selected cap_1
        for(i in linked_list){
            var item = linked_list[i];
            //creating an option in the dropdown
            if(selected_cap_2 != item){
                var element = document.createElement("option");
                //setting the option's text and value to the name stored in the linked list
                element.text = item;
                element.value = item;
                //adding this option to the dropdown
                refToCap2.add(element)
            }

        }

        //give the user the option to add an optional cap_3 in text field (only allowed if they have a selected cap_0,cap_1 and cap_2)
        document.getElementById("txt_cap_lvl_3_new").readOnly = false;
        
    }

}

//this function updates the capability_description that would be stored in the initiative table in the form 'cap_0_name'-'cap_1_name'-'cap_2_name' with the option of adding -'cap_3_name'
function update_cap_3(){
    //get a reference to the selected capability's and the optional capability 3 in order to accesss their values
    refToCap0 = document.getElementById("select_capability_0");
    refToCap1 = document.getElementById("select_capability_1");
    refToCap2 = document.getElementById("select_capability_2");
    refToCap3 = document.getElementById("txt_cap_lvl_3");
    //if a valid cap_0 and cap_1 are selected
    if(refToCap1.value!=""){
        //populate the capability description with cap_0_name-cap_1_name
        refToCap3.value = refToCap0.value + "-" + refToCap1.value;
    }
    //else if only a valid cap_0 is selected
    else{
        refToCap1.value = "";
        refToCap2.value = "";
        //populate the description with only cap_0_name
        refToCap3.value = refToCap0.value;

    }
    //if a valid cap_2 is selected then add this to the current description which would be in the form cap_0_name-cap_1_name
    if(refToCap2.value!=""){
        refToCap3.value = refToCap3.value + "-" + refToCap2.value;
    }

}


//this function makes all fields in accordian item 2 editable
function edit_2_onclick(){

    //the code below changes a field from disabled, to enabled. This allows you to move from view mode to edit mode
    document.getElementById("txt_project_manager").disabled = false;
    document.getElementById("txt_primary_arch").disabled = false;
    document.getElementById("txt_supporting_arch").disabled = false;
    document.getElementById("select_pmo_team").disabled = false;
    document.getElementById("txt_it_owner").disabled = false;
    //the code below hides the edit button, and moves to edit mode - revealing the cancel and confirm button
    document.getElementById("edit_2_btn").hidden= true;
    document.getElementById("confirm-btn-2").hidden= false;
    document.getElementById("cancel-btn-2").hidden = false;
}

//this function makes all fields in accordian item 3 editable
function edit_3_onclick(initiative_id){

    //the code below changes a field from disabled, to enabled. This allows you to move from view mode to edit mode
    document.getElementById("txt_existing_tech").disabled = false;
    document.getElementById("txt_new_tech").disabled = false;
    $("#select_vendor").attr('disabled',false);
    $('#select_vendor').selectpicker('refresh');
    $("#select_impl_partner").attr('disabled',false);
    $('#select_impl_partner').selectpicker('refresh');
    document.getElementById("txt_deploy_type").disabled = false;
    //the code below hides the edit button, and moves to edit mode - revealing the cancel and confirm button
    document.getElementById("edit_3_btn").hidden= true;
    document.getElementById("confirm-btn-3").hidden= false;
    document.getElementById("cancel-btn-3").hidden = false;

}

//this function makes all fields in accordian item 4 editable
function edit_4_onclick(){

    //the code below changes a field from disabled, to enabled. This allows you to move from view mode to edit mode
    document.getElementById("txt_short_descr").disabled = false;
    document.getElementById("txt_business_prob").disabled = false;
    document.getElementById("txt_it_bus_obje").disabled = false;
    document.getElementById("select_stratObj").disabled = false;
    //the code below hides the edit button, and moves to edit mode - revealing the cancel and confirm button
    document.getElementById("edit_4_btn").hidden= true;
    document.getElementById("confirm-btn-4").hidden= false;
    document.getElementById("cancel-btn-4").hidden = false;
}

//this function makes all fields in accordian item 6 editable
function edit_6_onclick(){

    //the code below changes a field from disabled, to enabled. This allows you to move from view mode to edit mode
    document.getElementById("select_criticality").disabled = false;
    document.getElementById("txt_provider_site").disabled = false;
    document.getElementById("txt_live").disabled = false;
    document.getElementById("txt_date_live").disabled = false;
    document.getElementById("select_decom_impact").disabled = false;
    document.getElementById("select_sgt_support").disabled = false;
    //the code below hides the edit button, and moves to edit mode - revealing the cancel and confirm button
    document.getElementById("edit_6_btn").hidden= true;
    document.getElementById("confirm-btn-6").hidden= false;
    document.getElementById("cancel-btn-6").hidden = false;

}

//this function makes all fields in accordian item 7 editable
function edit_7_onclick(){

    //the code below changes a field from disabled, to enabled. This allows you to move from view mode to edit mode
    document.getElementById("txt_cost_centre").disabled = false;
    document.getElementById("txt_approved_budget").disabled = false;
    //the code below hides the edit button, and moves to edit mode - revealing the cancel and confirm button
    document.getElementById("edit_7_btn").hidden= true;
    document.getElementById("confirm-btn-7").hidden= false;
    document.getElementById("cancel-btn-7").hidden = false;
}


//since the initially selected option in these single select dropdowns is populated from an array called results, there will be duplicates
//the below code is to ensure there are no duplicates within the hard coded lists when displaying the available options
list_of_hard_coded_dropdowns = ['#select_init_stage option', '#select_purpose option', '#select_health option', '#select_tracking_status option', '#select_pmo_team option', '#select_criticality option', '#select_decom_impact option', '#select_sgt_support option', '#select_stratObj option' ]

//l goes from 0 to list_of_hard_coded_dropdowns.length-1
//list_of_hard_coded_dropdowns[l] represents the id of the dropdown
for (l in list_of_hard_coded_dropdowns){

    //array to hold the options that will be placed into dropdown
    var optionValues =[];

    //accessing each option that is coded for the dropdown
    $(list_of_hard_coded_dropdowns[l]).each(function(){

    //if the option is already in optionValues, then remove it as an option for the dropdown (no duplicates are ensured here)
   if($.inArray(this.value, optionValues) >-1){
      $(this).remove()

    //if this value is not in optionValues yet, then add it there to be displayed in dropdown
   }else{
      optionValues.push(this.value);
   }
    });

}





