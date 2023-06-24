"use strict"



function loadGraphView(){
    getCaseFromDatabase().then((caseData) => {
        if(!drawGraphJudgeDistribution("colmain", caseData)){
            console.log("Exception trace: drawGraphJudgeDistribution()");
            return false;
        }
    });
    return true; 
}

function drawGraphJudgeDistribution(graphContId, caseData){
    var graphCont = document.getElementById(graphContId);
    if(!graphCont){
        console.log("Exception trace: Element graphCont not found!");
        return false;
    }

    if(!clearChild(graphContId)){
        console.log("Exception trace: clearChild()");
        return false;
    }

    var graphData = new GraphObj(caseData);    

    var graphElem = document.createElement("canvas");
    graphElem.className = "row p-2 m-2 border";
    graphElem.id = "distribution"
    graphCont.appendChild(graphElem);

    new Chart(
        document.getElementById("distribution"),
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
    return true;
}



