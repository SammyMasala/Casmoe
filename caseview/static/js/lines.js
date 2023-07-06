"use strict";

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
        newEntry.className = "row p-1";
        newEntry.innerHTML = details + ": " + lineAnnot[details];
        annotBody.appendChild(newEntry);
    }

    return true;
}