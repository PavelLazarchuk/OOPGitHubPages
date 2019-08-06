const purpose = document.getElementById('purposeVisit');
const userName = document.getElementById('userName');
const date = document.getElementById('date');
const comment = document.getElementById('comment');
const pressure = document.getElementById('pressure');
const indexWeight = document.getElementById('indexWeight');
const illness = document.getElementById('illness');
const age = document.getElementById('age');
const lastDateVisit = document.getElementById('lastDateVisit');
const sel = document.getElementById('select');
let arrCard = JSON.parse(localStorage.getItem('item')) ? JSON.parse(localStorage.getItem('item')) : [];

for(let i = 0; i < arrCard.length; i++) {
    createCard(arrCard[i].userName, arrCard[i].select, arrCard[i].purpose, arrCard[i].date, arrCard[i].pressure, arrCard[i].indexWeight, arrCard[i].illness, arrCard[i].age, arrCard[i].lastDateVisit, arrCard[i].comment, arrCard.length);
}

class Visit {
    constructor(purposeVisit, fullName, dateVisit, comment) {
        this._purposeVisit = purposeVisit;
        this._fullName = fullName;
        this._dateVisit = dateVisit;
        this._comment = comment;
    }
    open() {
        const overlay = document.getElementById('back');
        overlay.classList.add('modal-overlay');
        const modal = document.getElementById('modal');
        modal.style.display = 'flex';
    }
    close() {
        const overlay = document.getElementById('back');
        overlay.classList.remove('modal-overlay');
        const modal = document.getElementById('modal');
        modal.style.display = "none";
        const inputs = document.getElementsByClassName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
        document.getElementById('select').options[0].selected = 'selected';
        lastDateVisit.style.display = 'none';
        age.style.display = 'none';
        pressure.style.display = 'none';
        indexWeight.style.display = 'none';
        illness.style.display = 'none';
    }
    static hiddenInput () {
        pressure.style.display = 'none';
        indexWeight.style.display = 'none';
        illness.style.display = 'none';
        age.style.display = 'none';
        lastDateVisit.style.display = 'none';
    }
     checkDoctor() {
        if(sel.options[sel.selectedIndex].text === 'Кардиолог' ) {
            pressure.style.display = 'block';
            indexWeight.style.display = 'block';
            illness.style.display = 'block';
            age.style.display = 'block';
            lastDateVisit.style.display = 'none';
        }
        if(sel.options[sel.selectedIndex].text === 'Терапевт' ) {
            age.style.display = 'block';
            pressure.style.display = 'none';
            indexWeight.style.display = 'none';
            illness.style.display = 'none';
            lastDateVisit.style.display = 'none';
        }
        if(sel.options[sel.selectedIndex].text === 'Дантист' ) {
            lastDateVisit.style.display = 'block';
            age.style.display = 'none';
            pressure.style.display = 'none';
            indexWeight.style.display = 'none';
            illness.style.display = 'none';
        }
    }
    createVisit(){
        addCartItem({
            id:  arrCard.length,
            userName: userName.value,
            select: sel.value,
            purpose: purpose.value,
            date: date.value,
            pressure: pressure.value,
            indexWeight: indexWeight.value,
            illness: illness.value,
            age: age.value,
            lastDateVisit: lastDateVisit.value,
            comment: comment.value
        });
    }
}

function visibleMove (btn){
    const parentEl = btn.parentElement;
    const showAge = parentEl.getElementsByClassName('visit-age-visible');
    btn.style.display = "none";
    const elemCard = parentEl.getElementsByClassName('visit-visible');
    for (let i = 0; i < elemCard.length; i+1) {
        elemCard[i].classList.remove('visit-visible');
    }
    if(parentEl.getElementsByClassName('doctor')[0].textContent === 'Кардиолог' ) {
        const showCardio = parentEl.getElementsByClassName('visit-cardio-visible');
        for (let j = 0; j < showCardio.length; j+1) {
            showCardio[j].classList.remove('visit-cardio-visible');
        }
        for (let j = 0; j < showAge.length; j+1) {
            showAge[j].classList.remove('visit-age-visible');
        }
    }
    else if(parentEl.getElementsByClassName('doctor')[0].textContent === 'Терапевт' ) {
        for (let j = 0; j < showAge.length; j+1) {
            showAge[j].classList.remove('visit-age-visible');
        }
    }
    else if(parentEl.getElementsByClassName('doctor')[0].textContent === 'Дантист' ) {
        const showDantist =parentEl.getElementsByClassName('visit-dantist-visible');
        for (let j = 0; j < showDantist.length; j+1) {
            showDantist[j].classList.remove('visit-dantist-visible');
        }
    }
}

Visit.hiddenInput();
const modalVisit = new Visit();

function createCard(userName, select, purpose, date, pressure, indexWeight, illness, age, lastDateVisit, comment, id) {
    let divCard = document.createElement("div");
    divCard.id= id-1;
    divCard.innerHTML = `<p class="paragraph">${userName}</p>
        <p class="doctor paragraph">${select}</p>
        <p class="visit-visible paragraph">Цель визита: ${purpose}</p>
        <p class="visit-visible paragraph">Дата визита: ${date}</p>
        <p class="visit-cardio-visible paragraph">Давление: ${pressure}</p>
        <p class="visit-cardio-visible paragraph">Индекс маси тела: ${indexWeight}</p>
        <p class="visit-cardio-visible paragraph">Заболевания: ${illness}</p>
        <p class="visit-age-visible paragraph">Возраст: ${age}</p>
        <p class="visit-dantist-visible paragraph">Дата последнего визита: ${lastDateVisit}</p>
        <p class="visit-visible paragraph">Комментарий: ${comment}</p>
        <button id="closeCard" class="close-card">x</button>
        <button class='showMore'>Показать больше...</button>`;
    divCard.classList.add("main-card");
    document.getElementById("mainCardId").appendChild(divCard);
    showText('mainCardId');
    const visitVisible = document.getElementsByClassName("visit-visible");
    if(comment === "") {
        visitVisible[visitVisible.length - 1].style.display = "none";
    }
}
const button = document.getElementById("createModal");
document.addEventListener('click', function(event) {

    if(event.target.classList.contains('close-card')) {
        const divCard = event.target.parentNode;
       let cardsArr = JSON.parse(localStorage.getItem('item'));
      let index = cardsArr.findIndex(el => el.id === divCard.attributes.id.value)-1;
      cardsArr.splice(index, 1);
     cardsArr.map(el => (el.id-1 < 0) ? 0 : el.id--);

        let mainCardBlock = Array.from(document.getElementById('mainCardId').children);
      mainCardBlock.forEach(el =>{
          el.setAttribute('id',  el.attributes.id.value-1 < 0 ? 0 : el.attributes.id.value-1)
                 });
      localStorage.setItem('item', JSON.stringify(cardsArr));
        divCard.remove();
        showText('mainCardId');
    }

    if(event.target.classList.contains('showMore')) {
        visibleMove(event.target);
    }

    const modal = document.getElementById('modal');
    if (!modal.contains(event.target) && !button.contains(event.target)) {
        modalVisit.close();
    }
});

button.addEventListener("click", modalVisit.open.bind(modalVisit));

class Cardiologist extends Visit {
    constructor(purposeVisit, normalPressure, massIndex, pastIllnesses, age,  fullName, dateVisit, comment) {
        super(purposeVisit, fullName, dateVisit, comment);
        this._normalPressure = normalPressure;
        this._massIndex = massIndex;
        this._pastIllnesses = pastIllnesses;
        this._age = age;
    }

}
class Therapist extends Visit {
    constructor(purposeVisit, age, fullName, dateVisit, comment) {
        super(purposeVisit, fullName, dateVisit, comment);
        this._age = age;
    }
}
class Dentist extends Visit {
    constructor(purposeVisit, lastDate, fullName, dateVisit, comment) {
        super(purposeVisit, fullName, dateVisit, comment);
        this._lastDate = lastDate;
    }
}

let newVisit;
document.getElementById("createVisit").addEventListener('click', function () {

    if(select.value ==='Дантист') {
        if (purpose.value !== "" && lastDateVisit.value !== "" && userName.value !== "" &&
            date.value !== "") {
            newVisit = new Dentist(purpose.value, lastDateVisit.value, userName.value,
                date.value, comment.value);
            newVisit.createVisit();
        } else {
            alert('Попребуйте еще раз! Для записи к врачу нужно заполнить все поля!')
        }
    }
    if(select.value ==='Терапевт') {
        if (purpose.value !== "" && age.value !== "" && userName.value !== "" && date.value !== "") {
            newVisit = new Therapist(purpose.value, age.value, userName.value,
                date.value, comment.value);
            newVisit.createVisit();
        } else {
            alert('Попребуйте еще раз! Для записи к врачу нужно заполнить все поля!')
        }
    }
    if(select.value ==='Кардиолог') {
        if (purpose.value !== "" && pressure.value !== "" && indexWeight.value !== "" && illness.value !== "" && age.value !== "" && userName.value !== "" && date.value !== "") {
            newVisit = new Cardiologist(purpose.value, pressure.value, indexWeight.value,
                illness.value, age.value, userName.value, date.value, comment.value);
            newVisit.createVisit();
        } else {
            alert('Попребуйте еще раз! Для записи к врачу нужно заполнить все поля!')
        }
    }
    modalVisit.close();
});

function addCartItem(itemId) {
     arrCard.push(itemId);
    localStorage.setItem('item', JSON.stringify(arrCard));
    createCard(itemId.userName, itemId.select, itemId.purpose, itemId.date, itemId.pressure, itemId.indexWeight, itemId.illness, itemId.age, itemId.lastDateVisit, itemId.comment, arrCard.length)
}

function showText(id) {
    const elemCont = document.getElementById(id);

    if ((elemCont.hasChildNodes())){
        const mainText = document.getElementById('main-text');
        mainText.style.display = "none";
    } else {
        const mainText = document.getElementById('main-text');
        mainText.style.display = "block";
    }
}

showText('mainCardId');

// Drag'n'Drop
let dropContainer = document.getElementById("mainCardId");

dropContainer.onmousedown = function(e) {
    let dropCard;
    if(e.target.querySelectorAll(".paragraph") && !e.target.classList.contains("showMore")) {
        dropCard = e.target.parentNode;
    }
    if(e.target.classList.contains("main-card")) {
        dropCard = e.target;
    }
    let coords = getCoords(dropCard);
    let shiftX = e.pageX - coords.left;
    let shiftY = e.pageY - coords.top;
    dropCard.style.position = 'absolute';
    moveAt(e);
    dropCard.style.zIndex = "999"; // над другими элементами

    function moveAt(e) {
        dropCard.style.left = (e.pageX - shiftX) - 20 + 'px';
        dropCard.style.top = (e.pageY - shiftY) - 10 + 'px';
    }

    document.onmousemove = function(e) {
        moveAt(e);
    };

    dropCard.onmouseup = function() {
        document.onmousemove = null;
        dropCard.onmouseup = null;
    };
    dropCard.ondragstart = function() {
        return false;
    };
};

function getCoords(elem) {   // кроме IE8-
    let box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}