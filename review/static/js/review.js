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
    const checkboxes = Array.from(document.getElementsByName("checkbox"));

    for(let i=0;i<checkboxes.length;){
        if(!checkboxes[i].checked){
            checkboxes.splice(i, 1);
        }else{
            i++;
        }
    }
    
    let changeList = [];
    for(var i in checkboxes){
        changeList.push(checkboxes[i].value);
    }
    const keys = splitKeys(changeList);

    getChangesFromDB().then((response)=>{
        const changeData = response;
        let checkedChanges = getCheckedChanges(changeData, keys);
        if(changeList.length != checkedChanges.length){
            console.log(changeList.length);
            console.log(checkedChanges.length);
            console.log("Exception trace: getMatchingChanges()");
            return false;
        }
    
        var writeChanges = changesToCSV(checkedChanges);
        var exportFile = createFile(writeChanges);
        if(!exportFile){
            console.log("Exception trace: createFile()");
            return false;
        }
    
        var exportElem = document.createElement("a");
        exportElem.href = window.URL.createObjectURL(exportFile);
        exportElem.download = "Changes " + (new Date().toUTCString()) + ".csv";  
        exportElem.click();
        URL.revokeObjectURL(exportElem.href); 

        return true;
    });
}

function getCheckedChanges(changes, keys){
    let keyMatched = [];
    console.log(changes);

    for(let i in changes){
        const caseId = changes[i].case_id;
        const sentenceId = changes[i].sentence_id;

        for(let j in keys){
            if(keys[j].length != 2){
                console.log("Exception trace: Invalid change found in form!");
                return keyMatched;
            }
            const caseKey = keys[j][0];
            const sentenceKey = keys[j][1];

            console.log(caseId + "," + caseKey);
            console.log(sentenceId + "," + sentenceKey);


            if((caseId == caseKey && sentenceId == sentenceKey)){
                keyMatched.push(changes[i]);
                break;
            }
        }
    }    
    return keyMatched;
}

function createFile(fileString){
    return new Blob([fileString], {type:'text/csv'});
}

function splitKeys(changeList){
    for(let i=0;i<changeList.length;i++){
        changeList[i] = changeList[i].split(",", 2);
    }
    return changeList;
}

function changesToCSV(changes){
    var fileString = "";
    for(let i in changes){
        for(let j in changes[i]){
            fileString = fileString + changes[i][j] + ",";
        }
        fileString = fileString + "\n";
    }

    return fileString;
}

function exportAndClear(){
    if(!exportChanges()){
        console.log("Exception trace: exportChanges()");
        return false;
    }

    return true;
}