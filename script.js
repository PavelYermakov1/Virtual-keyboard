class VirtualKeyboard {
  constructor() {
    this.elements = {
      wrapper: null,
      textarea: null,
      keyboard: null,
      keysContainer: null,
      keys: [],
    };

    this.props = {
      lang: null,
      textValue: '',
      capsLock: false,
      shift: false,
      controlPress: false,
      altPress: false,
    };

    this.keyLayout = {
      eng: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'DEL',
        'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter',
        'Shift', 'En', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►',
      ],

      engShift: [
        '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'DEL',
        'Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter',
        'Shift', 'En', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'shift',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►',
      ],

      ru: [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'DEL',
        'Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'Ру', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'shift',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►',
      ],

      ruShift: [
        'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'DEL',
        'Caps Lock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter',
        'Shift', 'Ру', 'Я', 'Ч', 'С', 'М', 'И', 'Е', 'Ь', 'Б', 'Ю', ',', '▲', 'shift',
        'Ctrl', 'Win', 'Alt', ' ', 'Alt', 'Ctrl', '◄', '▼', '►',
      ],

      eventCode: [
        'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
        'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
        'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
        'ShiftLeft', 'En', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
        'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
      ],
    };
  }

  render() {
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.className = 'wrapper';
    this.elements.textarea = document.createElement('textarea');
    this.elements.textarea.className = 'textarea';
    this.elements.keyboard = document.createElement('div');
    this.elements.keyboard.className = 'keyboard';
    this.elements.keysContainer = document.createElement('div');
    this.elements.keysContainer.className = 'keys__container';

    this.props.lang = this.keyLayout.eng;
    if (localStorage.getItem('lang') === this.keyLayout.ru) {
      this.props.lang = this.keyLayout.ru;
      localStorage.setItem('lang', this.props.lang);
    } else if (localStorage.getItem('lang') === this.keyLayout.ruShift) {
      this.props.lang = this.keyLayout.ruShift;
      localStorage.setItem('lang', this.props.lang);
    } else if (localStorage.getItem('lang') === this.keyLayout.engShift) {
      this.props.lang = this.keyLayout.engShift;
      localStorage.setItem('lang', this.props.lang);
    }


    this.elements.keysContainer.appendChild(this.renderKeys(this.props.lang));
    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__note');
    this.elements.keyboard.appendChild(this.elements.keysContainer);
    this.elements.wrapper.append(this.elements.textarea, this.elements.keyboard);
    document.body.append(this.elements.wrapper);
  }

  renderKeys(lang) {
    this.fragment = document.createDocumentFragment();
    lang.forEach((value, index) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'DEL', 'Enter', 'shift'].indexOf(value) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.className = 'keyboard__note';
      keyElement.textContent = value;
      keyElement.id = this.keyLayout.eventCode[index];

      switch (value) {
        case 'Backspace':
        case 'Caps Lock':
        case 'Shift':
          keyElement.classList.add('keyboard__key-wide');
          break;
        case 'Tab':
        case 'DEL':
          keyElement.classList.add('keyboard__key-tab');
          break;
        case 'Enter':
          keyElement.classList.add('keyboard__key-enter');
          break;
        case ' ':
          keyElement.classList.add('keyboard__key-space');
          break;
        case 'Ctrl':
          keyElement.classList.add('keyboard__key-ctrl');
          break;
        case 'shift':
        case 'Win':
        case 'Alt':
        case '▲':
        case '◄':
        case '▼':
        case '►':
          keyElement.classList.add('keyboard__key-colored');
          break;
        default:
          break;
      }
      this.fragment.appendChild(keyElement);
      if (insertLineBreak) {
        this.fragment.appendChild(document.createElement('br'));
      }
    });
    return this.fragment;
  }

  lightKeys() {
    this.elements.keysContainer.addEventListener('mousedown', (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.target.classList.add('active');
      }
    });
    this.elements.keysContainer.addEventListener('mouseup', (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.target.classList.remove('active');
      }
    });
    document.body.addEventListener('keydown', (event) => {
      event.preventDefault();
      const key = this.elements.keysContainer.querySelector(`.keyboard__note[id = "${event.code}"]`);
      key.classList.add('active');
    });
    document.body.addEventListener('keyup', (event) => {
      event.preventDefault();
      const key = this.elements.keysContainer.querySelector(`.keyboard__note[id = "${event.code}"]`);
      key.classList.remove('active');
    });
  }
}


window.onload = function () {
  const virtualKeyboard = new VirtualKeyboard();
  virtualKeyboard.render();
  virtualKeyboard.lightKeys();
};
