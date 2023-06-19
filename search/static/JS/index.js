"use strict"
this.addEventListener("load", start);

function start(){
    if(!testFunc()){
        console.log("Testing failed! See log above.")
        return;
    }

    if(!addCorpusEventListener("CorpusField")){
        console.log("Exception trace: addCorpusEventListen()")
        return;
    }
}

function addCorpusEventListener(corpusId){
    var corpus = document.getElementById(corpusId);
    if (!corpus){
        console.log("Exception trace: Element corpus not found!");
        return false;
    }
    corpus.value = null;
    corpus.addEventListener("change", function(){
        getCases(corpusId).then((cases) => {
            if(!cases){
                console.log("Exception trace: getCasesFromFile()")
                return false;
            }
    
            if(!createCaseList("ResultBox", cases)){
                console.log("Exception trace: createCaseList()")
                return false;
            }
        })        
    });
    return true;
}

function createCaseList(listElementId, cases){
    const listElement = document.getElementById(listElementId); 
    if (!listElement){
        console.log("Exception trace: Element listElement not found!");
        return false;
    }

    //Clear List
    if(!clearElementChildren(listElementId)){
        console.log("Exception trace: clearElementChildren()");
        return false;
    }

    for(var i in cases){
        var caseTitle = cases[i][0][getHeaderIndex("text")]; 
        if (!caseTitle){
            continue;
        }
        
        var newButton = document.createElement("button");
        newButton.className = "btn btn-light";

        newButton.name = i;
        newButton.innerHTML = caseTitle;
        newButton.addEventListener("click", function(clickedButton){ 
            var caseIndex = clickedButton.target.name;
            if(!caseIndex){
                console.log("Exception trace: Value caseIndex not found!");
                //return false;
            }

            if(!writeCasetoDjango(cases[caseIndex])){
                ////console.log("Exception trace: writeCasetoDjango()"); //Django doesnt return true/false. Find another callback.
                //return false;
            }

            if(!updateUISelectedCase("NavText", "NavButton", caseTitle)){
                console.log("Exception trace: updateUISelectedCase()");
                //return false;
            }

            //return true;
        });
        listElement.appendChild(newButton);
    }    
    return true;
}

function updateUISelectedCase(navUITextId, btnToCaseViewId, caseTitle){
    var navUIText = document.getElementById(navUITextId);
    if(!navUIText){
        console.log("Exception trace: Element navUIText not found!")
        return false;
    }
    navUIText.innerHTML = caseTitle;

    var btnToCaseView = document.getElementById(btnToCaseViewId);
    if(!btnToCaseView){
        console.log("Exception trace: Element btntoCaseView not found!")
        return false;
    }
    btnToCaseView.className = "btn btn-dark text-white border p-2 m-2";
    btnToCaseView.addEventListener("click", function(){
        changePage("case.html");
    });

    return true;
}

function clearElementChildren(elemId){
    var element = document.getElementById(elemId);
    if(!element){
        console.log("Exception trace: Element element not found!");
        return false;
    }

    var child = element.lastElementChild;
    while(child){
        element.removeChild(child);
        child = element.lastElementChild;
    }
    return true;
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
    if(!csrf){
        console.log("Exception trace: getCookie()");
        return false;
    }

    $(document).ready(function(){
        $.ajax({
            method: "POST",
            url:"save-case/",
            headers: {
                'X-CSRFToken': csrf
            },
            data:{"SelectedCase": JSON.stringify(selectedCase)},
            success: function (response){
                console.log("Callback received: ", response);
                return true;
            },
            error: function (response) {
                alert("Failed to save to Django! See console...");
                console.log("Callback received: ", response);
                return false;
            }
        });
    });

    return false;
}


function changePage(url){
    window.location.href = url;
}