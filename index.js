let formulaDisplayed = "";
let resultDisplayed = "";
const keys = [".",0,1,2,3,4,5,6,7,8,9,"+","-","*","/"];
const operands = ["+","-","*","/"];
let off = true;

setOnKey();

function setOnKey(){// deploys the event listener for the ON key
    const onKey = document.getElementById("ON")
    onKey.addEventListener('click', (e)=>setUpCAlc(e))
}
function setUpCAlc(){//deploys the event listeners from every key, but the "ON"
    resetDisplay();
    if(!off){return}
    operands.forEach((op)=>setConsecutiveOperation(op))
    keys.forEach((key)=>readyKeys(key));
    setEqualKey();
    setBackspace();
    setClearKey();
    setOffKey();
    off = false;
}

function setConsecutiveOperation(id){//allows to continue operations with the previous result
    const operation = document.getElementById(`${id}`)
    operation.addEventListener('click',(e)=>{
        if(resultDisplayed=="0"){return}//to allow first calculation
        formulaDisplayed = resultDisplayed;
        let formula = document.querySelector(".displayformula");
        formula.textContent = formulaDisplayed;
    })
}

function readyKeys(id){ //takes an array of key IDs and sets up the pressings to display
    const key = document.getElementById(`${id}`)
    key.addEventListener('click',(e)=>{
        if(off){return}
        formulaDisplayed += key.id; // adds the pressed to the displayed formula
        let formula = document.querySelector(".displayformula");
        formula.textContent = formulaDisplayed;
    })
}

function setEqualKey(){
    let equal = document.getElementById("=")
    equal.addEventListener('click', (e)=>operate(e))
}

function operate(e){//event: press equal
    let operand = "";
    operands.forEach((op)=>{if(formulaDisplayed.includes(op)) operand = op}) //find the operand present
    if (!operand) return; //do not continue if there is no operand
    let i = formulaDisplayed.indexOf(operand);
    let num1 = formulaDisplayed.substring(0, i);
    let num2 = formulaDisplayed.substring(i+1);
    let total = calculate(num1,num2,operand) //only possible if operands and functs have the same order
    let showResult = document.querySelector(".displaytotal");
    resultDisplayed = total;
    showResult.textContent = resultDisplayed;
}

function setBackspace(){
    let backspace = document.getElementById("DEL")
    backspace.addEventListener('click',(e)=>{
        formulaDisplayed = formulaDisplayed.slice(0,-1)
        let formula = document.querySelector(".displayformula");
        formula.textContent = formulaDisplayed;
    })
}

function setClearKey(){
    const clearKey = document.getElementById("C")
    clearKey.addEventListener('click', (e)=>resetFormula())
}

function setOffKey(){
    const offKey = document.getElementById("OFF")
    offKey.addEventListener('click', (e)=>resetDisplay())
}


function resetDisplay(){
    resetFormula()
    resetResult()
}

function resetFormula(){
    let reset = document.querySelector(".displayformula")
    formulaDisplayed = "";
    reset.textContent = formulaDisplayed;
}

function resetResult(){
    let resetR = document.querySelector(".displaytotal")
    resultDisplayed = "0";
    resetR.textContent = resultDisplayed;
}

function displayFormula(){
    let display = document.querySelector(".displayformula")
    display.textContent = formulaDisplayed;
}

function displayTotal(){
    let display = document.querySelector(".displaytotal")
    display.textContent = formulaDisplayed;
}

function calculate (num1,num2,operand){

        const functs = [ 
            sum(num1,num2),
            subs(num1,num2),
            mult(num1,num2),
            div(num1, num2)
        ]
        function sum(num1,num2){
            return num1*1 + num2*1; // to convert to number type
        }
        function subs(num1,num2){
            return num1 - num2;
        }
        function mult(num1,num2){
            return num1 * num2;
        }
        function div(num1,num2){
            if (num2=="0") num2 = 1; 
            return num1 / num2;
        }
        return functs[operands.indexOf(operand)]
}


