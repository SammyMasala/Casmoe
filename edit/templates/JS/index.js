"use strict"
var debug = 1;
this.addEventListener("load", start);

function start(){
    if(debug){
        console.log("DEBUG: Init start() for index_nav.js");
    }

    var f = document.getElementById("CorpusField");
    if (!f){
        console.log("Error: Element 'CorpusField' not found!");
    }else{
        f.addEventListener("change", function(){
            loadContent("search");
        });
    }
}

function clearContent(){
    if(debug){
        console.log("DEBUG: Init clearContent()");
    }

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

function loadContent(str){
    clearContent();

    switch(str){
        case "search":
            showSearch();
            break;
        case "edit":
            showEdit();
            break;
    }
}

function changePage(_case){
    if(debug){
        console.log("DEBUG: Init changePage()")
    }
    localStorage.setItem("Case", JSON.stringify(_case));
    window.location.href = "case.html";
}
