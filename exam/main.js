const apiKey = "cf43badf-645c-488b-9363-39198ca1ce8d";
const defaultURL = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api"



function showMessage(style, message) {
    let alerts = document.querySelector("#alertsContainer");
    let alert = document.createElement("div");

    alert.classList.add("alert", "alert-dismissible", `alert-${style}`, "w-100", "m-1" );
    alert.setAttribute("role", "alert");
    alert.innerText = message;

    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("btn-close");
    btn.setAttribute("data-bs-dismiss", "alert");
    btn.setAttribute("aria-label", "Close");
    alert.append(btn);
    alerts.append(alert);

    setTimeout(() => {
        alert.classList.add("d-none");
    },5000);
}


async function getAllRoutes(page) {
    finalURL = new URL(defaultURL + "/routes");
    finalURL.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(finalURL);
        let data = await response.json();

        // showMessage("success","Данные успешно загружены!");
        addRoutesToMainTable(data, page);

        let dataLenStorage = document.querySelector(".last-page-btn");
        dataLenStorage.setAttribute("data-length", data.length);
    }
    catch(error) {
        showMessage("warning", error.message);
    }
}



function addRoutesToMainTable(data, page = 1) {
    let mainTable = document.querySelector("#mainRoutesTable");
    mainTable.innerHTML = "";
    let text = document.createElement('span');
    let newData = data.slice(page*10-10,page*10);
    console.log(page);
    console.log(newData);
    for (let record of newData) {
        let newRow = document.createElement('div');
        newRow.classList.add("row", "text","p-0", "mb-3");
        mainTable.appendChild(newRow);

        let name = document.createElement('div');
        name.classList.add("col-3");
        name.innerText = record.name;
        newRow.appendChild(name);
        
        let description = document.createElement('div');
        description.classList.add("col-3");
        description.innerText = record.description;
        newRow.appendChild(description);

        let mainObjects = document.createElement('div');
        mainObjects.classList.add("col-3");
        let mainObjectList = record.mainObject.split("-");
        for (let object of mainObjectList) {
            let oneObjectRecord = document.createElement("p");
            oneObjectRecord.innerText = object;
            mainObjects.appendChild(oneObjectRecord);
        }
        newRow.appendChild(mainObjects);

        let selectBtnDiv = document.createElement("div");
        selectBtnDiv.classList.add("col-3", "mt-5","text-center");
        let selectBtn = document.createElement('button');
        selectBtn.classList.add("btn", "bg-orange", "text-white");
        selectBtn.innerText = "Выбрать";
        selectBtn.setAttribute("data-routeId", record.id);
        selectBtnDiv.appendChild(selectBtn);
        newRow.appendChild(selectBtnDiv);
        
    }
}
 function changePaginationBtns(page) {
    let paginationBtns = document.querySelectorAll("[data-page]");
    if (page >= 2 && page < Math.ceil(parseInt(document.querySelector(".last-page-btn").getAttribute("data-length"), 10) / 10) + 1 ) {
        paginationBtns[0].innerHTML = page - 1;
        paginationBtns[0].dataset.page = page - 1;
        paginationBtns[1].innerHTML = page;
        paginationBtns[1].dataset.page = page;
        paginationBtns[2].innerHTML = page + 1;
        paginationBtns[2].dataset.page = page + 1;
    }
}

function clearActivePaginationBtns() {
    let paginationBtns = document.querySelectorAll(".pagintaion");
    for (let btn of paginationBtns) {
        btn.classList.remove("active");
    }
}

function setActivePaginationBtn(page) {
    console.log(page);
    document.querySelector(`[data-page="${page}"]`).classList.add("active");
}

function pageBtnHandler(event) {
    if (event.target.dataset.page) {
        let page = event.target.dataset.page;
        clearActivePaginationBtns();
        changePaginationBtns(parseInt(page, 10));
        getAllRoutes(page);
        setActivePaginationBtn(page);
        window.scrollTo(0, 0);
    } else if (event.target.classList.contains("first-page-btn")) {
        changePaginationBtns(1);
        getAllRoutes(1);
        setActivePaginationBtn(event.target.dataset.page);
        window.scrollTo(0, 0);
    } else if (event.target.classList.contains("last-page-btn")) {
        changePaginationBtns(Math.ceil(parseInt(event.target.getAttribute("data-length"), 10) / 10));
        getAllRoutes(Math.ceil(parseInt(event.target.getAttribute("data-length"), 10) / 10));
        setActivePaginationBtn(event.target.dataset.page);
        window.scrollTo(0, 0);
    }
}


window.onload = function (){
    getAllRoutes();
    document.querySelector('.pagination').onclick = pageBtnHandler;
    let btn = document.querySelector('#btn').addEventListener("click", ()=>{
        showMessage("success", Date.now());
    })
}