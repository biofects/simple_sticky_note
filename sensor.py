"""Sensor platform for Simple Sticky Note."""
from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, CONF_NOTE_TEXT

async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Simple Sticky Note sensor."""
    note_text = config_entry.data[CONF_NOTE_TEXT]
    async_add_entities([SimpleStickNoteSensor(note_text)], True)

class SimpleStickNoteSensor(SensorEntity):
    """Representation of a Simple Sticky Note sensor."""

    def __init__(self, note_text):
        """Initialize the sensor."""
        self._note_text = note_text
        self._attr_unique_id = f"simple_sticky_note_{note_text[:10]}"
        self._attr_name = "Simple Sticky Note"

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._note_text

    async def async_update(self) -> None:
        """Fetch new state data for the sensor."""
        # This sensor doesn't need to fetch new data as it's set by the user
        pass
