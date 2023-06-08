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

function getCookie(name){
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;

}


function writeCasetoDjango(selectedCase){
    var csrf = getCookie('csrftoken');

    $(document).ready(function(){
        $.ajax({
            method: "POST",
            url:"save-case/",
            headers: {
                'X-CSRFToken': csrf
            },
            data:{"SelectedCase": JSON.stringify(selectedCase)},
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
    // window.location.href = dir;
}
