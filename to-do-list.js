const input = document.getElementById("inputField");
const button = document.getElementById("button");

let uiList = document.getElementById("uiList");
let dataList = [];

// Add a task to the dataList
function addTask(){
    if (input.value){  
        const task = input.value;
        dataList.push({name: task, isCompleted: false});
        updateStorage();
        refreshUI();
    }
};


function refreshUI(){
    // Reset the UI
    uiList.innerHTML = "";
    dataList.forEach((task, index) => {
        drawTask(task, index);
    });
};     

// Checks for data in local storage when the page loads and draws the UI 
function loadUI(){
    const localDataList = JSON.parse(localStorage.getItem("dataList"));
    if (localDataList !== null) {
        dataList = localDataList;
    }
    refreshUI();
};      


// Draws the task that was submitted, as well as the buttons    
function drawTask(task, index) {
    let taskBullet = document.createElement("li");          
    taskBullet.innerHTML = task.name;
    taskBullet.classList.add("list-group-item", "list-group-item-primary", "list-group-item-action")
    
    // Change appearance of the task upon completion
    if (task.isCompleted) {
        taskBullet.style.textDecoration = "line-through";
        taskBullet.style.color = "lightslategrey";
    } 
    
    drawActionButton(taskBullet, task, index);
    drawDeleteButton(taskBullet, index);
    uiList.appendChild(taskBullet);
};


// Draws the button responsible for completing/undoing a task    
function drawActionButton(taskBullet, task, index) {
let actionButton = document.createElement("button");
actionButton.classList.add("btn", "btn-sm");        
actionButton.style.marginLeft = "25px";  
        
    if (task.isCompleted) {
        actionButton.innerHTML = "Undo";
        actionButton.onclick = () => {
            undoTask(index)
        };
        actionButton.classList.add("btn-outline-dark");
    } else {
        actionButton.innerHTML = "Complete";
        actionButton.onclick = () => {
            completeTask(index);
        }
        actionButton.classList.add("btn-outline-success");
    }
    taskBullet.appendChild(actionButton);
};

// Draws the deletion button
function drawDeleteButton(taskBullet, index) {
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = () => {
        deleteTask(index)
    }
    taskBullet.appendChild(deleteButton);
};

// Sets a task to be completed
function completeTask(index) {
    dataList[index].isCompleted = true;
    updateStorage();
    refreshUI();
};

// Sets a task to not completed
function undoTask(index) {
    dataList[index].isCompleted = false;
    updateStorage();
    refreshUI();
};

// Deletes task
function deleteTask(index) {
    dataList.splice(index, 1);
    updateStorage();
    refreshUI();
};
    
// Adds/edits/removes tasks from local storage
function updateStorage(){
localStorage.setItem("dataList", JSON.stringify(dataList));
};  

loadUI();
