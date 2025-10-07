const inputs = Array.from(document.querySelectorAll(".form-control"));
const myForm = document.querySelector(".myForm");
let sites = JSON.parse(localStorage.getItem("sites")) || [];

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const site = {
    siteName: inputs[0].value,
    siteURL: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
  };
  sites.push(site);
  localStorage.setItem("sites", JSON.stringify(sites));
  myForm.reset();
  displayData();
});

const displayData = () => {
  const result = sites.map((site)=> {
    return `
          <tr class="text-center">
            <td>${site.siteName}</td>
            <td>${site.siteURL}</td>
            <td>${site.email}</td>
            <td>${site.password}</td>
          </tr>`
  }).join(' ');
  document.querySelector(".tableInfo").innerHTML = result;
};
displayData();

