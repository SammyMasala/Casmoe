"use strict";

this.addEventListener("load", function(){
    if(!loadReview()){
        console.log("Exception trace: loadReview()");
    }    
    return true;
});

function loadReview(){
    getChangesFromDB().then((response) => {
        if(!response){
            console.log("Exception trace: getChangesFromDjango()");
            return false;
        }

        var caseList = getCaseList(response);
        if(!drawChangesList("ChangesForm", "DataList", response, caseList)){
            console.log("Exception trace: loadChanges()");
            return false;
        }
    })
    
    return true;    
}

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

function drawChangesList(changesFormId, dataListId, changesData, caseList){
    var changesForm = document.getElementById(changesFormId);
    if(!changesForm){
        console.log("Exception trace: Element changesForm found!");
        return false;
    }

    if(!clearChild(changesFormId)){
        console.log("Exception trace: clearChild()");
        return false;
    }

    var dataList = document.getElementById(dataListId);
    if(!dataList){
        console.log("Exception trace: Element dataList not found!");
        return false;
    }

    if(!clearChild(dataListId)){
        console.log("Exception trace: clearChild()");
        return false;
    }

    for(let i in caseList){
        const newCase = document.createElement("div");
        newCase.className = "row m-auto border";
        for(let j in changesData){
            const caseId = changesData[j].case_id;
            if(caseList[i] === caseId){
                //New Row
                const newCaseEntry = document.createElement("div");
                newCaseEntry.className = "row m-auto border";

                //New Checkbox column
                const checkBoxCol = document.createElement("div");
                checkBoxCol.className = "col-1 m-auto p-1";

                //New Checkbox
                const entryCheckbox = document.createElement("input");
                entryCheckbox.className = "form-check-input";
                entryCheckbox.type = "checkbox";
                entryCheckbox.name = "checkbox";
                entryCheckbox.value = changesData[j].case_id + "," + changesData[j].sentence_id;

                //Checkbox --append--> Checkbox Column --append--> Row
                checkBoxCol.appendChild(entryCheckbox);
                newCaseEntry.appendChild(checkBoxCol);

                //New Text column
                const TextCol = document.createElement("div");
                TextCol.className = "col m-auto p-1";

                const entryCaseLine = document.createElement("button");
                entryCaseLine.className = "btn btn-light";
                entryCaseLine.innerHTML = changesData[j].text;

                TextCol.appendChild(entryCaseLine);
                newCaseEntry.appendChild(TextCol);

                newCase.appendChild(newCaseEntry);
            }            
        }

        changesForm.appendChild(newCase);
    }

    return true;
}

function getCaseList(changesData){
    let caseList = [];
    for(let i in changesData){
        if(!caseList.includes(changesData[i].case_id)){
            caseList.push(changesData[i].case_id);
        }
    }
    return caseList;
}

function exportChanges(){
    const getChecked = document.querySelectorAll("input[name=checkbox]:checked");
    
    let changeList = [];
    for(var i in getChecked){
        changeList.push(getChecked[i].value);
    }
    
    const changesData = getChangesFromDB();
    
    const keys = getChangeKeys(changeList);

    for(let i in changesData){
        const caseId = changesData[i].case_id;
        const sentenceId = changesData[i].sentence_id;


    }
    return true;
}

function getChangeKeys(changeList){
    let keys = [];

    for(let i=0;i<changeList.length;i++){
        keys.push(changeList[i].value.split(",", 2));
    }
    return keys;
}

function exportAndClear(){
    if(!exportChanges){
        console.log("Exception trace: exportChanges()");
        return false;
    }

    return true;
}