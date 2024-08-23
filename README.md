# Simple Sticky Note Card for Home Assistant

A customizable sticky note card for Home Assistant dashboards.

## Features

- Displays a customizable sticky note on your Home Assistant dashboard
- Editable text with dynamic font sizing
- Compatible with card-mod for additional styling
- HACS compatible for easy installation

## Installation

### HACS (Recommended)

1. Make sure you have [HACS](https://hacs.xyz/) installed in your Home Assistant instance.
2. In the HACS panel, go to "Frontend" and click the "+ Explore & Download Repositories" button.
3. Search for "Simple Sticky Note Card" and install it.
4. Restart Home Assistant.

### Manual Installation

1. Download the `sticky_note_card.js` file from the latest release.
2. Copy the file to your `config/www` directory.
3. Add the following to your `configuration.yaml`:

```yaml
frontend:
  extra_module_url:
    - /local/sticky_note_card.js
```
Restart Home Assistant.

### Configuration
Input Text Entity
First, you need to create an input_text entity to store the note content. Add the following to your configuration.yaml:
yaml
Copy
```
input_text:
  sticky_note:
    name: Sticky Note
    max: 255
```
## Lovelace Configuration
Add the following to your Lovelace configuration:

Copytype: 
```
custom:simple-sticky-note
entity: input_text.sticky_note
card_mod:
  style: |
    ha-card {
      --ha-card-background: #ffff88;
      color: Black;
      height: 300px;
      font-family: cursive;
    }
```
You can adjust the card-mod styling to fit your preferences.
Usage

The sticky note will display the content of the input_text.sticky_note entity.
Click the "Edit" button at the bottom of the card to modify the note content.
The font size will automatically adjust based on the amount of text.
Click "Save" to update the note or "Cancel" to discard changes.

Customization
You can customize the appearance of the sticky note using card-mod. Adjust the card_mod section in the Lovelace configuration to change colors, dimensions, or fonts.
Support
For bugs or feature requests, please open an issue on the GitHub repository.
License
This project is licensed under the MIT License.
