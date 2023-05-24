let displayCalc = document.getElementById('display');
let resultCalc = document.getElementById("result");
let btns = Array.from(document.getElementsByClassName("button"));

let resultat = "";
let calcule = "";
let operateur = [];

btns.map((btn) => {

  btn.addEventListener('click', (e) => {
    switch (e.target.id){
      default:
        if(!checkDoubleOperateur(calcule, e.target.value) && e.target.id != "equalBtn" ){
          setDisplayText(e.target.value);
          calcule += e.target.value;
        }
        
        break;

      case ("allClear"):
        removeDisplayText();
        removeCalcule();
        removeResultat();
        break;

      case ("equalBtn"):
        mathematique(calcule, e);
        setDisplayResultat(getResultat())
        break; 
      
      case("clear"):
        displayCalc.innerText = displayCalc.innerText.slice(0, -1);
        calcule = calcule.slice(0, -1)
        break;
    }
  })
})

function mathematique(text, element)
{
  // let modifiyText = checkDoubleOperateur(text);
  // removeDisplayText();
  // setDisplayText(modifiyText);
  
  if(checkOperateur(text) == "+" || checkOperateur(text) == "-" || checkOperateur(text) == "*" ){
    let result = eval(text);
    setResultat(result);
  }

  else if(checkOperateur(text) == "/")
  {
    let check = false;
    for(let i = 0; i< text.length; i++){
      if(i-1 > 0){
        if (text[i] == "0" && text[i-1] == "/" ){
          check = true;
        }
      }
    }
    if (check){
      setResultat("Erreur")
    }else{
      let result = eval(text);
      setResultat(result);
    }
  }

  else if(checkOperateur(text) == "%")
  {
    let etape = [];
    let final = "";
    for(let i = 0; i< text.length; i++ ){
      for(let y = 0; y <= operateur.length-1; y++){
        if(text[i] == operateur[y] && operateur[y] == "%"){
         etape.push("*100");
        }
      }
      if(text[i] != "%"){
        etape.push(text[i])
      }
    }
    for(let z = 0; z < etape.length; z++){
      final += etape[z];
    }
    setResultat(eval(final))
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
  resultCalc.innerText = result;
}

function removeResultat(){
  resultat = ""
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

function removeAll(){
  removeCalcule();
  removeDisplayText();
  removeResultat();
}

function removeCalcule(){
  calcule = "";
}

function checkOperateur(text)
{
  let symbole = "";
  operateur = [];
  for (let i = 0; i < text.length; i++)
  {
    if(text.substring(i, i+1) == "+" || text.substring(i, i+1) == "-" || text.substring(i, i+1) == "*" || text.substring(i, i+1) == "/" || text.substring(i, i+1) == "%"){
      symbole = text[i];
      operateur.push(text[i]);
    }
  }
  return symbole;
}

/**
 * Vérifie si il a deux fois de suite un opérateur mathématique
 * @param {*} text le text a vérifier
 * @param {*} element l'element a vérifier avant de l'ajouter au text 
 * @returns renvoie un text sans deux operateur a la suite
 */
function checkDoubleOperateur(text, element){
  /**
   * Le text Modifier final
   */
  let result = false;
  
  let caractere = "";
  caractere = text.charAt(text.length-1);
  if(caractere != element){
    result = false;
  }else{
    result = true;
  }
  
  return result;
}

//#endregion