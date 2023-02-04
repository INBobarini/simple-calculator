let formulaDisplayed = "";
let resultDisplayed = "";
const keys = [".",0,1,2,3,4,5,6,7,8,9,"+","-","*","/"];
const operands = ["+","-","*","/"];
let off = true;

setOnKey();

function setUpCAlc(){
    let zero = document.querySelector(".displaytotal");
    zero.textContent = "0";
    if(!off){return}
    operands.forEach((op)=>setConsecutiveOperation(op))
    keys.forEach((key)=>readyKeys(key));
    setClearKey();
    setBackspace();
    setOffKey();
    setOperateKey();
    off = false;
}

function setConsecutiveOperation(id){
    const operation = document.getElementById(`${id}`)
    operation.addEventListener('click',(e)=>{
        if(!resultDisplayed){return}//to allow first calculation
        formulaDisplayed = resultDisplayed;
        let formula = document.querySelector(".displayformula");
        formula.textContent = formulaDisplayed;
    })
}


function setOperateKey(){
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
        return num1 / num2;
    }
    let total = functs[operands.indexOf(operand)] //only possible if operands and functs have the same order
    let showResult = document.querySelector(".displaytotal");
    resultDisplayed = total;
    showResult.textContent = resultDisplayed;
}

function readyKeys(id){ //takes an array of key IDs and sets up the pressings to display
    const key = document.getElementById(`${id}`)
    key.addEventListener('click',()=>{
        formulaDisplayed += key.id; // adds the pressed to the displayed formula
        let formula = document.querySelector(".displayformula");
        formula.textContent = formulaDisplayed;
    })
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
function setOnKey(){
    const onKey = document.getElementById("ON")
    onKey.addEventListener('click', (e)=>setUpCAlc(e))
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
    resultDisplayed = "";
    resetR.textContent = resultDisplayed;
}



