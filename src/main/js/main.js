let displayCalc = document.getElementById('display');
let resultCalc = document.getElementById("result");
let btns = Array.from(document.getElementsByClassName("button"));

let resultat = "";
let calcule = "";

btns.map((btn) => {

    btn.addEventListener('click', (e) => {
      switch (e.target.id){
        default:
            if(e.target.id != "equalBtn"){
                if(!checkDoubleOperateur(calcule, e.target.value)){
                    let editText = checkDoubleDifferentOperateur(calcule, e.target.value);
                    setDisplayText(editText)
                    setCalcule(editText)
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

  //#region Fonction Divers
  
  /**
 * Vérifie si il a deux fois de suite un opérateur mathématique
 * @param {*} text le text a vérifier
 * @param {*} element l'element a vérifier avant de l'ajouter au text 
 * @returns return false si il n'y a pas deux fois l'operateur, true si il y a deux fois l'opérateur
 */
function checkDoubleOperateur(text, element){
    let result = false;
    let caractere = "";

    caractere = text.charAt(text.length-1);
    if(caractere != element){
      result = false;
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
  function checkDoubleDifferentOperateur(text, element){
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

    else{
        newText = text + element
    }
    
    return newText;
  }

  //#endregion