"""Sensor platform for Simple Sticky Note."""
import logging
from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback

from .const import DOMAIN, CONF_NOTE_TEXT

_LOGGER = logging.getLogger(__name__)

async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Simple Sticky Note sensor."""
    # Use the predefined input_text entity from configuration.yaml
    input_text_entity_id = "input_text.simple_sticky_note"
    
    # Check if the entity exists
    entity_state = hass.states.get(input_text_entity_id)
    if not entity_state:
        _LOGGER.error(f"Entity {input_text_entity_id} not found. Make sure you have it defined in your configuration.yaml")
        return
    
    # Set the initial value from config if the input_text is empty
    note_text = config_entry.data.get(CONF_NOTE_TEXT, "")
    if note_text and not entity_state.state:
        try:
            await hass.services.async_call(
                "input_text",
                "set_value",
                {
                    "entity_id": input_text_entity_id,
                    "value": note_text,
                },
                blocking=True,
            )
        except Exception as e:
            _LOGGER.warning(f"Could not set initial value for {input_text_entity_id}: {e}")
    
    sensor = SimpleStickNoteSensor(hass, input_text_entity_id, config_entry.entry_id)
    async_add_entities([sensor], True)

class SimpleStickNoteSensor(SensorEntity):
    """Representation of a Simple Sticky Note sensor."""
    
    def __init__(self, hass, input_text_entity_id, config_entry_id):
        """Initialize the sensor."""
        self.hass = hass
        self._input_text_entity_id = input_text_entity_id
        self._attr_unique_id = f"simple_sticky_note_sensor_{config_entry_id}"
        self._attr_name = "Simple Sticky Note Sensor"
        self._attr_icon = "mdi:note-text"

    @property
    def state(self):
        """Return the state of the sensor."""
        entity_state = self.hass.states.get(self._input_text_entity_id)
        return entity_state.state if entity_state else None

    @property
    def extra_state_attributes(self):
        """Return extra state attributes."""
        return {
            "input_text_entity": self._input_text_entity_id,
        }

    async def async_update(self) -> None:
        """Fetch new state data for the sensor."""
        pass
