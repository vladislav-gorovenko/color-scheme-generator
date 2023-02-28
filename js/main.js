// import other JS files
import data from "./data.js";
import Color from "./Color.js";

// querySelectors
const formEl = document.querySelector(".color-generator__head");
const colorPickerEl = document.querySelector(".color-generator__color-picker");
const colorEls = document.querySelectorAll(".color-generator__color");
const colorHexEls = document.querySelectorAll(".color-generator__color-hex");
const dropdownBtnEl = document.querySelector(".color-generator__dropdown--btn");
const dropdownChoicesContainerEl = document.querySelector(
  ".color-generator__dropdown--choices"
);
const dropdownChoices = document.querySelectorAll(
  ".color-generator__dropdown--choice"
);

// initial code
let color = new Color(data);

// event listeners
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  generateColors();
});

dropdownBtnEl.addEventListener("click", () => {
  dropdownChoicesContainerEl.classList.toggle("visible");
});

dropdownChoices.forEach((choiceEl, index) => {
  choiceEl.addEventListener("click", (e) => {
    // clear selected
    clearSelected();
    choiceEl.classList.add("selected");
    // updating value of color in Class instance
    color.updateMode(dropdownChoices[index].getAttribute("mode"));
    // updating HTML for mode input section
    const html = `
        <p>${dropdownChoices[index].innerText}</p>
        <i class="fa-solid fa-angle-down fa"></i>
    `;
    dropdownBtnEl.innerHTML = html;
    // closing pop up window
    dropdownChoicesContainerEl.classList.remove("visible");
  });
});

colorPickerEl.addEventListener("change", () => {
  color.updateColor(colorPickerEl.value.slice(1));
});

colorHexEls.forEach((hexEl) => {
  hexEl.addEventListener("click", async () => {
    const text = hexEl.innerHTML;
    try {
      await navigator.clipboard.writeText(text);
      alert(`You copied hex code: ${text}`);
    } catch (err) {
      alert(`Failed to copy: ${err}`);
    }
  });
});

colorEls.forEach((colorEl) => {
  colorEl.addEventListener("click", async () => {
    const text = colorEl.getAttribute("color").toUpperCase();
    try {
      await navigator.clipboard.writeText(`#${text}`);
      alert(`You copied hex code: #${text}`);
    } catch (err) {
      alert(`Failed to copy: ${err}`);
    }
  });
});

// functions

function renderColors(colors) {
  colorPickerEl.value = `#${colors[0]}`;
  colorEls.forEach((colorEl, index) => {
    const colorHex = colors[index];
    colorEl.style = `background: #${colorHex}`;
    colorEl.setAttribute("color", colorHex);
    colorHexEls[index].innerHTML = `#${colorHex}`.toUpperCase();
  });
}

function generateColors() {
  let colors = [color.color];
  color.fetchData().then((data) => {
    data.colors.forEach((color) => colors.push(color.hex.clean));
    renderColors(colors);
  });
}

function clearSelected() {
  dropdownChoices.forEach((choice) => choice.classList.remove("selected"));
}
