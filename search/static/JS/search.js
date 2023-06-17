"use strict"

function showSearch(){
    fillSearch();    
}

function fillSearch(){    
    getCases("CorpusField").then((text) => {
        var corpus = text;
        if(!corpus){
            console.log("Error: Failed to load Corpus file!");
            return;             
        }

        listCases("", corpus);        
    });    
}

function listCases(str, arr){
    const results = document.getElementById("ResultBox"); 
    if (!results){
        console.log("Error: Element 'resultBox' not found!");
        return;
    }
    var contentList = document.getElementById("ElementList");
    if (contentList == null){
        var list = document.createElement("list-style-type:none");
        list.id = "ElementList";
        
        contentList = list;
        results.appendChild(contentList);
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

            var elem = document.createElement("button");
            elem.className = "btn btn-light";

            elem.name = i;
            elem.innerHTML = text;
            elem.addEventListener("click", function(e){ 
                var index = e.target.name;
                writeCasetoDjango(arr[index]);

                //changePage("case.html");
            });

            row.appendChild(elem);            
            contentList.appendChild(row);
        }      
    }           
}

function changePage(url){
    window.location.href = url;
}