// *** //
/*
Learning Objective Evaluator
v 1.0
© Jason Lancaster, ALL RIGHTS RESERVED
*/

var BloomsTax = {
    getLevel: function(m){
        return this[m];
    },
    getVersion: function(m){
        return this["version"];
    },
    
};

    BloomsTax["version"]        = "Bloom's Taxonomy - Revised";
    BloomsTax["Create"]         = "6";
    BloomsTax["Evaluate"]       = "5";
    BloomsTax["Analyze"]        = "4";
    BloomsTax["Apply"]          = "3";
    BloomsTax["Understand"]     = "2";
    BloomsTax["Remember"]       = "1";
    BloomsTax[6]                = "Create";
    BloomsTax[5]                = "Evaluate";
    BloomsTax[4]                = "Analyze";
    BloomsTax[3]                = "Apply";
    BloomsTax[2]                = "Understand";
    BloomsTax[1]                = "Remember";


// action verb dictionary
var aVerbDict = {};
        
    // CREATE : Bloom's Taxonomy level 6
    aVerbDict["Assemble"]       = "Create";
    aVerbDict["Combine"]        = "Create";
    aVerbDict["Compose"]        = "Create";
    aVerbDict["Construct"]      = "Create";
    aVerbDict["Design"]         = "Create";
    aVerbDict["Develop"]        = "Create";
    aVerbDict["Formulate"]      = "Create";
    aVerbDict["Generate"]       = "Create";
    aVerbDict["Hypothesize"]    = "Create";
    aVerbDict["Modify"]         = "Create";
    aVerbDict["Plan"]           = "Create";
    aVerbDict["Program"]        = "Create";

    // EVALUATE : Bloom's Taxonomy level 5
    aVerbDict["Check"]          = "Evaluate";
    aVerbDict["Conclude"]       = "Evaluate";
    aVerbDict["Critique"]       = "Evaluate";
    aVerbDict["Detect"]         = "Evaluate";
    aVerbDict["Estimate"]       = "Evaluate";
    aVerbDict["Judge"]          = "Evaluate";
    aVerbDict["Justify"]        = "Evaluate";
    aVerbDict["Rank"]           = "Evaluate";
    aVerbDict["Reflect"]        = "Evaluate";
    aVerbDict["Test"]           = "Evaluate";
    aVerbDict["Verify"]         = "Evaluate";
    aVerbDict["Weigh"]          = "Evaluate";

    // ANALYZE : Bloom's Taxonomy level 4
    aVerbDict["Choose"]         = "Analyze";
    aVerbDict["Compare"]        = "Analyze";
    aVerbDict["Contrast"]       = "Analyze";
    aVerbDict["Correlate"]      = "Analyze";
    aVerbDict["Deconstruct"]    = "Analyze";
    aVerbDict["Determine"]      = "Analyze";
    aVerbDict["Differentiate"]  = "Analyze";
    aVerbDict["Distinguish"]    = "Analyze";
    aVerbDict["Integrate"]      = "Analyze";
    aVerbDict["Organize"]       = "Analyze";
    aVerbDict["Outline"]        = "Analyze";
    aVerbDict["Parse"]          = "Analyze";
    aVerbDict["Trace"]          = "Analyze";

    // APPLY : Bloom's Taxonomy level 3
    aVerbDict["Calculate"]      = "Apply";
    aVerbDict["Carry Out"]      = "Apply";
    aVerbDict["Derive"]         = "Apply";
    aVerbDict["Employ"]         = "Apply";
    aVerbDict["Execute"]        = "Apply";
    aVerbDict["Graph"]          = "Apply";
    aVerbDict["Implement"]      = "Apply";
    aVerbDict["Report"]         = "Apply";
    aVerbDict["Simulate"]       = "Apply";
    aVerbDict["Solve"]          = "Apply";
    aVerbDict["Tabulate"]       = "Apply";
    aVerbDict["Write"]          = "Apply";

    // UNDERSTAND : Bloom's Taxonomy level 2
    aVerbDict["Characterize"]   = "Understand";
    aVerbDict["Clarify"]        = "Understand";
    aVerbDict["Classify"]       = "Understand";
    aVerbDict["Discuss"]        = "Understand";
    aVerbDict["Explain"]        = "Understand";
    aVerbDict["Extrapolate"]    = "Understand";
    aVerbDict["Illustrate"]     = "Understand";
    aVerbDict["Interpret"]      = "Understand";
    aVerbDict["Map"]            = "Understand";
    aVerbDict["Paraphrase"]     = "Understand";
    aVerbDict["Summarize"]      = "Understand";
    aVerbDict["Translate"]      = "Understand";

    // REMEMBER : Bloom's Taxonomy level 1
    aVerbDict["Cite"]           = "Remember";
    aVerbDict["Define"]         = "Remember";
    aVerbDict["Describe"]       = "Remember";
    aVerbDict["Identify"]       = "Remember";
    aVerbDict["Label"]          = "Remember";
    aVerbDict["List"]           = "Remember";
    aVerbDict["Locate"]         = "Remember";
    aVerbDict["Match"]          = "Remember";
    aVerbDict["Order"]          = "Remember";
    aVerbDict["Recite"]         = "Remember";
    aVerbDict["Recognize"]      = "Remember";
    aVerbDict["State"]          = "Remember";


var fileMessage = document.getElementById('results');
var fileDisplay = document.getElementById('fileDisplay');
var noAVerb = []; // array to hold action verbs not currently in the dictionary

// outputs HTML "tabs" (grouping of non-breaking spaces) given argument input
function tab(n){
    var tab = "";
    for(var i = 0; i <= n; i++){
        tab += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"; // 8-space "tab"
    }
    return tab;
}

// outputs HTML non-breaking spaces given argument input
function spaces(n){
    var space = "";
    for(var i = 0; i <= n; i++){
        space += "&nbsp"; // space
    }
    return "<span id='spacedOut'>" + space + "</span>";
}

/* 
Learning Objective Object:
    AVerb = Action Verb (i.e. Explain, Distinguish, Identify etc.)
    Punct = Punctuation
    Capt = Capitalized
*/

var LO = {
    LOStmnt     :   "",
    AVerbCount  :   0,
    mainAVerb   :   "",
    suppAVerb   :   "",
    numAVerbs   :   0,
    isPunct     :   false, // Bool
    isStmnt     :   false, // Bool
    isCapt      :   false, // Bool

};

//////////////////////////////////
var LOCount = 0;
var spacingCount = 0;
var readResult;

// extend String object with a capitalize first letter of first word method
String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase() + this.slice(1);
}

// check if learning objective statement has end punctuation. Period is the only acceptable punctuation for the statement.
function hasPunctuation(x, y){
    var lastChar = x.charAt(x.length-1);
    if(lastChar != '.'){
                   
        if(lastChar == '?'){
            //alert("*** This is not a valid LO: it is formatted as a question. ***");
            y.isPunct = true;
            y.isStmnt = false;
        }else if(lastChar == " "){
            //alert("*** There is no punctuation at the end of this statement. ***"); 
            y.isPunct = false;
            y.isStmnt = false;
        }
    }   
    else{
        y.isPunct = true;
        y.isStmnt = true;
    }
    

}

// check if learning objective statement is capitalized
function isCaptalized(x, y){
    //get char code and determine distance for capital.
    if(x.charCodeAt(0) >= 97 && x.charCodeAt(0) <= 122){
        y.isCapt = false; 
        
    }else{
        y.isCapt = true;   
    }
}

if (window.File && window.FileReader){
    
}else{
    alert("This browser does not support uploading of files. Choose a different browser!");
}

// * find action verbs recursively? Allows to find multiple action verbs <= 2n.
// Check first word against action verb dictionary => no match = 

function parse(result) {

    var objArr = []; // array of Objective objects
    var now = result;
    var newRow;
    var newCell;
    
    console.log(BloomsTax.version);
    console.log(BloomsTax.getLevel(3));
    
    if("Describe" in aVerbDict){
     console.log(aVerbDict.Describe);   
    }
    
    for(var i =0; i < now.length; i++){
        
        //alert(now[i].capitalize() + " // -> ");
        var Objective = Object.create(LO); // Create Learning Objective object
        Objective.LOStmnt = now[i]; // set objective statement (the "learning objective")
         //alert(Objective.LOStmnt);
        hasPunctuation(Objective.LOStmnt, Objective);
        isCaptalized(Objective.LOStmnt, Objective);
        
        // *** //
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = i + 1 + spaces(2);
        
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = Objective.LOStmnt + tab(1);
        
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'>STATEMENT: </span>" + Objective.isStmnt;
        
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='caps'>CAPITALIZED: </span>" + Objective.isCapt;
        
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='punct'>PUNCTUATED: </span>" + Objective.isPunct;
        
        //fileDisplay.innerHTML += "<td>" + Objective.LOStmnt + "</td>"; //"<br/>";
        //+ tab(8) + "|" + spaces(2) + "<span id='stmnt'>STATEMENT: </span>" + Objective.isStmnt + spaces(2) + "|" + spaces(2) + "<span id='caps'>CAPITALIZED: </span>" + Objective.isCapt + spaces(2) + "|" + spaces(2) + "<span id='punct'>PUNCTUATED: </span>" + Objective.isPunct + "<br/>"; // Display results
        
        //feedbackDisplay.innerHTML += "<td>" + "<span id='stmnt'>STATEMENT: </span>" + Objective.isStmnt + "</td>" +
            //"<td>" + spaces(2) + "|" + spaces(2) + "<span id='caps'>CAPITALIZED: </span>" + Objective.isCapt + "</td>" +
            //"<td>" + spaces(2) + "|" + spaces(2) + "<span id='punct'>PUNCTUATED: </span>" + Objective.isPunct + "</td>"; //"<br/>"; // Display result
        
        
        
        objArr[i] = Objective; // store Objective object in array
        //alert("The Learning objective is: \n" + objArr[i].LOStmnt +
        //      "\nLO: " + (i+1) + " " + objArr[i].isPunct + " " + objArr[i].isStmnt); 
    }

        /////////
        // *** hard coded data for mockup/sim screenshot - to be deleted ***
    
        // *** ROW
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "54" + spaces(2);
    
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span class='aVerb1'>Identify</span> and <span class='aVerb2'>describe</span> <span class='ambTerms'>some</span> key elements used in business-to-business marketing." + tab(1);
        
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'>A-VERBS: </span>" + "2";
    
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'>AMB TERMS: </span>" + "true";
    
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'></span>";
    
        // *** ROW
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'></span>";
    
        newCell = newRow.insertCell(-1);
        newCell.colSpan = 5;
        newCell.innerHTML ="<span class='noteLabel'>NOTE:</span> <span class='note'>This LO has multiple action verbs! Re-write the LO as separate statements of performance, or use one action verb to support the main action verb - as indicated below.</span>";    
        
        // *** ROW
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'></span>";
    
        newCell = newRow.insertCell(-1);
        newCell.colSpan = 5;
        newCell.innerHTML ="<span class='noteLabel'>NOTE:</span> <span class='note'>This LO has ambiguous term(s) as indicated with partial borders. Replace the term(s) with the expected quantity, or remove the term(s).</span>";    
    
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = tab(0.5) + "<span class='altLabel'>ALT STATEMENT:</span> \"<span class='aVerb1'>Identify</span> <span class='ambTerms'>some</span> key elements used in business-to-business marketing.\"";
    
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = tab(0.5) + "<span class='altLabel'>ALT STATEMENT:</span> \"<span class='aVerb2'>Describe</span> <span class='ambTerms'>some</span> key elements used in business-to-business marketing.\"";
    
        // *** ROW
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "55" + spaces(2);
    
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "Given data on the nominal interest rate and inflation, <span class='ambTerms'>be able to</span> calculate the real interest rate.";
        
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'>GIVENS: </span>" + "true";
    
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'>AMB Terms: </span>true";
    
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'></span>";
    
        // *** ROW
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'></span>";
    
        newCell = newRow.insertCell(-1);
        newCell.colSpan = 5;
        newCell.innerHTML ="<span class='noteLabel'>NOTE:</span> <span class='note'>This LO has ambiguous terms as indicated with partial borders.</span>";   
    
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = tab(0.5) + "<span class='altLabel'>ALT STATEMENT:</span> \"Given data on the nominal interest rate and inflation, Calculate the real interest.\"";
    
        // *** ROW
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "56" + spaces(2);
    
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span class='aVerbNF'>Trace</span> westard expansion during the gold rush of 1849.";
        
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'>STATEMENT: </span>" + "true";
    
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'>A-VERBS: </span>" + "1";
    
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'>AMB TERMS: </span>" + "false";

    
        // *** ROW
        newRow = document.getElementById("table1").insertRow(-1);
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = "<span id='stmnt'></span>";
    
        newCell = newRow.insertCell(-1);
        newCell.colSpan = 5;
        newCell.innerHTML ="<span class='noteLabel'>NOTE:</span> <span class='note'>This LO has an action verb not found in the current dictionary!</span>";    

    
        //END *** hard coded data ***
        /////////
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class=''>Action Verb Statistics </span>";
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Number of learning objectives: </span>" + objArr.length;
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>VERB </span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>% FREQ </span>";
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Define:</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>11.76% </span>";
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Describe:</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>23.53% </span>";
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Discuss:</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>17.65% </span>";
    ///
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Explain:</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>29.41% </span>";

        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Outline:</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>&nbsp5.88% </span>";
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>State:</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>&nbsp5.88% </span>";
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Trace:</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>&nbsp5.88% </span>";
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Most frequent action verb(s):</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>@ 29.41%  Explain </span>";
    
        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Least frequent action verb(s):</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='LOInfo'>@  &nbsp5.88%  Outline, State, Trace </span>";

        newRow = document.getElementById("table2").insertRow(-1);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Action verbs not found in dictionary:</span>";
    
            newCell = newRow.insertCell(-1);
            //newCell.colSpan = 2;
            newCell.innerHTML = "<span class='notLO'>Briefly, How, What </span>";


}

function tokens(lineArr){
    var lines = lineArr;
    
}

function uploadFile() {

    var fileInput = document.getElementById('fileInput');
 
    fileInput.addEventListener('change', function(e) {
        var file = fileInput.files[0];
        var textType = /text.*/;

        if (file.type.match(textType)) {
            var reader = new FileReader();
                        
            reader.onloadend = function(e) {
                readResult = reader.result;
                var lines = readResult.split("\n"); // create array of strings (learning objectives) at newline char
                //var LOs = objectify(lines);
                //tokens(lines); // pass array of strings to parser
                
                //fileDisplay.innerText = readResult;//reader.result;
                parse(lines); // pass array of strings to parser
                //displayIt(readResult);
               //alert(readResult);
            }

            reader.readAsText(file);
            //alert("Result" + reader.result);
        } else {
            fileMessage.innerText = "This file type not supported!"
        }

    });
   
}

    var CP_upload = document.getElementById("CPInput");
    CP_upload.onclick = function(){
    var newWin = window.open(
    "",
    "_blank",
    "toolbar=0,menubar=0,title=1,location=1,resizable=1,scrollbars=1,status=1, width=725px, height=650px, left=250px, top=100px"
    );

    newWin.document.write('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""http://www.w3.org/TR/html4/strict.dtd">'+ 
'<html><head><link rel="stylesheet" href="LOEval.css"><title>LO Upload</title></head><body><div id="newly"><textarea id="whiteBox"></textarea><input type="submit" value="Upload"/></div></body></html>');
    }//end CP_upload

window.onload = function(){
 uploadFile();   
};

















/// /// /// /// ///
// DEPRECATED CHECK BEFORE DELETION //
// parsing functions //
/*

function numActionVerbs(){
    
}

function hasAmbiguousTerms()
// "some", etc.

}

function unkChars(){

}

// // // // //
*/

/*
function printObjectives(objArr){
    arr = objArr;
    for(var t = 0; t < arr.length; t++){
        fileDisplay.innerText = "The learning objective is: " + objArr[i].LOStmnt +"\n";   
    }
}
*/

