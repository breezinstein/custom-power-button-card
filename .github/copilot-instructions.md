<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a Home Assistant custom card project for HACS (Home Assistant Community Store).

## Project Guidelines

- This project creates a custom Lovelace card for Home Assistant
- The main component is a power button card with an integrated consumption bar
- Follow Home Assistant custom card development best practices
- Use modern JavaScript (ES6+) with custom elements
- Ensure HACS compliance with proper metadata files
- The card should be responsive and follow Home Assistant's design patterns
- Use CSS custom properties for theming compatibility
- Handle entity state changes reactively
- Provide clear error messages for missing entities or configuration issues

## Key Files

- `src/custom-power-button-card.js` - Main card implementation
- `custom-power-button-card.js` - Built output for distribution (root level for HACS compliance)
- `hacs.json` - HACS metadata
- `info.md` - HACS description
- `rollup.config.js` - Build configuration

## Development Notes

- Build system uses Rollup for bundling
- Target ES2017+ for modern Home Assistant compatibility
- Follow semantic versioning
- Test with multiple Home Assistant versions when possible
