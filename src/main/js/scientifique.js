
function getCos(input) {
    // let ecran = document.getElementById("display");
    // let resultat = Math.PI += " ";
    // ecran.value += resultat;
    let result = parseFloat(input);
    result = eval (Math.cos(input));
    console.log(input)
    console.log(result);
    console.log(eval(input))
    return result;
}

function calcul(){
    let chiffre1 = document.getElementsByClassName("button").value;
    let chiffre2 = document.getElementsByClassName("button").value;
    switch(operateur){
        case '+': return chiffre1 + chiffre2;
        case '-': return chiffre1 - chiffre2;
        case '*': return chiffre1 * chiffre2;
        case '/': return chiffre1 / chiffre2;
        case 'cos': return Math.cos(chiffre1);
        //etc ...
    }
    console.log( document.getElementsByClassName("button").value)
}
// Si tu parles de la touche 10^x, il suffit de remplacer le chiffre affiché par le resultat de (Math.pow(10, parseFloat(document.getElementsByName('box_resultat')[0].value) || 0);


 //#region Fonction du Display Text (Écran de la calculatrice)


