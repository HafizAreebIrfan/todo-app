const tasktitle = document.querySelector(".tasktitle");
const taskdesc = document.querySelector(".taskdesc");
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
const everydayboxtext = document.querySelector(".everydayboxtext");
const landingsection = document.querySelector("#landing");
let itemCount = 0;
const emptymessage = document.querySelector(".emptymessage");
const inprogemptymessage = document.querySelector(".inprogemptymessage");
const doneemptymessage = document.querySelector(".doneemptymessage");

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
      if (itemCount > 0) {
        emptymessage.style.display = "none";
      } else {
        emptymessage.style.display = "block";
      }
    });

    movebtn.addEventListener("click", () => {});
    if (itemCount > 0) {
      if (modalitemboxcontainer.hasChildNodes(emptymessage)) {
        emptymessage.style.display = "none";
      }
    }
  });
  savetaskfunc(taskinfoheading);
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
everyday.addEventListener("blur", () => {
  everydayboxtext.style.color = "#454545";
});

const eachitemvalue = () => {
  let itemValues = [];
  let itemBoxes = document.querySelectorAll(".itembox");
  itemBoxes.forEach((box, index) => {
    let inputValue = box.querySelector(".itemtitle").value;
    itemValues.push(inputValue);
  });
  return itemValues;
};

let systimeonsave;
const savetaskfunc = (taskinfoheading) => {
  savetask.addEventListener("click", () => {
    let modaldescription = modaldesc.value;
    let everydayvalue = everyday.checked;
    let modaldate = modaldatetime.value;
    let usertime = new Date(modaldate).getTime();
    systimeonsave = new Date();
    if (
      modaldesc.value === "" ||
      itemtitle.value === "" ||
      modaldatetime === "" ||
      everyday === ""
    ) {
      modaldesc.style.border = "1px solid red";
      modaldatetime.style.border = "1px solid red";
      everydayboxtext.style.color = "red";
      itemtitle.style.borderBottom = "1px solid red";
    } else {
      let itemvalue = eachitemvalue();
      taskinfomodal.style.display = "none";
      if (everydayvalue) {
        moveintodo(
          true,
          itemCount,
          usertime,
          taskinfoheading,
          modaldescription,
          itemvalue
        );
      } else {
        moveintodo(
          false,
          itemCount,
          usertime,
          taskinfoheading,
          modaldescription,
          itemvalue
        );
      }
    }
  });
};

const moveintodo = (
  dateOrEveryday,
  itemCount,
  usertime,
  taskinfoheading,
  modaldescription,
  itemvalue
) => {
  landingsection.classList.add("hide");
  list.classList.remove("hide");
  listtitle.innerText = taskinfoheading;
  listdesc.innerText = modaldescription;

  if (dateOrEveryday === true) {
    let timerText;
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

  let todoemptymessage;
  todoemptymessage = document.createElement("p");
  todoemptymessage.classList.add("todoemptymessage");
  todoemptymessage.innerText = "Sorry, no tasks in todo";
  const additemintodo = () => {
    todoicon.addEventListener("click", () => {
      itemCount =
        document.querySelectorAll(".listitemboxcontainer .itembox").length + 1;
      listcount.innerText = `${itemCount} | `;
      const newitembox = document.createElement("div");
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

      newtododeletebtn.addEventListener("click", (e) => {
        e.target.closest(".itembox").remove();
        itemCount = document.querySelectorAll(
          ".listitemboxcontainer .itembox"
        ).length;
        listcount.innerText = `${itemCount} | `;
        if (todoitemboxcontainer.innerHTML.trim() === "") {
          todoitemboxcontainer.appendChild(todoemptymessage);
        } else {
          todoitemboxcontainer.removeChild(todoemptymessage);
        }
      });
      newtodomovebtn.addEventListener("click", () => {
        newitembox.style.display = "none";
        itemCount = document.querySelectorAll(
          ".listitemboxcontainer .itembox"
        ).length;
        listcount.innerText = `${itemCount} | `;
        movetoinprogress(newinputitemtitle.value, todoemptymessage);
      });
      if (todoitemboxcontainer.hasChildNodes(todoemptymessage)) {
        todoitemboxcontainer.removeChild(todoemptymessage);
      }
    });
  };

  itemvalue.forEach((value, index) => {
    listcount.innerText = `${itemCount} | `;
    const todoitembox = document.createElement("div");
    todoitembox.classList.add("itembox");
    const inputitemtitle = document.createElement("input");
    inputitemtitle.classList.add("itemtitle");
    inputitemtitle.setAttribute("type", "text");
    inputitemtitle.setAttribute("placeholder", "click to edit...");
    inputitemtitle.value = value;
    todoitembox.appendChild(inputitemtitle);
    const tododeletebtn = document.createElement("button");
    tododeletebtn.classList.add("tododeletebtn");
    const tododeleteicon = document.createElement("i");
    tododeleteicon.classList.add("fas", "fa-trash", "tododeleteicon");
    tododeletebtn.appendChild(tododeleteicon);
    todoitembox.appendChild(tododeletebtn);
    const todomovebtn = document.createElement("button");
    todomovebtn.classList.add("todomovebtn");
    const todomoveicon = document.createElement("i");
    todomoveicon.classList.add(
      "fas",
      "fa-chevron-circle-right",
      "todomoveicon"
    );
    todomovebtn.appendChild(todomoveicon);
    todoitembox.appendChild(todomovebtn);
    todoitemboxcontainer.appendChild(todoitembox);
    tododeletebtn.addEventListener("click", (e) => {
      e.target.closest(".itembox").remove();
      itemCount--;
      listcount.innerText = `${itemCount} | `;
      if (todoitemboxcontainer.innerHTML.trim() === "") {
        todoitemboxcontainer.appendChild(todoemptymessage);
      } else {
        todoitemboxcontainer.removeChild(todoemptymessage);
      }
    });
    todomovebtn.addEventListener("click", () => {
      todoitembox.style.display = "none";
      itemCount--;
      listcount.innerText = `${itemCount} | `;
      movetoinprogress(inputitemtitle.value, todoemptymessage);
      if (itemCount === 0) {
        todoitemboxcontainer.appendChild(todoemptymessage);
      } else {
        todoitemboxcontainer.removeChild(todoemptymessage);
      }
    });
  });

  additemintodo();

  edittitle.addEventListener("click", () => {
    landingsection.classList.remove("hide");
    list.classList.add("hide");
  });
};

let progitemcount = 0;
const movetoinprogress = (itemvalue, todoemptymessage) => {
  progitemcount++;
  listcountprog.innerText = progitemcount;
  let progitembox = document.createElement("div");
  progitembox.classList.add("itembox");
  const proginputitemtitle = document.createElement("input");
  proginputitemtitle.classList.add("itemtitle");
  proginputitemtitle.setAttribute("type", "text");
  proginputitemtitle.setAttribute("placeholder", "click to edit...");
  proginputitemtitle.value = itemvalue;
  progitembox.appendChild(proginputitemtitle);
  const progmovebtn = document.createElement("button");
  progmovebtn.classList.add("progmovebtn");
  const progmoveicon = document.createElement("i");
  progmoveicon.classList.add("fas", "fa-check-circle", "progmoveicon");
  progmovebtn.appendChild(progmoveicon);
  progitembox.appendChild(progmovebtn);
  const progtimer = document.createElement("input");
  progtimer.classList.add("itemtimer");
  progtimer.setAttribute("type", "datetime-local");
  progitembox.appendChild(progtimer);
  const itemtimer = document.createElement("p");
  itemtimer.classList.add("tasktimertext");
  progitembox.append(itemtimer);
  progitemboxcontainer.appendChild(progitembox);
  eachitemtime(
    progtimer,
    progmovebtn,
    itemtimer,
    progitembox,
    itemvalue,
    todoemptymessage
  );
  if (progitemcount > 0) {
    if (progitemboxcontainer.hasChildNodes(inprogemptymessage)) {
      inprogemptymessage.style.display = "none";
    } else if (progitemcount === 0) {
      inprogemptymessage.style.display = "block";
    }
  }
};

const eachitemtime = (
  progtimer,
  progmovebtn,
  itemtimer,
  progitembox,
  itemvalue,
  todoemptymessage
) => {
  let x;
  let distance;
  progtimer.addEventListener("input", () => {
    if (x) {
      clearInterval(x);
    }
    let useritemtime = new Date(progtimer.value).getTime();
    let taskbooktimer;
    x = setInterval(() => {
      let systemtime = new Date().getTime();
      distance = useritemtime - systemtime;
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if (distance < 0) {
        clearInterval(x);
        taskbooktimer = "Expired";
        progitembox.style.display = "none";
        progitemcount--;
        listcountprog.innerText = `${progitemcount} | `;
        movetodone(
          itemvalue,
          progitemboxcontainer,
          progitemcount,
          listcountprog,
          todoemptymessage,
          distance
        );
        if (progitemcount === 0) {
          inprogemptymessage.style.display = "block";
        }
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
      itemtimer.innerText = taskbooktimer;
    }, 1000);
    progtimer.style.display = "none";
  });
  progmovebtn.addEventListener("click", () => {
    if (distance > 0) {
      if (confirm("Timer is still running, Do u want to mark task to done?")) {
        clearInterval(x);
        progitembox.style.display = "none";
        progitemcount--;
        listcountprog.innerText = `${progitemcount} | `;
        movetodone(
          itemvalue,
          progitemboxcontainer,
          progitemcount,
          listcountprog,
          todoemptymessage,
          distance
        );
        if (progitemcount === 0) {
          inprogemptymessage.style.display = "block";
        }
      } else {
        return;
      }
    }
  });
};

let doneitemcount = 0;
const movetodone = (
  itemvalue,
  progitemboxcontainer,
  progitemcount,
  listcountprog,
  todoemptymessage,
  distance
) => {
  doneitemcount++;
  listcountdone.innerText = doneitemcount;
  let doneitembox = document.createElement("div");
  doneitembox.classList.add("itembox");
  const doneinputitemtitle = document.createElement("input");
  doneinputitemtitle.classList.add("itemtitle");
  doneinputitemtitle.setAttribute("type", "text");
  doneinputitemtitle.setAttribute("contenteditable", "false");
  doneinputitemtitle.value = itemvalue;
  doneitembox.appendChild(doneinputitemtitle);
  doneitemboxcontainer.appendChild(doneitembox);
  const resettaskbook = () => {
    if (timer.innerText === "Everyday") {
      let usersystime = `${systimeonsave.getHours()}:${systimeonsave.getMinutes()}:${systimeonsave.getSeconds()}`;
      let currenttime = new Date();
      let nextDaySameTime = new Date(
        systimeonsave.getTime() + 24 * 60 * 60 * 1000
      );
      console.log("time on save", usersystime);
      console.log("next day same time", nextDaySameTime);
      if (currenttime >= nextDaySameTime) {
        console.log("Hide items");
        doneitembox.style.display = "none";
        doneitemcount = 0;
        listcountdone.innerText = doneitemcount;
      } else {
        console.log("Items are still visible");
        const inProgressItems = document.querySelectorAll(
          ".progitemboxcontainer .itembox"
        );
        inProgressItems.forEach((item) => {
          item.style.display = "none";
        });
        const doneItems = document.querySelectorAll(
          ".doneitemboxcontainer .itembox"
        );
        doneItems.forEach((item) => {
          item.style.display = "none";
          doneitemcount = 0;
          listcountdone.innerText = doneitemcount;
        });
        const todoItems = document.querySelectorAll(
          ".listitemboxcontainer .itembox"
        );
        todoItems.forEach((item) => {
          item.style.display = "block";
          const deleteBtn = item.querySelector(".tododeletebtn");
          const moveBtn = item.querySelector(".todomovebtn");
          deleteBtn.style.marginLeft = "10px";
          moveBtn.style.marginLeft = "5px";
          if (todoItems.length > 0) {
            todoemptymessage.style.display = "none";
          } else {
            todoemptymessage.style.display = "block";
          }
          listcount.innerText = todoItems.length;
        });
      }
    }
  };
  resettaskbook();
  if (doneitemcount > 0) {
    if (doneitemboxcontainer.hasChildNodes(doneemptymessage)) {
      doneemptymessage.style.display = "none";
    }
  }
};
const startTimerCheck = () => {
  setInterval(resettaskbook, 1000 * 60 * 60);
};

startTimerCheck();
//add time if user selected date and time -- Done
//add button in todo to move it to in progress or to done --- Done
//if user select in progress ask for duration then add timer of that duration. --done
//when timer adds move that item to done --done
//store this notesbook in history and localstorage and display on landing page,
// the data of each user
//make site responsive
//test
//deploy
//done
