"use strict"

function showSearch(){

    drawLayoutSearch();
    fillSearch();    
}

function drawLayoutSearch(){
    var cont = document.getElementById("MainContent");
    if(!cont){
        console.log("Error: Element 'MainContent' not found!");
        return;
    }

    var row = document.createElement("div");
    row.className = "row";

    var input = document.createElement("input");
    input.type = "text";
    input.id = "CaseName";
    input.placeholder = "Case name....";

    row.appendChild(input);
    cont.appendChild(row);

    row = document.createElement("div");
    row.className = "row d-grid gap-1";
    row.id = "ResultBox";

    cont.appendChild(row);
}

function fillSearch(){    
    loadCSV("CorpusField").then((text) => {
        var corpus = text;
        if(!corpus){
            console.log("Error: Failed to load Corpus file!");
            return;             
        }

        listCases("", corpus);

        var input = document.getElementById("CaseName")        
        input.addEventListener("input", function(e){
            listCases(e.target.value, corpus); 
        });        
    });    
}

function listCases(str, arr){
    if(debug){
        console.log("DEBUG: Init listCases()");
    }

    const contentContainer = document.getElementById("ResultBox"); 
    if (!contentContainer){
        console.log("Error: Element 'resultBox' not found!");
        return;
    }
    var contentList = document.getElementById("ElementList");
    if (contentList == null){
        var list = document.createElement("list-style-type:none");
        list.id = "ElementList";
        
        contentList = list;
        contentContainer.appendChild(contentList);
    }

    //Clear List
    var child = contentList.lastElementChild;
    while(child){
        contentList.removeChild(child);
        child = contentList.lastElementChild;
    }

    for(var i in arr){
        var text = arr[i][0][getHeaderIndex("text")]; 
        if(!str || text.includes(str.toUpperCase())){         
        
            var row = document.createElement("div");
            row.className = "row mb-3";
            row.id = "CaseRow";

            var elem = document.createElement("button");

            var buttonId = "CaseButton" + contentList.children.length;
            elem.id = buttonId;
            elem.name = i;
            elem.innerHTML = text;
            elem.addEventListener("click", function(e){ 
                var index = e.target.name;
                changePage(arr[index]);
            });

            row.appendChild(elem);            
            contentList.appendChild(row);
        }      
    }           
}