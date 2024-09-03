"""Sensor platform for Simple Sticky Note."""
from homeassistant.components.sensor import SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.components.input_text import DOMAIN as INPUT_TEXT_DOMAIN
from .const import DOMAIN, CONF_NOTE_TEXT

async def async_setup_entry(
    hass: HomeAssistant,
    config_entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up the Simple Sticky Note sensor."""
    note_text = config_entry.data[CONF_NOTE_TEXT]
    
    # Create an input_text entity for persistent storage
    input_text_entity_id = f"input_text.sticky_note_{config_entry.entry_id}"
    await hass.services.async_call(
        INPUT_TEXT_DOMAIN,
        "set_value",
        {"entity_id": input_text_entity_id, "value": note_text},
    )
    
    async_add_entities([SimpleStickNoteSensor(hass, input_text_entity_id)], True)

class SimpleStickNoteSensor(SensorEntity):
    """Representation of a Simple Sticky Note sensor."""
    def __init__(self, hass, input_text_entity_id):
        """Initialize the sensor."""
        self.hass = hass
        self._input_text_entity_id = input_text_entity_id
        self._attr_unique_id = f"simple_sticky_note_{input_text_entity_id}"
        self._attr_name = "Simple Sticky Note"

    @property
    def state(self):
        """Return the state of the sensor."""
        entity_state = self.hass.states.get(self._input_text_entity_id)
        return entity_state.state if entity_state else None

    async def async_update(self) -> None:
        """Fetch new state data for the sensor."""
        # The state is updated automatically when the input_text entity changes
        pass
