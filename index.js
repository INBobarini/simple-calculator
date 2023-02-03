
let formulaDisplayed = "";
const keys = [".","=",0,1,2,3,4,5,6,7,8,9,"+","-","*","/"];
keys.forEach((key)=>readyKey(key))

function displaypressed(){

}
function displayTotal(){

}

function readyKey(id){ //takes an array of key IDs and sets up the pressings to display
    const btn = document.getElementById(`${id}`)
    btn.addEventListener('click',()=>{
        formulaDisplayed += btn.id; // adds the pressed to the displayed formula
        let formula = document.querySelector(".displayformula");
        formula.textContent = formulaDisplayed;
    })
}   


