const charsLatin = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ']', '[', '\\', 'Del',
    'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
    'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const charsCyrillic = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
    'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
    'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
    'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift',
    'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const shiftLatin = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del', 'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '\'', 'Enter', 'Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const shiftCyrillic = ['Ё', '!', '\'', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace', 'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del', 'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
let area = document.createElement('textarea');
const keys = [];
let caps = false;

let lang;
if (localStorage.getItem('language') === 'english') {
    lang = charsLatin;
} else {
    lang = charsCyrillic;
}

function createTextArea() {
    area.classList.add('area');
    document.body.append(area);
    area.addEventListener('keydown', (event) => {
        event.preventDefault()
    })
};

function capsLock() {
    if (caps === false) {
        document.querySelectorAll('button').forEach((item) => {
            if (item.textContent.length === 1) {
                item.textContent = item.textContent.toUpperCase();
            }
        });
        caps = true;
    } else {
        document.querySelectorAll('button').forEach((item) => {
            if (item.textContent.length === 1) {
                item.textContent = item.textContent.toLowerCase();
            }
        });
        caps = false;
    }
}

function runOnKeys(func, ...eventKeys) {
    let pressed = new Set();

    document.addEventListener('keydown', function (event) {
        pressed.add(event.key);
        for (let key of eventKeys) {
            if (!pressed.has(key)) {
                return;
            }
        }
        //  pressed.clear();
        func();
    });

    document.addEventListener('keyup', function (event) {
        pressed.delete(event.key);
    });
}

function changeLang() {
    if (localStorage.getItem('language') === 'english') {
        keys.forEach((item, idx) => {
            item.textContent = charsCyrillic[idx];
        })
        localStorage.setItem('language', 'russian')
    } else {
        keys.forEach((item, idx) => {
            item.textContent = charsLatin[idx];
        })
        localStorage.setItem('language', 'english')
    }
}

runOnKeys(
    changeLang,
    'Alt',
    'Control'
);

function onShift() {
    if (localStorage.getItem('language') === 'english') {
        keys.forEach((item, idx) => {
            item.textContent = shiftLatin[idx];
        });
    } else {
        keys.forEach((item, idx) => {
            item.textContent = shiftCyrillic[idx];
        });
    }
}

function offShift() {
    if (localStorage.getItem('language') === 'english') {
        keys.forEach((item, idx) => {
            item.textContent = charsLatin[idx];
        });
    } else {
        keys.forEach((item, idx) => {
            item.textContent = charsCyrillic[idx];
        });
    }
}

function createKeys() {
    lang.forEach((item, idx) => {
        //for all keys
        let key = document.createElement('button');
        key.setAttribute('type', 'button');
        key.setAttribute('id', `${keyCodes[idx]}`);
        key.classList.add('key');
        key.textContent = item;

        switch (item) {
            case 'Backspace':
                key.classList.add('keyboard__key-wide');
                key.addEventListener('mousedown', () => {
                    let startPos = area.selectionStart;
                    let endPos = area.selectionEnd;
                    if (area.selectionStart === 0 && area.selectionEnd === 0) {
                        return;
                    } else {
                        area.value = area.value.substring(0, startPos - 1) + area.value.substring(endPos, area.value.length);
                        area.selectionStart = startPos - 1;
                        area.selectionEnd = endPos - 1;
                        area.focus();
                    }
                });
                break;
            case 'Del':
                key.addEventListener('mousedown', () => {
                    let startPos = area.selectionStart;
                    let endPos = area.selectionEnd;
                    area.value = area.value.substring(0, startPos) + area.value.substring(endPos + 1, area.value.length);
                    area.selectionStart = startPos;
                    area.selectionEnd = endPos;
                    area.focus();
                });
                break;
            case ' ':
                key.classList.add('keyboard__key-widest');
                key.addEventListener('mousedown', () => {
                    area.value += ' ';
                });
                break;
            case 'Enter':
                key.classList.add('keyboard__key-wide');
                key.addEventListener('mousedown', () => {
                    area.value += ' \n';
                });
                break;
            case 'Tab':
                key.addEventListener('mousedown', () => {
                    area.value += '    ';
                });
                break;
            case 'Shift':
                key.addEventListener('mousedown', onShift);
                key.addEventListener('mouseup', offShift);
                break;
            case 'CapsLock':
                key.classList.add('keyboard__key-wide');
                key.addEventListener('mousedown', capsLock);
                break;
            default:
                key.addEventListener('mousedown', () => {
                    if (event.target.tagName == 'BUTTON' && event.target.textContent.length === 1) {
                        area.value += event.target.textContent;
                    }
                })
                break;
        }
        keys.push(key);
    })
    return keys;
}

function createKeyboard() {
    let keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    let container = document.createElement('div');
    container.classList.add('container');
    keyboard.append(container);
    createKeys().forEach(item => {
        container.append(item);
        if (item.id === 'Backspace' || item.id === 'Delete' || item.id === 'Enter' || item.id === 'ShiftRight') {
            let br = document.createElement('br')
            container.append(br);
        }
    });
    document.body.append(keyboard);
    keyboard.insertAdjacentHTML('afterend', '<div class="comment">Change language: Ctrl + Alt<br>Made on Windows</div>');
}

document.addEventListener('keydown', (event) => {
    let startPos = area.selectionStart;
    let endPos = area.selectionEnd;

    switch (event.key) {
        case 'Enter':
            area.value += '\n';
            //without preventDefault() a previous character in the textarea was added again
            event.preventDefault();
            break;
        case 'Backspace':
            area.value = area.value.substring(0, startPos - 1) + area.value.substring(endPos, area.value.length);
            area.setSelectionRange(startPos - 1, startPos - 1);
            break;
        case 'Delete':
            area.value = area.value.substring(0, startPos) + area.value.substring(endPos + 1, area.value.length);
            area.setSelectionRange(startPos, startPos);
            break;
        case 'CapsLock':
            capsLock();
            break;
        case ' ':
            area.value += ' ';
            event.preventDefault();
            break;
        case 'Tab':
            area.value += '    ';
            break;
        case 'ArrowRight':
            area.value += '→';
            break;
        case 'ArrowLeft':
            area.value += '←';
            break;
        case 'ArrowUp':
            area.value += '↑';
            break;
        case 'ArrowDown':
            area.value += '↓';
            break;
        case 'Alt':
            event.preventDefault();
            break;
        case 'Shift':
            onShift();
            break;
    }

    document.querySelectorAll('button').forEach((item) => {
        if (item.id === event.code) {
            item.classList.add('active');
            if (event.key.length === 1 && event.key !== ' ') {
                area.value += item.textContent;
            }
        }
    });
})

document.addEventListener('keyup', (event) => {
    document.querySelectorAll('button').forEach((item) => {
        item.classList.remove('active');
    });
    switch (event.key) {
        case 'Shift':
            offShift();
            break;
    }
})

window.addEventListener('DOMContentLoaded', () => {
    createTextArea();
    createKeyboard();
});