class SimpleStickyNote extends HTMLElement {
  constructor() {
    super();
    this._hass = null;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.content) {
      this.initializeCard();
    }
    this.updateCard();
  }

  initializeCard() {
    this.innerHTML = `
      <ha-card>
        <div class="note-content"></div>
        <button class="edit-button">Edit</button>
      </ha-card>
    `;
    this.content = this.querySelector('.note-content');
    this.editButton = this.querySelector('.edit-button');

    this.editButton.addEventListener('click', () => this.showEditPopup());

    this.style.display = 'block';
    this.style.height = '100%';

    const style = document.createElement('style');
    style.textContent = `
      .note-content {
        height: calc(100% - 40px);
        overflow-y: auto;
        padding: 10px;
        font-size: 24px;
      }
      .edit-button {
        position: absolute;
        bottom: 10px;
        left: 10px;
        right: 10px;
        width: calc(100% - 20px);
      }
    `;
    this.appendChild(style);
  }

  updateCard() {
    const entityId = this.config.entity;
    const state = this._hass.states[entityId];
    
    if (state) {
      this.content.textContent = state.state;
      this.adjustFontSize(this.content);
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

  showEditPopup() {
    const oldContent = this.content.textContent;
    this.content.style.display = 'none';
    this.editButton.style.display = 'none';

    const textarea = document.createElement('textarea');
    textarea.value = oldContent;
    textarea.style.width = '100%';
    textarea.style.height = 'calc(100% - 40px)';
    textarea.style.boxSizing = 'border-box';
    textarea.style.padding = '10px';
    textarea.style.border = 'none';
    textarea.style.resize = 'none';
    textarea.style.fontFamily = 'inherit';
    textarea.style.fontSize = '24px';
    textarea.style.backgroundColor = 'transparent';
    textarea.style.color = 'black';

    textarea.addEventListener('input', () => this.adjustFontSize(textarea));

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.marginRight = '5px';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';

    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.bottom = '10px';
    buttonContainer.style.left = '10px';
    buttonContainer.style.right = '10px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.justifyContent = 'space-between';
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);

    this.querySelector('ha-card').appendChild(textarea);
    this.querySelector('ha-card').appendChild(buttonContainer);

    textarea.focus();

    saveButton.addEventListener('click', () => this.saveNote(textarea.value));
    cancelButton.addEventListener('click', () => this.cancelEdit(oldContent));
  }

  saveNote(newContent) {
    if (!this._hass) {
      console.error('Hass object is not available');
      return;
    }
    this._hass.callService('input_text', 'set_value', {
      entity_id: this.config.entity,
      value: newContent
    });
    this.content.textContent = newContent;
    this.adjustFontSize(this.content);
    this.cleanupEditMode();
  }

  cancelEdit(oldContent) {
    this.content.textContent = oldContent;
    this.adjustFontSize(this.content);
    this.cleanupEditMode();
  }

  cleanupEditMode() {
    const textarea = this.querySelector('textarea');
    const buttonContainer = this.querySelector('ha-card > div:last-child');
    if (textarea) textarea.remove();
    if (buttonContainer) buttonContainer.remove();
    this.content.style.display = 'block';
    this.editButton.style.display = 'block';
  }

  adjustFontSize(element) {
    const maxFontSize = 24;
    const minFontSize = 12;
    const maxLength = 100;  // Adjust this value to change when the font starts shrinking
    const text = element.value || element.textContent;
    const length = text.length;
    
    if (length <= maxLength) {
      element.style.fontSize = `${maxFontSize}px`;
    } else {
      const fontSize = Math.max(
        minFontSize,
        maxFontSize - ((length - maxLength) / 5)
      );
      element.style.fontSize = `${fontSize}px`;
    }
  }

  static getStubConfig() {
    return { entity: "input_text.sticky_note" }
  }
}

customElements.define('simple-sticky-note', SimpleStickyNote);
