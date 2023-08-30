// BUTTONS
const addTask = document.getElementById('add-button')
const addTaskConfirm = document.getElementById('add-button-confirm')

// INPUT
const addTaskInput = document.getElementById('add-item-input')

// FRAMES
const addItemsBox = document.getElementById('add-item-box')
const tasksList = document.getElementById('tasks-list')

// LIST ITEMS
let tasks = []
let taskState = []

function loadTask() {
    if(localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    if(localStorage.getItem('taskState')) {
        taskState = JSON.parse(localStorage.getItem('taskState'))
    }
    displayTasks()
}

let justAdded = false

function displayTasks() {
    let inputValue = ``
    for(let i = 0; i < tasks.length; ++i) {
        if(tasks[i] !== '') {
            inputValue += `
                <li id='task-${i}'>
                    <p id='task-statement${i}'>${tasks[i]}</p>
                    <div class="list-button-container">
                        <button id="done-button${i}">Done</button>
                        <button id="delete-button${i}">Delete</button>
                    </div>
                </li>
            ` 
        } 
    }

    tasksList.innerHTML = inputValue

    if(taskState) {
        for(let i = 0; i< taskState.length; ++i) {
            if(taskState[i] === 'Undone') {
                document.getElementById(`done-button${i}`).textContent = 'Undone'
                document.getElementById(`task-statement${i}`).style.textDecoration = 'line-through'
            }
        }
    }   

    if(justAdded) {
        justAdded = false
        document.getElementById(`task-${tasks.length - 1}`).className = 'task-item-in'
    }

    if(tasks.length > 0) {
        manageTasks()
    }
}

loadTask()

let addTaskClicked = false
addTask.addEventListener('click', () => {
    if(!addTaskClicked) {
        addTaskClicked = true
        addItemsBox.style.display = 'flex'
        setTimeout(() => {
            addItemsBox.style.marginTop = '80vh'
        }, 50)
    }
    else {
        addTaskClicked = false
        addItemsBox.style.marginTop = '120vh'
        setTimeout(() => {
            addItemsBox.style.display = 'none'
        }, 300)
    }

})

addTaskConfirm.addEventListener('click', () => {
    if(addTaskInput.value) {
        tasks.push(addTaskInput.value)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        justAdded = true
        displayTasks()
        addTaskInput.value = ''

        addTaskClicked = false
        addItemsBox.style.marginTop = '120vh'
        setTimeout(() => {
            addItemsBox.style.display = 'none'
        }, 300)
    }
})

function manageTasks() {
    for(let i = 0; i < tasks.length; ++i) {
        const delBtn = document.getElementById(`delete-button${i}`)
        const doneBtn = document.getElementById(`done-button${i}`)
        const taskStatement = document.getElementById(`task-statement${i}`)
        const item = document.getElementById(`task-${i}`)

        delBtn.addEventListener('click', () => {
            for(let j = i; j < tasks.length - 1; ++j) {
                tasks[j] = tasks[j + 1];
            }
            item.className = 'task-item-out'
            setTimeout(() => {
                tasks.pop();
                displayTasks(tasks);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }, 480)
        })

        doneBtn.addEventListener('click', () => {
            if(doneBtn.textContent === 'Done') {
                taskState[i] = 'Undone'
                doneBtn.textContent = 'Undone'
                taskStatement.style.textDecoration = 'line-through'
            }
            else {
                taskState[i] = ''
                doneBtn.textContent = 'Done'
                taskStatement.style.textDecoration = 'none'
            }
            localStorage.setItem('taskState', JSON.stringify(taskState))
        })
    }
}