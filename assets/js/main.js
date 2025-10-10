const inputs = Array.from(document.querySelectorAll(".form-control"));
const hiddenInput = document.querySelector(".hiddenInput");

const myForm = document.querySelector(".myForm");
let sites = JSON.parse(localStorage.getItem("sites")) || [];
//form btns
const add_btn = document.querySelector(".add_btn");
const update_btn = document.querySelector(".update_btn");
const cancel_btn = document.querySelector(".cancel_btn");
const reset_btn = document.querySelector(".reset_btn");

//table btns
const removeAll_btn = document.querySelector(".removeAll_btn");
let delete_btns;
let edit_btns;

// validation :
const siteNameErrorMsg = document.querySelector(".siteNameErrorMsg");
const siteURLErrorMsg = document.querySelector(".siteURLErrorMsg");
const userEmailErrorMsg = document.querySelector(".userEmailErrorMsg");
const userPasswordErrorMsg = document.querySelector(".userPasswordErrorMsg");

//search
const search_input= document.querySelector(".search_input");

const validateSiteName = () => {
  const regex = /^[A-Za-z0-9\s\-_.]{3,50}$/;
  if (!regex.test(inputs[0].value)) {
    inputs[0].classList.remove("is-valid");
    inputs[0].classList.add("is-invalid");
    siteNameErrorMsg.textContent =
      "Site name must be 3–50 characters and can include letters, numbers, spaces, and -_.";
    return false;
  } else {
    inputs[0].classList.remove("is-invalid");
    inputs[0].classList.add("is-valid");
    siteNameErrorMsg.textContent = "";
    return true;
  }
};
// const validateSiteURL = () => {
//   const regex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z]{2,})(\/.*)?$/;
//   if (!regex.test(inputs[1].value)) {
//     inputs[1].classList.remove("is-valid");
//     inputs[1].classList.add("is-invalid");
//     siteURLErrorMsg.textContent =
//       "Enter a valid URL like https://example.com or www.example.org";
//     return false;
//   } else {
//     inputs[1].classList.remove("is-invalid");
//     inputs[1].classList.add("is-valid");
//     siteURLErrorMsg.textContent = "";
//     return true;
//   }
// };
const validateUserEmail = () => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!regex.test(inputs[2].value)) {
    inputs[2].classList.remove("is-valid");
    inputs[2].classList.add("is-invalid");
    userEmailErrorMsg.textContent =
      "Please enter a valid email address like user@example.com";

    return false;
  } else {
    inputs[2].classList.remove("is-invalid");
    inputs[2].classList.add("is-valid");
    userEmailErrorMsg.textContent = "";
    return true;
  }
};
const validateUserPassword = () => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  if (!regex.test(inputs[3].value)) {
    inputs[3].classList.remove("is-valid");
    inputs[3].classList.add("is-invalid");
    userPasswordErrorMsg.textContent =
      "Password must be at least 8 characters and include uppercase, lowercase, and a number";
    return false;
  } else {
    inputs[3].classList.remove("is-invalid");
    inputs[3].classList.add("is-valid");
    userPasswordErrorMsg.textContent = "";
    return true;
  }
};

inputs[0].addEventListener("input", validateSiteName);
// inputs[1].addEventListener("input", validateSiteURL);
inputs[2].addEventListener("input", validateUserEmail);
inputs[3].addEventListener("input", validateUserPassword);

// create
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  if (!validateSiteName()) {
    isValid = false;
  }
  // if (!validateSiteURL()) {
  //   isValid = false;
  // }
  if (!validateUserEmail()) {
    isValid = false;
  }
  if (!validateUserPassword()) {
    isValid = false;
  }

  if (!isValid) {
    add_btn.setAttribute("disabled", true);
    // إضافة أحداث input لإعادة تفعيل الزر عند تصحيح الأخطاء
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (
          validateSiteName() &&
          // validateSiteURL() &&
          validateUserEmail() &&
          validateUserPassword()
        ) {
          add_btn.removeAttribute("disabled");
        }
      });
    });
    return;
  }

  const site = {
    siteName: inputs[0].value,
    siteURL: inputs[1].value,
    email: inputs[2].value,
    password: inputs[3].value,
  };
  sites.push(site);
  localStorage.setItem("sites", JSON.stringify(sites));
  myForm.reset();
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
  displayData();
  Swal.fire({
  position: "center-center",
  icon: "success",
  title: "Added successfully",
  showConfirmButton: false,
  timer: 1700
});
});

//Read
const displayData = () => {
  const result = sites
    .map((site, index) => {
      return `
          <tr class="text-center">
            <td>${index}</td>
            <td>${site.siteName}</td>
            <td><a href=${site.siteURL}>${site.siteURL}</a></td>
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
  Swal.fire({
  title: "Do you want to remove All data?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Remove",
  denyButtonText: `Dont Remove`
}).then((result) => {
  if (result.isConfirmed) {
  sites = [];
  localStorage.removeItem("sites");
  displayData();
    Swal.fire("Done!", "", "success");
  } 
});

});

// Delete Item
const deleteItem = (index) => {
  Swal.fire({
  title: "Are you sure?",
  text: `You want to delete site # ${index}`,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
 sites.splice(index, 1);
  localStorage.setItem("sites", JSON.stringify(sites));
  displayData();
    Swal.fire({
      title: "Deleted!",
      text: `Your site # ${index} has been deleted.`,
      icon: "success"
    });
  }
});
 
};

// Update Item : 2 steps
//step 1:
const edit = (index) => {
  add_btn.setAttribute("hidden", true);
  add_btn.setAttribute("disabled", true);
  reset_btn.setAttribute("hidden", true);

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
   let isValid = true;

  if (!validateSiteName()) {
    isValid = false;
  }
  // if (!validateSiteURL()) {
  //   isValid = false;
  // }
  if (!validateUserEmail()) {
    isValid = false;
  }
  if (!validateUserPassword()) {
    isValid = false;
  }

  if (!isValid) {
    update_btn.setAttribute("disabled", true);
    // إضافة أحداث input لإعادة تفعيل الزر عند تصحيح الأخطاء
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (
          validateSiteName() &&
          // validateSiteURL() &&
          validateUserEmail() &&
          validateUserPassword()
        ) {
          update_btn.removeAttribute("disabled");
        }
      });
    });
    return;
  }
  const site = sites[hiddenInput.value];

  site.siteName = inputs[0].value;
  site.siteURL = inputs[1].value;
  site.email = inputs[2].value;
  site.password = inputs[3].value;

  localStorage.setItem("sites", JSON.stringify(sites));
  add_btn.removeAttribute("hidden");
  add_btn.removeAttribute("disabled");
  reset_btn.removeAttribute("hidden");

  update_btn.setAttribute("hidden", true);
  cancel_btn.setAttribute("hidden", true);

  removeAll_btn.removeAttribute("disabled");
  myForm.reset();
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });
  displayData();
  Swal.fire({
  position: "center-center",
  icon: "success",
  title: "updated successfully",
  showConfirmButton: false,
  timer: 1700
});
});

cancel_btn.addEventListener("click", () => {
  Swal.fire({
  title: "Are you sure?",
  text: "You want to cancel the current modifications!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes,I agree!"
}).then((result) => {
  if (result.isConfirmed) {
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

   inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });

  siteNameErrorMsg.textContent = "";
  siteURLErrorMsg.textContent = "";
  userEmailErrorMsg.textContent = "";
  userPasswordErrorMsg.textContent = "";

  }
});
 });

reset_btn.addEventListener("click", () => {
  inputs.forEach((input) => {
    input.classList.remove("is-valid", "is-invalid");
  });

  siteNameErrorMsg.textContent = "";
  siteURLErrorMsg.textContent = "";
  userEmailErrorMsg.textContent = "";
  userPasswordErrorMsg.textContent = "";

  add_btn.removeAttribute("disabled");
});

// search: 
const filterData=()=>{
  const search_word =search_input.value.toLowerCase();
  const filtered_sites=sites.filter((site)=>{
    return site.siteName.toLowerCase().includes(search_word);
  })

  const result = filtered_sites.map((site, index) => {
      return `
          <tr class="text-center">
            <td>${index}</td>
            <td>${site.siteName}</td>
            <td><a href=${site.siteURL}>${site.siteURL}</a></td>
            <td>${site.email}</td>
            <td>${site.password}</td>
            <td>
            <button type="button" class="btn btn-danger rounded-5 delete_btn" onclick= deleteItem(${index})>Delete</button>
            <button type="button" class="btn btn-warning rounded-5 edit_btn" onclick= edit(${index})>Edit</button>
            </td>
          </tr>`;
    }).join(" ");
  document.querySelector(".tableInfo").innerHTML = result;
}

search_input.addEventListener("input",filterData);

 


