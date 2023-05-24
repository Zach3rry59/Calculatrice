let displayCalc = document.getElementById('display');
let resultCalc = document.getElementById("result");
let btns = Array.from(document.getElementsByClassName("button"));

let resultat = "";
let calcul = "";
let operateur = [];


btns.map((btn) => {
  btn.addEventListener('click', (e) => {
    switch (e.target.id){
      default:
        setDisplayText(e.target.value);
        calcul += e.target.value;
        break;

      case ("allClear"):
        removeDisplayText();
        removeCalcule();
        removeResultat();
        break;

      case ("equalBtn"):
        mathematique(calcul, e);
        setDisplayResultat(getResultat())
        break; 
      
      case("clear"):
      displayCalc.innerText = displayCalc.innerText.slice(0, -1);
        break;
    }
  })
})

function mathematique(text, element){
  let etape = [];
  let final = "";
  checkOperateur(text);
  //TODO COde a vérifier
  // if(text.includes("+") || text.includes("-")){
  //   let resultat = eval(text)
  //   setResultat(resultat);
  // }

  if(getOperateur(text) == "*")
  {
    
    for(let i = 0; i< text.length; i++ ){
      
      for(let y = 0; y <= operateur.length; y++){
        
        if(text[i] == operateur[y]){
         etape.push("*");
        }
      }
      etape.push(text[i])
    }
    for(let z = 0; z < etape.length; z++){
      final += etape[z];
    }
    console.log((final))
    setResultat((final));
  }
}


//#region Fonction du Display Text (Écran de la calculatrice)


function setDisplayText(text){
  displayCalc.innerText = text;
}

function removeDisplayText(){
  displayCalc.innerText = "";
}

function getDisplayText(){
  return displayCalc.innerText;
}

//#endregion

//#region Fonction du Resultat Text

function setResultCalc(text){
  resultCalc.innerText = text;
}

function removeResultat(){
  resultCalc.innerText = ""
}
function getResultat(){
  return resultCalc.innerText;
}

//#endregion

//#region Fonction Divers

function removeCalcule(){
  calcul = "";
}

function checkOperateur(text){
  for (let i = 0; i < text.length; i++){
    if(text[i] == "+" || text[i] == "-" || text[i] == "*" || text[i] == "/"){
      operateur.push(i);
    }
  }
}

function getOperateur(text){
  let operateur = "";
  for (let i = 0; i < text.length; i++){
    if(text[i] == "+" || text[i] == "-" || text[i] == "*" || text[i] == "/"){
      operateur = text[i];
    }
  }
}

//#endregion