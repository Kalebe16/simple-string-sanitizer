class Utils {
  static removeAccents(stringWithAccents) {
    if (typeof stringWithAccents != "string") {
      throw new TypeError(`"stringWithAccents" must be a string, not ${typeof stringWithAccents}`)
    }

    const stringWithoutAccents = stringWithAccents.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return stringWithoutAccents;
  }

  static sanitizeString(dirtyString) {
    if (typeof dirtyString != "string") {
      throw new TypeError(`"dirtyString" must be a string, not ${typeof dirtyString}`)
    }

    const notAlphaNumericsRegex = /[^a-zA-Z0-9.\- ]/g;
    const spacesRegex = /\s+/g;

    let sanitizedString = dirtyString.trim().toLowerCase();
    sanitizedString = this.removeAccents(sanitizedString);
    sanitizedString = sanitizedString.replace(notAlphaNumericsRegex, '');
    sanitizedString = sanitizedString.replace(spacesRegex, '-');

    return sanitizedString;
  }
}

class StringSanitizer {
  constructor() {
    this.btnToggleTheme = document.getElementById("btnToggleTheme");
    this.inputDirtyString = document.getElementById("inputDirtyString");
    this.btnCleanDirtyString = document.getElementById("btnCleanDirtyString");
    this.btnSanitizeDirtyString = document.getElementById("btnSanitizeDirtyString");
    this.outputSanitizedString = document.getElementById("outputSanitizedString");
    this.btnCleanSanitizedString = document.getElementById("btnCleanSanitizedString");
    this.btnCopySanitizedString = document.getElementById("btnCopySanitizedString");

    this.addEventListeners();
    this.setInitalTheme();
  }

  addEventListeners() {
    this.btnToggleTheme.addEventListener('click', () => {
      this.toggleTheme();
    })

    this.btnSanitizeDirtyString.addEventListener('click', () => {
      this.sanitizeDirtyString();
    })

    this.btnCleanDirtyString.addEventListener('click', () => {
      this.cleanInputDirtyString();
    });

    this.btnCopySanitizedString.addEventListener('click', () => {
      this.copySanitizedStringToClipboard();
    });

    this.btnCleanSanitizedString.addEventListener('click', () => {
      this.cleanOutputSanitizedString();
    });
  }

  setLightTheme() {
    document.body.classList.remove("bg-zinc-800")
    document.body.classList.add("bg-zinc-50");
    localStorage.setItem("theme", "light");
  }

  setDarkTheme() {
    document.body.classList.remove("bg-zinc-50")
    document.body.classList.add("bg-zinc-800");
    localStorage.setItem("theme", "dark");
  }

  setInitalTheme() {
    const currentTheme = localStorage.getItem("theme") ?? "light";
    if (currentTheme === "light") {
      this.setLightTheme();
    }
    else if (currentTheme === "dark") {
      this.setDarkTheme()
    }
  }

  toggleTheme() {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
      this.setDarkTheme()
    }
    else if (currentTheme === "dark") {
      this.setLightTheme()
    }
  }

  cleanInputDirtyString() {
    this.inputDirtyString.value = "";
  }

  sanitizeDirtyString() {
    const dirtyString = this.inputDirtyString.value;

    if (dirtyString.trim() === "") {
      return;
    }

    const sanitizedString = Utils.sanitizeString(dirtyString);
    this.outputSanitizedString.value += `${sanitizedString}\n`;
  }

  cleanOutputSanitizedString() {
    this.outputSanitizedString.value = "";
  }

  copySanitizedStringToClipboard() {
    const sanitizedString = this.outputSanitizedString.value;

    if (sanitizedString.trim() === "") {
      return;
    }

    navigator.clipboard.writeText(sanitizedString);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new StringSanitizer();
});
