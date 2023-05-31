let displayCalc = document.getElementById("display");
let resultCalc = document.getElementById("result");
let btns = Array.from(document.getElementsByClassName("button"));
const scndBtn = document.getElementById("scndBtn");

let resultat = "0";
let calcule = "";
let tbl = false;
let operateurs = ["+", "-", "*", "/", "%", "!", "."];
let operateursSizeTwo = ["xY", "lg", "ln", "√x"];
let operateursSizeThree = ["cos", "sin", "tan", "deg", "2nd", "1/x"];

window.addEventListener(
  "keydown",
  function (event) {
    if (event.defaultPrevented) {
      return;
    }

    switch (event.key) {
      case "Enter":
        setDisplayText(getResultat());
        setCalcule(getResultat());
        break;

      case "Escape":
        allClear();
        break;
      case "(":
        if (!checkDoubleElement(getDisplayText(), "(")) {
          let editText = checkDoubleOperateur(getDisplayText(), "(");
          setDisplayText(editText);
          setCalcule(editText);
        }
        fun();
        break;
      case ")":
        if (!checkDoubleElement(getDisplayText(), ")")) {
          let editText = checkDoubleOperateur(getDisplayText(), ")");
          setDisplayText(editText);
          setCalcule(editText);
        }
        fun();
        break;

      case "Backspace":
        clear();
        break;

      case "Tab":
        swap();
        break;

      case ".":
        if (!checkDoubleElement(getDisplayText(), ".")) {
          let editText = checkDoubleOperateur(getDisplayText(), ".");
          setDisplayText(editText);
          setCalcule(editText);
        }
        fun();
        break;

      case "+":
        if (!checkDoubleElement(getDisplayText(), "+")) {
          let editText = checkDoubleOperateur(getDisplayText(), "+");
          setDisplayText(editText);
          setCalcule(editText);
        }
        fun();
        break;
      case "-":
        if (!checkDoubleElement(getDisplayText(), "-")) {
          let editText = checkDoubleOperateur(getDisplayText(), "-");
          setDisplayText(editText);
          setCalcule(editText);
        }
        fun();
        break;
      case "*":
        if (!checkDoubleElement(getDisplayText(), "*")) {
          let editText = checkDoubleOperateur(getDisplayText(), "*");
          setDisplayText(editText);
          setCalcule(editText);
        }
        fun();
        break;
      case "/":
        if (!checkDoubleElement(getDisplayText(), "/")) {
          let editText = checkDoubleOperateur(getDisplayText(), "/");
          setDisplayText(editText);
          setCalcule(editText);
        }
        fun();
        break;
      case "0":
        setDisplayText(getDisplayText() + "0");
        setCalcule(getCalcule() + "0");
        fun();
        break;
      case "1":
        setDisplayText(getDisplayText() + "1");
        setCalcule(getCalcule() + "1");
        fun();
        break;
      case "2":
        setDisplayText(getDisplayText() + "2");
        setCalcule(getCalcule() + "2");
        fun();
        break;
      case "3":
        setDisplayText(getDisplayText() + "3");
        setCalcule(getCalcule() + "3");
        fun();
        break;
      case "4":
        setDisplayText(getDisplayText() + "4");
        setCalcule(getCalcule() + "4");
        fun();
        break;
      case "5":
        setDisplayText(getDisplayText() + "5");
        setCalcule(getCalcule() + "5");
        fun();
        break;
      case "6":
        setDisplayText(getDisplayText() + "6");
        setCalcule(getCalcule() + "6");
        fun();
        break;
      case "7":
        setDisplayText(getDisplayText() + "7");
        setCalcule(getCalcule() + "7");
        fun();
        break;
      case "8":
        setDisplayText(getDisplayText() + "8");
        setCalcule(getCalcule() + "8");
        fun();
        break;
      case "9":
        setDisplayText(getDisplayText() + "9");
        setCalcule(getCalcule() + "9");
        fun();
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  },
  true
);

btns.map((btn) => {
  btn.addEventListener("click", (e) => {
    switch (e.target.id) {
      default:
        if (!checkDoubleElement(getDisplayText(), e.target.value)) {
          let editText = checkDoubleOperateur(getDisplayText(), e.target.value);
          setDisplayText(editText);
          setCalcule(editText);
        }
        try {
          fun();
        } catch (error) {
          errorStr = "" + error;
          if (errorStr.includes(")")) {
            setCalcule(getCalcule() + ")");
          }
          try {
            fun();
          } catch (error) {
            errorStr = "" + error;
            if (errorStr.includes(")")) {
              setCalcule(getCalcule() + ")");
            }
            try {
              fun();
            } catch (error) {
              console.log("aucune erreur rajoute une parenthèse");
            }
          }
        }
        break;

      case "swapModeBtn":
        swap();
        break;

      case "onX": // appelle et gere l'affichage de la function 1/x
        setDisplayText(onX());
        break;  
      case "exponentiationBtn" : // appelle et gere l'affichage de la function 1/x
        setDisplayText(xY());
        break;
      case "allClear":
        allClear();
        break;

      case "equalBtn":
        setDisplayText(getResultat());
        setCalcule(getResultat());
        break;

      case "scndBtn":
        second();
        break;
      case "factorialBtn":
        setDisplayResultat(getFactoriel());
        break;
      case "clear":
        clear();
        break;
    }
  });
});

function allClear() {
  removeDisplayText();
  removeCalcule();
  removeResultat();
}

function clear() {
  if (
    checkOperateur(
      getDisplayText().substring(
        getDisplayText().length - 2,
        getDisplayText().length
      )
    )
  ) {
    setDisplayText(getDisplayText().slice(0, -2));
    setCalcule(getCalcule().slice(0, -2));
  } else if (
    checkOperateur(
      getDisplayText().substring(
        getDisplayText().length - 3,
        getDisplayText().length
      )
    )
  ) {
    setDisplayText(getDisplayText().slice(0, -3));
    setCalcule(getCalcule().slice(0, -3));
  } else {
    setDisplayText(getDisplayText().slice(0, -1));
    setCalcule(getCalcule().slice(0, -1));
  }
}
function fun() {
  setCalcule(getCalcule().split(" "));

  if (getCalcule()[1]) {
    setDisplayText(getDisplayText() + "(");
    setDisplayText(getDisplayText().replace(" ", ""));
  }
  setCalcule(getCalcule().join(""));

  setResultat("" + calcul(addOperator(replacer(getCalcule()))));
  if (getResultat() == "Infinity") {
    setResultat("Impossible de diviser par 0");
    setDisplayResultat(getResultat());
  } else if (
    scndBtn.classList.contains("buttonsSec") &&
    getResultat() === "NaN"
  ) {
    setResultat("Erreur");
    setDisplayResultat(getResultat());
  } else if (getResultat() == "NaN") {
    setResultat(" ");
    setDisplayResultat(getResultat());
  } else if (getResultat().includes("function")) {
    setResultat(" ");
    setDisplayResultat(getResultat());
  } else if (getResultat() == "undefined") {
    setResultat("Erreur");
    setDisplayResultat(getResultat());
  } else {
    setDisplayResultat(getResultat());
  }
}

function addOperator(str) {
  let strArray = str.split("");
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ")"];
  for (const number of numbers) {
    for (let i = 0; i < strArray.length; i++) {
      if (strArray[i] === "M" && strArray[i - 1] === number) {
        strArray[i] = "*M";
        str = strArray.join("");
      }
    }
  }
  return str;
}

function dTrig(trigFunc, angle) {
  return trigFunc((angle * Math.PI) / 180);
}

/**
 * The function replaces certain mathematical expressions in a string with their corresponding Math
 * library functions.
 * @param str - The input string that needs to be modified by replacing certain mathematical functions
 * and constants with their corresponding JavaScript Math object methods.
 * @returns The function `replacer` returns a modified string where certain mathematical functions and
 * constants have been replaced with their corresponding JavaScript Math object methods or properties.
 */
function replacer(str) {
  const degRadBtn = document.getElementById("degRadBtn");
  if (scndBtn.classList.contains("buttonsSec")) {
    var pairs = {
      acos: "Math.acos",
      asin: "Math.asin",
      atan: "Math.atan",
      lg: "Math.log10",
      ln: "Math.log",
      π: "Math.PI",
      e: "Math.E",
      "√": "Math.sqrt",
    };
  } else if (
    !scndBtn.classList.contains("buttonsSec") &&
    degRadBtn.value == "deg"
  ) {
    var pairs = {
      cos: "dTrig(Math.cos,",
      sin: "dTrig(Math.sin,",
      tan: "dTrig(Math.tan,",
      lg: "Math.log10",
      ln: "Math.log",
      π: "Math.PI",
      e: "Math.E",
      "√": "Math.sqrt",
    };
  } else {
    var pairs = {
      cos: "Math.cos",
      sin: "Math.sin",
      tan: "Math.tan",
      lg: "Math.log10",
      ln: "Math.log",
      π: "Math.PI",
      e: "Math.E",
      "√": "Math.sqrt",
    };
  }

  Object.keys(pairs).forEach(function (key) {
    str = str.split(key).join(pairs[key]);
  });
  return str;
}

function calcul(number) {
  let resultat = "";
  if (number.length == 1) {
    if (checkOperateur(number.charAt(0))) {
      test = number.charAt(0);
      if (test == "*" || test == "/") {
        setDisplayText("");
      }
    }
  } else {
    if (checkOperateur(number.charAt(number.length - 1))) {
      number = number.slice(0, -1);
      resultat = eval(number);
    } else {
      resultat = eval(number);
    }
  }
  resultat = eval(number);
  return resultat;
}

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
  resultat = "0";
  resultCalc.innerText = "0";
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
        if (checkSizeOperateur(element) == 1) {
          newText = text.sliceReplace(text.length - 1, text.length, element);
        } else {
          newText = text + element;
        }
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

// #Passage calculatrice Scientifique / standard
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

// fais passer le cosinus / sinus / tangente avec le 2nd  et l'enleve en repassage

function second() {
  const scndBtn = document.getElementById("scndBtn");
  const buttonsSec = document.querySelectorAll('input[second="sec"]');
  if (scndBtn.classList.contains("buttonsSec")) {
    scndBtn.classList.add("buttons");
    scndBtn.classList.remove("buttonsSec");
    buttonsSec.forEach((button) => {
      button.value = button.value.substring(1);
    });
  } else {
    scndBtn.classList.add("buttonsSec");
    scndBtn.classList.remove("buttons");
    buttonsSec.forEach((button) => {
      button.value = "a" + button.value;
    });
  }
}

// A finir
function percentage() {
  let tabTest = [];
  for (let valeurs of getDisplayText()) {
    // prend l'input et le met dans un tableau
    if (valeurs != "+" && valeurs != "/" && valeurs != "*" && valeurs != "-") {
      tabTest.push(valeurs.split(","));
    }
    console.log("tabtest ::: ", tabTest);
  }
}

function xY() {
  const equalBtn = document.getElementById("equalBtn");
  let a = getResultat();
  setDisplayResultat(a + "^");
  setDisplayText("");
  setCalcule("");
  let c;
  equalBtn.addEventListener(
    "click",
    (c = function () {
      let b = getResultat();
      setDisplayText(a + "^" + b);
      setDisplayResultat(Math.pow(a, b));
      setResultat(Math.pow(a, b));
      this.removeEventListener("click", c);
    })
  );
}
// FONCTIONNE mais a modif pour ne pas afficher le 1/x lors du clique
function onX() {
  let table = []; // initialise tab
  let table2 = []
  for(let valeurs of getDisplayText()) { // pour chaque valeur dans le display
    table.push(valeurs); // push les valeur dans le tab
    table2 = table.join('');
    Number.valeurs; // transforme le string en number
  }
  let valeur1 = table2; // initialise la variable
  
  if (valeur1 != 0 && !checkOperateur(valeur1)) { // la variable ne peut etre nul ( division)
    let resultat = "";
    resultat = getDisplayText().sliceReplace(getDisplayText().length -3, getDisplayText().length, "1/" + valeur1);
    setDisplayResultat(1/valeur1); // affiche le resultat 
    return resultat;
  }
}

function swapRadDeg() {
  const radDegBtn = document.getElementById("degRadBtn");
  if (radDegBtn.value == "rad") {
    radDegBtn.value = "deg";
  } else {
    radDegBtn.value = "rad";
  }
}

function getFactoriel() {
  let table = []; // initialise le tab
  for(let valeur of getDisplayText()) { // pour chaque valeur dans le display
    while (valeur > 1) {  {
      table.push(valeur); // push les valeur dans le tab
      Number(valeur);
      valeur--;
     }
      }
    }
  let result = table.reduce(function(a,b){
    return a*b;
  });
  
  return result;
}
