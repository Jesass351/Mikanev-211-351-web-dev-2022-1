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
        alert.remove();
    },5000);
}

let allDataRoutes;
let guidesData;

async function getAllRoutes(page = 1) {
    finalURL = new URL(defaultURL + "/routes");
    finalURL.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(finalURL);
        let data = await response.json();

        // showMessage("success","Данные успешно загружены!");
        addRoutesToMainTable(data, page);
        addObjectsToSelect(data);

        return data;
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
    for (let record of newData) {
        let newRow = document.createElement('div');
        newRow.classList.add("row","p-0", "mb-3", "border-top");
        mainTable.appendChild(newRow);

        let name = document.createElement('div');
        name.classList.add("col-3", "p-0","mt-1", "border-end", "text-center");
        name.innerText = record.name;
        newRow.appendChild(name);
        
        let description = document.createElement('div');
        description.classList.add("col-3", "mt-1", "border-end");
        let descriptionText = document.createElement("p");
        descriptionText.classList.add("muted");
        if (record.description.length > 100) {
            let descriptionToolTip = document.createElement("a");
            descriptionToolTip.setAttribute("data-bs-toggle", "tooltip");
            descriptionToolTip.setAttribute("data-bs-title", record.description);
            descriptionToolTip.innerText = record.description.slice(0,100) + "...";
            descriptionText.appendChild(descriptionToolTip);
        } else {
            descriptionText.innerText = record.description;
        }
        description.appendChild(descriptionText);
        newRow.appendChild(description);

        let mainObjects = document.createElement('div');
        mainObjects.classList.add("col-3", "border-end");
        let mainObjectList = record.mainObject.split("-");
        for (let object of mainObjectList) {
            let oneObjectRecord = document.createElement("p");
            oneObjectRecord.innerText = object;
            mainObjects.appendChild(oneObjectRecord);
        }
        newRow.appendChild(mainObjects);

        let selectBtnDiv = document.createElement("div");
        selectBtnDiv.classList.add("col-3", "mt-5","text-center", "border-end","p-0");
        let selectBtn = document.createElement('button');
        selectBtn.classList.add("btn", "border-orange", "text-orange", "select-route", "p-1");
        selectBtn.innerText = "Выбрать";
        selectBtn.setAttribute("data-routeId", record.id);
        selectBtn.addEventListener("click", () => {
            getGuidesById(record.id).then(result => {
                guidesData = result;
                addGuidesToMainTable(result);
                createDefaultFilters("selectLangGuideForm", "Язык экскурсии");
                createDefaultFilters("selectExpGuideForm", "Опыт работы");
                addOptionsToLangSelect(result);
                addOptionsToWorkExpSelect(result);
            })
            showAndGoGuides();
            setNameOfRoute(record.name);
            document.querySelector("#routeNameGuideSection").setAttribute("data-id", record.id);
        });
        selectBtnDiv.appendChild(selectBtn);
        newRow.appendChild(selectBtnDiv);
        
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

function createPaginationBtns(page = 1, special = "") {
    let paginationBtnBlock = document.querySelector("#paginationBtnBlock");
    paginationBtnBlock.innerHTML = "";

    let dataLen;

    if(document.querySelector("#searchByNameInput").value != "") {
        dataLen = searchRoutesByName(document.querySelector("#searchByNameInput").value).length;
    }

    if (page == 1 && !special) {
        for (let i = 0; i < 3; i++) {
            let button = document.createElement("button");
            button.classList.add("btn", "border-5", "border-orange", "text-orange", "mx-1");
            button.setAttribute("data-page", page + i);
            button.innerText = page + i;
            paginationBtnBlock.appendChild(button);
        }
    } else if(!special){
        for (let i = -1; i < 2; i++) {
            let button = document.createElement("button");
            button.classList.add("btn", "border-5", "border-orange", "text-orange", "mx-1");
            button.setAttribute("data-page", page + i);
            button.innerText = page + i;
            paginationBtnBlock.appendChild(button);
        }
    } else {
        for (let i = -1; i < 1; i++) {
            let button = document.createElement("button");
            button.classList.add("btn", "border-5", "border-orange", "text-orange", "mx-1");
            button.setAttribute("data-page", page + i);
            button.innerText = page + i;
            paginationBtnBlock.appendChild(button);
        }
    }

    document.querySelector(`[data-page="${page}"]`).classList.remove("text-orange");
    document.querySelector(`[data-page="${page}"]`).classList.add("bg-orange", "text-white");
}

function pageBtnHandler(event) {
    createPaginationBtns(parseInt(event.target.innerText,10));
    getAllRoutes(parseInt(event.target.innerText,10));

    if(event.target.classList.contains("first-page-btn")) {
        createPaginationBtns(1);
        getAllRoutes(1);
    }
    if (event.target.classList.contains("last-page-btn")) {
        createPaginationBtns(12, "last");
        getAllRoutes(12);
    }
    scrollTo(0, 0);
}

function searchRoutesByName(searchName) {
    let object;
    if(document.querySelector("#selectRouteForm").value != "default") {
        object = document.querySelector("#selectRouteForm").value;
    } else {
        object = "";
    }
    let resultArray = [];
    for (let record of allDataRoutes) {
        if (record.name.includes(searchName) && record.mainObject.includes(object)) {
            resultArray.push(record);
        }
    }
    addRoutesToMainTable(resultArray);
    return resultArray;
}

function searchByNameInputHandler(event) {
    searchRoutesByName(document.querySelector("#searchByNameInput").value);
    createPaginationBtns(1);
}

function searchRoutesByObjects(objectName) {
    let searchName;
    if(document.querySelector("#searchByNameInput").value) {
        searchName = document.querySelector("#searchByNameInput").value;
    } else {
        searchName = "";
    }
    let resultArray = [];
    for (let record of allDataRoutes) {
        if (record.mainObject.includes(objectName) && record.name.includes(searchName)) {
            resultArray.push(record);
        }
    }
    addRoutesToMainTable(resultArray);
    return resultArray;
}

function searchRoutesByObjectsHandler(event){
    searchRoutesByObjects(event.target.value);
}

function addObjectsToSelect(data) {
    let objectSelector = document.querySelector("#selectRouteForm");
    for (let record of data) {
        let objectList = record.mainObject.split("-");
        for (let object of objectList) {
            let newOption = document.createElement("option");
            newOption.innerText = object;
            objectSelector.appendChild(newOption);
        }
    }
}

//----------------------------

async function getGuidesById(id) {
    finalURL = new URL(`${defaultURL}/routes/${id}/guides`);
    finalURL.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(finalURL);
        let data = await response.json();
        return data;
    }
    catch(error) {
        showMessage("warning", error.message);
    }
}

function searchGuidesByLangHandler(event) {
    searchGuidesByFilters("lang",event.target.value);
}

function searchGuidesByExpHandler(event) {
    searchGuidesByFilters("exp",event.target.value);
}

function searchGuidesByFilters() {
    let routeId = document.querySelector("#routeNameGuideSection").getAttribute("data-id");
    let workExp, language;
    if(document.querySelector("#selectExpGuideForm").value != "default") {
        workExp = document.querySelector("#selectExpGuideForm").value;
    } else {
        workExp = -1;
    }

    if(document.querySelector("#selectLangGuideForm").value != "default") {
        language = document.querySelector("#selectLangGuideForm").value;
    } else {
        language = "";
    }

    getGuidesById(routeId).then(result => {
        let resultArray = [];
        if (workExp == -1) {
            for (let record of result) {
                console.log(workExp);
                if (record.language.includes(language)) {
                    resultArray.push(record);
                }
            }
            addGuidesToMainTable(resultArray);
            return;
        }
        for (let record of result) {
            if (record.workExperience == workExp &&
            record.language.includes(language)) {
                resultArray.push(record);
            }
        }
        addGuidesToMainTable(resultArray);
    });
}

function createDefaultFilters(id, inner) {
    let filterSelect = document.querySelector(`#${id}`);
    filterSelect.innerHTML = "";
    let defaultOption = document.createElement("option");
    defaultOption.setAttribute("selected", "selected");
    defaultOption.setAttribute("disabled", "disabled");
    defaultOption.setAttribute("value", "default");
    defaultOption.innerText = inner;
    filterSelect.appendChild(defaultOption);
}

function setNameOfRoute(name) {
    document.querySelector("#routeNameGuideSection").innerText = name;
}

function compare(x, y) {
    if (x > y) return 1;
    if (x == y) return 0;
    if (x < y) return -1; 
  }

function addOptionsToWorkExpSelect(data) {
    let selectExpGuideForm = document.querySelector("#selectExpGuideForm");
    let workExpArray = [];
    for (let record of data) {
        workExpArray.push(record.workExperience);
    }

    let uniqueWorkExpArray = [...new Set(workExpArray)].sort(compare);

    for (let record of uniqueWorkExpArray) {
        let newOption = document.createElement("option");
        newOption.innerText = record;
        selectExpGuideForm.appendChild(newOption);
    }
}

function addOptionsToLangSelect(data) {
    let selectLangGuideForm = document.querySelector("#selectLangGuideForm");
    let langArray = [];
    for (let record of data) {
        langArray.push(record.language);
    }

    let uniqueLangArray = [...new Set(langArray)];

    for (let record of uniqueLangArray) {
        let newOption = document.createElement("option");
        newOption.innerText = record;
        selectLangGuideForm.appendChild(newOption);
    }
}

function showAndGoGuides() {
    let tourGuideSection = document.getElementById("tourGuideSection");
    tourGuideSection.classList.remove("d-none");
    window.location.href = "#tourGuideSection";
}

function addGuidesToMainTable(data) {
    let mainGiudeTable = document.querySelector("#mainGiudeTable");
    mainGiudeTable.innerHTML = "";
    for (let record of data) {
        console.log(record);
        let newRow = document.createElement("div");
        newRow.classList.add("row", "text-center", "p-0", "pt-1", "pb-2", "border-top");

        let avatarDiv = document.createElement("div");
        avatarDiv.classList.add("col-1", "p-0", "d-flex","align-items-center", "text-center", "border-end");
        let avatar = document.createElement("img");
        avatar.classList.add("img-fluid", "w-50");
        avatar.src = "images/guides/avatar.png";
        avatarDiv.appendChild(avatar);
        newRow.appendChild(avatarDiv);

        let name = document.createElement("div");
        name.classList.add("col-2", "p-0", "border-end");
        name.innerText = record.name;
        newRow.appendChild(name);

        let language = document.createElement("div");
        language.classList.add("col-2", "p-0", "border-end");
        language.innerText = record.language;
        newRow.appendChild(language);

        let workExp = document.createElement("div");
        workExp.classList.add("col-2","p-0", "border-end");
        workExp.innerText = record.workExperience;
        newRow.appendChild(workExp);

        let pricePerHour = document.createElement("div");
        pricePerHour.classList.add("col-3", "p-0", "border-end");
        pricePerHour.innerText = record.pricePerHour;
        newRow.appendChild(pricePerHour);

        let chooseBtnDiv = document.createElement("div");
        chooseBtnDiv.classList.add("col-2", "p-0");

        let chooseBtn = document.createElement("input");
        chooseBtn.classList.add("form-check-input", "guideCheckbox");
        chooseBtn.setAttribute("type", "checkbox");
        chooseBtn.setAttribute("data-id", record.id);
        chooseBtn.setAttribute("data-name", record.name);
        chooseBtn.addEventListener("click", () => {
            let guideCheckboxList = document.querySelectorAll(".guideCheckbox");
            for (let guideChecked of guideCheckboxList) {
                guideChecked.checked = false;
            }
            chooseBtn.checked = true;
        })

        chooseBtnDiv.appendChild(chooseBtn);
        newRow.appendChild(chooseBtnDiv)

        mainGiudeTable.appendChild(newRow);
    }
}

function openAddOrderModalHandler(event) {

    if (!validateGuideSelection()) {
        showMessage("warning", "Требуется выбрать гида");
    } else {
        let myModal = new bootstrap.Modal(document.querySelector("#addOrderFormModal"))
        myModal.show();
    }

    setRouteNameToModal();
    setGuideNameToModal(getCheckedGuide());

    let formCreateOrder = document.querySelector("#modalForm");
    formElements = formCreateOrder.elements;
    let date = formElements["date"].value;
    let time = formElements["time"].value;
    let duration = formElements["duration"].value;
    let persons = formElements["persons"].value;
    

    formCreateOrder.reset();
}

function setRouteNameToModal() {
    let routeNameModal = document.querySelector("#routeNameModal");

    let routeNameGuideSection = document.querySelector("#routeNameGuideSection");

    routeNameModal.innerText = routeNameGuideSection.innerText;
}

function validateGuideSelection() {
    let guideCheckboxList = document.querySelectorAll(".guideCheckbox");
    let counter = 0;

    for (let guideChecked of guideCheckboxList) {
        if (guideChecked.checked) {
            counter++;
        }
    }

    if (counter == 0) {
        return false;
    } else return true;
}

function validateTime(event) {
    time = document.querySelector("#time").value;
    
    if ((time.slice(3,5) == "00" || time.slice(3,5) == "30") &&
    parseInt(time.slice(0,2), 10) >= 9 && parseInt(time.slice(0,2), 10) <= 23
    ) {
        return true;
    } else {
        invalidTimeMessage();
        event.target.value = "09:00"
        return false;
    };
}

function invalidTimeMessage() {
    let timeDivModal = document.querySelector("#timeDivModal");

    let messageDiv = document.createElement("div");
    messageDiv.classList.add("my-3", "p-1", "rounded-2", "bg-warning");

    let message = document.createElement("span");
    message.innerText = "Экскурсии возможны с 09:00 до 23:00 раз в 30 минут";
    messageDiv.appendChild(message);

    timeDivModal.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.remove();
    },3000);
}   

function getCheckedGuide() {
    let guideCheckboxList = document.querySelectorAll(".guideCheckbox");

    let checkedGuide;

    for (let guideChecked of guideCheckboxList) {
        if (guideChecked.checked) {
            checkedGuide = guideChecked.getAttribute("data-name");
        }
    }

    return checkedGuide;
}

function setGuideNameToModal(name) {
    document.querySelector("#guideNameModal").innerText = name;
}

window.onload = function (){
    createPaginationBtns();

    getAllRoutes();

    getAllRoutes().then(result => allDataRoutes = result);

    document.querySelector('.pagination').onclick = pageBtnHandler;

    let btn = document.querySelector('#btn').addEventListener("click", ()=>{
        showMessage("success", Date.now());
    })

    let clearRoutesFiltersBtn = document.querySelector("#clearRoutesFiltersBtn");
    clearRoutesFiltersBtn.addEventListener("click", () => {
        document.querySelector("#searchRouteForm").reset();
        getAllRoutes();
    });

    let clearGuidesFiltersBtn = document.querySelector("#clearGuidesFiltersBtn");
    clearGuidesFiltersBtn.addEventListener("click", () => {
        document.querySelector("#searchGuideForm").reset();
        addGuidesToMainTable(guidesData);
    });

    document.querySelector("#searchByNameInput").oninput = searchByNameInputHandler;
    document.querySelector("#selectRouteForm").onchange = searchRoutesByObjectsHandler;
    document.querySelector("#selectLangGuideForm").onchange = searchGuidesByLangHandler;
    document.querySelector("#selectExpGuideForm").onchange = searchGuidesByExpHandler;


    // let modalCreateOrder = document.querySelector('#openAddOrderBtn');
    // modalCreateOrder.addEventListener('show.bs.modal', addOrder);

    let openAddOrderBtn = document.getElementById("openAddOrderBtn");
    // openAddOrderBtn.addEventListener('show.bs.modal', openAddOrderModalHandler);
    openAddOrderBtn.addEventListener('click', openAddOrderModalHandler);


    let time = document.querySelector("#time");
    time.oninput = validateTime;
}