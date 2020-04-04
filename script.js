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
      eng: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'ru',
        'ctrl', 'alt', 'win', 'Space', 'alt', '←', '↓', '→',
      ],

      engShift: ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '{', '}', '|',
        'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ':', '"', 'Enter',
        'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '<', '>', '?', '↑', 'ru',
        'ctrl', 'alt', 'win', 'Space', 'alt', '←', '↓', '→',
      ],

      ru: ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё',
        'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '↑', 'eng',
        'ctrl', 'alt', 'win', 'Space', 'alt', '←', '↓', '→',
      ],

      ruShift: ['[', '!', '"', '№', '%', ':', ',', '.', '*', '(', ')', '_', '+', 'Backspace',
        'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё',
        'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter',
        'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '?', '↑', 'eng',
        'ctrl', 'alt', 'win', 'Space', 'alt', '←', '↓', '→',
      ],

      eventCode: ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
        'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
        'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
        'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'lang',
        'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight',
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

  renderKeys(lang = 'eng') {
    this.fragment = document.createDocumentFragment();
    lang.forEach((value, index) => {
      const keyElement = document.createElement('button');
      const insertLineBreak = ['Backspace', 'DEL', 'Enter', 'shift'].indexOf(value) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.className = 'keyboard__note';
      keyElement.id = this.keyLayout.eventCode[index];

      switch (value) {
        case 'Backspace':
        case 'Caps Lock':
        case 'Shift':
          keyElement.className = 'keyboard__key-wide';
          break;
        case 'Tab':
        case 'DEL':
          keyElement.className = 'keyboard__key-tab';
          break;
        case 'Enter':
          keyElement.className = 'keyboard__key-enter';
          break;
        case ' ':
          keyElement.className = 'keyboard__key-space';
          break;
        case 'Ctrl':
          keyElement.className = 'keyboard__key-ctrl';
          break;
        case 'shift':
        case 'Win':
        case 'Alt':
        case '▲':
        case '◄':
        case '▼':
        case '►':
          keyElement.className = 'keyboard__key-colored';
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
}


window.onload = function () {
  const virtualKeyboard = new VirtualKeyboard();
  virtualKeyboard.render();
};
