"use strict"

function showSearch(){
    fillSearch();    
}

function clearContent(){
    var container = document.getElementById("MainContent");
    if(!container){
        console.log("Error: Element 'MainContent' not found!");
        return;
    }

    var child = container.lastElementChild;
    while(child){
        container.removeChild(child);
        child = container.lastElementChild;
    }
}

function fillSearch(){    
    getCases("CorpusField").then((text) => {
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
                writeCasetoDjango(arr[index]);
                // changePage("case.html");
            });

            row.appendChild(elem);            
            contentList.appendChild(row);
        }      
    }           
}