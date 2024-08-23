"""Config flow for Simple Sticky Note integration."""
from typing import Any
import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResult

from .const import DOMAIN, CONF_NOTE_TEXT, DEFAULT_NOTE_TEXT

class SimpleStickNoteConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Simple Sticky Note."""

    VERSION = 1

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> FlowResult:
        """Handle the initial step."""
        if user_input is None:
            return self.async_show_form(
                step_id="user",
                data_schema=vol.Schema(
                    {
                        vol.Required(CONF_NOTE_TEXT, default=DEFAULT_NOTE_TEXT): str,
                    }
                ),
            )

        return self.async_create_entry(title="Simple Sticky Note", data=user_input)

config_entries.HANDLERS.register(DOMAIN)(SimpleStickNoteConfigFlow)
