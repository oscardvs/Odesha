// # DEPENDENCIES
const ipcRenderer = require("electron").ipcRenderer;
const { dialog, BrowserWindow, Menu, app } = require("electron").remote;
const fs = require("fs");
const path = require("path");

// # DOM ELEMENT IMPORT
const createLocalTaskBtn = getElement("id", "createLocalTaskBtn");
const createProxyTaskBtn = getElement("id", "createProxyTaskBtn");
const launchAllTaskBtn = getElement("id", "launchAllTaskBtn");
const tasks = getElement("id", "tasks");
const globalUrl = getElement("id", "global-url-input");

// # CREATE LOCAL TASK EVENT LISENTER
createLocalTaskBtn.addEventListener("click", createLocalTask);
// # CREATE PROXY TASK EVENT LISENTER
createProxyTaskBtn.addEventListener("click", createProxyTask);
// # LAUNCH ALL INSTANCE
launchAllTaskBtn.addEventListener("click", launchAllInstance);

// # GET SELECTOR ULTITY FUNCTION
function getElement(type, selector) {
  switch (type) {
    case "id":
      return document.getElementById(selector);
    case "class":
      return document.getElementByClassName(selector);
    case "all":
      return document.querySelectorAll(selector);
    case "tag":
      return document.getElementByTagName(selector);
    default:
      return document.querySelector(selector);
  }
}

// # LAUNCH ALL INSTANCE
function launchAllInstance(e) {
  ipcRenderer.send("launch-all-instance");
}

// # LOCAL TASK CREATOR
function createLocalTask(e) {
  const taskId = genUniqueID();

  const tr = document.createElement("tr");
  tr.classList.add(`taskId-${taskId}`);

  // # CREATE TASK TEMPLATE
  const taskTemplate = `
    <th scope="row" class="browserTask-id">${taskId}</th>
        <td class="browserTask-proxy">Local IP</td>
        <td class="browserTask taskId-${taskId} SetTitle">NULL</td>
        <td class="browserTask taskId-${taskId} SetStatus">NULL</td>
        <td class="task-controller">
        <div class="btnGroup">
            <button type="button" class="btn btn-secondary btn-sm" id="launchTask taskId-${taskId}">Launch</button>
            <button type="button" class="btn btn-danger btn-sm" id="delete taskId-${taskId}">Delete</button>
        </div>
    </td>
    `;

  // # APPEND TASK TEMPLATE TO TASKS BODY
  tr.innerHTML = taskTemplate;
  tasks.appendChild(tr);

  // # LAUNCH BROWSER
  getElement("id", `launchTask taskId-${taskId}`).addEventListener(
    "click",
    () => ipcRenderer.send(`launchTask taskId-${taskId}`)
  );

  // # DELETE TASK BUTTON
  getElement("id", `delete taskId-${taskId}`).addEventListener("click", () => {
    ipcRenderer.send(`delete taskId-${taskId}`);
    // # DELETE TASK FROM BODY

    if (tasks.hasChildNodes()) {
      for (const node of tasks.childNodes) {
        if (node.classList.contains(`taskId-${taskId}`)) {
          // # REMOVE ELEMENT FROM THE BODY
          tasks.removeChild(node);
        }
      }
    }
  });

  // # UPDATE STATUS
  ipcRenderer.on(`browserTask taskId-${taskId} SetStatus`, (evt, data) => {
    getElement("", `.browserTask.taskId-${taskId}.SetStatus`).innerHTML = data;
  });

  // # UPDATE TITLE
  ipcRenderer.on(`browserTask taskId-${taskId} SetTitle`, (evt, data) => {
    getElement("", `.browserTask.taskId-${taskId}.SetTitle`).innerHTML = data;
  });

  // # DISABLE LAUNCH BUTTON
  ipcRenderer.on(`launchTask taskId-${taskId} hide`, evt => {
    getElement("id", `launchTask taskId-${taskId}`).disabled = true;
  });

  // # SENT TASK DATA TO MAIN PROCESS
  ipcRenderer.send("newInstanceTask", {
    id: taskId,
    proxy: null,
    url: globalUrl.value
  });
}

// # PROXY TASK CREATOR
function createProxyTask(e) {
  // # OPEN DIALOG TO VIEW FOLDER
  dialog.showOpenDialog().then(files => {
    const { filePaths: filePath } = files;

    // # read file data
    fs.readFile(filePath[0], "utf8", (err, data) => {
      if (err) throw err;

      // # got data
      const proxyList = data.toString().split("\n");

      for (let i = 0; i < proxyList.length; i++) {
        if (!proxyList[i] == "") {
          const taskId = genUniqueID();
          const tr = document.createElement("tr");
          tr.classList.add(`taskId-${taskId}`);

          // # CREATE TASK TEMPLATE
          const taskTemplate = `
            <th scope="row" class="browserTask-id">${taskId}</th>
                <td class="browserTask-proxy">${proxyList[i]}</td>
                <td class="browserTask taskId-${taskId} SetTitle">NULL</td>
                <td class="browserTask taskId-${taskId} SetStatus">NULL</td>
                <td class="task-controller">
                <div class="btnGroup">
                    <button type="button" class="btn btn-secondary btn-sm" id="launchTask taskId-${taskId}">Launch</button>
                    <button type="button" class="btn btn-danger btn-sm" id="delete taskId-${taskId}">Delete</button>
                </div>
            </td>
            `;

       
 // # APPEND TASK TEMPLATE TO TASKS BODY
          tr.innerHTML = taskTemplate;
          tasks.appendChild(tr);

          // # LAUNCH BROWSER
          getElement(
            "id",
            `launchTask taskId-${taskId}`
          ).addEventListener("click", () =>
            ipcRenderer.send(`launchTask taskId-${taskId}`)

          );
            


          // # DELETE TASK BUTTON
          getElement("id", `delete taskId-${taskId}`).addEventListener(
            "click",
            () => {
              ipcRenderer.send(`delete taskId-${taskId}`);
              // # DELETE TASK FROM BODY

              if (tasks.hasChildNodes()) {
                for (const node of tasks.childNodes) {
                  if (node.classList.contains(`taskId-${taskId}`)) {
                    // # REMOVE ELEMENT FROM THE BODY
                    tasks.removeChild(node);
                  }
                }
              }
            }
          );

          // # DISABLE LAUNCH BUTTON
          ipcRenderer.on(`launchTask taskId-${taskId} hide`, evt => {
            getElement("id", `launchTask taskId-${taskId}`).disabled = true;
          });

          // # UPDATE STATUS
          ipcRenderer.on(
            `browserTask taskId-${taskId} SetStatus`,
            (evt, data) => {
              getElement(
                "",
                `.browserTask.taskId-${taskId}.SetStatus`
              ).innerHTML = data;
            }
          );

          // # UPDATE TITLE
          ipcRenderer.on(
            `browserTask taskId-${taskId} SetTitle`,
            (evt, data) => {
              getElement(
                "",
                `.browserTask.taskId-${taskId}.SetTitle`
              ).innerHTML = data;
            }
          );

          // # DISABLE LAUNCH BUTTON
          ipcRenderer.on(`launchTask taskId-${taskId} hide`, evt => {
            getElement("id", `launchTask taskId-${taskId}`).disabled = true;
          });

          // # SENT TASK DATA TO MAIN PROCESS
          ipcRenderer.send("newInstanceTask", {
            id: taskId,
            proxy: proxyList[i],
            url: globalUrl.value
          });
        }
      }
    });
  });
}

// # GENERATE A UNIQUE TASK ID
function genUniqueID() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}   
