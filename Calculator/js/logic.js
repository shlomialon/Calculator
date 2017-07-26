/**
 * Created by Shlomi on 26/07/2017.
 */

//Get keys from HTML file
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-','<-'];
var dCount = false;
var isValid = false;


    for (var i = 0; i < keys.length; i++) {
        var input = document.querySelector('.screen');
        keys[i].addEventListener("mouseover",  (function onKeyHover(){
            keys[i].dataset['tooltip'] = input.innerHTML;
        })());


        keys[i].onclick = function (e) {
                //Get the input and button values
            var input = document.querySelector('.screen');
            var inputVal = input.innerHTML;
                var val = this.innerHTML;
                console.log(val);
                //clear
                if (val == "C") {
                    input.innerHTML = "";
                }

                else if (val == "&lt;-") {
                    console.log(inputVal);
                    input.innerHTML = inputVal.substr(0,inputVal.length-1);
                }

                //checking if lastChar is operator
                else if (val == '=') {
                    var ansList = inputVal;
                    if (ansList) {
                        //noinspection JSValidateTypes
                        input.innerHTML = myEval(ansList);
                    }
                    dCount = false;
                    isValid = true;
                }

                //check double operators
                else if (operators.indexOf(val) > -1) {
                    //noinspection JSDuplicatedDeclaration
                    var lastChar = inputVal[inputVal.length - 1];

                    if (isValid) {
                        input.innerHTML = "";
                        isValid = false;
                    }
                    if (inputVal != "" && operators.indexOf(lastChar) == -1 || inputVal == "" && val == "-") {
                        input.innerHTML += val;
                    } else {
                        if (operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
                            input.innerHTML = inputVal.replace(/.$/, val);
                        }
                    }
                    dCount = false;
                }

                else {
                    if (isValid) {
                        input.innerHTML = "";
                        isValid = false;
                    }
                    input.innerHTML += val;
                }
                e.preventDefault();
        }
    }

var myEval = function(input) {
    var tempVal = "";
    var res = 0;
    var state = "+";
    var operators = "+-";

    var updateSum = function() {
        if (tempVal.length > 0) {
            if (state == "+") {
                res += parseInt(tempVal);
            } else if (state == "-") {
                res -= parseInt(tempVal)
            }
        }
    }

    for (var i = 0; i < input.length; i++) {
        if (operators.indexOf(input[i]) !== -1) {
            updateSum();
            state = input[i];
            tempVal = "";
        }
        else {
            tempVal += input[i];
            if (i == input.length - 1) {
                updateSum();
            }
        }
    }
    return res;
}

