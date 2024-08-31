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
        <div class="button-container">
          <ha-icon-button class="edit-button">
            <ha-icon icon="mdi:pencil"></ha-icon>
          </ha-icon-button>
          <ha-icon-button class="delete-button">
            <ha-icon icon="mdi:delete"></ha-icon>
          </ha-icon-button>
        </div>
      </ha-card>
    `;
    this.content = this.querySelector('.note-content');
    this.editButton = this.querySelector('.edit-button');
    this.deleteButton = this.querySelector('.delete-button');
    this.editButton.addEventListener('click', () => this.showEditPopup());
    this.deleteButton.addEventListener('click', () => this.deleteNote());
    this.style.display = 'block';
    this.style.height = '100%';
    const style = document.createElement('style');
    style.textContent = `
      .note-content {
        height: calc(100% - 48px);
        overflow-y: auto;
        padding: 16px;
        font-size: 1.2em;
        line-height: 1.4;
        word-wrap: break-word;
        white-space: pre-wrap;
      }
      .button-container {
        position: absolute;
        bottom: 8px;
        right: 8px;
        display: flex;
      }
      .edit-button, .delete-button {
        --mdc-icon-button-size: 40px;
      }
      .emoji-picker {
        position: absolute;
        bottom: 48px;
        right: 8px;
        z-index: 1000;
      }
    `;
    this.appendChild(style);
  }

  updateCard() {
    const entityId = this.config.entity;
    const state = this._hass.states[entityId];

    if (state) {
      this.content.textContent = state.state;
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
    this.querySelector('.button-container').style.display = 'none';
    const textarea = document.createElement('textarea');
    textarea.value = oldContent;
    textarea.style.width = '100%';
    textarea.style.height = 'calc(100% - 48px)';
    textarea.style.boxSizing = 'border-box';
    textarea.style.padding = '16px';
    textarea.style.border = 'none';
    textarea.style.resize = 'none';
    textarea.style.fontFamily = 'inherit';
    textarea.style.fontSize = '1.2em';
    textarea.style.lineHeight = '1.4';
    textarea.style.backgroundColor = 'transparent';
    textarea.style.color = 'var(--primary-text-color)';
    const buttonContainer = document.createElement('div');
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.bottom = '8px';
    buttonContainer.style.right = '8px';
    buttonContainer.style.display = 'flex';
    const saveButton = document.createElement('ha-icon-button');
    saveButton.innerHTML = '<ha-icon icon="mdi:check-circle" style="color: green;"></ha-icon>';

    const cancelButton = document.createElement('ha-icon-button');
    cancelButton.innerHTML = '<ha-icon icon="mdi:close-circle" style="color: red;"></ha-icon>';

    const emojiButton = document.createElement('ha-icon-button');
    emojiButton.innerHTML = '<ha-icon icon="mdi:emoticon-happy-outline"></ha-icon>';
    emojiButton.addEventListener('click', () => this.toggleEmojiPicker(textarea));

    buttonContainer.appendChild(emojiButton);
    buttonContainer.appendChild(saveButton);
    buttonContainer.appendChild(cancelButton);
    this.querySelector('ha-card').appendChild(textarea);
    this.querySelector('ha-card').appendChild(buttonContainer);
    textarea.focus();
    saveButton.addEventListener('click', () => this.saveNote(textarea.value));
    cancelButton.addEventListener('click', () => this.cancelEdit(oldContent));
  }

  toggleEmojiPicker(textarea) {
    if (this.emojiPicker) {
      this.emojiPicker.remove();
      this.emojiPicker = null;
    } else {
      this.emojiPicker = document.createElement('div');
      this.emojiPicker.classList.add('emoji-picker');
      this.emojiPicker.innerHTML = this.getEmojiList();
      this.querySelector('ha-card').appendChild(this.emojiPicker);
      this.emojiPicker.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
          textarea.value += e.target.textContent;
          this.emojiPicker.remove();
          this.emojiPicker = null;
        }
      });
    }
  }

  getEmojiList() {
    const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'];
    return emojis.map(emoji => `<span style="cursor: pointer; font-size: 1.5em; padding: 5px;">${emoji}</span>`).join('');
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
    this.cleanupEditMode();
  }

  cancelEdit(oldContent) {
    this.content.textContent = oldContent;
    this.cleanupEditMode();
  }

  deleteNote() {
    if (confirm("Are you sure you want to delete this note?")) {
      if (!this._hass) {
        console.error('Hass object is not available');
        return;
      }
      this._hass.callService('input_text', 'set_value', {
        entity_id: this.config.entity,
        value: ''
      });
      this.content.textContent = '';
    }
  }

  cleanupEditMode() {
    const textarea = this.querySelector('textarea');
    const buttonContainer = this.querySelector('ha-card > div:last-child');
    if (textarea) textarea.remove();
    if (buttonContainer) buttonContainer.remove();
    if (this.emojiPicker) this.emojiPicker.remove();
    this.content.style.display = 'block';
    this.querySelector('.button-container').style.display = 'flex';
  }

  static getStubConfig() {
    return { entity: "input_text.sticky_note" }
  }
}

customElements.define('simple-sticky-note', SimpleStickyNote);
