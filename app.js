
const sampleTasks = [
    {
        id: 1,
        title: "Learn DOM Manipulation",
        description: "Practice JavaScript DOM methods and understand how elements are created and modified.",
        category: "School",
        priority: "High",
        dueDate: "2026-10-10",
        completed: false,
        taskDue: new Date().toISOString()
    },

    {
        id: 2,
        title: "Build TaskForge Dashboard",
        description: "Create the main interface for the TaskForge task management application.",
        category: "Frontend",
        priority: "Critical",
        dueDate: "2026-10-09",
        completed: false
    },

    {
        id: 3,
        title: "Study Node.js",
        description: "Learn how Node.js works and practice creating simple backend applications.",
        category: "Backend",
        priority: "Medium",
        dueDate: "2026-10-15",
        completed: false
    },

    {
        id: 4,
        title: "Learn DOM Manipulation",
        description: "Practice JavaScript DOM methods and understand how elements are created and modified.",
        category: "School",
        priority: "High",
        dueDate: "2026-10-10",
        completed: false,
        taskDue: new Date().toISOString()
    },

    {
        id: 5,
        title: "Build TaskForge Dashboard",
        description: "Create the main interface for the TaskForge task management application.",
        category: "Frontend",
        priority: "Critical",
        dueDate: "2026-10-09",
        completed: false
    },

    {
        id: 6,
        title: "Study Node.js",
        description: "Learn how Node.js works and practice creating simple backend applications.",
        category: "Backend",
        priority: "Medium",
        dueDate: "2026-10-15",
        completed: false
    },

    {
        id: 7,
        title: "Learn DOM Manipulation",
        description: "Practice JavaScript DOM methods and understand how elements are created and modified.",
        category: "School",
        priority: "High",
        dueDate: "2026-10-10",
        completed: false,
        taskDue: new Date().toISOString()
    },

    {
        id: 8,
        title: "Build TaskForge Dashboard",
        description: "Create the main interface for the TaskForge task management application.",
        category: "Frontend",
        priority: "Critical",
        dueDate: "2026-10-09",
        completed: false
    },

    {
        id: 9,
        title: "Study Node.js",
        description: "Learn how Node.js works and practice creating simple backend applications.",
        category: "Backend",
        priority: "Medium",
        dueDate: "2026-10-15",
        completed: true
    },

    {
        id: 10,
        title: "Study Node.js",
        description: "Learn how Node.js works and practice creating simple backend applications.",
        category: "Backend",
        priority: "Medium",
        dueDate: "2026-10-15",
        completed: true
    }
];


const TaskList = document.getElementById("task-list");
const template = document.getElementById("task-template");
const addTaskBtn = document.getElementById("add-task-btn");
const submitTask = document.getElementById("submit-task-btn");
const clearTaskBtn = document.getElementById("clear-task-btn");
const taskModal = document.getElementById("task-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const cancelModal = document.getElementById("cancel-task-btn");
const discardModal = document.getElementById("discard-modal");

const title = document.getElementById("task-title").value.trim();
const description = document.getElementById("task-description").value.trim();
const category = document.getElementById("task-category").value;
const priority = document.getElementById("task-priority").value;

const deleteTaskBtn = document.getElementById("delete-task-btn");
const totalTask = document.getElementById("stat-total");
const completed = document.getElementById("stat-completed");

// Load saved tasks. Use sampleTasks only on the first visit.
let saveObj = JSON.parse(localStorage.getItem("sampleTasks"));

if (saveObj === null) {
    saveObj = sampleTasks;
    localStorage.setItem("sampleTasks", JSON.stringify(saveObj));
}

// Display all tasks.
function getTasks() {
    TaskList.innerHTML = "";

    saveObj.forEach(function (task) {
        const clone = template.content.cloneNode(true);


        const taskElement = clone.querySelector(".task-item");

        taskElement.dataset.id = task.id;

        clone.querySelector(".task-title").textContent = task.title;
        clone.querySelector(".task-priority").textContent = task.priority;
        clone.querySelector(".task-status").textContent =
            task.completed ? "Completed" : "Pending";
        clone.querySelector(".task-category").textContent = task.category;
        clone.querySelector(".task-description").textContent = task.description;

        TaskList.appendChild(clone);
        totalTask.innerHTML = saveObj.length;

        saveObj.forEach(()=>{

       let completeTrue=[];
       if (completed){

        completeTrue.push(completed)

         completed.innerHTML = completeTrue.length;
       }


     })
    

    });
}

// Show saved tasks whenever the page loads or refreshes.
getTasks();

// Add a new task.

addTaskBtn.addEventListener("click", () => {

    taskModal.style.display = "block";
})


// submit task form modal

submitTask.addEventListener("click", function (event) {
    event.preventDefault();

    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-description").value.trim();
    const category = document.getElementById("task-category").value;
    const priority = document.getElementById("task-priority").value;

    if (title === "" || description === "" || category === "" || priority === "") {
        alert("Please enter valid input.");
        return;
    }



    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        category: category,
        priority: priority,
        dueDate: "",
        completed: false
    };

    saveObj.push(newTask);

    // Save the updated array so new tasks survive refresh.
    localStorage.setItem("sampleTasks", JSON.stringify(saveObj));

    getTasks();

    document.getElementById("task-title").value = "";
    document.getElementById("task-description").value = "";

    taskModal.style.display = "none";

});

// Clear all tasks and keep the empty list after refresh.
// clearTaskBtn.addEventListener("click", function () {
//     saveObj = [];
//     localStorage.setItem("sampleTasks", JSON.stringify(saveObj));
//     getTasks();
// });


// closw modal

closeModalBtn.addEventListener("click", (event) => {
    event.preventDefault();
    taskModal.style.display = "none";
});

// Cancel modal

cancelModal.addEventListener("click", () => {



    const currentTitle = title.value;
    const currentDescription = description.value;
    const currentCategory = category.value;
    const currentPriority = priority.value;

    if (!currentTitle || !currentDescription) {
        taskModal.style.display = "none";
    }

    else {
        discardModal.style.display = "block";
    }

    console.log(currentCategory)
})


// dark and lightmode

const themeToggleBtn = document.getElementById("theme-toggle");


if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {

        document.documentElement.classList.toggle("dark");


        if (document.documentElement.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}

// delete btn

const taskList = document.getElementById("task-list");

taskList.addEventListener("click", function (event) {
    const deleteBtn = event.target.closest('[data-action="delete"]');

    if (!deleteBtn) return;

    const taskElement = deleteBtn.closest(".task-item");
    const taskId = taskElement.dataset.id;


    saveObj = saveObj.filter(task => String(task.id) !== taskId);


    localStorage.setItem("sampleTasks", JSON.stringify(saveObj));


    taskElement.remove();
     totalTask.innerHTML = saveObj.length;

     saveObj.forEach(()=>{

       let completeTrue=[];
       if (completed){

        completeTrue.push(completed)

         completed.innerHTML = completeTrue.length;
       }


     })
    

});

function statFunc() {

}

// statFunc();