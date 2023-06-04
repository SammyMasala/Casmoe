"use strict"
this.addEventListener("load", function(){
    start("btntohome", "btntoline", "btntoasmo");
});

function start(_homebtn, _linebtn, _asmobtn){
    var btnHome = document.getElementById(_homebtn);
    if(!btnHome){
        console.log("ERROR: btntohome not found!");
        return;
    }
    btnHome.addEventListener("click", backToHome);

    var btnLine = document.getElementById(_linebtn);
    if(!btnLine){
        console.log("ERROR: btntoline not found!");
        return;

    }
    btnLine.addEventListener("click", function(){
        loadContent("line");
    });

    var btnASMO = document.getElementById(_asmobtn);
    if(!btnASMO){
        console.log("ERROR: btntoasmo not found!");
        return;
    }
    btnASMO.addEventListener("click", function(){
        loadContent("asmo");
    });

    loadContent("line");
}

function clearContent(){
    var cont = document.getElementById("mainbody");
    if(!cont){
        console.log("ERROR: mainbody not found!");
        return;
    }
    
    var child = cont.lastElementChild;
    while(child){
        cont.removeChild(child);
        child = cont.lastElementChild;
    }
}

function loadContent(str){
    clearContent();

    switch(str){
        default:
            console.log("ERROR: Content " + str + " undefined!");
            break;
        case "line":
            loadLine();
            break;
        case "asmo":
            asmoLoad(getCaseData("Case"));
            break;
    }
}

function createDiv(_className, _id){
    var div = document.createElement("div");
    div.className = _className;
    div.id = _id;
    
    return div;
}

function clearChild(cont){
    var child = cont.lastElementChild;
    while(child){
        cont.removeChild(child);
        child = cont.lastElementChild;
    }

    return true;
}

function backToHome(){
    window.location.href = "index.html";
}