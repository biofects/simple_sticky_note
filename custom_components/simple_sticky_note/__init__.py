from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.typing import ConfigType
from homeassistant.const import Platform
from homeassistant.helpers import config_validation as cv
from .const import DOMAIN

PLATFORMS: list[Platform] = [Platform.SENSOR]

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)

async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Set up the Simple Sticky Note component."""
    # Register the static path for your JavaScript file
    hass.http.register_static_path(
        f"/custom_components/{DOMAIN}/js/sticky_note_card.js",
        hass.config.path(f"custom_components/{DOMAIN}/js/sticky_note_card.js"),
        True
    )

    # Add the resource to Lovelace
    resource_url = f"/custom_components/{DOMAIN}/js/sticky_note_card.js"
    if not any(resource["url"] == resource_url for resource in hass.data["lovelace"]["resources"].async_items()):
        await hass.data["lovelace"]["resources"].async_create_item({"res_type": "module", "url": resource_url})

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
