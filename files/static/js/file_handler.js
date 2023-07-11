"use strict";

function getCases(fileElemId){
    return new Promise(function(resolve){
        var cases = "";
        const csv = document.getElementById(fileElemId);
        if(!csv){
            console.log("Exception trace: Element csv not found!");
            resolve (cases);
        }
        
        var file = csv.files[0];
        if(!file){
            console.log("Exception trace: No file found!");
            resolve (cases);
        }else if (file.type != "text/csv"){
            console.log("Exception trace: Incorrect file type!");
            resolve (cases);
        }
    
        readCSVFile(file).then((response) => {
            if(!setHeaders(response)){
                console.log("Exception trace: setHeaders()");
                resolve (cases);
            }
            var cases = stringToArray(response);
            if(!cases){
                console.log("Exception trace: stringtoArray()");
                resolve (cases);
            }
            resolve (cases);
        });
    });
}

//Reads .csv file provided.
function readCSVFile(file) {
    return new Promise(function(resolve){
        const fReader = new FileReader();
        fReader.addEventListener("load", function(output){
            resolve(output.target.result);           
        })
        fReader.readAsText(file);    
    });    
}

function setHeaders(fileString){
    var headers = fileString.slice(0, fileString.indexOf("\n")).split(",");
    localStorage.setItem("Headers", JSON.stringify(headers));

    return true;
}

//Writes csv to JS array.
function stringToArray(caseString){  
    var cases = "";

    var caseRows = splitRows(caseString); 
    if(!caseRows){
        console.log("Exception trace: splitRows()");
        return cases;
    }

    caseRows = splitRowElements(caseRows);
    if(!caseRows){
        console.log("Exception trace: splitRowElements()");
        return cases;
    }

    //Resolve: Exceptions in sentence splitting due to ','
    caseRows = splitSentence(caseRows);
    if(!caseRows){
        console.log("Exception trace: splitSentence()");
        return cases;
    }

    var cases = splitCases(caseRows);
    if(!cases){
        console.log("Exception trace: splitCases()");
        return cases;
    }

    return cases;
}

function splitRows(caseString){
    return caseString.slice(caseString.indexOf("\n") + 1).split("\n");
}

function splitRowElements(rows){
    for(var i in rows){
        rows[i] = rows[i].split(",");
        for (var j in rows[i]){
            rows[i][j] = rows[i][j].trim();
        }
    }

    return rows;
}

function splitSentence(rows){
    var roles = ["<new-case>", "TEXTUAL", "FACT", "PROCEEDINGS", 
    "FRAMING", "BACKGROUND", "NONE", "DISPOSAL", "<prep-date>"];

    for(var i in rows){
        var elem = rows[i][getHeaderIndex("text")+1];
            while(elem && !roles.includes(elem)){
                rows[i][getHeaderIndex("text")] = rows[i][getHeaderIndex("text")] + ", " + elem;
                rows[i].splice(getHeaderIndex("text")+1, 1);
                elem = rows[i][getHeaderIndex("text")+1];
            }
    }

    return rows;
}

function getHeaderIndex(str){
    var headers = JSON.parse(localStorage.getItem("Headers"));
    return headers.indexOf(str);
}
function getHeaderTag(index){
    var headers = JSON.parse(localStorage.getItem("Headers"));
    return headers[index];
}

function getText(num){
    var _case = JSON.parse(localStorage.getItem("Case"));
    for(var i in _case){
        if(_case[i][getHeaderIndex("sentence_id")] == num){
            return _case[i][getHeaderIndex("text")];
        }
    }    
}

function splitCases(cases){
    for(var i=0;i<cases.length;i++){
        if(!cases[i][getHeaderIndex("case_id")]){
            cases.splice(i, 1);
            i--;
        }
    }

    var casesArray = []; 
    var j = 0;
    for(var i=0;i<cases.length;i++){
        if(cases.length == 1){
            casesArray.push(cases.slice(i, 1));
        }else if(i == cases.length-1){
            if (i == j){
                casesArray.push(cases.slice(i, 1));
            }else{
                casesArray.push(cases.slice(j, cases.length));
            }
        }else if (cases[i][getHeaderIndex("case_id")] != cases[i+1][getHeaderIndex("case_id")]){
            casesArray.push(cases.slice(j, i+1));
            j = i+1;
        }
    }  
   
    return casesArray;
}



