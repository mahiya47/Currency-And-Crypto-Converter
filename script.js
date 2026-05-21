const amountInput = document.querySelector("#amount-input");
const amountOutput = document.querySelector("#amount-output");
const fromCurrencyDropdown = document.querySelector("#from-currency");
const toCurrencyDropdown = document.querySelector("#to-currency");
const convertBtn = document.querySelector("#convert-btn");
const fromCurrencyChosen = document.querySelector(".from-currency-choosen");
const toCurrencyChosen = document.querySelector(".to-currency-choosen");
const fiatRatesList = document.querySelector("#fiat-rates-list");
const cryptoRatesList = document.querySelector("#crypto-rates-list");

convertBtn.addEventListener("click", async () => {
  let fromInput = fromCurrencyDropdown.value.toLowerCase();
  let url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromInput}.json`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    let toInput = toCurrencyDropdown.value.toLowerCase();
    let rate = data[fromInput][toInput];
    let amount = amountInput.value;
    let finalAmount = amount * rate;
    if (finalAmount < 1) {
      amountOutput.value = finalAmount.toFixed(6);
    } else {
      amountOutput.value = finalAmount.toFixed(2);
    }
    fromCurrencyChosen.innerText = fromCurrencyDropdown.value.toUpperCase();
    if (rate < 1) {
      toCurrencyChosen.innerText = `${rate.toFixed(6)} ${toCurrencyDropdown.value.toUpperCase()}`;
    } else {
      toCurrencyChosen.innerText = `${rate.toFixed(2)} ${toCurrencyDropdown.value.toUpperCase()}`;
    }

    let impCurrency = ["usd", "eur", "gbp", "jpy", "aud"];
    let impCrypto = ["btc", "eth", "sol", "bnb", "xrp"];
    fiatRatesList.innerHTML = "";
    cryptoRatesList.innerHTML = "";
    impCrypto.forEach((cryp) => {
      let cryptoRate = data[fromInput][cryp];
      let displayRateCryp;

      if (cryptoRate < 1) {
        displayRateCryp = cryptoRate.toFixed(6);
      } else {
        displayRateCryp = cryptoRate.toFixed(2);
      }
      let listItemCryp = `<li><span>${cryp.toUpperCase()}</span> : ${displayRateCryp} </li>`;
      cryptoRatesList.innerHTML += listItemCryp;
    });
    impCurrency.forEach((curr) => {
      let currRate = data[fromInput][curr];
      let displayRateCurr;

      if (currRate < 1) {
        displayRateCurr = currRate.toFixed(6);
      } else {
        displayRateCurr = currRate.toFixed(2);
      }
      let listItemCurr = `<li><span>${curr.toUpperCase()}</span> : ${displayRateCurr} </li>`;
      fiatRatesList.innerHTML += listItemCurr;
    });
  } catch (error) {}
});
