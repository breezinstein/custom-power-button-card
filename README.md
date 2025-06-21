# Custom Power Button Card

A custom Home Assistant Lovelace card that displays a device button with integrated power consumption bar.

## Features

- Toggle device on/off with button functionality
- Visual power consumption bar with color coding
- Configurable power thresholds and colors
- Responsive design with hover effects
- Support for different units of measurement

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Go to "Frontend" section
3. Click the "+" button and search for "Custom Power Button Card"
4. Install the card
5. Add the following to your Lovelace resources or let HACS handle it automatically

### Manual Installation

1. Download `custom-power-button-card.js` from the latest release
2. Copy it to `config/www/community/custom-power-button-card/`
3. Add the following to your Lovelace resources:

```yaml
resources:
  - url: /hacsfiles/custom-power-button-card/custom-power-button-card.js
    type: module
```

## Configuration

```yaml
type: custom:custom-power-button-card
entity: switch.your_device
bar_entity: sensor.your_device_power
name: "Device Name"
bar_min: 0
bar_max: 1500
color_good: "var(--success-color)"
color_mid: "var(--warning-color)"
color_bad: "var(--error-color)"
show_state: true
tap_action:
  action: toggle
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `entity` | string | **Required** | Entity ID of the switch/device |
| `bar_entity` | string | **Required** | Entity ID of the power sensor |
| `name` | string | Entity friendly name | Display name for the card |
| `bar_min` | number | `0` | Minimum value for power bar |
| `bar_max` | number | `1500` | Maximum value for power bar |
| `color_good` | string | `var(--success-color)` | Color for low power consumption |
| `color_mid` | string | `var(--warning-color)` | Color for medium power consumption |
| `color_bad` | string | `var(--error-color)` | Color for high power consumption |
| `show_state` | boolean | `true` | Show entity state text |
| `tap_action` | object | `{action: 'more-info'}` | Action when card is tapped |

### Power Bar Color Zones

- **Good (Green)**: 0-33% of max power
- **Medium (Yellow)**: 34-66% of max power  
- **Bad (Red)**: 67-100% of max power

## Example Configurations

### Basic Configuration
```yaml
type: custom:custom-power-button-card
entity: switch.living_room_tv
bar_entity: sensor.living_room_tv_power
name: "Living Room TV"
```

### Advanced Configuration
```yaml
type: custom:custom-power-button-card
entity: switch.washing_machine
bar_entity: sensor.washing_machine_power
name: "Washing Machine"
bar_min: 0
bar_max: 2000
color_good: "#4CAF50"
color_mid: "#FF9800"
color_bad: "#F44336"
tap_action:
  action: toggle
```

## Troubleshooting

### Card Not Showing
- Ensure the resource is properly added to your Lovelace configuration
- Check browser console for JavaScript errors
- Verify both entities exist and are accessible

### Power Bar Not Updating
- Confirm the `bar_entity` is a valid sensor with numeric states
- Check that the sensor updates regularly

## Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Development mode: `npm run dev`

## License

MIT License
