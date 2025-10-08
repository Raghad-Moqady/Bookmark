const inputs = Array.from(document.querySelectorAll(".form-control"));
const hiddenInput = document.querySelector(".hiddenInput");

const myForm = document.querySelector(".myForm");
let sites = JSON.parse(localStorage.getItem("sites")) || [];
//form btns
const add_btn = document.querySelector(".add_btn");
const update_btn = document.querySelector(".update_btn");
const cancel_btn = document.querySelector(".cancel_btn");
const reset_btn= document.querySelector(".reset_btn");

//table btns
const removeAll_btn = document.querySelector(".removeAll_btn");
let delete_btns;
let edit_btns;

// create
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

//Read
const displayData = () => {
  const result = sites
    .map((site, index) => {
      return `
          <tr class="text-center">
            <td>${index}</td>
            <td>${site.siteName}</td>
            <td>${site.siteURL}</td>
            <td>${site.email}</td>
            <td>${site.password}</td>
            <td>
            <button type="button" class="btn btn-danger rounded-5 delete_btn" onclick= deleteItem(${index})>Delete</button>
            <button type="button" class="btn btn-warning rounded-5 edit_btn" onclick= edit(${index})>Edit</button>
            </td>
          </tr>`;
    })
    .join(" ");
  document.querySelector(".tableInfo").innerHTML = result;

  delete_btns = Array.from(document.querySelectorAll(".delete_btn"));
  edit_btns = Array.from(document.querySelectorAll(".edit_btn"));
};
displayData();

//Remove All
removeAll_btn.addEventListener("click", () => {
  sites = [];
  localStorage.removeItem("sites");
  displayData();
});

// Delete Item
const deleteItem = (index) => {
  sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displayData();
};

// Update Item : 2 steps
//step 1:
const edit = (index) => {
  add_btn.setAttribute("hidden", true);
  add_btn.setAttribute("disabled", true);
  reset_btn.setAttribute("hidden",true);

  update_btn.removeAttribute("hidden");
  cancel_btn.removeAttribute("hidden");

  removeAll_btn.setAttribute("disabled", true);
  delete_btns.forEach((btn) => {
    btn.setAttribute("disabled", true);
  });
  edit_btns.forEach((btn) => {
    btn.setAttribute("disabled", true);
  });

  inputs[0].value = sites[index].siteName;
  inputs[1].value = sites[index].siteURL;
  inputs[2].value = sites[index].email;
  inputs[3].value = sites[index].password;
  hiddenInput.value = index;
};

//step 2:
update_btn.addEventListener("click", () => {
  const site = sites[hiddenInput.value];

  site.siteName = inputs[0].value;
  site.siteURL = inputs[1].value;
  site.email = inputs[2].value;
  site.password = inputs[3].value;

  localStorage.setItem("sites", JSON.stringify(sites));
  myForm.reset();

  add_btn.removeAttribute("hidden");
  add_btn.removeAttribute("disabled");
  reset_btn.removeAttribute("hidden");

  update_btn.setAttribute("hidden", true);
  cancel_btn.setAttribute("hidden", true);

  removeAll_btn.removeAttribute("disabled");
  displayData();
});

cancel_btn.addEventListener("click", () => {
  add_btn.removeAttribute("hidden");
  add_btn.removeAttribute("disabled");
  reset_btn.removeAttribute("hidden");

  update_btn.setAttribute("hidden", true);
  cancel_btn.setAttribute("hidden", true);

  removeAll_btn.removeAttribute("disabled");
  delete_btns.forEach((btn) => {
    btn.removeAttribute("disabled");
  });
  edit_btns.forEach((btn) => {
    btn.removeAttribute("disabled");
  });
  myForm.reset();
});
