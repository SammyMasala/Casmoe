"use strict";

function loadReview(){
    getChangesFromDB().then((response) => {
        if(!response){
            console.log("Exception trace: getChangesFromDjango()");
            return false;
        }

        var caseList = getCaseList(response);
        if(!drawChangesList("changesform", "datalist", response, caseList)){
            console.log("Exception trace: loadChanges()");
            return false;
        }
    })
    
    return true;    
}

function toggleNewOption(){
    const newCsvBtn = document.getElementById("btnnewcsv");
    if(!newCsvBtn){
        console.log("Exception trace: Element newCsvBtn not found!");
        return;
    }

    const mergeCsvBtn = document.getElementById("btnmergecsv");
    if(!mergeCsvBtn){
        console.log("Exception trace: Element mergeCsvBtn not found!");
        return;
    }

    mergeCsvBtn.classList.remove("active");
    if(!newCsvBtn.classList.contains("active")){
        newCsvBtn.classList.add("active");
    }

    return;
}

function toggleMergeOption(){
    const newCsvBtn = document.getElementById("btnnewcsv");
    if(!newCsvBtn){
        console.log("Exception trace: Element newCsvBtn not found!");
        return;
    }
    const mergeCsvBtn = document.getElementById("btnmergecsv");
    if(!mergeCsvBtn){
        console.log("Exception trace: Element mergeCsvBtn not found!");
        return;
    }

    newCsvBtn.classList.remove("active");
    if(!mergeCsvBtn.classList.contains("active")){
        mergeCsvBtn.classList.add("active");
    }

    return;
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
        console.log("Exception trace: Element changesForm not found!");
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
            console.log("Exception trace: getMatchingChanges()");
            return false;
        }
    
        let changes = splitChangesByCase(checkedChanges);

        let exportOption = document.getElementById("btnnewcsv");
        if(!exportOption){
            console.log("Exception trace: Element exportOption now found!");
            return false;
        }

        if(exportOption.classList.contains("active")){
            if(!exportNewFile(changes)){
                console.log("Exception trace: exportNewFile()");
                return false;
            }   
        }else{
            if(!exportMergeFile(changes)){
                console.log("Exception trace: exportMergeFile()");
                return false;
            }   
        }            

        return true;
    });
}

function exportNewFile(changes){
    let writeChanges = changesToCSV(changes);

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
}

function exportMergeFile(changes){
    getCases("corpusfield").then((response) => {
        for(let i in response){
            for(let j in response[i]){
                for(let k in changes){
                    for(let l in changes[k]){
                        const case_id = changes[k][l][0];
                        const sentence_id = changes[k][l][3];

                        if(case_id == response[i][j][0] && sentence_id == response[i][j][3]){
                            response[i][j] = changes[k][l];
                        }
                    }                    
                }
            }
        }

        let writeChanges = changesToCSV(response);

        var exportFile = createFile(writeChanges);
        if(!exportFile){
            console.log("Exception trace: createFile()");
            return false;
        }

        var exportElem = document.createElement("a");
        exportElem.href = window.URL.createObjectURL(exportFile);
        exportElem.download = "Corpus " + (new Date().toUTCString()) + ".csv";  
        exportElem.click();
        URL.revokeObjectURL(exportElem.href); 

        return true;
    });    
}

function splitChangesByCase(changes){
    let result = [];
    let tmpArray = [];

    while(changes.length > 0){
        const case_id = changes[0][0];

        let exists = false;
        for(let i in result){
            if(result[i][0] && (result[i][0][0] == case_id)){
                exists = true;
                break;
            }
        }
        if(!exists){
            tmpArray.push(changes[0]);
        
            for(let i in changes){
                if(i != 0 && (changes[i][0] == tmpArray[0][0])){
                    tmpArray.push(changes[i]);
                }
            }
            result.push(tmpArray);
            tmpArray = [];
        }            

        changes.splice(0,1);        
    }
    return result;    
}

function getCheckedChanges(changes, keys){
    let keyMatched = [];

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
            for(let k in changes[i][j]){
                fileString = fileString + changes[i][j][k] + ",";
            }
            fileString = fileString + "\n";            
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