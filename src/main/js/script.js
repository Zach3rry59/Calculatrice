let displayCalc = document.getElementById('display');
let resultCalc = document.getElementById("result");
let btns = Array.from(document.getElementsByClassName("button"));

let resultat = "";
let calcul = "";
let operateur = [];

// btnsCalc.map((btn) => {
//   btn.addEventListener("click", (e) => {
//     switch (e.target.innerText) {
//       case "C":
//         displayCalc.innerText = "";
//         resultCalc.innerText = "0";
//         break;
//       case "=":
//         try {
//           displayCalc.innerText = eval(displayCalc.innerText);
//         } catch {
//           displayCalc.innerText = "";
//           resultCalc.innerText = "Error";
//         }
//         break;
//       case "←":
//         if (displayCalc.innerText) {
//           displayCalc.innerText = displayCalc.innerText.slice(0, -1);
//         }
//         break;
//       default:
//         displayCalc.innerText += e.target.innerText;
//         resultCalc.innerText = eval(displayCalc.innerText);
//     }
//   });
// });

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
  let final = " ";
  checkOperateur(text);
  //TODO COde a vérifier
  if(getOperateur(text) == "+" || getOperateur(text) == "-"){
    console.log(text)
    let resultat = eval(text)
    setResultat(resultat);
  }

  else if(getOperateur(text) == "*")
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
    setResultat(eval(final));
  }
}


//#region Fonction du Display Text (Écran de la calculatrice)


function setDisplayText(text){
  displayCalc.innerText += text;
}

function removeDisplayText(){
  displayCalc.innerText = "";
}

function getDisplayText(){
  return displayCalc.innerText;
}

//#endregion

//#region Fonction du Resultat Text

function setDisplayResultat(result){
  resultCalc.innerText = resultat;
}

function removeResultat(){
  resultCalc.innerText = ""
}

function setResultat(result){
  resultat = result;
}

function getResultat(){
  return resultat;
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
  let symbole = "";
  for (let i = 0; i < text.length; i++){
    if(text[i] == "+" || text[i] == "-" || text[i] == "*" || text[i] == "/"){
      symbole = text[i];
    }
  }
  return symbole;
}

//#endregion