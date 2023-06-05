"use strict"

class _node{
    constructor(str, arr1, arr2, arr3, arr4, arr5, arr6){
        this.judge = str;
        this.fAgrWith = arr1;
        this.pAgrWith = arr2;
        this.factAdop = arr3;
        this.fDisWith = arr4;
        this.pDisWith = arr5;
        this.ackn = arr6;
    }
}

function asmoLoad(data){
    if(!data){
        console.log("ERROR: Case data not found!");
        return;
    }

    asmoDrawLayout("mainbody"); 
    
    var nodes = getNodes(data);
        if (!nodes){
        console.log("ERROR: Failed to create nodes!");
        return;
    }
    
    asmoFill(data, nodes);
}

function asmoDrawLayout(_main) {
    var cont = document.getElementById(_main);
    if(!cont){
        console.log("ERROR: mainbody not found!");
        return;
    }

    //Case Title
    var row = createDiv("row", "casetitle");
    row.style.alignContent = "center";
    cont.appendChild(row);

    //Legend
    var row = createDiv("row", "chartlegend");
    cont.appendChild(row);

    //Chart
    var row = createDiv("row", "");
    
    var canvas = document.createElement("canvas");    
    canvas.id = "chart";
    row.appendChild(canvas);
    cont.appendChild(row);    

    //Chart Buttons
    var row = createDiv("row", "chartbtns");
    cont.appendChild(row);
}

function asmoFill(data, nodes){  
    //Title
    fillCaseTitle("casetitle", data); 

    //Chart
    fillChart("chart", data, nodes);

    //Chart Buttons
    fillChartBtns("chartbtns", "chart", data, nodes);
}

function fillCaseTitle(_title, data){
    var cont = document.getElementById(_title);
    if(!cont){
        console.log("ERROR: casetitle not found!");
        return;
    }

    var text = data[0][getHeaderIndex("text")];
    cont.appendChild(document.createTextNode(text));    
}

function fillChart(_chart, data, nodes){
    var chart = document.getElementById(_chart);
    if(!chart){
        console.log("ERROR: chart not found!");
        return;
    }
    chart.append(chartBreakdown("chartlegend", "chart", data, nodes));
}

function fillChartBtns(_chartbtns, _chart, data, nodes){
    var cont = document.getElementById(_chartbtns);
    if(!cont){
        console.log("ERROR: chartbtns not found!");
        return;
    }

    var chart = document.getElementById(_chart);
    if(!chart){
        console.log("ERROR: chart not found!");
        return;
    }

    var btn = document.createElement("button");
    btn.className = "btn btn-outline-dark";
    btn.innerHTML = "Breakdown";
    btn.addEventListener("click", function(){
        chart.append(chartBreakdown("chartlegend", "chart", data, nodes));
    })
    cont.appendChild(btn);

    var btn = document.createElement("button");
    btn.className = "btn btn-outline-dark";
    btn.innerHTML = "Maj. Opinion";
    btn.addEventListener("click", function(){
        chart.append(chartMajOpinion("chartlegend", "chart", nodes));
        fillLegend(nodes, chart);
    })
    cont.appendChild(btn);
}

function getNodes(data){

    //create nodes;
    var arr = judgeArray(data);
    if(!arr){
        return false;
    }  

    return arr;
}

function judgeArray(data){
    const judges = [];
    const nodes = [];

    for(var i in data){
        var judge = data[i][getHeaderIndex("judge")];
        if(judge == "NONE"){
            continue;
        }else if(judges.length == 0 || !judges.includes(judge)){
            nodes.push(initNode(judge, data));
            judges.push(judge);
        }
    }
    return nodes;
}

function initNode(str, data){
    var fAgrWith = [];
    var pAgrWith = [];
    var factAdop = [];
    var fDisWith = [];
    var pDisWith = [];
    var ackn = [];


    for (var i in data){
        var judge = data[i][getHeaderIndex("judge")];
        if(str == judge){
            for(var j = 0; j<data[i].length;j++){
                if (data[i][j] != "NONE" && data[i][j] != "no match" && data[i][j] != 0 && data[i][j] != 1){
                    var id = data[i][3]; // sentence id
                    var arr = (data[i][j].trim()).split("+");
                    if(j == getHeaderIndex("fullagr")){
                        fAgrWith = addtoNode(fAgrWith, id, arr);
                    }else if(j == getHeaderIndex("partagr")){
                        pAgrWith = addtoNode(pAgrWith, id, arr);
                    }else if(j == getHeaderIndex("factadopt")){
                        factAdop = addtoNode(factAdop, id, arr);
                    }else if(j == getHeaderIndex("fulldis")){
                        fDisWith = addtoNode(fDisWith, id, arr);
                    }else if(j == getHeaderIndex("partdis")){
                        pDisWith = addtoNode(pDisWith, id, arr);
                    }else if(j == getHeaderIndex("ackn")){
                        ackn = addtoNode(ackn, id, arr);
                    }else{
                        continue;
                    }
                }
            }
        }
    }

    var node = new _node(str, fAgrWith, pAgrWith, factAdop, fDisWith, pDisWith, ackn);
    return node;
}

function addtoNode(elem, id, arr){
    for (var i in arr){
        elem.push([arr[i], id]);
    }  
    return elem;    
}