let plywoodType;
let plywoodTypeRus;
let plywoodThickness;
let plywoodSort;
let plywoodLength;
let plywoodWidth;
let plywoodAmount;
let plywoodPrice;
let userInputLine = "//////";
const defaultPrice = 1000;
let totalPrice;
const availableSortByType = {
  birch: [1, 2, 3],
  pine: [2, 3],
  larch: [1, 4],
};
const availableSortByThickness = {
  16: [2, 3, 4],
  18: [1, 4],
  20: [1, 2, 3, 4],
};
const plywoodTypePrice = {
  birch: 13,
  pine: 15,
  larch: 10,
};
const plywoodThicknessPrice = {
  16: 10,
  18: 11,
  20: 12,
};
const plywoodSortPrice = {
  1: 120,
  2: 110,
  3: 105,
  4: 100,
};
document
  .querySelector(".js-plywood-type")
  .addEventListener("change", (event) => {
    plywoodType = event.target.value;
    switch (plywoodType) {
      case "birch":
        plywoodTypeRus = "Берёзовая";
        break;
      case "pine":
        plywoodTypeRus = "Сосновая";
        break;
      case "larch":
        plywoodTypeRus = "Лиственница";
        break;
    }
    plywoodThickness = "";
    plywoodSort = "";
    const html = `
     <option value="" disabled selected></option>
        <option value="16">16</option>
        <option value="18">18</option>
        <option value="20">20</option>
        `;
    document.querySelector(".js-plywood-thickness").innerHTML = html;
    document.querySelector(".js-plywood-sort").innerHTML = "";
    updateUserInputLine();
  });
document
  .querySelector(".js-plywood-thickness")
  .addEventListener("change", (event) => {
    plywoodSort = "";
    plywoodThickness = event.target.value;
    updateUserInputLine();
    let sortArray = [];
    let sortReal = [];
    availableSortByType[plywoodType].forEach((element) =>
      sortArray.push(element)
    );
    availableSortByThickness[plywoodThickness].forEach((element) => {
      if (sortArray.includes(element)) sortReal.push(element);
    });
    console.log(sortReal);
    if (sortReal.length == 0) {
      alert("Нет сорта фанеры для данных параметров");
      document.querySelector(".js-plywood-sort").innerHTML = "";
    } else {
      let html = `<option value="" disabled selected></option>`;
      sortReal.forEach((element) => {
        html += `<option value="${element}">${element}</option>`;
      });
      document.querySelector(".js-plywood-sort").innerHTML = html;
    }
  });
document
  .querySelector(".js-plywood-sort")
  .addEventListener("change", (event) => {
    plywoodSort = event.target.value;
    updateUserInputLine();
  });
document
  .querySelector(".js-plywood-length")
  .addEventListener("input", (event) => {
    plywoodLength = document.querySelector(".js-plywood-length").value;
    updateUserInputLine();
  });
document
  .querySelector(".js-plywood-width")
  .addEventListener("input", (event) => {
    plywoodWidth = document.querySelector(".js-plywood-width").value;
    updateUserInputLine();
  });
document
  .querySelector(".js-plywood-amount")
  .addEventListener("input", (event) => {
    plywoodAmount = document.querySelector(".js-plywood-amount").value;
    updateUserInputLine();
  });
document.querySelector(".js-calculate-price").addEventListener("click", () => {
  calculatePrice();
});
function updateUserInputLine() {
  document.querySelector(".js-user-input-type").innerHTML = `${
    plywoodTypeRus || ""
  }`;
  document.querySelector(".js-user-input-thickness").innerHTML = `${
    plywoodThickness || ""
  }`;
  document.querySelector(".js-user-input-sort").innerHTML = `${
    plywoodSort || ""
  }`;
  document.querySelector(".js-user-input-length").innerHTML = `${
    plywoodLength || ""
  }`;
  document.querySelector(".js-user-input-width").innerHTML = `${
    plywoodWidth || ""
  }`;
  document.querySelector(".js-amount").innerHTML = `${plywoodAmount || ""}`;
  /*document.querySelector(".js-user-input-line").innerHTML = `${
    plywoodTypeRus || ""
  }/${plywoodThickness || ""}/${plywoodSort || ""}/${plywoodLength || ""}/${
    plywoodWidth || ""
  }`;
  document.querySelector(".js-user-input-value").innerHTML = `Количество: ${
    plywoodAmount || ""
  } Цена:${plywoodPrice || ""}`;*/
}
function calculatePrice() {
  if (
    plywoodAmount &&
    plywoodLength &&
    plywoodSort &&
    plywoodThickness &&
    plywoodType &&
    plywoodWidth
  ) {
    totalPrice =
      ((defaultPrice *
        plywoodTypePrice[plywoodType] *
        plywoodThicknessPrice[plywoodThickness] *
        plywoodSortPrice[plywoodSort] *
        (plywoodWidth * plywoodLength)) /
        1000000 /
        10000) *
      plywoodAmount;
    totalPrice = Math.ceil(totalPrice);
    document.querySelector(".js-total-value").innerHTML = totalPrice;
  } else {
    alert("Выбрано недостаточно");
  }
}
