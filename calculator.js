const form = document.getElementById("form");
const operandKeys = document.querySelectorAll("button[data-type=operand]");
const operatorKeys = document.querySelectorAll("button[data-type=operator]");
const output = document.getElementById("output");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

let is_operator = false;
let eqn = [];

const limitDigits = () => {
  if (output.value.length > 10) {
    output.value = output.value.slice(0, 10);
  }
};

const calculate = () => {
  eqn.push(output.value);
  let result = eval(eqn.join(""));
  output.value = result;
  limitDigits();
  eqn = [];
};

const deleteLastNumber = () => {
  let newInput = "0";
  output.value !== "0"
    ? output.value.length > 1
      ? (newInput = output.value.slice(0, -1))
      : (newInput = "0")
    : (newInput = "0");
  output.value = newInput;
};

const removeActive = () => {
  operatorKeys.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const getSquareRoot = () => {
  let result = Math.sqrt(output.value);
  output.value = result;
};
const getSquare = () => {
  let result = parseFloat(output.value * output.value);
  output.value = result;
};

operandKeys.forEach((btn) => {
  btn.addEventListener("click", (e) => {
      removeActive();
    let key = e.target;
    if (output.value === "0") {
      output.value = key.value;
    } else if (is_operator) {
      is_operator = false;
      output.value = key.value;
    } else {
      output.value = output.value + key.value;
    }
    limitDigits();
  });
});

operatorKeys.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeActive()
    e.currentTarget.classList.add("active");
    let key = e.target;
    switch (key.value) {
      case "invert":
        output.value = parseFloat(output.value * -1);
        break;
      case "%":
        output.value = parseFloat(output.value / 100);
        break;
      case "clear":
        eqn = [];
        output.value = "0";
        break;
      case "square-root":
        getSquareRoot();
        break;
      case "←":
        deleteLastNumber();
        break;
      case "square":
        getSquare();
        break;
      case "=":
        calculate();
        break;
      default:
        let lastItem = eqn[eqn.length - 1];
        if (["/", "*", "+", "-", "**"].includes(lastItem) && is_operator) {
          eqn.pop();
          eqn.push(key.value);
        } else {
          eqn.push(output.value);
          eqn.push(key.value);
        }
        is_operator = true;
        break;
    }
    limitDigits();
    setTimeout(()=> {
      removeActive();
    }, 2000)
  });
});
