
let displayCalc = document.getElementById('display');
let btnsCalc = Array.from(document.getElementsByClassName('button'));

btnsCalc.map( btn => {
  btn.addEventListener('click', (e) => {
      switch(e.target.innerText){
          case 'C':
              displayCalc.innerText = '';
              break;
          case '=':
              try{
                  displayCalc.innerText = eval(displayCalc.innerText);
              } catch {
                  displayCalc.innerText = "Error"
              }
              break;
          case '←':
              if (displayCalc.innerText){
                 displayCalc.innerText = displayCalc.innerText.slice(0, -1);
              }
              break;
          default:
              displayCalc.innerText += e.target.innerText;
      }
  });
});

/* let choix;
let premierNombre;
let deuxiemeNombre;
do {
  premierNombre = prompt("Entrez un premier nombre");
  premierNombre = Number(premierNombre);
  deuxiemeNombre = prompt("Entrez un deuxième nombre");
  deuxiemeNombre = Number(deuxiemeNombre);
  choix = prompt(
    "Que souhaitez-vous faire ?\n\n 1 - Addition\n 2 - Multiplication\n 3 - Soustraction\n 4 - Division "
  ); // \n permet de faire un saut de ligne
} while (choix == "" || choix == null);
{
  // vide ou null si l'utilisateur refuse la boite de dialogue
  function Addition(nombreA, nombreB) {
    let result = nombreA + nombreB;
    return result;
  }
  function Multiplication(nombreA, nombreB) {
    let result = nombreA * nombreB;
    return result;
  }
  function Soustraction(nombreA, nombreB) {
    let result = nombreA - nombreB;
    return result;
  }
  function Division(nombreA, nombreB) {
    let result = nombreA / nombreB;
    return result;
  }
  switch (choix) {
    case "1":
      var resultat = Addition(premierNombre, deuxiemeNombre); // bien précisé var resultat = function (param1,param2) pour pouvoir recup le resultat
      break;
    case "2":
      var resultat = Multiplication(premierNombre, deuxiemeNombre);
      break;
    case "3":
      var resultat = Soustraction(premierNombre, deuxiemeNombre);
      break;
    case "4":
      var resultat = Division(premierNombre, deuxiemeNombre);
      if (deuxiemeNombre == 0) {
        alert("La division par 0 est impossible");
      }
      break;
    default:
      console.alert("Il a eu un bug");
  }
  alert("Le resultat est égal à " + resultat); // result is not defined  // j'avais oublié de mettre var resultat dans le switch
}
 */