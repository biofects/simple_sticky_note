# Simple Sticky Note Integration for Home Assistant

A customizable sticky note integration for Home Assistant dashboards with editable text, emoji support, and dynamic styling.

[![Sponsor Me](https://img.shields.io/badge/Sponsor%20Me-%F0%9F%92%AA-purple?style=for-the-badge)](https://github.com/sponsors/biofects?frequency=recurring&sponsor=biofects)
[![Version](https://img.shields.io/badge/version-3.1.0-blue.svg)](https://github.com/biofects/simple_sticky_note/releases)
[![HACS](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
 
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

#### Method 1: Adding as a Custom Repository

1. Ensure you have [HACS](https://hacs.xyz/) installed in your Home Assistant instance.
2. Go to HACS → Integrations → ⋮ (three dots menu) → Custom repositories
3. Add repository URL: `https://github.com/biofects/simple_sticky_note`
4. Select category: "Integration"
5. Click "Add" → Find "Simple Sticky Note" → Install
6. **Restart Home Assistant**

#### Method 2: Direct HACS Installation (when available in default HACS)
1. Go to HACS → Integrations
2. Click "+ Explore & Download Repositories"
3. Search for "Simple Sticky Note"
4. Click Install → **Restart Home Assistant**

### Manual Installation

1. Download the [latest release](https://github.com/biofects/simple_sticky_note/releases/latest)
2. Extract and copy the `custom_components/simple_sticky_note` folder to your `config/custom_components/` directory
3. Copy the `www` folder to your `config/` directory (merge with existing www folder)
4. **Restart Home Assistant**

## Quick Setup Guide

### Step 1: Create Input Text Entity (Required)
Add this to your `configuration.yaml` file:

```yaml
input_text:
  simple_sticky_note:
    name: Simple Sticky Note
    max: 250
    initial: "Write your note here"
```

**Restart Home Assistant** after adding this.

### Step 2: Add the Integration
After restart:
1. Go to **Settings** → **Devices & Services**
2. Click **"+ Add Integration"**
3. Search for **"Simple Sticky Note"**
4. Follow the setup wizard to configure your initial note text

### Step 3: Add the Frontend Resource (if needed)
The card resource should be automatically available after installing via HACS. If you encounter issues:

#### Method A: YAML Mode
Add to your `configuration.yaml`:

```yaml
lovelace:
  mode: yaml
  resources:
    - url: /community/simple-sticky-note/simple-sticky-note-card.js
      type: module
```

#### Method B: UI Mode
1. Go to **Settings** → **Dashboards** → **⋮** → **Resources**
2. Click **"+ Add Resource"**
3. URL: `/community/simple-sticky-note/simple-sticky-note-card.js`
4. Resource type: **JavaScript Module**
5. Click **Create**

### Step 4: Add Your First Sticky Note
1. Edit your dashboard
2. Add a new card with this configuration:

```yaml
type: custom:simple-sticky-note
entity: input_text.simple_sticky_note
title: "My Sticky Note"
```

**That's it!** Your sticky note card should now be working.

## Configuration Options

### Basic Card Configuration

```yaml
type: custom:simple-sticky-note
entity: input_text.simple_sticky_note
title: "My Note"  # Optional title
```

### Advanced Configuration

```yaml
type: custom:simple-sticky-note
entity: input_text.simple_sticky_note
title: "Shopping List"

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
├── custom_components/
│   └── simple_sticky_note/
│       ├── __init__.py
│       ├── sensor.py
│       ├── config_flow.py
│       ├── const.py
│       ├── manifest.json
│       └── translations/
│           └── en.json
├── www/
│   └── community/
│       └── simple-sticky-note/
│           └── simple-sticky-note-card.js
├── images/
├── hacs.json
└── README.md
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

### Version 3.1.0 (Latest)
- 🔧 **Fixed file structure** for proper HACS and Home Assistant compatibility
- 📁 **Moved frontend resources** to correct `www/community/simple-sticky-note/` location
- 🏷️ **Renamed card file** to `simple-sticky-note-card.js` for consistency
- 📚 **Updated installation instructions** with clearer step-by-step guide
- 🧹 **Cleaned up code** and removed unnecessary static path registration
- ✅ **Improved HACS integration** support
- ⚠️ **Known limitation**: Requires manual `input_text` entity creation (to be improved in future version)

### Version 3.0.0
- ➕ **Added full Home Assistant integration** with config flow
- 🎨 **Improved card functionality** with emoji picker
- 🛡️ **Better error handling** and user experience
- 🔄 **Updated for Home Assistant 2025.1.3** compatibility

### Planned for Next Version
- 🚀 **Automatic entity creation** - Remove requirement for manual `input_text` setup
- 🔧 **Improved integration** with proper entity management
