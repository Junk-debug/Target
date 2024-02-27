export function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setRandomNum(min, max, variable) {
    variable = getRandomNum(min, max);
}

export function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

export function adjustWidth() {
    const inputElement = this;

    const paddingLeft = window.getComputedStyle(inputElement).paddingLeft;
    const paddingRight = window.getComputedStyle(inputElement).paddingRight;

    const sumOfpaddings = +paddingLeft.slice(0, -2) + +paddingRight.slice(0, -2);

    // Создаем временный элемент span, чтобы измерить ширину содержимого
    const tempInputSpan = document.createElement('span');
    tempInputSpan.innerText = inputElement.value;
    tempInputSpan.style.fontSize = window.getComputedStyle(inputElement).fontSize;
    document.body.appendChild(tempInputSpan);

    const inputWidth = tempInputSpan.offsetWidth;

    document.body.removeChild(tempInputSpan);

    const placeholderText = inputElement.getAttribute('placeholder');

    const tempPlaceholderSpan = document.createElement('span');
    tempPlaceholderSpan.style.visibility = 'hidden';
    tempPlaceholderSpan.style.fontSize = window.getComputedStyle(inputElement).fontSize;
    tempPlaceholderSpan.textContent = placeholderText;

    document.body.appendChild(tempPlaceholderSpan);

    const placeholderWidth = tempPlaceholderSpan.getBoundingClientRect().width + sumOfpaddings + "px";

    document.body.removeChild(tempPlaceholderSpan);

    // Устанавливаем ширину input такую, как ширина содержимого

    inputElement.style.width = (inputWidth == 0) ? placeholderWidth : inputWidth + sumOfpaddings + 'px';
}

export function adjustSelectWidth() {
    const text = this.options[this.selectedIndex].text;
    const aux = document.createElement('select');
    const option = document.createElement('option');
    option.text = text;
    aux.add(option);
    document.body.appendChild(aux);
    this.style.width = aux.offsetWidth + 'px';
    document.body.removeChild(aux);
}

export function setCursorToEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();

    range.selectNodeContents(el);
    range.collapse(false); // Устанавливаем конец диапазона

    sel.removeAllRanges();
    sel.addRange(range);
}

export function generateUUID() {
    // Получаем текущее время в миллисекундах
    let d = new Date().getTime();
    // Если доступна производительность, то добавляем ее значение к времени
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    // Генерируем UUID в формате 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}