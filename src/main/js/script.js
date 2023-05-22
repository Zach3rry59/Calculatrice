let displayCalc = document.getElementById("display");
let resultCalc = document.getElementById("result");
let btnsCalc = Array.from(document.getElementsByClassName("button"));

btnsCalc.map((btn) => {
  btn.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "C":
        displayCalc.innerText = "";
        break;
      case "=":
        try {
          displayCalc.innerText = eval(displayCalc.innerText);
        } catch {
          displayCalc.innerText = "Error";
        }
        break;
      case "←":
        if (displayCalc.innerText) {
          displayCalc.innerText = displayCalc.innerText.slice(0, -1);
        }
        break;
      default:
        displayCalc.innerText += e.target.innerText;
        if (displayCalc.innerText == "") {
          resultCalc.innerText = "";
        }
        resultCalc.innerText = "= " + eval(displayCalc.innerText);
    }
  });
});
