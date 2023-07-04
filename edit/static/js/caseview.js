"use strict"

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
