"use strict";
this.addEventListener("load", function(){
    loadLineView().then((response) => {
        if(!response){
            console.log("Exception trace: loadCaseView()");
            return;
        };
    });
});

function loadLineView(){
    return new Promise((resolve) => {
        getCaseFromDB().then((response) => {
            if(!response){
                console.log("Exception trace: No caseData retrieved!");
                resolve(false);
            }
    
            if(!drawCaseSentences("colmain", response)){
                console.log("Exception trace: drawCaseSentences()");
                resolve(false);            
            };    

            resolve(true);
        });   
    });     
}