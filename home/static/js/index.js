"use strict"
this.addEventListener("load", start);

function start(){
    if(!addCorpusEventListener("CorpusField")){
        console.log("Exception trace: addCorpusEventListen()");
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
                console.log("Exception trace: getCasesFromFile()");
                return false;
            }
    
            if(!createCaseList("ResultBox", cases)){
                console.log("Exception trace: createCaseList()");
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
        
        var newButton = document.createElement("div");
        newButton.className = "d-block btn btn-light";

        newButton.name = i;
        newButton.innerHTML = caseTitle;
        newButton.addEventListener("click", function(clickedButton){ 
            var caseIndex = clickedButton.target.name;
            if(!caseIndex){
                console.log("Exception trace: Value caseIndex not found!");
                //return false;
            }

            if(!updateUISelectedCase("NavText", "NavButton", "", false)){
                console.log("Exception trace: updateUISelectedCase()");
                //return false;
            }

            

            postCasetoDjango(cases[caseIndex]).then((callback) => {         
                if(!callback){
                    console.log("Exception trace: writeCasetoDjango()");
                }
                if(!updateUISelectedCase("NavText", "NavButton", clickedButton.target.innerHTML, true)){
                    console.log("Exception trace: updateUISelectedCase()");
                    //return false;
                }                            
            });                       
        });

        listElement.appendChild(newButton);
    }    

    return true;
}

function updateUISelectedCase(navUITextId, btnToCaseViewId, caseTitle, enabledState){
    var navUIText = document.getElementById(navUITextId);
    if(!navUIText){
        console.log("Exception trace: Element navUIText not found!");
        return false;
    }

    if(enabledState){
        navUIText.innerHTML = "Selected case: " + caseTitle;        
    }else if(!enabledState){
        navUIText.innerHTML = "Saving selected case..";
    }    

    var btnToCaseView = document.getElementById(btnToCaseViewId);
    if(!btnToCaseView){
        console.log("Exception trace: Element btntoCaseView not found!");
        return false;
    }

    if(enabledState){
        btnToCaseView.className = "btn btn-dark text-white border p-2 m-2";
        btnToCaseView.innerHTML = "Go to Case ->";
        btnToCaseView.addEventListener("click", function(){
            goToCaseView();
        });
    }else if(!enabledState){
        btnToCaseView.className = "btn btn-light border p-2 m-2 disabled";
        btnToCaseView.innerHTML = "Loading...";        
    }    

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




