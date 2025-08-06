const form = document.getElementById("userForm");
const output = document.getElementById("output");
let editIndex = -1;

window.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("formDataList")) || [];
  renderData(savedData);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    age: document.getElementById("age").value.trim(),
    father: document.getElementById("father").value.trim(),
    mother: document.getElementById("mother").value.trim(),
    dobAD: document.getElementById("dob_ad").value.trim(),
    marital: document.getElementById("marital").value
  };

  if (Object.values(formData).some(val => val === "")) {
    alert("Please fill out all fields.");
    return;
  }

  let dataList = JSON.parse(localStorage.getItem("formDataList")) || [];

  if (editIndex > -1) {
    dataList[editIndex] = formData;
    editIndex = -1;
  } else {
    dataList.push(formData);
  }

  localStorage.setItem("formDataList", JSON.stringify(dataList));
  renderData(dataList);
  form.reset();
});

function renderData(dataArray) {
  output.innerHTML = dataArray.length === 0 ? "<p>No submissions yet.</p>" : "<h3>Saved Submissions:</h3>";
  dataArray.forEach((entry, index) => {
    output.innerHTML += `
      <div class="entry">
        <p><strong>Name:</strong> ${entry.name}</p>
        <p><strong>Email:</strong> ${entry.email}</p>
        <p><strong>Age:</strong> ${entry.age}</p>
        <p><strong>Father's Name:</strong> ${entry.father}</p>
        <p><strong>Mother's Name:</strong> ${entry.mother}</p>
        <p><strong>DOB (AD):</strong> ${entry.dobAD}</p>
        <p><strong>Marital Status:</strong> ${entry.marital}</p>
        <button class="btn-edit" onclick="editEntry(${index})">Edit</button>
        <button class="btn-delete" onclick="deleteEntry(${index})">Delete</button>
      </div>
    `;
  });
}

function editEntry(index) {
  const dataList = JSON.parse(localStorage.getItem("formDataList")) || [];
  const entry = dataList[index];
  document.getElementById("name").value = entry.name;
  document.getElementById("email").value = entry.email;
  document.getElementById("age").value = entry.age;
  document.getElementById("father").value = entry.father;
  document.getElementById("mother").value = entry.mother;
  document.getElementById("dob_ad").value = entry.dobAD;
  document.getElementById("marital").value = entry.marital;
  editIndex = index;
}

function deleteEntry(index) {
  if (!confirm("Are you sure you want to delete this entry?")) return;
  let dataList = JSON.parse(localStorage.getItem("formDataList")) || [];
  dataList.splice(index, 1);
  localStorage.setItem("formDataList", JSON.stringify(dataList));
  renderData(dataList);
}

function clearForm() {
  form.reset();
  editIndex = -1;
}

function clearAllData() {
  if (!confirm("Are you sure you want to clear all data?")) return;
  localStorage.removeItem("formDataList");
  output.innerHTML = "<p>All data cleared.</p>";
  form.reset();
  editIndex = -1;
}

function exportToJSON() {
  const data = localStorage.getItem("formDataList");
  if (!data || data === "[]") {
    alert("No data to export.");
    return;
  }
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "formData.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
