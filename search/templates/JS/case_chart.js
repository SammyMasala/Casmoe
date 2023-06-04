"use strict"

function chartGetLabels(nodes){
    var arr = [];
    for (var i in nodes){
        var val = nodes[i].judge;
        if(val && !arr.includes(val)){
            arr.push(val);
        }        
    }    
    return arr;
}

function chartGetData(nodes, data){
    var arr = [];

    for (var i in nodes){
        var val = nodes[i].judge;
        var num = 0;
        for(var j in data){
            if(data[j][getHeaderIndex("judge")] == val){
                num++;
            }
        }
        arr.push(num);
    }
    return arr;
}

function chartBreakdown(_legend, _chart, data, nodes){
    //legend Container
    var cont = document.getElementById(_legend);
    if(!cont){
        return;
    }

    if (!clearChild(cont)){
        return;
    }

    //Destroy previous Chart
    var chart = Chart.getChart(_chart);
    if(chart){
        chart.destroy();
    }

    var colors = getColors();
    if(!colors){
        return;
    }

    var judgeColor = getJudgeColor(colors, nodes);

    var chart =  new Chart(document.getElementById(_chart), {
        type: 'pie',
        data: {
            labels: chartGetLabels(nodes),
            datasets: [{
                data: chartGetData(nodes, data),
                backgroundColor: function(){
                    var arr = [];
                    for(var i in judgeColor){
                        arr.push(judgeColor[i][1]);
                    }
                    return arr;
                },
                borderWidth: 2,
                hoverOffset: 20
            }]
        },
    });
    return chart;
}

function chartMajOpinion(_legend, _chart, nodes){
    var cont = document.getElementById(_legend);
    if(!cont){
        console.log("ERROR: chart legend not found!");
        return;
    }

    if(!clearChild(cont)){
        return;
    }

    var chart = Chart.getChart(_chart);
    if(chart){
        chart.destroy();
    }

    var colors = getColors();
    if(!colors){
        return;
    }

    var judgeColor = getJudgeColor(colors, nodes);

    chart = new Chart(document.getElementById(_chart), {
        type: 'doughnut',
        data: {
            labels: chartGetLabels(nodes),
            datasets: [{
                label:"Judges",
                backgroundColor: function(){
                    var arr = [];
                    for(var i in judgeColor){
                        arr.push(judgeColor[i][1]);
                    }
                    return arr;
                },
                data:function(){
                    var judges = nodes.map(function(val){return val.judge});
                    return judges;
                },
                weight: 6
            }],
        }             
    });

    // //Ring - FullAgreement    
    // var fullAgr = nodes.map(function(val){return val.fAgrWith});
    // chart.data.datasets.push(chartNewDataset("Full Agreement", judges, judgeColor, fullAgr, nodes.length));

    // //Ring - PartAgreement
    // var partAgr = nodes.map(function(val){return val.pAgrWith});
    // chart.data.datasets.push(chartNewDataset("Part Agreement", judges, judgeColor, partAgr, nodes.length));

    // //Ring - FullDisagree
    // var fullDis = nodes.map(function(val){return val.fDisWith});
    // chart.data.datasets.push(chartNewDataset("Full Disagree", judges, judgeColor, fullDis, nodes.length));

    // //Ring - PartDisagree
    // var partDis = nodes.map(function(val){return val.pDisWith});
    // chart.data.datasets.push(chartNewDataset("Part Disagree", judges, judgeColor, partDis, nodes.length));

    return chart;
}

function chartNewDataset(str, judges, judgeColor, relation, len){
    var newDataset = {
        label: str,
        labels: [],
        backgroundColor: [],
        data:[],
        weight: 1,
        borderWidth: 4,
        hoverOffset: 5,
    }

    for(var i in judgeColor){
        newDataset.labels.push(judgeColor[i][0]);
    }

    for(var i in relation){
        var relationData = [];
        for(var j in relation[i]){
            if(!relationData.includes(relation[i][j][0]) && relation[i][j][0] != "self")
            judges.push(relation[i][j][0]);
        }        
        if(!relationData.length){
            relationData.push("none");
        }
        for(var j in relationData){
            newDataset.data.push(len/relationData.length);
            for(var k in judgeColor){
                if(judgeColor[k][0] == relationData[j]){
                    newDataset.backgroundColor.push(judgeColor[k][1]);
                }
            }            
        }
    }
}

function fillLegend(nodes, chart){
    var cont = document.getElementById("chartlegend");
    chart = Chart.getChart(chart);
    for (var i in chart.data.datasets[0].data){
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-secondary btn-sm text-white";
        btn.innerHTML = nodes[i].judge;
        btn.style.backgroundColor = chart.data.datasets[0].backgroundColor[i];

        cont.appendChild(btn);
    }    
}

function getJudgeColor(colors, nodes){
    var judgeColor = [];
    for(var i in nodes){
        var arr = [];
        arr.push(nodes[i].judge);
        arr.push(colors[i]);
        judgeColor.push(arr);
    }    
    judgeColor.push(["none", "#9e9e9e"]);
    return judgeColor;
}