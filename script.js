const tasktitle = document.querySelector(".tasktitle");
const taskdesc = document.querySelector(".taskdesc");
const historyrow = document.querySelector(".historyrow");
const list = document.querySelector(".list");
const listtitle = document.querySelector(".listtitle");
const listdesc = document.querySelector(".listdesc");
const searchlist = document.querySelector("#searchlist");
const tasknameinput = document.querySelector("#taskname");
const error = document.querySelector(".error");
const timer = document.querySelector(".timer");
const share = document.querySelector(".share");
const edittitle = document.querySelector(".edittitle");
const listcount = document.querySelector(".listcount");
const itembox = document.querySelector(".itembox");
const itemtitle = document.querySelector(".itemtitle");
const taskinfomodal = document.querySelector("#taskinfomodal");
const createtaskbtn = document.querySelector(".createtask");
const closemodal = document.querySelector(".modalclose");
const taskinfotitle = document.querySelector(".taskinfotitle");
const modaldesc = document.querySelector("#modaldesc");
const modaldatetime = document.querySelector("#modaldatetime");
const todoicon = document.querySelector(".todoicon");
const savetask = document.querySelector(".savetask");

createtaskbtn.addEventListener("click", () => {
  if (tasknameinput.value === "") {
    error.innerText = "Enter Task Name First";
    tasknameinput.style.border = "1px solid red";
    createtaskbtn.style.border = "1px solid red";
    error.style.color = "red";
  } else {
    taskinfomodal.style.display = "block";
    taskinfotitle.innerText = tasknameinput.value;
    tasknameinput.style.border = "1px solid #61ce70";
    createtaskbtn.style.border = "1px solid #61ce70";
    error.style.display = "none";
    tasknameinput.value = "";
  }
});
closemodal.onclick = function () {
  taskinfomodal.style.display = "none";
  tasknameinput.style.border = "1px solid #d7d7d7";
  createtaskbtn.style.border = "1px solid #d7d7d7";
};
window.onclick = function (event) {
  if (event.target == taskinfomodal) {
    taskinfomodal.style.display = "none";
  }
};
tasknameinput.addEventListener("focus", () => {
  tasknameinput.style.border = "1px solid #61ce70";
  createtaskbtn.style.border = "1px solid #61ce70";
});
tasknameinput.addEventListener("blur", () => {
  tasknameinput.style.border = "1px solid #d7d7d7";
  createtaskbtn.style.border = "1px solid #d7d7d7";
});
