const addTaskButton = document.querySelector("#add-task-button");
const inputTask = document.querySelector("#input-task");
const taskLists = document.querySelector("#task-list");

let jsonTaskList = JSON.parse(localStorage.getItem("tasks")) || [];
buildItems();

function buildItems() {
    let num = jsonTaskList.length / 2;
    for (let i = 0; i < num; i++) {
        addNewListItem(jsonTaskList[2 * i], jsonTaskList[2 * i + 1]);
    }
}

function deleteItem(item) {
    item.parentNode.remove();
    rebuildListArray();
}

function rebuildListArray() {
    let listChildren = document.querySelectorAll(".task");
    let numb = listChildren.length;
    let listArray = new Array(numb);
    for (let i = 0; i < numb; i++) {
        listArray[2 * i] = listChildren[i].innerHTML;
        listArray[2 * i + 1] = listChildren[i].previousSibling.checked;
    }
    console.log(listArray);
    localStorage.setItem("tasks", JSON.stringify(listArray));
}

addTaskButton.addEventListener("click", function () {
    let inputTaskText = inputTask.value;
    if (inputTaskText !== "") {
        addNewListItem(inputTaskText, false);
        inputTask.value = "";
        rebuildListArray();
    }
});

function addNewListItem(text, checkedStatus) {
    const liNode = document.createElement("li");
    const divNode = document.createElement("div");
    const inputCheckBox = document.createElement("input");
    inputCheckBox.setAttribute("type", "checkbox")
    inputCheckBox.setAttribute("onclick", "rebuildListArray()")
    inputCheckBox.checked = checkedStatus;
    const spanNode = document.createElement("span");
    spanNode.setAttribute("class", "task");
    const taskText = document.createTextNode(text);
    spanNode.appendChild(taskText);
    divNode.appendChild(inputCheckBox);
    divNode.appendChild(spanNode);
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "delete-btn");
    deleteButton.setAttribute("onclick", "deleteItem(this)");
    const deleteText = document.createTextNode("delete");
    deleteButton.appendChild(deleteText);
    liNode.appendChild(divNode);
    liNode.appendChild(deleteButton);
    taskLists.appendChild(liNode);
}