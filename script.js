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
const listcountprog = document.querySelector(".listcountprog");
const listcountdone = document.querySelector(".listcountdone");
const modallistcount = document.querySelector(".modallistcount");
const modalitemboxcontainer = document.querySelector(".modalitemboxcontainer");
const todoitemboxcontainer = document.querySelector(".listitemboxcontainer");
const progitemboxcontainer = document.querySelector(".progitemboxcontainer");
const doneitemboxcontainer = document.querySelector(".doneitemboxcontainer");
let itembox;
let itemtitle;
const taskinfomodal = document.querySelector("#taskinfomodal");
const createtaskbtn = document.querySelector(".createtask");
const closemodal = document.querySelector(".modalclose");
const taskinfotitle = document.querySelector(".taskinfotitle");
const modaldesc = document.querySelector("#modaldesc");
const modaldatetime = document.querySelector("#modaldatetime");
const modaltodoicon = document.querySelector(".modaltodoicon");
let modaldeletebtn;
let modaldeleteicon;
const todoicon = document.querySelector(".todoicon");
const savetask = document.querySelector(".savetask");
const everyday = document.querySelector("#everyday");
const landingsection = document.querySelector("#landing");
let itemCount = 0;

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
    let taskinfoheading = taskinfotitle.innerText;
    modalfunctionality(taskinfoheading);
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
const modalfunctionality = (taskinfoheading) => {
  modaltodoicon.addEventListener("click", () => {
    itemCount++;
    modallistcount.innerText = itemCount;
    itembox = document.createElement("div");
    itembox.classList.add("itembox");
    itembox.setAttribute("data-id", itemCount);
    itemtitle = document.createElement("input");
    itemtitle.classList.add("itemtitle");
    itemtitle.setAttribute("contenteditable", "true");
    itemtitle.setAttribute("type", "text");
    itemtitle.setAttribute("placeholder", "click to edit...");
    modaldeletebtn = document.createElement("button");
    modaldeletebtn.classList.add("modaldeletebtn");
    modaldeletebtn.style.cursor = "pointer";
    modaldeleteicon = document.createElement("i");
    modaldeleteicon.classList.add("fas", "fa-trash", "modaldeleteicon");
    modaldeletebtn.style.border = "none";
    modaldeleteicon.style.color = "#c00000";
    itembox.appendChild(itemtitle);
    modaldeletebtn.appendChild(modaldeleteicon);
    itembox.appendChild(modaldeletebtn);
    let movebtn = document.createElement("button");
    movebtn.classList.add("todomovebtn");
    let moveicon = document.createElement("i");
    moveicon.classList.add("fas", "fa-chevron-circle-right", "todomoveicon");
    movebtn.appendChild(moveicon);
    itembox.appendChild(movebtn);
    movebtn.style.display = "none";
    movebtn.style.marginLeft = "5px";
    moveicon.style.display = "none";
    modalitemboxcontainer.appendChild(itembox);
    itemtitle.addEventListener("focus", () => {
      itemtitle.style.borderBottom = "1px solid #61ce70";
    });
    itemtitle.addEventListener("blur", () => {
      itemtitle.style.borderBottom = "1px solid #d7d7d7";
    });
    itemtitle.focus();
    modaldeletebtn.addEventListener("click", (e) => {
      e.target.closest(".itembox").remove();
      itemCount--;
      modallistcount.innerText = itemCount;
    });
    movebtn.addEventListener("click", () => {
      console.log("Move button clicked");
    });
  });
  savetaskfunc(taskinfoheading, modalitemboxcontainer);
};
const savetaskfunc = (taskinfoheading, modalitemboxcontainer) => {
  savetask.addEventListener("click", () => {
    let modaldescription = modaldesc.value;
    let everydayvalue = everyday.checked;
    let modaldate = modaldatetime.value;
    let usertime = new Date(modaldate).getTime();

    if (modaldesc.value === "" || itemtitle.value === "") {
      modaldesc.style.border = "1px solid red";
      itemtitle.style.borderBottom = "1px solid red";
    } else {
      taskinfomodal.style.display = "none";
      const allitemtitle = document.querySelectorAll(".itemtitle");
      allitemtitle.forEach((item) => {
        let itemtitlevalue = item.value.trim();
        if (everydayvalue) {
          listfunction(
            true,
            itemCount,
            usertime,
            itemtitlevalue,
            taskinfoheading,
            modaldescription,
            modalitemboxcontainer,
          );
        } else {
          listfunction(
            false,
            itemCount,
            usertime,
            itemtitlevalue,
            taskinfoheading,
            modaldescription,
            modalitemboxcontainer,
          );
        }
      });
    }
  });
};
modaldesc.addEventListener("focus", () => {
  modaldesc.style.border = "1px solid #61ce70";
});
modaldesc.addEventListener("blur", () => {
  modaldesc.style.border = "1px solid #d7d7d7";
});
modaldatetime.addEventListener("focus", () => {
  modaldatetime.style.border = "1px solid #61ce70";
});
modaldatetime.addEventListener("blur", () => {
  modaldatetime.style.border = "1px solid #d7d7d7";
});

const listfunction = (
  dateOrEveryday,
  itemCount,
  usertime,
  itemtitle,
  taskinfoheading,
  modaldescription,
  modalitemboxcontainer,
) => {
   let itemcount = listcount.innerText = `${itemCount} | `;
   console.log(itemcount)
  const moveButtons = modalitemboxcontainer.querySelectorAll(".todomovebtn");
  const moveIcons = modalitemboxcontainer.querySelectorAll(".todomoveicon");
  const deleteButtons = modalitemboxcontainer.querySelectorAll(".modaldeletebtn");
  moveButtons.forEach((btn) => {
    btn.style.display = "block";
  });
  moveIcons.forEach((icon) => {
    icon.style.display = "block";
  });
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const itembox = e.target.closest(".itembox");
      const itemId = itembox.getAttribute("data-id");
      if (itemId) {
        itembox.remove();
        itemcount = itemCount--;
        listcount.innerText = `${itemcount} | `;
      }
    });
  });

  todoitemboxcontainer.append(modalitemboxcontainer);
  landingsection.classList.add("hide");
  list.classList.remove("hide");
  listtitle.innerText = taskinfoheading;
  listdesc.innerText = modaldescription;
  
  let timerText;
  if (dateOrEveryday === true) {
    timerText = "Everyday";
    timer.innerText = timerText;
  } else {
    let taskbooktimer;
    let x = setInterval(() => {
      let systemtime = new Date().getTime();
      let distance = usertime - systemtime;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(x);
        taskbooktimer = "Expired";
      } else if (days > 0) {
        taskbooktimer =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
      } else if (hours > 0) {
        taskbooktimer = hours + "h " + minutes + "m " + seconds + "s ";
      } else if (minutes > 0) {
        taskbooktimer = minutes + "m " + seconds + "s ";
      } else {
        taskbooktimer = seconds + "s ";
      }
      timer.innerText = taskbooktimer;
    }, 1000);
  }
};

const additemintodo = () => {
  todoicon.addEventListener("click", () => {
    itemCount++;
    listcount.innerText = `${itemCount} | `;
    let newitembox = document.createElement("div");
    newitembox.classList.add("itembox");
    const newinputitemtitle = document.createElement("input");
    newinputitemtitle.classList.add("itemtitle");
    newinputitemtitle.setAttribute("type", "text");
    newinputitemtitle.setAttribute("placeholder", "click to edit...");
    newitembox.appendChild(newinputitemtitle);
    const newtododeletebtn = document.createElement("button");
    newtododeletebtn.classList.add("tododeletebtn");
    const newtododeleteicon = document.createElement("i");
    newtododeleteicon.classList.add("fas", "fa-trash", "tododeleteicon");
    newtododeletebtn.appendChild(newtododeleteicon);
    newitembox.appendChild(newtododeletebtn);
    const newtodomovebtn = document.createElement("button");
    newtodomovebtn.classList.add("todomovebtn");
    const newtodomoveicon = document.createElement("i");
    newtodomoveicon.classList.add(
      "fas",
      "fa-chevron-circle-right",
      "todomoveicon"
    );
    newtodomovebtn.appendChild(newtodomoveicon);
    newitembox.appendChild(newtodomovebtn);
    todoitemboxcontainer.appendChild(newitembox);
    console.log(todoitemboxcontainer);
    newtododeletebtn.addEventListener("click", (e) => {
      e.target.closest(".itembox").remove();
      itemCount--;
      listcount.innerText = `${itemCount} | `;
    });
    newtodomovebtn.addEventListener("click", () => {
      console.log("Move button clicked");
    });
  });
};

additemintodo();
if (
  progitemboxcontainer.innerHTML.trim() === "" ||
  doneitemboxcontainer.innerHTML.trim() === ""
) {
  const createNothingMessage = () => {
    const nothing = document.createElement("p");
    nothing.classList.add("nothingdata");
    nothing.innerText = "No items available";
    return nothing;
  };
  if (progitemboxcontainer.innerHTML.trim() === "") {
    progitemboxcontainer.appendChild(createNothingMessage());
  }
  if (doneitemboxcontainer.innerHTML.trim() === "") {
    doneitemboxcontainer.appendChild(createNothingMessage());
  }
}
// const movetoinprogress = (itemCount, itemtitle) => {
//   console.log("Function called");
// listcountprog.innerText = itemCount;
// itembox = document.createElement("div");
// itembox.classList.add("itembox");
// const inputitemtitle = document.createElement("input");
// inputitemtitle.classList.add("itemtitle");
// inputitemtitle.setAttribute("type", "text");
// inputitemtitle.value = itemtitle;
// itembox.appendChild(inputitemtitle);
// const progdonebtn = document.createElement("button");
// progdonebtn.classList.add("progdonebtn");
// const progdoneicon = document.createElement("i");
// progdoneicon.classList.add(
//   "fas",
//   "fa-chevron-circle-right",
//   "progdoneicon"
// );
// progdonebtn.appendChild(progdoneicon);
// itembox.appendChild(progdonebtn);
// progitemboxcontainer.appendChild(itembox);
// };

//add time if user selected date and time -- Done
//add button in todo to move it to in progress or to done --- Done
//if user select in progress ask for duration then add timer of that duration.
//when timer adds move that item to done
//store this notesbook in history and localstorage and display on landing page,
// the data of each user
//make site responsive
//test
//deploy
//done
