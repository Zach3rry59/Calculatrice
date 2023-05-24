let displayCalc = document.getElementById('display');
let resultCalc = document.getElementById("result");
let btns = Array.from(document.getElementsByClassName("button"));

let resultat = "";
let calcule = "";

let operateurs = ["+", "-", "*", "/", "%", "cos", "sin", "tan", "π", "deg", "2nd", "xY", "lg", "ln", "√x", "!", "1/x", "."]

btns.map((btn) => {

    btn.addEventListener('click', (e) => {
      switch (e.target.id){
        default:
            if(e.target.id != "equalBtn"){
              if(!checkDoubleElement(calcule, e.target.value)){
                let editText = checkDoubleOperateur(calcule, e.target.value);
                setDisplayText(editText);
                setCalcule(editText);
              }
            }
            if(getResultat() == ""){
                setDisplayResultat("");
            }else {
                setDisplayResultat(getResultat());
            }
            break;
  
        case ("allClear"):
          removeDisplayText();
          removeCalcule();
          removeResultat();
          break;
  
        case ("equalBtn"):
          setDisplayResultat(getResultat());
          break; 
        
        case("clear"):
          displayCalc.innerText = displayCalc.innerText.slice(0, -1);
          calcule = calcule.slice(0, -1)
          break;
      }
    })
  })


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

  //#region Fonction Calcule

  function setCalcule(calcul){
    calcule = calcul;
  }

  function getCalcule(){
    return calcule;
  }

  function removeCalcule(){
    calcule = "";
  }

  //#region 
  function checkOperateur(element){
    let resultat = false;
    for(let i = 0; i< operateurs.length; i++){
      if(operateurs[i] == element){
        resultat = true;
      }
    }
    return resultat;
  }

  //#region Fonction Divers
  
  /**
 * Vérifie si element est un opérateur (qui a déja était ajouter ou non) ou si il est un chiffre. 
 * @param {*} calcul le calcul a vérifier
 * @param {*} element l'element a vérifier avant de l'ajouter au text 
 * @returns 
 * Si true alors l'opérateur est le dernier caractere du calcul (calcule)
 * Si flase :
 * - Soit caractere est un chiffre mais element est un chiffre différent return false
 * - Soit caractere et element sont le meme chiffre return false
 */
function checkDoubleElement(calcul, element){
    let result = false;
    let caractere = "";

    caractere = calcul.charAt(calcul.length-1);
    if(caractere != element){
      result = false;
    }
    else if(caractere == element && !checkOperateur(element)){
      return false;
    }
    else{
      result = true;
    }
    return result;
  }

  /**
   * Vérifie si il y a deux opérateur différent et le remplace par son contraire exemple : 9+- = 9-
   * @param {*} text le text a vérifer et a modifier 
   * @param {*} element l'opérateur a vérifier est a ajouter ou a remplacer 
   * @returns le text final
   */
  function checkDoubleOperateur(text, element){
    let caractere = "";
    let newText = "";

    caractere = text.charAt(text.length-1);
    //Opérateur Standart
    if(caractere == "+" && element == "-"){
        newText = text.replace(caractere, "-");
    }
    else if(caractere == "-" && element == "+"){
        newText = text.replace(caractere, "+");
    }
    else if(caractere == "*" && element == "/"){
        newText = text.replace(caractere, "/");
    }
    else if(caractere == "/" && element == "*"){
        newText = text.replace(caractere, "*");
    }

    else if(checkOperateur(caractere) && checkOperateur(element)){
      newText = text;
    }

    else{
        newText = text + element
    }
    return newText;
  }

  //#endregion