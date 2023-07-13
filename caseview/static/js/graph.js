"use strict";
this.addEventListener("load", function(){
    loadGraphView().then((response) => {
        if(!response){
            console.log("Exception trace: loadCaseView()");
            return;
        };
    });
});

function loadGraphView(){
    return new Promise((resolve) => {
        getCaseFromDB().then((response) => {
            if(!response){
                console.log("Exception trace: getCaseFromDB()");
                resolve(false);
            }  
    
            if(!addToGraphList("graphlist", drawGraphJudgeDistribution(response))){
                console.log("Exception trace: addToGraphList()");
                resolve(false);
            }
    
            if(!showGraphInMain("colmain", drawGraphJudgeDistribution(response), response)){
                console.log("Exception trace: showGraphInMain()");
                resolve(false);
            };

            resolve(true);     
        });    
    });
}


