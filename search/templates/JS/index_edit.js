"use strict"

function showEdit(){
    if (debug){
        console.log("DEBUG: Init showEdit()");
    }

    drawLayoutEdit();
    fillEdit();
}   

function drawLayoutEdit(){
    var cont = document.getElementById("MainContent");

    //Header
    var row = document.createElement("div");
    row.type = "row";
    row.id = "MainEditHeader";
    
    var input = document.createElement("input");
    input.type = "file";
    input.id = "EditField";
    input.accept = ".csv";

    row.appendChild(document.createTextNode("Select EDIT: "));
    row.appendChild(input);
    cont.appendChild(row);

    //Body
    var row = document.createElement("div");
    row.type = "row";
    row.id = "MainEditBody";
    
    cont.appendChild(row);

    //Footer
    var row = document.createElement("div");
    row.type = "row";
    row.id = "MainEditFooter";
    
    cont.appendChild(row);
}

function fillEdit(){
    var corpus;
    loadCSV("CorpusField").then((text) => {  
        corpus = text;      
        if(!corpus){
            console.log("Error: Failed to load Corpus file!");
            return;             
        }   

        var input = document.getElementById("EditField");
        input.addEventListener("change", function(){
            loadCSV("EditField").then((text) => {
                fillChanges(text);                
            });       
        });

        var cont = document.getElementById("MainEditFooter");
        var btn = document.createElement("a");
        btn.type = "button";
        btn.className = "btn btn-success text-white";
        btn.innerHTML = "Apply Changes";
        btn.addEventListener("click", function(){
            var changes = [];

            var num = 0;
            var line = document.getElementById(num + "Change");
            while(line){
                var val = line.value;
                console.log(val);
                if(document.getElementById(num + "Check").checked){
                    changes.push(val);
                }
                num++;
                line = document.getElementById(num + "Change");
            }

            for(var i in changes){
                for (var k in corpus){
                    if(corpus[k][0][getHeaderIndex("case_id")] == 
                    changes[i][getHeaderIndex("case_id")]){
                        for (var l in corpus[k]){
                            if(corpus[k][l][getHeaderIndex("sentence_id")] == 
                            changes[i][getHeaderIndex("sentence_id")]){
                                corpus[k].splice(l, 1, changes[i]);                                    
                            }
                        }
                    }                        
                }
            }
            var file = createFile(createCorpus(corpus));

            btn.setAttribute('href', window.URL.createObjectURL(file));
            btn.setAttribute('download', ("Corpus " + (new Date().toUTCString()) + ".csv"));    
        });
        cont.appendChild(btn);        
    });    
}

function fillChanges(text){
    var newData = text;
    if(!newData){
        console.log("Error: Failed to load EditField file!");
        return;             
    }  

    var cont = document.getElementById("MainEditBody");
    var child = cont.lastChild;
    while(child){
        cont.removeChild(child);
        child = cont.lastChild;
    }
    
    var num = 0;
    for (var i in newData){
        var row = document.createElement("div");
        row.className = "row";
        row.appendChild(document.createTextNode("Case: " + newData[i][0][getHeaderIndex("case_id")]));
        
        cont.appendChild(row);
        for(var j in newData[i]){
            var row = document.createElement("div");
            row.className = "row";
            row.value = newData[i][j];
            row.id = num + "Change";

            var input = document.createElement("input");
            input.className = "col";
            input.type = "checkbox";
            input.id = num + "Check";
            row.appendChild(input);

            for(var k in newData[i][j]){
                var col = document.createElement("div");
                col.className = "col border";
                col.style.overflow = "hidden";
                col.style.maxHeight = "10vh";
                col.id = num + getHeaderTag(k);
                col.appendChild(document.createTextNode(newData[i][j][k]));
                row.appendChild(col);
            }
            cont.appendChild(row);
            num++;                        
        }                    
    }    
}