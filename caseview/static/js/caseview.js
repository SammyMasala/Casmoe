"use strict";
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

function handleNavSummary(){
    const path = window.location.pathname
    const segments = path.split("/")
    const caseId = segments.at(-1)
    goToSummary(caseId)
}

function handleNavGraph(){
    const path = window.location.pathname
    const segments = path.split("/")
    const caseId = segments.at(-1)
    goToGraph(caseId)
}

function handleNavLine(){
    const path = window.location.pathname
    const segments = path.split("/")
    const caseId = segments.at(-1)
    goToLine(caseId)
}
