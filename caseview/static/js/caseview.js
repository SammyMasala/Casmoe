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
        lineBtn.className = "d-block btn bg-success-subtle m-2 p-2 text-start";
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
