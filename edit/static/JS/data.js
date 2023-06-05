"use strict"
var debug = 1;

function csvtoArray(str){
    if(debug){
        console.log("DEBUG: Init csvtoArray()");
    }

    var headers = str.slice(0, str.indexOf("\n")).split(",");
    localStorage.setItem("Headers", JSON.stringify(headers));
  
    var rows = str.slice(str.indexOf("\n") + 1).split("\n");
    rows = splitSentence(splitRowElements(rows));

    const cases = splitCases(rows);
    return cases;
}

function readFile(field) {
    return new Promise(function(resolve) {
        if (debug){
            console.log("DEBUG: Init readFile()");
        }

        const file = document.getElementById(field).files[0];
        if(!file){
            alert("ERROR: Null file received!")
        }else if(file.type != "text/csv"){
            alert("ERROR: Invalid file received!")
        }else{
            const fileLoaded = new Promise((resolve) =>{
                const reader = new FileReader();
                reader.addEventListener("load", function(e){
                    var text = e.target.result;    
                    text = csvtoArray(text);                                  
                    resolve(text);           
                })
                reader.readAsText(file);            
            });

            fileLoaded.then((text) =>{
                
                resolve(text);
            });
        }    
    });
}

function loadCSV(field){
    return new Promise(function(resolve){
        const loadFiles = new Promise((resolve) =>{
            readFile(field).then((text) => {
                resolve(text); 
            });               
        });
        
        loadFiles.then((text) => {
            if(!text){
                console.log("Error: File read failed! Details: Corpus");
                return;
            }
            resolve(text);      
        }); 
    });       
}

function splitRowElements(rows){
    if(debug){
        console.log("DEBUG: Init splitRowElements()");
    }

    for(var i in rows){
        rows[i] = rows[i].split(",");
        for (var j in rows[i]){
            rows[i][j] = rows[i][j].trim();
        }
    }

    return rows;
}

function getCaseData(str){
    return JSON.parse(localStorage.getItem(str));
}

function splitSentence(rows){
    if(debug){
        console.log("DEBUG: Init splitSentence()");
    }

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

function splitCases(rows){
    if(debug){
        console.log("DEBUG: Init splitCases()");
    }

    for(var i=0;i<rows.length;i++){
        if(!rows[i][getHeaderIndex("case_id")]){
            rows.splice(i, 1);
            i--;
        }
    }

    const cases = []; 
    var j = 0;
    for(var i=0;i<rows.length;i++){
        if(rows.length == 1){
            cases.push(rows.slice(i, 1));
        }else if(i == rows.length-1){
            if (i == j){
                cases.push(rows.slice(i, 1));
            }else{
                cases.push(rows.slice(j, rows.length));
            }
        }else if (rows[i][getHeaderIndex("case_id")] != rows[i+1][getHeaderIndex("case_id")]){
            cases.push(rows.slice(j, i+1));
            j = i+1;
        }
    }  
   
    return cases;
}

function writeCSV(arr){
    var str = "";

    for (var i in arr){
        for(var j in arr[i]){
            str = str + arr[i][j] + ",";
        }
        str = str + "\n";
    }  

    return str;
}

function getChanges(){
    var file = localStorage.getItem("Changes");    
    if(file){
        return JSON.parse(file);
    }
}

function saveChanges(file){
    return localStorage.setItem("Changes", JSON.stringify(file));
}

function createCorpus(arr){
    var str = JSON.parse(localStorage.getItem("Headers")) + "\n";
    for (var i in arr){
        str = str + writeCSV(arr[i]);
    }

    return str;
}

function createChanges(arr){
    var str = JSON.parse(localStorage.getItem("Headers")) + "\n" + writeCSV(arr);
    localStorage.removeItem("Changes");
    return str;
}

function createFile(str){
    if (debug){
        console.log("Init saveFile()");
    }
   
    var file = new Blob([str], {type:'text/csv'});
    return file;
}

function getColors(){
    var colors = [
        "#f44336", "#4caf50", "#e81e63", 
        "#3f51b5", "#2196f3", "#673ab7", 
        "#4caf50", "#ffeb3b", "#ff9800",
        "#607d8b"
    ];

    return colors;
}


