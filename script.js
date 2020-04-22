const charsLatin = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', ']', '[', '\\', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter', 'Shift',
  'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const charsCyrillic = ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
  'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift',
  'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const keyCodes = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft',
  'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight', 'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'];
const shiftLatin = ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
  'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
  'CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '\'', 'Enter', 'Shift',
  'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const shiftCyrillic = ['Ё', '!', '\'', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
  'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del',
  'CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter', 'Shift',
  'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', 'Shift', 'Ctrl', 'Win', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl'];
const area = document.createElement('textarea');
const keysContainer = [];

class Helper {
  constructor() {
    this.isAlt = false;
    this.isControl = false;
  }

  toggleCapsLock() {
    this.caps = !this.caps;
    document.querySelectorAll('button').forEach((item) => {
      if (item.textContent.length === 1) {
        item.textContent = this.caps ? item.textContent.toUpperCase() : item.textContent.toLowerCase();
      }
    });
  }

  changeLang() {
    if (this.isEnglish === true) {
      keysContainer.forEach((item, idx) => {
        item.textContent = charsCyrillic[idx];
      });
      this.isEnglish = false;
      localStorage.setItem('isEnglish', false);
    } else {
      keysContainer.forEach((item, idx) => {
        item.textContent = charsLatin[idx];
      });
      this.isEnglish = true;
      localStorage.setItem('isEnglish', true);
    }
  }

  onShift() {
    if (this.isEnglish === true) {
      keysContainer.forEach((item, idx) => {
        item.textContent = shiftLatin[idx];
      });
    } else {
      keysContainer.forEach((item, idx) => {
        item.textContent = shiftCyrillic[idx];
      });
    }
  }

  offShift() {
    if (this.isEnglish === true) {
      keysContainer.forEach((item, idx) => {
        item.textContent = charsLatin[idx];
      });
    } else {
      keysContainer.forEach((item, idx) => {
        item.textContent = charsCyrillic[idx];
      });
    }
  }
}

const helper = new Helper();

// key handlers
function handleSymbols() {
  key.addEventListener('mousedown', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.textContent.length === 1) {
      area.value += event.target.textContent;
    }
  });
}

function handleBackspace(item) {
 if (item === 'Backspace') {
  key.classList.add('keyboard__key-wide');
  key.addEventListener('mousedown', () => {
    const startPos = area.selectionStart;
    const endPos = area.selectionEnd;
    if (area.selectionStart === 0 && area.selectionEnd === 0) {
      area.focus();
    } else {
      area.value = area.value.substring(0, startPos - 1)
        + area.value.substring(endPos, area.value.length);
      area.selectionStart = startPos - 1;
      area.selectionEnd = endPos - 1;
      area.focus();
    }
  });
 }
}

function handleDelete(item) {
  if (item === 'Del') {
    key.addEventListener('mousedown', () => {
      const startPos = area.selectionStart;
      const endPos = area.selectionEnd;
      area.value = area.value.substring(0, startPos)
        + area.value.substring(endPos + 1, area.value.length);
      area.selectionStart = startPos;
      area.selectionEnd = endPos;
      area.focus();
    });
  }
}

function handleOtherKeys(item) {
  switch (item) {
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
      key.addEventListener('mousedown', helper.onShift);
      key.addEventListener('mouseup', helper.offShift);
      break;
    case 'CapsLock':
      key.classList.add('keyboard__key-wide');
      key.addEventListener('mousedown', helper.toggleCapsLock);
      break;
  }
}

function createKeys() {
  let lang;
  if (localStorage.getItem('isEnglish') === true || typeof localStorage.getItem('isEnglish') === 'undefined') {
    lang = charsLatin;
  } else {
    lang = charsCyrillic;
  }
  lang.forEach((item, idx) => {
    key = document.createElement('button');
    key.setAttribute('type', 'button');
    key.setAttribute('id', `${keyCodes[idx]}`);
    key.classList.add('key');
    key.textContent = item;
    
    handleSymbols();
    handleBackspace(item);
    handleDelete(item);
    handleOtherKeys(item);
   
    keysContainer.push(key);
  });
  return keysContainer;
}

function createKeyboard() {
  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');
  const container = document.createElement('div');
  container.classList.add('container');
  keyboard.append(container);
  createKeys().forEach((item) => {
    container.append(item);
    if (item.id === 'Backspace' || item.id === 'Delete' || item.id === 'Enter' || item.id === 'ShiftRight') {
      const br = document.createElement('br');
      container.append(br);
    }
  });
  document.body.append(keyboard);
  keyboard.insertAdjacentHTML('afterend', '<div class="comment">Change language: Ctrl + Alt<br>Made on Windows</div>');
}

function addTextArea() {
  area.classList.add('area');
  document.body.append(area);
  area.addEventListener('keydown', (event) => {
    event.preventDefault();
  });
  area.addEventListener('blur', () => {
    area.focus();
  });
}

document.addEventListener('keydown', (event) => {
  const startPos = area.selectionStart;
  const endPos = area.selectionEnd;

  switch (event.key) {
    case 'Enter':
      area.value += '\n';
      // without preventDefault() a previous character in the textarea was added again
      event.preventDefault();
      break;
    case 'Backspace':
      if (startPos === 0 && endPos === 0) {
        area.focus();
      } else {
        area.value = area.value.substring(0, startPos - 1)
          + area.value.substring(endPos, area.value.length);
        area.setSelectionRange(startPos - 1, startPos - 1);
      }
      break;
    case 'Delete':
      area.value = area.value.substring(0, startPos)
        + area.value.substring(endPos + 1, area.value.length);
      area.setSelectionRange(startPos, startPos);
      break;
    case 'CapsLock':
      helper.toggleCapsLock();
      break;
    case ' ':
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
      this.isAlt = true;
      event.preventDefault();
      break;
    case 'Control':
      this.isControl = true;
      break;
    case 'Shift':
      helper.onShift();
      break;
    default:
  }

  if (this.isControl === true && this.isAlt === true) {
    helper.changeLang();
  }

  document.querySelector(`#${event.code}`).classList.add('active');
  if (event.key.length === 1) {
    area.value += document.querySelector(`#${event.code}`).textContent;
  }
});

document.addEventListener('keyup', (event) => {
  document.querySelector(`#${event.code}`).classList.remove('active');
  switch (event.key) {
    case 'Shift':
      helper.offShift();
      break;
    case 'Control':
      this.isControl = false;
      break;
    case 'Alt':
      this.isAlt = false;
      break;
    default:
  }
});

window.addEventListener('DOMContentLoaded', () => {
  addTextArea();
  createKeyboard();
});
