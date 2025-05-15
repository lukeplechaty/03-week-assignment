console.log("hi");

let cookies = 0;
let CPS = 0;

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
      }
    });
    shop.appendChild(shopBtn);
    shop.appendChild(shopText);
    shops.appendChild(shop);
  });
}
getShop();

const cookieBtn = document.getElementById("cookie-btn");
cookieBtn.addEventListener("click", () => {
  cookies++;
});

const cookiesText = document.getElementById("cookies");
const CPSText = document.getElementById("CPS");
setInterval(() => {
  cookiesText.textContent = `Cookies: ${cookies}`;
  CPSText.textContent = `CPS: ${CPS}`;
}, 0);

setInterval(() => {
  cookies = cookies + CPS;
}, 1000);
