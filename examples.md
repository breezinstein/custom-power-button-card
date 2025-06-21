# Example Configurations for Custom Power Button Card

## Basic Configuration
```yaml
type: custom:custom-power-button-card
entity: switch.living_room_tv
bar_entity: sensor.living_room_tv_power
name: "Living Room TV"
```

## Advanced Configuration
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
show_state: true
tap_action:
  action: toggle
```

## Multiple Cards Example
```yaml
type: horizontal-stack
cards:
  - type: custom:custom-power-button-card
    entity: switch.dishwasher
    bar_entity: sensor.dishwasher_power
    name: "Dishwasher"
    bar_max: 1800
    
  - type: custom:custom-power-button-card
    entity: switch.dryer
    bar_entity: sensor.dryer_power
    name: "Dryer"
    bar_max: 3000
    color_good: "var(--blue-color)"
    color_mid: "var(--orange-color)"
    color_bad: "var(--red-color)"
```

## Using with Custom Colors
```yaml
type: custom:custom-power-button-card
entity: switch.air_conditioner
bar_entity: sensor.air_conditioner_power
name: "Air Conditioner"
bar_min: 0
bar_max: 2500
color_good: "rgba(76, 175, 80, 0.8)"
color_mid: "rgba(255, 152, 0, 0.8)"
color_bad: "rgba(244, 67, 54, 0.8)"
show_state: false
tap_action:
  action: more-info
```
