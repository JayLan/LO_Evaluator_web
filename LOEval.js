// *** //
/*
Learning Objective Evaluator
v 1.0


*/
var fileMessage = document.getElementById('results');
var fileDisplay = document.getElementById('fileDisplay');

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

//notes: 
// AVerb = Action Verb (i.e. Explain, Distinguish, Identify etc.)
// Punct = Punctuation
// Capt = Capitalized

var LO = {
    LOStmnt     :   "",
    AVerbCount  :   0,
    mainAVerb   :   "",
    suppAVerb   :   "",
    numAVerbs   :   0,
    isPunct     :   false, // Bool
    isStmnt     :   false, // Bool
    isCapt      :   false, // Bool
    getReport   :   function() {
        document.write(
            "<br>Num of Action Verbs: " + this.AVerbCount + 
            "<br>Main Action Verb: " + this.mainAVerb + 
            "<br>Supplemental Action Verb: " + this.suppAVerb + 
            "<br>capitilized: " + this.isCapt);
    }// END getReport
};

//var Objective = Object.create(LO);

//Objective.getReport();

//alert("Test-2: "+ Objective.name);



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
    var lastChar = x.charAt(x.length-1); // get last character of string
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
    //alert(y.isCapt);
}

if (window.File && window.FileReader){
 // success with File API  
    
}else{
    alert("This browser does not support uploading of files. Choose a different browser!");
}

// // // // //
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

// * find action verbs recursively? Allows to find multiple action verbs <= 2n.
// Check first word against action verb dictionary => no match = 

function parse(result) {

    var objArr = []; // array of Objective objects
    var now = result;
    var newRow;
    var newCell;
    
    for(var i =0; i < now.length; i++){
        
        //alert(now[i].capitalize() + " // -> ");
        var Objective = Object.create(LO); // Create Objective object
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
            //"<td>" + spaces(2) + "|" + spaces(2) + "<span id='punct'>PUNCTUATED: </span>" + Objective.isPunct + "</td>"; //"<br/>"; // Display results

        
        objArr[i] = Objective; // store Objective object in array
        //alert("The Learning objective is: \n" + objArr[i].LOStmnt +
        //      "\nLO: " + (i+1) + " " + objArr[i].isPunct + " " + objArr[i].isStmnt);
 
        
    }
        newRow = document.getElementById("table1").insertRow(0);
        newCell = newRow.insertCell(0);
        newCell.colSpan = 2;
        newCell.innerHTML = "<span class='LOInfo'>Number of learning objectives: </span>" + objArr.length;
    

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

window.onload = function(){
 uploadFile();   
};


/*
/// /// /// /// ///
Input file format

Line #  |   Learning Objective
------------------------------
1.      |   LO1
2.      |   LO2
3.      |   LO3

** give input option to add Bloom's Taxonomy levels to final output

/// /// /// /// ///
*/


/// /// /// /// ///
/*


*/

