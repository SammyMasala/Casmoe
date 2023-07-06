"use strict";

this.addEventListener("load", function(){
    if(!loadLineView()){
        console.log("Exception trace: loadCaseView()");
        return;
    };
});

function clearChild(elemId){
    var elem = document.getElementById(elemId)
    if(!elem){
        console.log("Exception trace: Element elem not found!");
        return false;
    }
    var child = elem.lastElementChild;
    while(child){
        elem.removeChild(child);
        child = elem.lastElementChild;
    }

    return true;
}

function loadLineView(){
    getCaseFromDB().then((caseData) => {
        if(!drawCaseSentences("colmain", caseData)){
            console.log("Exception trace: drawCaseSentences()")
            resolve(false);
        };    
        resolve (true);
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
        lineBtn.className = "d-block btn btn-secondary m-2 p-2 text-start";
        lineBtn.id = caseData[i].sentence_id;
        lineBtn.innerHTML = caseData[i].sentence_id+ ". " + caseData[i].text;
        lineBtn.addEventListener("click", function(clickedLine){
            if(!fillAnnotations("popoutbody", caseData, clickedLine.target.id)){
                console.log("Exception trace: fillAnnotations()")
                return false;
            };
        });     
        lineCol.appendChild(lineBtn);
    }
    return true;   
}