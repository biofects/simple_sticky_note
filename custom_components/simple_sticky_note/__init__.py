"""The Simple Sticky Note integration."""
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType
from .const import DOMAIN

PLATFORMS: list[str] = ["sensor"]

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Simple Sticky Note component."""
    # This registers your JavaScript file to be served by Home Assistant
    hass.http.register_static_path(
        f"/custom_components/{DOMAIN}/js/sticky_note_card.js",
        hass.config.path(f"custom_components/{DOMAIN}/js/sticky_note_card.js"),
        True
    )

    # Register as a Lovelace resource instead of a panel
    hass.components.frontend.async_register_extra_script(
        f"/custom_components/{DOMAIN}/js/sticky_note_card.js"
    )

    return True

async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Set up Simple Sticky Note from a config entry."""
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN][entry.entry_id] = entry.data
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True

async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    if unload_ok := await hass.config_entries.async_unload_platforms(entry, PLATFORMS):
        hass.data[DOMAIN].pop(entry.entry_id)
    return unload_ok
