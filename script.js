console.log("hi");

let cookies = 0;
let CPS = 0;

const cookiesText = document.getElementById("cookies");
const CPSText = document.getElementById("CPS");

const main = document.getElementById("cookie-main");
const settings = document.getElementById("settings");
const shops = document.getElementById("upgrades");
const popup = document.getElementById("popup");

const shopBtn = document.getElementById("upgrades-btn");
const settingsBtn = document.getElementById("settings-btn");
const cookieBtn = document.getElementById("cookie-btn");
const saveBtn = document.getElementById("save-btn");
const resetBtn = document.getElementById("reset-btn");

const soundVolume = document.getElementById("sound-volume");

const clickSound = new Audio(`click.ogg`);

load(); //load local save data
getShop(); //load all shops

async function getShop() {
  const rawData = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const jsonData = await rawData.json();
  jsonData.forEach((element) => {
    const shop = document.createElement("div");
    const shopBtn = document.createElement("button");
    const shopCostText = document.createElement("p");
    const shopCPSText = document.createElement("p");

    shopBtn.className = `shop-btn`;
    shopBtn.textContent = element.name;
    shopBtn.addEventListener("click", () => {
      if (cookies >= element.cost) {
        clickSound.play();
        CPS += element.increase;
        cookies -= element.cost;
        doPopup(`${element.increase} added to CPS`);
        save();
      }
    });

    shopCostText.className = `shop-cost`;
    shopCostText.textContent = `Price: ${element.cost}`;

    shopCPSText.className = `shop-CPS`;
    shopCPSText.textContent = `CPS: ${element.increase}`;

    shop.className = `shop`;

    shop.appendChild(shopBtn);
    shop.appendChild(shopCostText);
    shop.appendChild(shopCPSText);
    shops.appendChild(shop);
  });
} //API call and setup

cookieBtn.addEventListener("click", () => {
  cookies++;
  clickSound.play();
}); //user add cookie to cookies

setInterval(() => {
  cookiesText.textContent = `Cookies: ${cookies}`;
  CPSText.textContent = `CPS: ${CPS}`;
}, 0); //text update

setInterval(() => {
  cookies += CPS;
}, 1000); //1min auto CPS

setInterval(() => {
  save();
  doPopup(`auto saved`);
}, 300000); //5min auto asve

function save() {
  localStorage.setItem("cookies", cookies);
  localStorage.setItem("CPS", CPS);
  localStorage.setItem("volume", clickSound.volume);
} //local save

function load() {
  try {
    cookies = JSON.parse(localStorage.getItem("cookies")) || 0;
    CPS = JSON.parse(localStorage.getItem("CPS")) || 0;
    clickSound.volume = JSON.parse(localStorage.getItem("volume")) || 0.75;
    soundVolume.value = clickSound.volume * 100;
  } catch (e) {
    console.log(`load error: `, e);
  }
} //local load

saveBtn.addEventListener("click", () => {
  clickSound.play();
  save();
  doPopup(`game has saved`);
}); //save botton

resetBtn.addEventListener("click", () => {
  clickSound.play();
  localStorage.clear();
  cookies = 0;
  CPS = 0;
  doPopup(`game has reset`);
}); //reset button

shopBtn.addEventListener("click", () => {
  clickSound.play();
  if (shops.style.visibility === "hidden") {
    shops.style.visibility = "visible";
    settingsBtn.style.visibility = "hidden";
    main.style.visibility = "hidden";
  } else {
    shops.style.visibility = "hidden";
    settingsBtn.style.visibility = "visible";
    main.style.visibility = "visible";
  }
  $(`#upgrades`).css("visibility", "hidden");
}); //shop button toggle display

settingsBtn.addEventListener("click", () => {
  clickSound.play();
  if (settings.style.visibility === "hidden") {
    settings.style.visibility = "visible";
    shopBtn.style.visibility = "hidden";
    main.style.visibility = "hidden";
  } else {
    settings.style.visibility = "hidden";
    shopBtn.style.visibility = "visible";
    main.style.visibility = "visible";
  }
}); //setting button toggle display

soundVolume.addEventListener("input", () => {
  clickSound.volume = soundVolume.value / 100;
  save();
});

function doPopup(text) {
  const popupText = document.createElement("p");
  popupText.textContent = text;
  const firstChild = popup.firstChild;
  popup.insertBefore(popupText, firstChild);
  setTimeout(() => {
    popup.removeChild(popupText);
  }, 5000);
}
