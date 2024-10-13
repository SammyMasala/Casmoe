"use strict";
function loadLineView(case_id){
    return new Promise((resolve) => {
        getCaseFromDB(case_id).then((response) => {
            if(!response){
                console.log("Exception trace: No caseData retrieved!");
                resolve(false);
            }
    
            if(!drawCaseSentences("col-main", response)){
                console.log("Exception trace: drawCaseSentences()");
                resolve(false);            
            };    

            resolve(true);
        });   
    });     
}

function drawCaseSentences(lineColId, caseData){
    var lineCol = document.getElementById(lineColId);
    if(!lineCol){
        console.log("Exception trace: Element lineCol not found!");
        return false;
    }
    
    if(!clearChild(lineColId)){
        console.log("Exception trace: clearChild()");
        return false;
    }

    for(var i in caseData){
        const lineBtn = document.createElement("div");
        lineBtn.className = "btn line-button";
        lineBtn.id = caseData[i].sentence_id;
        lineBtn.innerHTML = caseData[i].sentence_id+ ". " + caseData[i].text;
        lineBtn.addEventListener("click", function(clickedLine){
            if(!fillAnnotations("popout-body", caseData, clickedLine.target.id)){
                console.log("Exception trace: fillAnnotations()")
                return false;
            };
        });     
        lineCol.appendChild(lineBtn);
    }
    return true;   
}

function fillAnnotations(annotBodyId, caseData, index){
    var annotBody = document.getElementById(annotBodyId);
    if(!annotBody){
        console.log("Exception trace: Element annotBody not found!");
        return false;
    }

    var lineAnnot = caseData[index];

    //clear previous data
    if(!clearChild(annotBodyId)){
        console.log("Exception trace: clearChild()");
        return false;
    }

    //load new data
    for(let details in lineAnnot){
        if(details == "text" || details == "id"){
            continue;
        }
        var newEntry = document.createElement("div");
        newEntry.className = "row annotation";
        newEntry.innerHTML = details + ": " + lineAnnot[details];
        annotBody.appendChild(newEntry);
    }

    return true;
}