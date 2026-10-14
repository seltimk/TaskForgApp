
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

const title = document.getElementById("task-title");
const description = document.getElementById("task-description");
const category = document.getElementById("task-category");
const priority = document.getElementById("task-priority");

const deleteTaskBtn = document.getElementById("delete-task-btn");
const totalTask = document.getElementById("stat-total");
const statCompleted = document.getElementById("stat-completed");
const statPending = document.getElementById("stat-pending");
const noResults = document.getElementById("no-results");


// FILTER ELEMENTS
const searchInput = document.getElementById("search-input");
const filterStatus = document.getElementById("filter-status");
const filterPriority = document.getElementById("filter-priority");
const filterCategory = document.getElementById("filter-category");
const sortSelect = document.getElementById("sort-select");
const resetFiltersBtn = document.getElementById("reset-filters");


// Load saved tasks. Use sampleTasks only on the first visit.
let saveObj = JSON.parse(localStorage.getItem("sampleTasks"));

if (saveObj === null) {
    saveObj = sampleTasks;
    localStorage.setItem("sampleTasks", JSON.stringify(saveObj));
}


// Store tasks matching the current filters.
let filteredTasks = [];


//  no results message
function noResultFunc() {
    const hasVisibleTasks = TaskList.children.length > 0;

    noResults.style.display = hasVisibleTasks ? "none" : "block";

    const filterCheck = document.getElementById("filter-check");

    if (filterCheck) {
        filterCheck.style.display =
            saveObj.length === 0 ? "none" : "block";
    }
}


// DISPLAY, FILTER AND SORT TASKS
function getTasks() {

    // Clear existing cards before displaying tasks again.
    TaskList.innerHTML = "";

    // Read the current filter values.
    const searchValue = searchInput.value.trim().toLowerCase();
    const statusValue = filterStatus.value;
    const priorityValue = filterPriority.value;
    const categoryValue = filterCategory.value;
    const sortValue = sortSelect.value;

    const today = new Date().toISOString().split("T")[0];

    // FILTER TASKS
    filteredTasks = saveObj.filter(function (task) {

        const matchesSearch =
            task.title.toLowerCase().includes(searchValue) ||
            task.description.toLowerCase().includes(searchValue) ||
            task.category.toLowerCase().includes(searchValue);

        const isOverdue =!task.completed && task.dueDate && task.dueDate < today;

        const matchesStatus =
            statusValue === "all" ||
            (statusValue === "completed") ||
            (statusValue === "pending" ) ||
            (statusValue === "overdue");

        const matchesPriority =
            priorityValue === "all" ||
            task.priority.toLowerCase() === priorityValue;

        const matchesCategory =
            categoryValue === "all" ||
            task.category.toLowerCase() === categoryValue;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority &&
            matchesCategory
        );
    });


    // SORT TASKS
    const priorityRank = {
        low: 1,
        medium: 2,
        high: 3,
        critical: 4
    };

    filteredTasks.sort(function (a, b) {

        switch (sortValue) {

            case "newest":
                return Number(b.id) - Number(a.id);

            case "oldest":
                return Number(a.id) - Number(b.id);

            case "az":
                return a.title.localeCompare(b.title);

            case "za":
                return b.title.localeCompare(a.title);

            case "priority-high":
                return priorityRank[b.priority.toLowerCase()] -
                    priorityRank[a.priority.toLowerCase()];

            case "priority-low":
                return priorityRank[a.priority.toLowerCase()] -
                    priorityRank[b.priority.toLowerCase()];

            case "due-closest":
                return (a.dueDate || "9999-12-31")
                    .localeCompare(b.dueDate || "9999-12-31");

            case "due-furthest":
                return (b.dueDate || "")
                    .localeCompare(a.dueDate || "");

            default:
                return 0;
        }
    });


    // DISPLAY MATCHING TASKS
    filteredTasks.forEach(function (task) {

        const clone = template.content.cloneNode(true);
        const taskElement = clone.querySelector(".task-item");

        taskElement.dataset.id = task.id;

        clone.querySelector(".task-title").textContent = task.title;

        clone.querySelector(".task-priority").textContent =
            task.priority;

        clone.querySelector(".task-status").textContent =
            task.completed ? "Completed" : "Pending";

        clone.querySelector(".task-category").textContent =
            task.category;

        clone.querySelector(".task-description").textContent =
            task.description;

        clone.querySelector(".task-due").textContent =
            task.dueDate || "—";

        const createdElement = clone.querySelector(".task-created");

        if (createdElement) {
            createdElement.textContent = task.taskDue
                ? new Date(task.taskDue).toLocaleDateString()
                : "—";
        }

       
        TaskList.appendChild(clone);
    });


    // UPDATE STATISTICS USING ALL SAVED TASKS
    totalTask.textContent = saveObj.length;

    statCompleted.textContent = saveObj.filter(
        task => task.completed
    ).length;

    statPending.textContent = saveObj.filter(
        task => !task.completed
    ).length;

    const statOverdue = document.getElementById("stat-overdue");

    if (statOverdue) {
        statOverdue.textContent = saveObj.filter(task =>
            !task.completed &&
            task.dueDate &&
            task.dueDate < today
        ).length;
    }

    // Update the empty/no-results message.
    noResultFunc();

    // Update Select All to match visible task checkboxes.
    const allCheckBox = document.getElementById("select-all");

    if (allCheckBox) {
        const checkboxes = TaskList.querySelectorAll(".task-checkbox");

        allCheckBox.checked =
            checkboxes.length > 0 &&
            Array.from(checkboxes).every(box => box.checked);
    }
}


// FILTER EVENT LISTENERS

// Search while typing.
searchInput.addEventListener("input", getTasks);

// Filter by status.
filterStatus.addEventListener("change", getTasks);

// Filter by priority.
filterPriority.addEventListener("change", getTasks);

// Filter by category.
filterCategory.addEventListener("change", getTasks);

// Sort tasks.
sortSelect.addEventListener("change", getTasks);


// Reset all filters.
resetFiltersBtn.addEventListener("click", function () {

    searchInput.value = "";
    filterStatus.value = "all";
    filterPriority.value = "all";
    filterCategory.value = "all";
    sortSelect.value = "newest";

    getTasks();
});


// Show saved tasks whenever the page loads or refreshes.
getTasks();


// Add a new task.
addTaskBtn.addEventListener("click", () => {
    taskModal.style.display = "flex";
});


// SUBMIT TASK FORM
submitTask.addEventListener("click", function (event) {

    event.preventDefault();

    const taskTitle = title.value.trim();
    const taskDescription = description.value.trim();
    const taskCategory = category.value;
    const taskPriority = priority.value;
    const dueDate = document.getElementById("task-due").value;

    if (
        taskTitle === "" ||
        taskDescription === "" ||
        taskCategory === "" ||
        taskPriority === "" ||
        dueDate === ""
    ) {
        alert("Please enter valid input.");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: taskTitle,
        description: taskDescription,
        category: taskCategory,
        priority: taskPriority,
        dueDate: dueDate,
        completed: false,
        taskDue: new Date().toISOString()
    };

    saveObj.push(newTask);

    // Save updated tasks.
    localStorage.setItem("sampleTasks", JSON.stringify(saveObj));

    // Refresh the task list.
    getTasks();

    // Clear form fields.
    title.value = "";
    description.value = "";
    category.value = "";
    priority.value = "";
    document.getElementById("task-due").value = "";

    taskModal.style.display = "none";
});


// CLEAR ALL TASKS
// Uncomment this listener if you want a Clear All button.
/*
clearTaskBtn.addEventListener("click", function () {
    saveObj = [];
    localStorage.setItem("sampleTasks", JSON.stringify(saveObj));
    getTasks();
});
*/


// CLOSE MODAL
closeModalBtn.addEventListener("click", (event) => {

    event.preventDefault();
    taskModal.style.display = "none";

    noResultFunc();
});


// CANCEL MODAL
cancelModal.addEventListener("click", () => {


        taskModal.style.display = "none";
     
        discardModal.style.display = "block";
    
});


// DARK AND LIGHT MODE
const themeToggleBtn = document.getElementById("theme-toggle");

if (themeToggleBtn) {

    // Restore the saved theme.
    if (localStorage.getItem("theme") === "dark") {
        document.documentElement.classList.add("dark");
    }

    themeToggleBtn.addEventListener("click", () => {

        document.documentElement.classList.toggle("dark");

        if (document.documentElement.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
}


// DELETE A SINGLE TASK
const taskList = document.getElementById("task-list");

taskList.addEventListener("click", function (event) {

    const deleteBtn = event.target.closest('[data-action="delete"]');

    if (!deleteBtn) return;

    const taskElement = deleteBtn.closest(".task-item");
    const taskId = taskElement.dataset.id;

    saveObj = saveObj.filter(
        task => String(task.id) !== taskId
    );

    localStorage.setItem("sampleTasks", JSON.stringify(saveObj));

    // Refresh tasks and statistics.
    getTasks();
});


// SELECT ALL CHECKBOXES
const allCheckBox = document.querySelector("#select-all");

allCheckBox.addEventListener("change", () => {

    const checkboxes = document.querySelectorAll(".task-checkbox");

    checkboxes.forEach((checkbox) => {

        checkbox.checked = allCheckBox.checked;

        // Remember checkbox selections.
        const taskElement = checkbox.closest(".task-item");

        const task = saveObj.find(
            item => String(item.id) === taskElement.dataset.id
        );

        if (task) {
            task.selected = checkbox.checked;
        }
    });

    localStorage.setItem("sampleTasks", JSON.stringify(saveObj));
});


// REMEMBER INDIVIDUAL CHECKBOX SELECTIONS
TaskList.addEventListener("change", function (event) {

    if (!event.target.matches(".task-checkbox")) return;

    const taskElement = event.target.closest(".task-item");

    const task = saveObj.find(
        item => String(item.id) === taskElement.dataset.id
    );

    if (task) {
        task.selected = event.target.checked;

        localStorage.setItem("sampleTasks", JSON.stringify(saveObj));
    }

    const checkboxes = TaskList.querySelectorAll(".task-checkbox");

    allCheckBox.checked =
        checkboxes.length > 0 &&
        Array.from(checkboxes).every(box => box.checked);
});


// DELETE SELECTED TASKS
const deleteSelectedBtn = document.querySelector("#bulk-delete");

deleteSelectedBtn.addEventListener("click", () => {

    // Find checked task checkboxes in the displayed list.
    const selectedCheckboxes = TaskList.querySelectorAll(
        ".task-checkbox:checked"
    );

    if (selectedCheckboxes.length === 0) {
        alert("Please select at least one task.");
        return;
    }

    // Get the IDs of the selected tasks.
    const selectedIds = Array.from(selectedCheckboxes).map(
        checkbox => checkbox.closest(".task-item").dataset.id
    );

    // Remove selected tasks from the saved array.
    saveObj = saveObj.filter(
        task => !selectedIds.includes(String(task.id))
    );

    localStorage.setItem("sampleTasks", JSON.stringify(saveObj));

    // Refresh the displayed tasks and statistics.
    getTasks();
});



