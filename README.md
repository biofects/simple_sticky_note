# Simple Sticky Note Integration for Home Assistant

A customizable sticky note integration for Home Assistant dashboards with editable text, emoji support, and dynamic styling.

[![Sponsor Me](https://img.shields.io/badge/Sponsor%20Me-%F0%9F%92%AA-purple?style=for-the-badge)](https://github.com/sponsors/biofects?frequency=recurring&sponsor=biofects)
 
## Features

- Custom Lovelace card with editable sticky notes
- Emoji picker for adding expressions to your notes
- Edit mode with save/cancel functionality
- Delete confirmation for note removal
- Dynamic text display with word wrapping
- Compatible with existing `input_text` entities
- Easy setup through Home Assistant UI

---
## 💸 Donations Appreciated!
If you find this plugin useful, please consider donating. Your support is greatly appreciated!

#### GitHub Sponsor
[![Sponsor Me](https://img.shields.io/badge/Sponsor%20Me-%F0%9F%92%AA-purple?style=for-the-badge)](https://github.com/sponsors/biofects?frequency=recurring&sponsor=biofects) 

or 

#### Paypal
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TWRQVYJWC77E6)
---

### 1. Display View
![Display View](https://github.com/biofects/simple_sticky_note/raw/main/images/display-mode.png)

### 2. Edit Mode
![Edit Mode](https://github.com/biofects/simple_sticky_note/raw/main/images/edit-mode.png)

### 3. Emoji Support
![Emoji Support](https://github.com/biofects/simple_sticky_note/raw/main/images/emojis.png)


## Installation

### HACS (Recommended)

#### Adding as a Custom Repository

1. Make sure you have [HACS](https://hacs.xyz/) installed in your Home Assistant instance.
2. Go to the HACS panel, then click on the three dots in the top right corner and select "Custom repositories."
3. In the dialog that appears, paste the following URL: `https://github.com/biofects/simple_sticky_note` and select "Integration" as the category.
4. Click "Add," then navigate to the "Integrations" tab, click the "+ Explore & Download Repositories" button, and search for "Simple Sticky Note."
5. Install the integration and restart Home Assistant.

### Manual Installation

1. Download the latest release from GitHub.
2. Copy the `simple_sticky_note` folder to your `config/custom_components/` directory.
3. Restart Home Assistant.

## Configuration

### Step 1: Create Input Text Entity

First, add an `input_text` entity to your `configuration.yaml`:

```yaml
input_text:
  simple_sticky_note:
    name: Simple Sticky Note
    max: 500
    initial: ""
```

### Step 2: Configure Lovelace Resources

Add the JavaScript resource to your Lovelace configuration. Choose one method:

#### Method A: YAML Mode
If using YAML mode, add to your `configuration.yaml`:

```yaml
lovelace:
  mode: yaml
  resources:
    - url: /community/simple_sticky_note/sticky_note_card.js
      type: module
```

#### Method B: UI Mode
1. Go to Settings → Dashboards → Three dots menu → Resources
2. Click "Add Resource"
3. URL: `/community/simple_sticky_note/sticky_note_card.js`
4. Resource type: JavaScript Module

### Step 3: Set Up the Integration

1. Go to Settings → Devices & Services
2. Click "Add Integration"
3. Search for "Simple Sticky Note"
4. Follow the setup wizard to configure your initial note text

### Step 4: Add the Card to Your Dashboard

Add the following card configuration to your Lovelace dashboard:

```yaml
type: custom:simple-sticky-note
entity: input_text.simple_sticky_note
```

#### With Custom Styling (Optional)

```yaml
type: custom:simple-sticky-note
entity: input_text.simple_sticky_note
card_mod:
  style: |
    ha-card {
      --ha-card-background: #ffff88;
      color: #333;
      height: 300px;
      font-family: 'Comic Sans MS', cursive;
      box-shadow: 2px 2px 8px rgba(0,0,0,0.3);
    }
```

## Usage

- **View**: The sticky note displays the content of your `input_text.simple_sticky_note` entity
- **Edit**: Click the pencil icon to enter edit mode
- **Emoji**: Click the emoji icon while editing to add emojis to your note
- **Save**: Click the green checkmark to save your changes
- **Cancel**: Click the red X to discard changes
- **Delete**: Click the trash icon to delete the note content (with confirmation)

## Customization

### Card Styling

You can customize the appearance using `card-mod`:

```yaml
card_mod:
  style: |
    ha-card {
      --ha-card-background: #e6f3ff;  /* Light blue background */
      color: #2c3e50;                  /* Dark text */
      height: 250px;                   /* Custom height */
      font-family: 'Arial', sans-serif; /* Custom font */
      border-radius: 15px;             /* Rounded corners */
      box-shadow: 0 4px 12px rgba(0,0,0,0.15); /* Custom shadow */
    }
```

### Multiple Sticky Notes

To create multiple sticky notes, add additional `input_text` entities:

```yaml
input_text:
  sticky_note_shopping:
    name: Shopping List
    max: 500
  sticky_note_reminders:
    name: Daily Reminders  
    max: 500
  sticky_note_ideas:
    name: Project Ideas
    max: 500
```

Then use separate cards for each:

```yaml
- type: custom:simple-sticky-note
  entity: input_text.sticky_note_shopping
- type: custom:simple-sticky-note
  entity: input_text.sticky_note_reminders
- type: custom:simple-sticky-note
  entity: input_text.sticky_note_ideas
```

## Troubleshooting

### Card Not Loading
- Ensure the resource is properly added to Lovelace resources
- Check that the integration is installed and enabled
- Restart Home Assistant after installation

### Entity Not Found
- Verify the `input_text` entity exists in your `configuration.yaml`
- Check that the entity ID matches exactly in your card configuration
- Restart Home Assistant after adding the `input_text` entity

### Integration Setup Fails
- Check Home Assistant logs for specific error messages
- Ensure you're running Home Assistant 2025.1.3 or later
- Try removing and re-adding the integration

## Development

### File Structure
```
simple_sticky_note/
├── __init__.py
├── sensor.py
├── config_flow.py
├── const.py
├── manifest.json
└── www/
    └── community/
        └── simple_sticky_note/
            └── sticky_note_card.js
```

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/biofects/simple_sticky_note/issues)
- **Discussions**: [Community support and ideas](https://github.com/biofects/simple_sticky_note/discussions)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Changelog

### Version 3.0.0
- Added full Home Assistant integration with config flow
- Improved card functionality with emoji picker
- Better error handling and user experience
- Updated for Home Assistant 2025.1.3 compatibility
