"use strict";

function loadGraphView(case_id){
    return new Promise((resolve) => {
        getCaseFromDB(case_id).then((response) => {
            if(!response){
                console.log("Exception trace: legacyGetCaseFromDB()");
                resolve(false);
            }  
    
            if(!addToGraphList("graph-list", drawGraphJudgeDistribution(response))){
                console.log("Exception trace: addToGraphList()");
                resolve(false);
            }
    
            if(!showGraphInMain("col-main", drawGraphJudgeDistribution(response), response)){
                console.log("Exception trace: showGraphInMain()");
                resolve(false);
            };

            resolve(true);     
        });    
    });
}

function addToGraphList(graphListId, newGraph, data){
    const graphList = document.getElementById(graphListId);
    if(!graphList){
        console.log("Exception trace: Element graphList not found!");
        return false;
    }

    newGraph.className = "btn graph";
    newGraph.addEventListener("click", function(){
        legacyGetCaseFromDB().then((response) => {
            if(!response){
                console.log("Exception trace: legacyGetCaseFromDB()");
            }

            if(!showGraphInMain("col-main", drawGraphJudgeDistribution(response))){
                console.log("Exception trace: showGraphInMain()");
            };
        })
        
    });

    graphList.appendChild(newGraph);

    return true;
}

function showGraphInMain(mainId, graph){
    const main = document.getElementById(mainId);
    if(!main){
        console.log("Exception trace: Element main not found!");
        return false;
    }

    if(!clearChild(mainId)){
        console.log("Exception trace: clearChild()");
    }

    main.appendChild(graph);
    return true;
}

function drawGraphJudgeDistribution(data){             
    var graphData = new GraphObj(data);    

    var graphElem = document.createElement("canvas");
    graphElem.className = "row graph";
    graphElem.id = "distribution";
    
    new Chart(
        graphElem,
        {
            type: "pie",
            data: {
                labels: graphData.judgeNames,
                datasets: [{
                    label: "% of Judgement",
                    data: graphData.judgeFractions,
                }],
            },
        }
    );

    return graphElem;
}



