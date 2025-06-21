A custom Home Assistant Lovelace card that displays a device button with integrated power consumption bar.

## Features

- Toggle device on/off with button functionality
- Visual power consumption bar with color coding
- Configurable power thresholds and colors
- Responsive design with hover effects
- Support for different units of measurement

## Configuration

```yaml
type: custom:custom-power-button-card
entity: switch.your_device
bar_entity: sensor.your_device_power
name: "Device Name"
bar_min: 0
bar_max: 1500
```

For full configuration options, see the README.md file.
