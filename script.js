var GRADESTUFF = ["Midterm","Homework","Tests","Quizzes"];
function myFunction() {
    for(var a = 1; a < 7; a ++) {
        for(var b = 0; b < 4; b ++) {
            myInputNum(GRADESTUFF[b],a);
        }
    }
}//makes literally every box, with the input number function
function myInputNum(gradeFor,iteration) {
    document.getElementById("period" + iteration).innerHTML += "<td id='period" + iteration + "_" + gradeFor + "'> Grade <input id='period" + iteration + "_" + gradeFor + "N' type='number' size='35' min='0' max='100'><br> Weight <input id='period" + iteration + "_" + gradeFor + "Weight' type='number' size='9' min='0' max='100'></td>";
}//makes literally every box, with the myFunction
//^^^^ These are like the on load stuffs ^^^^^
//vvvv These are the button press things vvvvv
function calculate_score() {
    resetError();
    consoleLogInputs();
    if(checkAllErrors()) {
        printAllGradeNeeded();
    }
}//runs all the important stuff!!!!!!!
function consoleLogInputs() {
    for (var c = 1; c < 7; c++) {
        for (var d = 0; d < 4; d++) {
            console.log("period " + c + " " + GRADESTUFF[d] + " Score = " + unNull(shorten_id(c, GRADESTUFF[d], "N")));
            if(parseInt(unNull(shorten_id(c, GRADESTUFF[d], "N"))) > 100) {
                document.getElementById("scoreError").innerHTML = "One of your scores exceeds 100, you'll have to alter it to continue";
                document.getElementById("scoreError").value = true;
            }//checks if an error in the score
        }
    }//logs the scores
    for (var e = 1; e < 7; e++) {
        var sumWeights = 0;
        for (var f = 0; f < 4; f++) {
            console.log("period " + e + " " + GRADESTUFF[f] + " Weight = " + unNull(shorten_id(e, GRADESTUFF[f], "Weight")));
        }//Logs the actual weight of the class
        for (var g = 0; g < 4; g++) {
            sumWeights += parseInt(unNull(shorten_id(e, GRADESTUFF[g], "Weight")));
        }//is Used to calculate the sum weight to check if over 100
        sumWeights += getFinalWeight(e);//is Used to calculate the sum weight to check if over 100
        if (sumWeights !== 100) {
            document.getElementById("weightError").innerHTML = "Your weights for one of your classes doesn't add up to 100 collectively, you'll have to alter it to continue";
            document.getElementById("weightError").value = true;
        }//checks if an error in the score
    }//logs the weights
    for (var h = 1; h < 7; h++) {
        for (var i = 0; i < 4; i++) {
            console.log("Weighted " + GRADESTUFF[i] + " Score for period " + h + " = " + getWeighted(h, GRADESTUFF[i]));//Logs the weighted score for one class
        }
    }//logs the weighted
    for (var j = 1; j < 7; j++) {
        var sumOfGradeFor = 0;
        for (var k = 0; k < 4; k++) {
            sumOfGradeFor += getWeighted(j, GRADESTUFF[k]);
        }// adds the midterm, homework, test, and quiz weighted grades for one class
        console.log("Your Weighted score for class " + j + " is " + sumOfGradeFor);//logs the weighted score for one class
        console.log("You need to get at least a " + finalScoreNeeded(sumOfGradeFor, getFinalWeight(j),90) + "% on the final for your period" + j + " class to get an A in the class");
        if(finalScoreNeeded(sumOfGradeFor,getFinalWeight(j),90) > 100) {//tests for the possibility of an A
            document.getElementById("scoreNeeded" + j).value = "You cannot get an A in your Period " + j + " class, but you can get a B if you get a " + finalScoreNeeded(sumOfGradeFor,getFinalWeight(j),80) + "% on the final.";
            if(finalScoreNeeded(sumOfGradeFor,getFinalWeight(j),80) > 100) {//tests for the possibility of a B
                document.getElementById("scoreNeeded" + j).value = "You cannot get over a C in your Period " + j + " class, but you can get a C if you get at least a " + finalScoreNeeded(sumOfGradeFor,getFinalWeight(j),70) + "% on the final.";
                if(finalScoreNeeded(sumOfGradeFor,getFinalWeight(j),70) > 100) {//tests for the possibility of a pass
                    document.getElementById("scoreNeeded" + j).value = "You cannot pass your Period " + j + " class, I'm sorry.";
                }
            }
        } else {//if possible to get an A
            document.getElementById("scoreNeeded" + j).value = "You need at least a " + finalScoreNeeded(sumOfGradeFor,getFinalWeight(j),90) + "% on the final to get an A";
        }
    }//logs the weighted score for the entire class
    checkErrors();//calls to check for errors
}//logs some useful data
function getWeighted (iteration,gradeFor) {
    return unNull(shorten_id(iteration,gradeFor,"N"))*unNull(shorten_id(iteration,gradeFor,"Weight"))*0.01;
}/* */
function unNull (x) {
    if(x === "" || x === null) {
        return 0;
    }
    return x;
}//makes a null value of anything 0 *
function shorten_id(iteration,classOf,numOrWeh) {
    return document.getElementById("period" + iteration + "_" + classOf + numOrWeh).value;
}//Can call this to shorten the Id of whatever
function resetError() {
    document.getElementById("scoreError").value = false;
    document.getElementById("scoreError").innerHTML = "";
    document.getElementById("weightError").value = false;
    document.getElementById("weightError").innerHTML = "";
    document.getElementById("finalError").value = false;
    document.getElementById("finalError").innerHTML = "";
}//resets the error codes
function getFinalWeight(iteration) {
    return parseInt(document.getElementById("FinalWeight" + iteration).value);
}
function finalScoreNeeded (totalWeighted,finalWeight,percentGet) {
    var weightedFinalNeeded = percentGet - totalWeighted;
    return (weightedFinalNeeded * 100) / finalWeight;
}
function checkErrors () {
    console.log("The current presence of errors in the score is " + document.getElementById("scoreError").value);
    console.log("The current presence of errors in the weights are " + document.getElementById("weightError").value);
    console.log("The current presence of errors in the final weights are " + document.getElementById("finalError").value);
}
function printGradeNeed(iteration) {
    document.getElementById("scoreNeeded" + iteration).innerHTML = document.getElementById("scoreNeeded" + iteration).value;
}
function printAllGradeNeeded() {
    for(var n = 1; n < 7; n++) {
        printGradeNeed(n);
    }
}
function checkAllErrors () {
    if(document.getElementById("scoreError").value || document.getElementById("weightError").value || document.getElementById("finalError".value)) {
        return false
    }
    return true;
}
//90 - weighted score for entire class = weighted score needed for final
//the weighted score of the final is like in this case 20/100 * the score
// so if 100 is on the final u get +20
// so for a class with total weighted score 40 it is impossible,
// if weighted score < 90 - weight of final its impossible
// if weighted score > 90 - weight of final, (100 - weighted total)*100/finalWeight = score needed
// final score * weight / 100 = weighted final
