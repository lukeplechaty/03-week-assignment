console.log("hi");

let cookies = 0;
let CPS = 0;

load(); //load save data

const shops = document.getElementById("upgrades");
async function getShop() {
  const rawData = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const jsonData = await rawData.json();
  jsonData.forEach((element) => {
    const shop = document.createElement("div");
    const shopBtn = document.createElement("button");
    const shopText = document.createElement("p");
    shopText.textContent = `Price: ${element.cost}\r\nCPS: ${element.increase}`;
    shopBtn.textContent = element.name;
    shopBtn.addEventListener("click", () => {
      if (cookies >= element.cost) {
        CPS = CPS + element.increase;
        cookies = cookies - element.cost;
        save();
      }
    });
    shop.appendChild(shopBtn);
    shop.appendChild(shopText);
    shops.appendChild(shop);
  });
} //API call and setup
getShop();

const cookieBtn = document.getElementById("cookie-btn");
cookieBtn.addEventListener("click", () => {
  cookies++;
}); //user add cookie to cookies

const cookiesText = document.getElementById("cookies");
const CPSText = document.getElementById("CPS");
setInterval(() => {
  cookiesText.textContent = `Cookies: ${cookies}`;
  CPSText.textContent = `CPS: ${CPS}`;
}, 0); //text update

setInterval(() => {
  cookies = cookies + CPS;
}, 1000); //1min auto CPS

setInterval(() => {
  save();
}, 300000); //5min auto asve

function save() {
  localStorage.setItem("cookies", cookies);
  localStorage.setItem("CPS", CPS);
} //local save

function load() {
  try {
    cookies = JSON.parse(localStorage.getItem("cookies")) || 0;
    CPS = JSON.parse(localStorage.getItem("CPS")) || 0;
  } catch (e) {}
} //local load

const saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", () => {
  save();
}); //save botton

const resetBtn = document.getElementById("reset");
resetBtn.addEventListener("click", () => {
  localStorage.clear();
  cookies = 0;
  CPS = 0;
}); //reset button
