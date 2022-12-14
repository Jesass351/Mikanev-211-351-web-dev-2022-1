let counterTasks = 0;
const titles = {
    "create": "Создание новой задачи",
    "edit": "Редактирование задачи",
};
const actionBtn = {
    "create": "Создать",
    "edit": "Сохранить",
};

const url = "http://tasks-api.std-900.ist.mospolytech.ru";
const apiKey = "50d2199a-42dc-447d-81ed-d68a443b697e";

async function dataLoad() {
    let maxId = 0;
    let finalURL = new URL(url + "/api/tasks");
    finalURL.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(finalURL);
        let data = await response.json();
        let tasks = data.tasks;
        console.log(data);
        console.log(tasks);
        for (let task of tasks) {
            addTaskInHtml(task);
            if (maxId < task.id) maxId = task.id;
        }
    } catch(error) {
        console.log(error.message);
    }
    counterTasks = maxId + 1;
}

function createNewTaskElem(task) {
    let templateTask = document.getElementById("taskTemplate");
    let newTask = templateTask.content.firstElementChild.cloneNode(true);
    let taskName = newTask.querySelector(".task-name");
    taskName.textContent = task.name;
    newTask.id = task.id;
    let arrows = newTask.querySelectorAll(".toggle-arrow");
    for(let arrow of arrows) {
        arrow.onclick = toggleTask;
    }
    return newTask;
}

function addTaskInHtml(task) {
    let list = document.querySelector(`#${task.status}-list ul`);
    list.append(createNewTaskElem(task));
}

async function toggleTask(event) {
    let target = event.target;
    let taskId = target.closest(".task").id;
    let finalURL = new URL(url + "/api/tasks/" + taskId);
    let task;
    finalURL.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(finalURL);
        task = await response.json();
        if (task.error) {
            console.log(task.error);
        }
    } catch (error) {
        console.log(error.message);
    }
    
    let newStatus;
    if (task.status == "to-do") {
        newStatus = "done";
    } else if (task.status == "done") {
        newStatus = "to-do";
    }
    let item = document.getElementById(taskId);
    let list = document.querySelector(`#${newStatus}-list ul`);
    list.append(item);

    let form = document.createElement('form');

    let dataFromForm = new FormData(form);

    dataFromForm.append("status", newStatus);

    try {
        let res = await fetch(finalURL, {
            method: 'PUT',
            body: dataFromForm
        });
        console.log(dataFromForm.get("status"));
        let data = await res.json();
        if (data.error){
            console.log(data.error);
        }
    } catch (error) {
        console.log(error.message);
    }
    
}

async function createTask(name, desc, status) {
    let obj = {
        name: name,
        desc: desc,
        status: status,
        taskId: counterTasks++
    }
    let data;
    let form = new FormData(document.querySelector('form'));
    let finalURL = new URL(url + "/api/tasks");
    finalURL.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(finalURL, {
        method: 'POST',
        body: form,
        });
        data = await response.json();
        if (data.error) {
            console.log(data.error);
        }
    } catch (error) {
        console.log(error.message);
    }
    return data;
}


async function clickBtnHandler(event) {
    let modalWindow = event.target.closest(".modal");
    let form = modalWindow.querySelector("form");
    let formElements = form.elements;
    let name = formElements["name"].value;
    let desc = formElements["desc"].value;
    let status = formElements["status"].value;
    let action = formElements["action"].value;
    let taskId = formElements["taskId"].value;
    if (action == "create") {                                      //создание задачи
        let task = await createTask(name, desc, status);
        if (task.status) {
            addTaskInHtml(task);
        }
    } else if (action == "edit") {                                 //изменение задачи
        let finalURL = new URL(url + "/api/tasks/" + taskId);
        finalURL.searchParams.append("api_key", apiKey);
        let dataFromForm = new FormData(form);
        try {
            let response = await fetch(finalURL, {
            method: 'PUT',
            body: dataFromForm
            });
            let newTask = await response.json();
            if (newTask.error) console.log(newTask.error);
            else {
                document.getElementById(taskId).querySelector(".task-name").textContent = name;
            } 
        } catch (error) {
            console.log(error.message);
        }
    }
    form.reset();
}

function updateCounter(event) {
    let target = event.target;
    let taskCounter = target.closest('.card').querySelector('.task-counter');
    taskCounter.textContent = target.children.length;
}

async function deleteEvent (event) {
    let taskId = event.relatedTarget.closest('.task').id;
    let finalURL = new URL(url + "/api/tasks/" + taskId);
    finalURL.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(finalURL);
        let task = await response.json();
        if (task.error) {
         console.log(task.error);
        }
        else {
            event.target.querySelector('span.deleteTask').textContent = task.name;
            event.target.querySelector('form').elements['taskid'].value = task.id;
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function actionEvent(event) {
    let action = event.relatedTarget.dataset.action;
    let form = event.target.querySelector('form');
    let task;
    form.elements['action'].value = action;
    event.target.querySelector('.modal-title').textContent = titles[action];
    event.target.querySelector('.create-btn').textContent = actionBtn[action];
    if (action == 'edit') {
        let taskId = event.relatedTarget.closest('.task').id;
        let finalURL = new URL(url + "/api/tasks/" + taskId);
        finalURL.searchParams.append("api_key", apiKey);
        try {
            let response = await fetch(finalURL);
            task = await response.json();
            if (task.error) console.log(task.error);
            form.elements['name'].value = task.name;
            form.elements['desc'].value = task.desc;
            form.elements['taskId'].value = taskId;
            form.elements['status'].value = task.status;
            form.elements['status'].closest('.row').classList.add('d-none');
        } catch (error) {
            console.log(error.message);
            form.elements['status'].closest('.row').classList.add('d-none');
        }
    }

}

function deleteHandler(event) {
    let taskId = event.target.closest('.modal').querySelector('form').elements['taskid'].value;
    let finalURL = new URL(url + "/api/tasks/" + taskId);
    finalURL.searchParams.append("api_key", apiKey);
    let res = fetch(finalURL, {
        method: 'DELETE',
    }).then(response => {
        return response.json()
    }).catch(reject => {
        console.log(reject.message);
    });   
    document.getElementById(taskId).remove();
}

function closeModal(event) {
    let form = event.target.querySelector('form');
    event.target.querySelector('.back-btn').classList.remove('d-none');
    form.querySelector('#name').removeAttribute('readonly');
    form.querySelector('#desc').removeAttribute('readonly');
    form.elements['status'].closest('.row').classList.remove('d-none');
    let name = form.querySelector('#name');
    let desc = form.querySelector('#desc');
    name.classList.remove('form-control-plaintext');
    name.classList.add('form-control');
    desc.classList.remove('form-control-plaintext');
    desc.classList.add('form-control');
}

window.onload = function() {
    dataLoad();

    let createBtn = document.querySelector(".create-btn");
    createBtn.onclick = clickBtnHandler;

    let lists = document.querySelectorAll('#to-do-list ul, #done-list ul');
    for (let list of lists) {
        list.addEventListener('DOMSubtreeModified', updateCounter);
    }

    let modal = document.querySelector('#deleteTask');
    modal.addEventListener('show.bs.modal', deleteEvent);

    let buttonDel = document.querySelector('.delete');
    buttonDel.onclick = deleteHandler;

    let modalAddTask = document.querySelector('#addTask');
    modalAddTask.addEventListener('show.bs.modal', actionEvent);

    let arrows = document.querySelectorAll(".toggle-arrow");
    for(let arrow of arrows) {
        arrow.onclick = toggleTask;
    }

    modalAddTask.addEventListener('hide.bs.modal', closeModal);
}