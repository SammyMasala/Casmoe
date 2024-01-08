function loadSummaryView(){
    return new Promise((resolve) => {
        getCaseFromDB().then((response) => {
            if(!response){
                console.log("Exception trace: No caseData retrieved!");
                resolve(false);
            }
    
            if(!drawCaseSentences("col-main", response)){
                console.log("Exception trace: drawCaseSentences!");
                resolve(false);
            }   
    
            if(!showGraphInMain("graph-preview", drawGraphJudgeDistribution(response))){
                console.log("Exception trace: showGraphInMain()");
                resolve(false);
            };

            resolve(true);
        });
    });    
}