
var removeListElement = function (array, elrow, elcolumn){
    for (var i=array.length-1; i>=0; i--){
        if (array[i][0]==elrow && array[i][1]==elcolumn) 
            array.splice(i, 1);
    }
    return array;
}

var getSelectionPairs = function(array){
    var row1 = [];
    var row2 = [];
    for (var i=0; i<array.length; i++){
        if (row1.indexOf(array[i][0])==-1) row1.push(array[i][0]);
        var prop4=array[i][1].slice(0,3);
        if (row2.indexOf(prop4)==-1) row2.push(prop4);
    }
    return [row1.sort().join(','), row2.sort().join(',')];
}

var getTableColumns = function(){
    var thArray = [];

    $('#strtable > thead > tr > th').each(function(){
            thArray.push($(this).text())
    });
    tableColumns = thArray;
}

$(function(){
    disqualification = [];
    refDocs = [];
    $(".ann-input-m").hide();
    $(".ann-input-s").hide();
    $("#strtable").bootstrapTable({
        "searching": false,
        "paging": false
    });
    getTableColumns();
    $('#strtable tbody').on( 'click', 'td', function (e) {
        if (e.target == e.currentTarget){
            var prop_and_part = this.id.slice(3).split('_');
            var acolumn = prop_and_part[0];
            var arow = prop_and_part[1];
            if (notAnnotatable.indexOf(acolumn)==-1){ // The identifier column can't be selected
                if ($(this).hasClass('selected')){ // remove selection
                    $(this).removeClass('selected');
                    setOfSelected=removeListElement(setOfSelected, arow, acolumn);
                    if (setOfSelected.length==0){
                        $('#selpart').html('NONE');
                        $('#selprop').html('NONE');
                    } else {
                        var selectionPairs = getSelectionPairs(setOfSelected);
                        $("#selpart").html(selectionPairs[0]);
                        $("#selprop").html(selectionPairs[1]);
                    }
                } else { // adding a selection
/*                    if ($("#selprop").text()!='NONE' && acolumn!=$("#selprop").text()){
                        $('td').removeClass('selected');
                        setOfSelected.clear();
                    }
*/
                    $(this).addClass('selected');
                    setOfSelected.push([arow, acolumn]);
                    var selectionPairs = getSelectionPairs(setOfSelected);
                    $('#selpart').html(selectionPairs[0]);
                    $('#selprop').html(selectionPairs[1]);
                }
            }
        }
	});
    

        $(".selectpicker").on('change', function(){
            console.log('changed');
        });


    $(document).on("click", "span.clickable", function() {  //use a class, since your ID gets mangled
        $('span').removeClass("inactive");
        $(this).toggleClass("active");      //add the class to the clicked element
    });
    $(document).on("click", "span.unclickable", function() {  //use a class, since your ID gets mangled
        $('span').removeClass("active");
        $(this).toggleClass("inactive");      //add the class to the clicked element
    });
    $("#pnlLeft").on('click', function(){
        if ($("#infoMessage").text()!="")
            $("#infoMessage").text("");
    });
    $("#pnlRight").hide();
    var task='men';
    $.get('/listincidents', {'task': task}, function(unsorted, status) {
        var old_inc = unsorted['old'];
        var new_inc = unsorted['new'];
        var old_sorted = old_inc.sort();
        var new_sorted = new_inc.sort();
        var last_batch = ['97407', '113214', '113247', '122136', '156813', '172205', '296327', '317165', '384047', '389279', '409732', '448419', '479709', '479734', '481229', '489061', '491674', '494072', '502850', '510769', '533821', '546550', '556438', '558601', '572696', '588835', '588918', '595069', '596902', '617512', '624046', '625735', '635289', '699605', '714840', '722219', '727759', '735589', '741314', '744044', '750833', '751367', '753058', '754893', '755757', '767876', '804071', '804189', '808303', '809499'];
        var trial_incidents = ['761837', '759131', '739413', '773797'];
        var train1 = ["106394", "108112", "111416", "113480", "138295", "146565", "168844", "170442", "178149", "190615", "207298", "207542", "209733", "223936", "226600"];
        var train2 = ["269677", "272869", "273773", "281766", "282561", "282956", "295502", "302749", "306048", "312892", "314763", "314973", "315594", "321156", "338580"];
        $('#pickfile').append($('<option></option>').val('-1').html("--INCIDENTS YOU'VE WORKED ON--").prop('disabled', true));
        for(var i = 0; i < old_sorted.length; i++) {
            if (trial_incidents.indexOf(old_sorted[i])>-1) continue;
            $('#pickfile').append($('<option></option>').val(old_sorted[i]).html(old_sorted[i]));
        }
        $('#pickfile').append($('<option></option>').val('-1').html("--TRAINING #1--").prop('disabled', true));
        for(var i = 0; i < train1.length; i++) {
            if (old_sorted.indexOf(train1[i])>-1) continue;
            $('#pickfile').append($('<option></option>').val(train1[i]).html(train1[i]));
        }
        $('#pickfile').append($('<option></option>').val('-1').html("--TRAINING #2--").prop('disabled', true));
        for(var i = 0; i < train2.length; i++) {
            if (old_sorted.indexOf(train2[i])>-1) continue;
            $('#pickfile').append($('<option></option>').val(train2[i]).html(train2[i]));
        }
        $('#pickfile').append($('<option></option>').val('-1').html("--OTHER INCIDENTS--").prop('disabled', true));
        for(var i = 0; i < new_sorted.length; i++) {
            if (trial_incidents.indexOf(new_sorted[i])>-1 || train1.indexOf(new_sorted[i])>-1 || train2.indexOf(new_sorted[i])>-1 || last_batch.indexOf(new_sorted[i])>-1) continue;
            $('#pickfile').append($('<option></option>').val(new_sorted[i]).html(new_sorted[i]));
        }
        $('#pickfile').append($('<option></option>').val('-1').html("--LAST BATCH--").prop('disabled', true));
        for(var i = 0; i < last_batch.length; i++) {
            if (trial_incidents.indexOf(last_batch[i])>-1 || train1.indexOf(last_batch[i])>-1 || train2.indexOf(last_batch[i])>-1) continue;
            $('#pickfile').append($('<option></option>').val(last_batch[i]).html(last_batch[i]));
        }
        $('#pickfile').append($('<option></option>').val('-1').html("--TRIAL DATA INCIDENTS--").prop('disabled', true));
        for(var i = 0; i < trial_incidents.length; i++) {
            $('#pickfile').append($('<option></option>').val(trial_incidents[i]).html(trial_incidents[i]));
        }
    });
}); // This is where the load function ends!


var clearSelection = function(){
    $('span').removeClass("active");
    $('span').removeClass("inactive");
}

var getExistingAnnotations = function(fn, task, cb){
    $.post('/loadannotations', {'task': task, 'incident': fn}, function(data, status){
         if (!data) {console.log('There are no previous annotations of mentions done by this user for this incident.'); annotations={};}//"s": [], "b": [], "i": [], "h": [], "d": []};}
         else {
            console.log("Loaded previous annotations of mentions!"); // + data.length.toString() + " annotations for this incident by this user.");
            annotations=data;
        } 
       cb(data);
    });
}

var create_datepicker = function(granularity, format, manualId=""){
        if (!manualId) var myId="pick" + granularity;
	else var myId=manualId;
        $('#' + myId).datepicker({
            autoclose: true,
	    viewMode: granularity + 's',
            minViewMode: granularity + 's',
            format: format
        });
}

var getExistingDisqualified = function(fn, task, cb){
    $.post('/loaddisqualified', {'task': task, 'incident': fn}, function(data, status){
         if (!data) {console.log('There are no previous disqualifications done by this user for this incident.'); disqualification=[];}
         else {
            console.log("Loaded previous disqualifications!"); // + data.length.toString() + " annotations for this incident by this user.");
            disqualification=data;
        }
       cb(data);
    });
}

var defaultValues = function(){
        $("td").removeClass("selected");
        $("#strtable").show();
        $("#selprop").html('NONE');
        $('#selpart').html('NONE');
        $('#comment').val('');
        setOfSelected = [];
}

var getCardinalityAndParticipants = function(){
    if ($("#eventtype").val()=='b'){
	var allParticipants = "ALL";
	var cardinality = "ALL";
    } else if ($("#eventtype").val()=='o' || $("#eventtype").val()=='g'){
	var allParticipants = "UNK";
	var cardinality = "UNK";
    } else {
	var allParticipants = $(".selected").map(function() {
	    return parseInt($(this).attr('data-index'))+1;
	}).get();
	var cardinality = $("#cardinality").val();
    }
    return [cardinality, allParticipants];
}

var reloadInside=function(mwu=false){
    if($("span.active").length>0){
        var selectionPairs = getSelectionPairs(setOfSelected);
        var allParticipants = selectionPairs[0];
        var allProperties = selectionPairs[1];
//        $('#selpart').html(selectionPairs[0]);
//        $('#selprop').html(selectionPairs[1]);

//        var allParticipants=Array.from(setOfSelected).join('');
//        var property=$('#selprop').text();
  
        $("span.active").append("<sub>" + allParticipants + '</sub><sup>' + allProperties + "</sup>");
        var newClass = 'prop_' + setOfSelected[0][1];
        if (!mwu){
            $("span.active").removeClass().addClass(newClass).addClass("unclickable");
        } else {
            $("span.active").removeClass().addClass(newClass).addClass("unclickable").addClass("mwu");
        }
    } else if ($("span.inactive").length>0){
        $("span.inactive").children().remove();
        $("span.inactive").removeClass().addClass("clickable");
    } 
}

var storeAndReload = function(annotations, mwu = false){
    console.log("Storing annotations");
    console.log(annotations);
    $.post("/storeannotations", {'annotations': annotations, 'task': 'men', 'incident': $("#pickfile").val()})
//, function() {
    .done(function() {
        printSuccess( "Mention annotation was successful" );
        reloadInside(mwu);
        defaultValues();
        //showTrails();
    })
    .fail(function() {
        alert( "There was an error with storing these annotations" );
    });


//function(data, status){
//        alert("Annotation saved. Now re-loading, status code:");
}

var storeDisqAndReload = function(task){
    $.post("/storedisqualified", {'disqualification': disqualification, 'task': task, 'incident': $("#pickfile").val()}, function(data, status){
        alert("Disqualified articles updated.");
//        loadTextsFromFile($("#pickfile").val());
    });
}

var removeAnnotations = function(){
    if ($("span.inactive").length>0){
    var allMentions = $(".inactive").map(function() {
            return $(this).attr('id');
    }).get();
    for (var i=0; i<allMentions.length; i++){
        var k = allMentions[i];
        if (annotations[k]['mwu']){
            var mwu = annotations[k]['mwu'];
            for (var j=0; j<mwu.length; j++){
                if (mwu[j]!=k){
                    var index = annotations[mwu[j]]['mwu'].indexOf(k);
                    if (index > -1) {
                        annotations[mwu[j]]['mwu'].splice(index, 1);
                    }
                }
            }
        }
        delete annotations[k];
    }
    storeAndReload(annotations);
    } else {
        printInfo("Select at least one span to remove");
    }
}

Array.prototype.allValuesSame = function() {

    for(var i = 1; i < this.length; i++)
    {
        if(this[i] !== this[0])
            return false;
    }

    return true;
}

var sameSentence = function(allMentions){
    var sents = allMentions.map(function(x) {return x.substring(0,x.lastIndexOf('.')); });
    return sents.allValuesSame();
}

var printInfo = function(msg){
        $("#infoMessage").html(msg);
        $("#infoMessage").removeClass("good_info");
        $("#infoMessage").addClass("bad_info");
}

var printSuccess = function(msg){
        $("#infoMessage").html(msg);
        $("#infoMessage").addClass("good_info");
        $("#infoMessage").removeClass("bad_info");
   
}

var saveEvidence = function(mwu){
    if (setOfSelected.length==0)
        printInfo("Please mark at least one cell in the table to pick a property and a participant");
    else {
        var allInTable=true;
        console.log(setOfSelected);
        setOfSelected.forEach(function(pair){
            var participant = pair[0];
            var property = pair[1];
            var choiceId = '#' + property + '_' + participant;
            if ($(choiceId).val()=='-1'){
                printInfo("Annotation of mentions requires the property value to be set first in the table.");
                allInTable=false;
            }
        });
        if (allInTable){
            var allMentions = $(".active").map(function() {
                return $(this).attr('id');
            }).get();
            if (allMentions.length>0){
                if (mwu && !sameSentence(allMentions)) {
                    printInfo("All words of a multiword unit must be in the same sentence");
                } else {
                $("#infoMessage").html("");
                var comment = $("#comment").val();

                for (var i=0; i<allMentions.length; i++){
                    var mention=allMentions[i];
                    console.log(setOfSelected);
                    annotations[mention]={'pairs': setOfSelected, 'comment': comment};
                    if (mwu){
                        annotations[mention]["mwu"] = allMentions;
                    }
                }
                storeAndReload(annotations, mwu);
                }
            } else {
                printInfo("Please select at least one mention");
            }
        }
    }
}

var addToken = function(token, tid, annotated) {
    if (token=='NEWLINE') return '<br/>';
    else {
	if (!annotated[tid]){
        return "<span id=" + tid + " class=\"clickable\">" + token + "</span> ";
	} else {
            var mwuClass="";
            if (annotated[tid]["mwu"]) mwuClass="mwu";
        var pairs = getSelectionPairs(annotated[tid]['pairs']);
	    return "<span id=" + tid + " class=\"prop_" + annotated[tid]['pairs'][0][1] + " unclickable " + mwuClass + "\">" + token + "<sub>" + pairs[0] + '</sub><sup>' + pairs[1] + "</sup></span> ";
	}
    }
    
}

var titleToken = function(tid){
    return tid.split('.')[1][0]=='t';
}

var toggleDisqualify = function(d, task){
    if (!$("#" + d).hasClass("disqualified")) { $("#" + d).addClass("disqualified"); $('#btn' + d).html("Mark relevant"); disqualification.push(d); storeDisqAndReload(task); }  
    else { $("#" + d).removeClass("disqualified"); $('#btn' + d).html("Mark non-relevant"); var index = disqualification.indexOf(d); if (index > -1) { disqualification.splice(index, 1);} storeDisqAndReload(task);}
}

var loadTextsFromFile = function(fn){
    $("#pnlLeft").html("");
    var task = 'men';
    $.get("/gettext", {'inc': fn}, function(data, status) {
        getExistingAnnotations(fn, task, function(annotated){
        getExistingDisqualified(fn, task, function(disqualified){
        console.log(annotated);
        console.log(disqualified);
        var all_html = ""; 
        var c=0;
        for (var k in data) {
            var title = "";
            var body = "<div class=\"panel-body\">";
            for (var span_id in data[k]) {
                if (span_id!="DCT"){ 
                    var token = data[k][span_id];
	            var tid = k + '.' + span_id;
                    if (titleToken(tid)){ //title
                        title+=addToken(token, tid, annotated);
                    } else { //body
                        body+=addToken(token, tid, annotated);
                    } 
                }
            }
            if (!disqualified || disqualified.indexOf(k)==-1) var disq = false;
            else var disq = true;
            if (disq) var header = "<div class=\"panel panel-default disqualified\" id=\"" + k + "\">";
            else var header = "<div class=\"panel panel-default\" id=\"" + k + "\">";
            header += "<div class=\"panel-heading\"><h5 class=\"panel-title\">" + title + "&nbsp;(<i>Published on: <span id=" + k + "dct>" + data[k]['DCT'] + "</span></i>) (" + k + ")"; 
            if (!disq) header += "<button class=\"btn btn-primary\" id=\"btn" + k + "\" onclick=\"toggleDisqualify(\'" + k + "\', \'" + task + "\')\">Mark non-relevant</button>";
            else header += "<button class=\"btn btn-primary\" id=\"btn" + k + "\" onclick=\"toggleDisqualify(\'" + k + "\', \'" + task + "\')\">Mark relevant</button>";

//            if (!disq) header += "<button class=\"btn btn-primary quabtn\" id=\"btn" + k + "\" onclick=\"toggleDisqualify(" + k + ")\">Disqualify this document</button>";
//            else header += "<button class=\"btn btn-primary disbtn\" id=\"btn" + k + "\" onclick=\"toggleDisqualify(" + k + ")\">Qualify this document</button>";
            header += "</h5></div>";
            body += "</div></div>";
            all_html += header + body;
        }
        $("#pnlLeft").html(all_html);

        showTrails();
        $("#bigdiv").height($(window).height()-($("#pickrow").height() + $("#titlerow").height()+$("#annrow").height())-20);
        //$("#pnlRight").html(all_html["r"]);
        return all_html;
        });
        });
    });
}

var notAnnotatable = ['ID', 'Type', 'Status', 'Name', 'Gender', 'Age'];
var tableColumns = [];
var propertyOptions = {'DeathPlace': ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Liberty Island', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'United States Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'other'], 'EducationLevel': ['Less than high school', 'High school graduate', 'Higher degree', 'other'], 'NativeLanguage': ['English', 'Spanish', 'Chinese', 'other'], 'Ethnicity': ['African American', 'White/Caucascian', 'Asian', 'Native American', 'Hispanic/Latin', 'other'], 'PastConviction': ['Yes', 'No'], 'Residence': ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Liberty Island', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'United States Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'other'], 'CauseOfDeath': ['Intentional', 'Accidental', 'Suicide', 'other'], 'PoliticalParty': ['Democratic Party', 'Republican Party', 'other'], 'BirthPlace': ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Liberty Island', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'United States Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'other'], 'Religion': ['Christian', 'Islam', 'Judaism', 'Buddhism/Hinduism', 'Atheist/Agnostic', 'other'], 'MedicalCondition': ['Mental', 'Organic', 'other']};


                    /*{
                        "Kinship": ["father", "mother", "child", "grandmother", "grandfather"],
                        "Ethnicity": ["Asian", "Black", "Native American", "White"]
                    }*/
var tableAnnotations = {};

var saveTableAnnotation = function(selectObject){
    var changedId = selectObject.id;
    var newValue = selectObject.value;
    tableAnnotations[changedId] = newValue;
    saveStructuredAnnotation();
}

var getStructuredData = function(inc, cback) {
    $.get('/getstrdata', {'inc': inc}, function(data, status) {
        if (typeof(data)=='string')
            data=JSON.parse(data);
        var participants = data['participants'];
        var tableHtml = "";
        for (var cp=1; cp<=participants.length; cp++){
            participants[cp-1]['ID']=cp;
            tableHtml += "<tr data-index=" + cp.toString() + ">";
            for (var cc=1; cc<=tableColumns.length; cc+=1){
                var thisProperty = tableColumns[cc-1];
                var thisId=thisProperty + "_" + cp.toString();
                if(propertyOptions.hasOwnProperty(thisProperty)){
                    tableHtml += "<td id=\"td_" + thisId + "\"><select class=\"selectpicker\" onchange=\"saveTableAnnotation(this)\" id=\"" + thisId + "\">";
                    tableHtml += "<option value=\"-1\">--CHOOSE--</option>";
                    for (var opt=0; opt<propertyOptions[thisProperty].length; opt++){
                        tableHtml += "<option value=\"" + propertyOptions[thisProperty][opt] + "\">" + propertyOptions[thisProperty][opt] + "</option>";
                    }
                    tableHtml += "</select></td>";
                } else{
                    /*if (tableColumns[cc-1]=="AgeGroup") {
                        var agValue = classifyAge(participants[cp-1][tableColumns[cc-2]]);
                        tableHtml += "<td id=\"td_" + thisId + "\">" + agValue + "</td>";
                        //var nameInPartData = "Age Group";
                    } else { */
                    var nameInPartData = tableColumns[cc-1];
                    tableHtml += "<td id=\"td_" + thisId + "\">" + (participants[cp-1][nameInPartData] || "") + "</td>";
                    //}
                }
            }
            tableHtml += "</tr>";
        }

        var str_html = "<h5>A) INFO</h5><label id=\"strloc\">Location:</label> " + data['address'] + ", " + data['city_or_county'] + ", " + data['state'] + "<br/><label id=\"strtime\">Date:</label> " + data['date'] + ", <label>Killed:</label> " + data['num_killed'] + ", <label>Injured:</label> " + data['num_injured'];
        $('#strtable tbody').html(tableHtml);
        $("#strinfo").html(str_html);
        $(".fixed-table-body").height($("#strtable").height())
        $(".fixed-table-container").height($("#strtable").height())
        cback();
    });
}

var refTextsInfo = function(refTxts){
    var sources = "";
    $(refTxts).each(function(index,value){ 
        sources+="<a href=\'" + value.source + "\'>article" + (index+1).toString() + "</a> ";
    });
    $("#addedTxts").html("Manually added reference texts for this incident: " + refTxts.length.toString() + " (" + sources + ")");
}

function count_occurences(str, char_to_count){
        return str.split(char_to_count).length - 1;
}

var getAllInfo = function(inc){
    $.get("/getincinfo", {'inc': inc}, function(data, status) {
        var d = JSON.parse(data);
        var task = 'str';
        getExistingAnnotations(inc, task, function(str_anns){ 
            getExistingDisqualified(inc, task, function(disqualified){
            getExistingRefDocs(inc, task, function(refTxts){
            $(".datepicker").datepicker("update", '');
            if (str_anns){
                $("#location").val(str_anns["location"]);
                $("#participants").val(str_anns["participants"] || "");
                $("#numparticipants").val(str_anns["numparticipants"] || 0);
                var incTime = str_anns["time"];
                if (incTime!=""){
                    var numDashes = count_occurences(incTime, '-');
                    console.log(numDashes);
                    console.log(incTime);
                    if (numDashes==2) $('#pickday').datepicker("update", incTime);
                    else if (numDashes==1) $('#pickmonth').datepicker("update", incTime);
                    else if (numDashes==0) $('#pickyear').datepicker("update", incTime);
                }
            } else{
                $("#location").val(d["estimated_location"]);
                $('#pickday').datepicker("update", d["estimated_incident_date"]);//.datepicker('update');;
                $("#participants").val("");
                $("#numparticipants").val(0);
                //$("#pickday").val(d["estimated_incident_date"]);
            }

            var allHtml="";
            $("#pnlLeft").html("");
            for (var i=0; i<d['articles'].length; i++){
                var body="";
                var header="";
                var doc_id = inc + "_" + (i+1).toString();
                if (!disqualified || disqualified.indexOf(doc_id)==-1) var disq = false;
                else var disq = true;

                var article = d['articles'][i];
                if (disq) header = "<div class=\"panel panel-default disqualified\" id=\"" + doc_id + "\">";
                else header = "<div class=\"panel panel-default\" id=\"" + doc_id + "\">";
                header += "<div class=\"panel-heading\"><h4 class=\"panel-title\">" + article['title'] + "&nbsp;(<i>Published on: <span id=" + doc_id + "dct>" + article['dct'] + "</span></i>) ";
                if (!disq) header += "<button class=\"btn btn-primary\" id=\"btn" + doc_id + "\" onclick=\"toggleDisqualify(\'" + doc_id + "\', \'" + task + "\')\">Mark non-relevant</button>";
                else header += "<button class=\"btn btn-primary\" id=\"btn" + doc_id + "\" onclick=\"toggleDisqualify(\'" + doc_id + "\', \'" + task + "\')\">Mark relevant</button>";
                header += "</h4></div>";
                body = "<div class=\"panel-body\">" + article['body'] + "</div>";
                allHtml += header + body + "</div>";
            }
            $("#pnlLeft").html(allHtml);
            refTextsInfo(refTxts);
            });
            });
        });
    });
}

var getSpanTextById = function(ann_key){
    return $("#" + ann_key.replace(/\./g,'\\.')).html().split('<sub>')[0];
}

var uniqueChains = function(){
    var chains = {};
    var to_skip = [];
    for (ann_key in annotations){
        var element = annotations[ann_key];
        var this_chain = [element["eventtype"], element["participants"] || "NONE", element["cardinality"]].join('#');
        if (!element["mwu"])
            var text = getSpanTextById(ann_key);
        else {
            if (to_skip.indexOf(ann_key)>-1) continue;
            var textArray = [];
            var mwus = element['mwu'];
            for (var i=0; i<mwus.length; i++){
                textArray.push(getSpanTextById(mwus[i]));
                to_skip.push(mwus[i]);
            }
            var text = textArray.join(" ");
        }
        if (this_chain in chains)
            chains[this_chain].push(text);
        else chains[this_chain]=[text];
    }
    return chains;
}

var showTrails = function(){
    var chains = uniqueChains();
    var items = [];
    for (chain in chains) {
        var my_item = '<span class="bolded event_' + chain[0] + '">' + chain + '<br/>(' + chains[chain].join(',') + ')</span>';
        items.push(my_item);
    }
    $("#trails").empty().html(items.join("<br/>"));
}

var classifyAge = function(age) {

    console.log(age);
    age=parseInt(age);
    if (age<12) return "Child 0-11";
    else if (age<18) return "Teen 12-17";
    else if (age<65) return "Adult 18-64";
    else return "Senior 65+";
}

// Load incident - both for mention and structured annotation
var loadIncident = function(task){
    setOfSelected = [];
    var inc = $("#pickfile").val();
    if (inc!="-1"){
        $("#incid").html(inc);
        //$("#annotation").show();
        $("#infoMessage").html("");
        $(".ann-input-m").show();
        $(".ann-input-s").show();
        getStructuredData(inc, function(){
            $.post('/loadannotations', {'task': 'str', 'incident': inc}, function(data, status){
                if (!data) {console.log('There are no previous structured annotations done by this user for this incident.'); tableAnnotations={};}
                else {
                    console.log("Loaded previous structured annotations!");
                    tableAnnotations=data;
                    Object.keys(tableAnnotations).forEach(function(key) {
                        var property = tableAnnotations[key].split('_')[1];
                        $('#' + key).val(tableAnnotations[key]);
                    })
                }
            });
        });
        loadTextsFromFile(inc);
        $("#pnlRight").show();
        //$("#bigdiv").height("350px");

   } else{
        printInfo("Please select an incident");
    }
}

var getAnnotatedDate=function(){
    return $("#pickday").val() || $("#pickmonth").val() || $("#pickyear").val();
}

var saveStructuredAnnotation = function(){
    $.post("/storeannotations", {'annotations': tableAnnotations, 'task': 'str', 'incident': $("#pickfile").val()}, function(data, status){
        printSuccess("Annotation of property value saved!");
    });
}

var addText = function(){
    var title = $("#newTitle").val();
    var dct = $("#newDct").val();
    var source = $("#newSource").val();
    var content = $("#newBody").val();
    if (title && content && dct && source){
        var newDoc = {'title': title, 'content': content, 'dct': dct, 'source': source};
        refDocs.push(newDoc);
        $.post("/storereftexts", {'documents': refDocs, 'task': 'str', 'incident': $("#pickfile").val()}, function(data, status){
            alert("Reference text stored. Now re-loading");
            location.reload();
        });
    } else{
        printInfo("Please fill all fields for the new reference text: TITLE, DCT, SOURCE URL, and CONTENT/BODY.");
    }
}
