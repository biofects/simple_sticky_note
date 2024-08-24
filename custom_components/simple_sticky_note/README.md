# Simple Sticky Note Card for Home Assistant

A customizable sticky note card for Home Assistant dashboards.

## Features

- Displays a customizable sticky note on your Home Assistant dashboard
- Editable text with dynamic font sizing
- Compatible with card-mod for additional styling
- HACS compatible for easy installation

## Installation

### HACS (Recommended)

#### Adding as a Custom Repository

1. Make sure you have [HACS](https://hacs.xyz/) installed in your Home Assistant instance.
2. Go to the HACS panel, then click on the three dots in the top right corner and select "Custom repositories."
3. In the dialog that appears, paste the following URL: `https://github.com/biofects/simple_sticky_note` and select "Integration" as the category.
4. Click "Add," then navigate to the "Integrations" tab, click the "+ Explore & Download Repositories" button, and search for "Simple Sticky Note Card."
5. Install the integration and restart Home Assistant.

#### Direct Installation from HACS NOT YET


1. In the HACS panel, go to "Frontend" and click the "+ Explore & Download Repositories" button.
2. Search for "Simple Sticky Note Card" and install it.
3. Restart Home Assistant.

### Manual Installation

1. Download the `sticky_note_card.js` file from the latest release.
2. Copy the file to your `config/www` directory.
3. Add the following to your `configuration.yaml`:


Copy Code
```yaml
frontend:
  themes: !include_dir_merge_named themes
  extra_module_url:
    - /custom_components/simple_sticky_note/js/sticky_note_card.js
```
Restart Home Assistant.
Configuration
Input Text Entity
First, you need to create an input_text entity to store the note content. Add the following to your configuration.yaml:

Copy code
```yaml
input_text:
  sticky_note:
    name: Sticky Note
    max: 255
```
Lovelace Configuration
Add the following to your Lovelace configuration:


Copy code
```yaml
type: custom:simple-sticky-note
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

