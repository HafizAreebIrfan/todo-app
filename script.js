const tasktitle = document.querySelector(".tasktitle");
const taskdesc = document.querySelector(".taskdesc");
const historyrow = document.querySelector(".historyrow");
const list = document.querySelector(".list");
const listtitle = document.querySelector(".listtitle");
const listdesc = document.querySelector(".listdesc");
const searchlist = document.querySelector("#searchlist");
const timer = document.querySelector(".timer");
const share = document.querySelector(".share");
const edittitle = document.querySelector(".edittitle");
const listcount = document.querySelector(".listcount");
const itembox = document.querySelector(".itembox");
const itemtitle = document.querySelector(".itemtitle");
const taskinfomodal = document.querySelector("#taskinfomodal");
const createtaskbtn = document.querySelector(".createtask");
const closemodal = document.querySelector(".modalclose");

createtaskbtn.addEventListener("click", () => {
  taskinfomodal.style.display = "block";
});
closemodal.onclick = function () {
  taskinfomodal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == taskinfomodal) {
    taskinfomodal.style.display = "none";
  }
};
