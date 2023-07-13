"use strict";

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
    
            if(!createCaseList("resultlist", cases)){
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

        newButton.value = i;
        newButton.id = "casebutton";
        newButton.innerHTML = caseTitle;
        newButton.addEventListener("click", function(clickedButton){ 
            var caseIndex = clickedButton.target.value;
            if(!caseIndex){
                console.log("Exception trace: Value caseIndex not found!");
                return false;
            }

            if(!handleCaseClicked(cases, caseIndex, clickedButton.target.innerHTML)){
                console.log("Exception trace: handleCaseClicked()");
                return false;
            }                          
        });

        listElement.appendChild(newButton);
    }    

    return true;
}

function handleCaseClicked(cases, caseIndex, caseTitle){
    if(!updateUISelectedCase("navtext", "navbutton", "", false)){
        console.log("Exception trace: updateUISelectedCase()");
        return false;
    }

    if(!toggleCaseButton("[id='casebutton']", false)){
        console.log("Exception trace: toggleCaseButton()");
        return false;
    };

    postCasetoDB(cases[caseIndex]).then((response) => {         
        if(!response){
            console.log("Exception trace: writeCasetoDjango()");
        }

        const runTimeout = setTimeout (function(){
            if(!toggleCaseButton("[id='casebutton']", true)){
                console.log("Exception trace: toggleCaseButton()");
                return false;
            };

            if(!updateUISelectedCase("navtext", "navbutton", caseTitle, true)){
                console.log("Exception trace: updateUISelectedCase()");
                return false;
            }   

            if (!updateResultPreview("resultpreview")){
                console.log("Exception trace: updateCasePreview()");
                return false;
            }  

            return true;
        }, 1500);   
    });         
}

function toggleCaseButton(casebuttonId, state){
    const caseButtons = document.querySelectorAll(casebuttonId);
    if(!caseButtons){
        console.log("Exception trace: no caseButtons found!");
        return false;
    }

    if(!caseButtons){
        console.log("Exception trace: Element caseButtons not found!");
        return false;
    }

    for(let i=0;i<caseButtons.length;i++){
        if(!state){
            caseButtons[i].className = "d-block btn btn-light disabled";
        }else {
            caseButtons[i].className = "d-block btn btn-light";
        }
    }

    return true;
}

function updateResultPreview(resultPreviewId){
    const resultPreview = document.getElementById(resultPreviewId);
    if(!resultPreview){
        console.log("Exception trace: Element resultPreview not found!");
        return false;
    }

    if(!clearElementChildren(resultPreviewId)){
        console.log("Exception trace: clearElementChildren()");
        return false;
    }

    getCaseFromDB().then((response) => {
        if(!response){
            console.log("Exception trace: No case retrieved!");
            return false;
        }

        for(let i in response){
            const entry = document.createElement("div");
            entry.className = "bg-secondary-subtle p-2 m-2 border rounded-2";
            entry.innerHTML = response[i].text;

            resultPreview.appendChild(entry);
            if(i == 6){
                entry.innerHTML = "......";
                break;
            }            
        }        
    })

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




