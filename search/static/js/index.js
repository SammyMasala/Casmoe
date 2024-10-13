"use strict";

function addCorpusEventListener(corpusId){
    if(!createCaseList("result")){
        console.log("Exception trace: createCaseList()");
        return false;
    }

    var corpus = document.getElementById(corpusId);
    if (!corpus){
        console.log("Exception trace: Element corpus not found!");
        return false;
    }
    corpus.value = null;
    corpus.addEventListener("change", function(){
        getCaseLines(corpusId).then((caseLines) => {
            if(!caseLines){
                console.log("Exception trace: getCasesFromFile()");
                return false;
            }

            console.log(caseLines)
            if(!postCaseLinestoDB(caseLines)){
                console.log("Exception trace: postCaseLinestoDB()");
                return false;
            }

            if(!createCaseList("result")){
                console.log("Exception trace: createCaseList()");
                return false;
            }
            return true
        })   

        // LEGACY
        // getCases(corpusId).then((cases) => {
        //     if(!cases){
        //         console.log("Exception trace: getCasesFromFile()");
        //         return false;
        //     }

    
        //     if(!legacyCreateCaseList("result", cases)){
        //         console.log("Exception trace: createCaseList()");
        //         return false;
        //     }
        // })        
    });
    return true;
}

function createCaseList(listElementId){
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

    getCaseListFromDB().then((cases) => {
        if(!cases){
            console.log("Exception trace: No caseData retrieved!");
            resolve(false);
        }

        for(let item of cases){
            const caseTitle = item.text; 
            let caseId = item.case_id

            if (!caseTitle || !caseId){
                continue;
            }
            
            var newButton = document.createElement("li");
            newButton.className = "btn case-button";
    
            newButton.id = caseId;
            newButton.innerHTML = caseTitle;
            newButton.addEventListener("click", function(clickedButton){ 
                var caseId = clickedButton.target.id;
                if(!caseId){
                    console.log("Exception trace: Value caseIndex not found!");
                    return false;
                }
    
                handleCaseClicked(caseId, clickedButton.target.innerHTML)                        
            });
    
            listElement.appendChild(newButton);
        }       

        return true;
    }); 
    return true;
}

function handleCaseClicked(caseId){
    if(!legacyUpdateUISelectedCase("indicator-case", "navigation-button", "", false)){
        console.log("Exception trace: legacyUpdateUISelectedCase()");
        return false;
    }

    if(!toggleCaseButton("[id='case-button']", false)){
        console.log("Exception trace: toggleCaseButton()");
        return false;
    };

    setTimeout (function(){
        if(!toggleCaseButton("[id='case-button']", true)){
            console.log("Exception trace: toggleCaseButton()");
            return false;
        };

        if(!updateUISelectedCase("indicator-case", "navigation-button", caseId, true)){
            console.log("Exception trace: legacyUpdateUISelectedCase()");
            return false;
        }   

        if (!updateResultPreview("preview", caseId)){
            console.log("Exception trace: updateCasePreview()");
            return false;
        }  
        return true;
    }, 1500);   
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
            caseButtons[i].className = "btn case-button disabled";
        }else{
            caseButtons[i].className = "btn case-button";
        }
    }

    return true;
}

function updateResultPreview(resultPreviewId, caseId){
    const resultPreview = document.getElementById(resultPreviewId);
    if(!resultPreview){
        console.log("Exception trace: Element resultPreview not found!");
        return false;
    }

    if(!clearElementChildren(resultPreviewId)){
        console.log("Exception trace: clearElementChildren()");
        return false;
    }

    getCaseFromDB(caseId).then((caseLines) => {
        if(!caseLines){
            console.log("Exception trace: No case retrieved!");
            return false;
        }

        for(let [index, elem] of caseLines.entries()){
            const entry = document.createElement("div");
            entry.className = "preview-line";
            entry.innerHTML = elem.text;

            resultPreview.appendChild(entry);
            if(index == 6){
                entry.innerHTML = "......";
                break;
            }            
        }        
    })

    return true;
} 

function updateUISelectedCase(navUITextId, btnToCaseViewId, caseId, enabledState){
    var navUIText = document.getElementById(navUITextId);
    if(!navUIText){
        console.log("Exception trace: Element navUIText not found!");
        return false;
    }

    if(enabledState){
        navUIText.innerHTML = caseId;        
    }else if(!enabledState){
        navUIText.innerHTML = "Saving selected case..";
    }    

    var btnToCaseView = document.getElementById(btnToCaseViewId);
    if(!btnToCaseView){
        console.log("Exception trace: Element btntoCaseView not found!");
        return false;
    }

    if(enabledState){
        btnToCaseView.className = "btn navigation-button";
        btnToCaseView.innerHTML = "Go to Case ->";
    }else if(!enabledState){
        btnToCaseView.className = "btn disabled navigation-button";
        btnToCaseView.innerHTML = "Loading...";        
    }    

    return true;
}

function handleNavCaseView(){
    var selectedCase = document.getElementById("indicator-case").innerHTML
    console.log(selectedCase)
    goToSummary(selectedCase)
}

function clearElementChildren(elemId){
    var element = document.getElementById(elemId);
    if(!element){
        console.log("Exception trace: Element element not found!");
        return false;
    }

    element.innerHTML = "";
    var child = element.lastElementChild;
    while(child){
        element.removeChild(child);
        child = element.lastElementChild;
    }
    return true;
}

// LEGACY

function legacyCreateCaseList(listElementId, cases){
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
        
        var newButton = document.createElement("li");
        newButton.className = "btn case-button";

        newButton.value = i;
        newButton.id = "case-button";
        newButton.innerHTML = caseTitle;
        newButton.addEventListener("click", function(clickedButton){ 
            var caseIndex = clickedButton.target.value;
            if(caseIndex != 0 && !caseIndex){
                console.log("Exception trace: Value caseIndex not found!");
                return false;
            }

            legacyHandleCaseClicked(cases, caseIndex, clickedButton.target.innerHTML)                        
        });

        listElement.appendChild(newButton);
    }    

    return true;
}

function legacyHandleCaseClicked(cases, caseIndex, caseTitle){
    if(!legacyUpdateUISelectedCase("indicator-case", "navigation-button", "", false)){
        console.log("Exception trace: legacyUpdateUISelectedCase()");
        return false;
    }

    if(!toggleCaseButton("[id='case-button']", false)){
        console.log("Exception trace: toggleCaseButton()");
        return false;
    };

    postCasetoDB(cases[caseIndex]).then((response) => {         
        // if(!response){
        //     console.log("Exception trace: postCasetoDB()");
        // }

        const runTimeout = setTimeout (function(){
            if(!toggleCaseButton("[id='case-button']", true)){
                console.log("Exception trace: toggleCaseButton()");
                return false;
            };

            if(!legacyUpdateUISelectedCase("indicator-case", "navigation-button", caseTitle, true)){
                console.log("Exception trace: legacyUpdateUISelectedCase()");
                return false;
            }   

            if (!legacyUpdateResultPreview("preview")){
                console.log("Exception trace: updateCasePreview()");
                return false;
            }  

            return true;
        }, 1500);   
    });         
}

function legacyUpdateResultPreview(resultPreviewId){
    const resultPreview = document.getElementById(resultPreviewId);
    if(!resultPreview){
        console.log("Exception trace: Element resultPreview not found!");
        return false;
    }

    if(!clearElementChildren(resultPreviewId)){
        console.log("Exception trace: clearElementChildren()");
        return false;
    }

    legacyGetCaseFromDB().then((response) => {
        if(!response){
            console.log("Exception trace: No case retrieved!");
            return false;
        }

        for(let i in response){
            const entry = document.createElement("div");
            entry.className = "preview-line";
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

function legacyUpdateUISelectedCase(navUITextId, btnToCaseViewId, caseTitle, enabledState){
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
        btnToCaseView.className = "btn navigation-button";
        btnToCaseView.innerHTML = "Go to Case ->";
    }else if(!enabledState){
        btnToCaseView.className = "btn disabled navigation-button";
        btnToCaseView.innerHTML = "Loading...";        
    }    

    return true;
}

function legacyUpdateResultPreview(resultPreviewId){
    const resultPreview = document.getElementById(resultPreviewId);
    if(!resultPreview){
        console.log("Exception trace: Element resultPreview not found!");
        return false;
    }

    if(!clearElementChildren(resultPreviewId)){
        console.log("Exception trace: clearElementChildren()");
        return false;
    }

    legacyGetCaseFromDB().then((response) => {
        if(!response){
            console.log("Exception trace: No case retrieved!");
            return false;
        }

        for(let i in response){
            const entry = document.createElement("div");
            entry.className = "preview-line";
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




