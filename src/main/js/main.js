let displayCalc = document.getElementById("display");
let resultCalc = document.getElementById("result");
let btns = Array.from(document.getElementsByClassName("button"));

let resultat = "";
let calcule = "";
let tbl = "";
let tbl2 = false;
const MathOp = "+Math.";
let operateurs = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "π",
  "xY",
  "lg",
  "ln",
  "√x",
  "!",
  ".",
];
let operateursSizeTwo = ["xY", "lg", "ln", "√x"];
let operateursSizeThree = ["cos", "sin", "tan", "deg", "2nd", "1/x"];

btns.map((btn) => {
  btn.addEventListener("click", (e) => {
    switch (e.target.id) {
      default:
        if (!checkDoubleElement(getCalcule(), e.target.value)) {
          let editText = checkDoubleOperateur(getCalcule(), e.target.value);
          setDisplayText(editText);
          setCalcule(editText);
          if (tbl2 != "") {
            tbl2 += editText.charAt(editText.length - 1);
          }
        }
        tbl = getCalcule();
        tbl = tbl.split(" ");
        if (
          tbl[tbl.length - 1] == "cos" ||
          tbl[tbl.length - 1] == "sin" ||
          tbl[tbl.length - 1] == "tan"
        ) {
          setCalcule(getCalcule() + "(");
          setDisplayText(getCalcule());
          for (let i = 1; i < tbl.length; i++) {
            tbl[i] = MathOp.concat("", tbl[i] + "(");
            console.log(tbl);
          }
          tbl = tbl.join("");
          tbl2 = tbl;
        }
        if (typeof tbl2 === "string") {
          calcul(tbl2);
          setDisplayResultat(getResultat());
        } else {
          calcul(getCalcule());
          setDisplayResultat(getResultat());
        }
        break;

      case "allClear":
        removeDisplayText();
        removeCalcule();
        removeResultat();
        tbl2 = false;
        break;

      case "equalBtn":
        setDisplayText(getResultat());
        setCalcule(getResultat());
        break;

      case "clear":
        displayCalc.innerText = displayCalc.innerText.slice(0, -1);
        calcule = calcule.slice(0, -1);
        tbl2 = tbl2.slice(0, -1);
        break;
    }
  });
});
//#region Fonction du Display Text (Écran de la calculatrice)

function setDisplayText(text) {
  displayCalc.innerText = text;
}

function removeDisplayText() {
  displayCalc.innerText = "";
}

function getDisplayText() {
  return displayCalc.innerText;
}

//#endregion

//#region Fonction du Resultat Text

function setDisplayResultat(result) {
  resultCalc.innerText = result;
}

function removeResultat() {
  resultat = "";
  resultCalc.innerText = "";
}

function setResultat(result) {
  resultat = result;
}

function getResultat() {
  return resultat;
}

//#endregion

//#region Fonction du Display Text (Écran de la calculatrice)

function setDisplayText(text) {
  displayCalc.innerText = text;
}

function removeDisplayText() {
  displayCalc.innerText = "";
}

function getDisplayText() {
  return displayCalc.innerText;
}

//#endregion

//#region Fonction du Resultat Text

function setDisplayResultat(result) {
  resultCalc.innerText = result;
}

function removeResultat() {
  resultat = "";
  resultCalc.innerText = "";
}

function setResultat(result) {
  resultat = result;
}

function getResultat() {
  return resultat;
}

//#endregion

//#region Fonction Calcule

function setCalcule(calcul) {
  calcule = calcul;
}

function getCalcule() {
  return calcule;
}

function removeCalcule() {
  calcule = "";
}

function calcul(number) {
  if (number.length == 1) {
    if (checkOperateur(number.charAt(0))) {
      test = number.charAt(0);
      if (test == "*" || test == "/") {
        setDisplayText("");
      } else {
        number = number.slice(0, -1);
      }
    }
  } else {
    if (checkOperateur(number.charAt(number.length - 1))) {
      number = number.slice(0, -1);
      setResultat("" + eval(number));
    } else {
      setResultat("" + eval(number));
    }
  }
}

//#endregion

//#region Fonction Operateur

function checkOperateur(element) {
  let resultat = false;
  for (let i = 0; i < operateurs.length; i++) {
    if (operateurs[i] == element && checkSizeOperateur(element) == 1) {
      resultat = true;
    }
  }
  for (let i = 0; i < operateursSizeTwo.length; i++) {
    if (operateursSizeTwo[i] == element && checkSizeOperateur(element) == 2) {
      resultat = true;
    }
  }
  for (let i = 0; i < operateursSizeThree.length; i++) {
    if (operateursSizeThree[i] == element && checkSizeOperateur(element) == 3) {
      resultat = true;
    }
  }
  return resultat;
}

function checkSizeOperateur(element) {
  let size;
  if (element.length == 1) {
    size = 1;
  } else if (element.length == 2) {
    size = 2;
  } else if (element.length == 3) {
    size = 3;
  }

  return size;
}

String.prototype.sliceReplace = function (start, end, repl) {
  return this.substring(0, start) + repl + this.substring(end);
};

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
function checkDoubleElement(calcul, element) {
  let result = false;
  let caractere = "";

  caractere = calcul.charAt(calcul.length - 1);
  if (caractere != element) {
    result = false;
  } else if (caractere == element && !checkOperateur(element)) {
    return false;
  } else {
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
function checkDoubleOperateur(text, element) {
  let caractere = "";
  let newText = "";
  let sizeOperateur;

  for (let i = 0; i < 4; i++) {
    if (i == 1) {
      if (checkOperateur(text.charAt(text.length - i, text.length))) {
        caractere = text.charAt(text.length - i, text.length);
        sizeOperateur = i;
      }
    }
    if (checkOperateur(text.substring(text.length - i, text.length))) {
      caractere = text.substring(text.length - i, text.length);
      sizeOperateur = i;
    }
  }
  if (checkOperateur(caractere) && checkOperateur(element)) {
    if (caractere != element) {
      if (sizeOperateur == 1) {
        newText = text.sliceReplace(text.length - 1, text.length, element);
      } else if (sizeOperateur == 2) {
        newText = text.sliceReplace(text.length - 2, text.length, element);
      } else if (sizeOperateur == 3) {
        newText = text.sliceReplace(text.length - 3, text.length, element);
      }
    }
  } else {
    newText = text + element;
  }
  return newText;
}

//#endregion

function swap() {
  const swapMode = document.getElementById("swapMode");
  const box = document.getElementById("box");
  const container = document.getElementById("container");
  const buttonsSci = document.querySelectorAll('input[swap="sci"]');
  if (swapMode.className == "buttonsSci") {
    swapMode.className = "buttons";
    box.className = "box";
    container.className = "container";
    buttonsSci.forEach((button) => {
      button.style.display = "none";
    });
  } else {
    swapMode.className = "buttonsSci";
    box.className = "boxSci";
    container.className = "containerSci";
    buttonsSci.forEach((button) => {
      button.style.display = "grid";
    });
  }
}
