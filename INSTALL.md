# Installation Guide for Custom Power Button Card

## For HACS Users

1. **Add Repository to HACS:**
   - Go to HACS in your Home Assistant
   - Click on "Frontend"
   - Click the three dots menu and select "Custom repositories"
   - Add this repository URL
   - Select "Lovelace" as the category

2. **Install the Card:**
   - Search for "Custom Power Button Card" in HACS
   - Click "Install"
   - Restart Home Assistant

3. **Add to Lovelace:**
   ```yaml
   type: custom:custom-power-button-card
   entity: switch.your_device
   bar_entity: sensor.your_device_power
   name: "Your Device"
   ```

## Manual Installation

1. **Download the File:**
   - Download `custom-power-button-card.js` from the `dist/` folder
   - Place it in `config/www/community/custom-power-button-card/`

2. **Add Resource:**
   - Go to Settings → Dashboards → Resources
   - Add resource:
     ```
     URL: /hacsfiles/custom-power-button-card/custom-power-button-card.js
     Type: JavaScript Module
     ```

3. **Use in Dashboard:**
   - Edit your dashboard
   - Add a manual card with the YAML configuration

## Troubleshooting

### Common Issues:
- **Card not loading:** Check browser console for errors
- **Entities not found:** Verify entity IDs are correct
- **Bar not updating:** Ensure bar_entity provides numeric values

### Supported Entities:
- **Main Entity:** Any switch, light, or toggleable entity
- **Bar Entity:** Any sensor with numeric state (power, energy, etc.)

## Development Setup

For developers who want to modify this card:

```bash
# Clone the repository
git clone <your-repo-url>
cd custom-power-button-card

# Install dependencies
npm install

# Start development mode (watches for changes)
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```
