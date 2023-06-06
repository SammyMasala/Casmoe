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
        // case "edit": /// Deprecated: pending rewrite
        //     showEdit();
        //     break;
    }
}


function writeCasetoDjango(_case){
    $(document).ready(function(){
        $.ajax({
            method: "POST",
            url:"select-case/",
            data:{"SelectedCase": JSON.stringify(_case)},
            success: function (data){
                alert("yay");
                /*window.location.href = "case.html"*/

            },
            error: function (data) {
                alert("mission failed");
            }
        });
    });
}

function changePage(dir){
    window.location.href = dir;
}
