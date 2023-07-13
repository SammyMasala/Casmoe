"use strict";

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

function addToGraphList(graphListId, newGraph, data){
    const graphList = document.getElementById(graphListId);
    if(!graphList){
        console.log("Exception trace: Element graphList not found!");
        return false;
    }

    newGraph.className = "btn row p-2 border";
    newGraph.addEventListener("click", function(){
        getCaseFromDB().then((response) => {
            if(!response){
                console.log("Exception trace: getCaseFromDB()");
            }

            if(!showGraphInMain("colmain", drawGraphJudgeDistribution(response))){
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
    graphElem.className = "row p-2 border";
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



