# __init__.py

import logging
import os
from homeassistant.core import HomeAssistant
from homeassistant.config_entries import ConfigEntry
from homeassistant.helpers.typing import ConfigType
from homeassistant.components.frontend import async_register_built_in_panel

DOMAIN = "simple_sticky_note"
_LOGGER = logging.getLogger(__name__)

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Simple Sticky Note component."""
    # Register the module as a frontend resource
    hass.http.register_static_path(
        f"/{DOMAIN}", 
        os.path.join(os.path.dirname(__file__), "www"),
        True
    )
    
    # Register the resource with frontend
    hass.components.frontend.async_register_built_in_panel(
        component_name="custom",
        sidebar_title="Simple Sticky Note",
        sidebar_icon="mdi:note-text",
        frontend_url_path="simple-sticky-note",
        require_admin=False,
        config={"_panel_custom": {
            "name": "simple-sticky-note",
            "module_url": f"/{DOMAIN}/simple-sticky-note.js",
            "trust_external": False
        }}
    )

    hass.data[DOMAIN] = {}
    return True

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Simple Sticky Note from a config entry."""
    return True

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    return True
