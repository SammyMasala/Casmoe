"use strict";

class Judge {
    constructor(){
        this.name = "";
        this.numOfLines = 0;
        this.fAgrWith = [];
        this.pAgrWith = [];
        this.ackn = [];
        this.fDisWith = [];
        this.pDisWith = [];
    }
    setName(name){
        this.name = name
    }
    setNumOfLines(num){
        this.numOfLines = num;
    }
    addfAgrWith(name){
        this.fAgrWith.push(name);
    }
    addpAgrWith(name){
        this.pAgrWith.push(name);
    }
    addAckn(name){
        this.ackn.push(name); 
    }
    addfDisWith(name){
        this.fDisWith.push(name);
    }
    addpDisWith(name){
        this.pDisWith.push(name);
    }
}

class GraphObj {
    constructor(caseData){
        this.judgeNames = this.getJudgeNames(caseData);
        this.judgeList = this.getJudgeList(this.judgeNames, caseData);
        this.judgeFractions = this.getJudgeFractions(caseData.length, this.judgeList);        
    }

    getJudgeNames(caseData){
        var names = [];
        for (var index in caseData){
            var nameEntry = caseData[index].judge;
            if (nameEntry == "" || nameEntry == "NONE"){
                continue;
            }
    
            if (names.indexOf(nameEntry) < 0){
                names.push(nameEntry);
            } 
        }

        return names;
    }

    getJudgeList(caseJudges, caseData){
        var judgeList = [];
        if(!caseJudges){
            console.log("Exception trace: No judges found!");
            return false;
        }
    
        for(var index in caseJudges){
            var lineCount = this.getNumberOfLines(caseData, caseJudges[index]);
            if(lineCount < 0){
                console.log("getNumberOfLines()");
                return false;
            }       

            var newJudge = new Judge;
            newJudge.setName(caseJudges[index]);
            newJudge.setNumOfLines(lineCount);    
            judgeList.push(newJudge);
        }

        //NOT IMPLEMENTED: pAgrWith, fAgrWith, Ackn, pDisWith, fDisWith    
        return judgeList;
    }    

    getJudgeFractions(caseLen, judgeList){
        var fractions = [];
        for(var index in judgeList){
            var judgeLines = judgeList[index].numOfLines;
            var fraction = this.getFraction(judgeLines, caseLen);
            if(fraction < 0){
                console.log("Exception trace: getFraction()");
            }

            fractions.push(fraction);
        }

        return fractions;
    }

    getFraction(number, total){
        if(total <= 0){
            console.log("Exception trace: invalid total received");
            return -1;
        }
        var fraction = (number/total).toFixed(2) * 100;
        return fraction;
    }
    
    getNumberOfLines(caseData, judgeName){
        var count = 0; 
        for(var line in caseData){
            if (caseData[line].judge == judgeName){
                count++;
            } 
        }

        return count;
    }       
}