let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

displayTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    const input = document.getElementById("taskInput");

    if(input.value.trim() === ""){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: input.value,
        completed: false
    });

    input.value = "";

    saveTasks();
    displayTasks(currentFilter);
}

function displayTasks(filter = "all") {

    currentFilter = filter;

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(filter === "active"){
            return !task.completed;
        }

        if(filter === "completed"){
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {

        const originalIndex = tasks.indexOf(task);

        const li = document.createElement("li");

        const taskContent = document.createElement("div");
        taskContent.className = "task-content";

        const taskText = document.createElement("span");

        if(task.completed){

            taskText.innerHTML =
                `<span class="tick">✓</span> ${task.text}`;

            taskText.classList.add("completed");

        }else{

            taskText.textContent = task.text;
        }

        taskContent.appendChild(taskText);

        const actions = document.createElement("div");
        actions.className = "actions";

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";
        completeBtn.className = "complete-btn";

        completeBtn.onclick = () => {

            tasks[originalIndex].completed =
                !tasks[originalIndex].completed;

            saveTasks();
            displayTasks(currentFilter);
        };

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";

        editBtn.onclick = () => {

            let updatedTask =
                prompt("Edit Task", task.text);

            if(updatedTask && updatedTask.trim() !== ""){

                tasks[originalIndex].text =
                    updatedTask;

                saveTasks();
                displayTasks(currentFilter);
            }
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.onclick = () => {

            tasks.splice(originalIndex,1);

            saveTasks();
            displayTasks(currentFilter);
        };

        actions.appendChild(completeBtn);
        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(taskContent);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateStats();
}

function filterTasks(type){
    displayTasks(type);
}

function updateStats(){

    let completedTasks =
        tasks.filter(task => task.completed).length;

    document.getElementById("taskStats").innerHTML =
        `Total Tasks: ${tasks.length} | Completed: ${completedTasks}`;
}