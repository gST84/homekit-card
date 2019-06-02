# homekit-card
Homekit style Home Assistant card

title: Living
type: 'custom:homekit-card-beta'
entities:
  - entity: light.living_spots
    name: Spots

  - entity: climate.downstairs
    name: Thermostaat
    
  - entity: sensor.downstairs_thermostat_humidity
    name: Vochtigheid
    icon: 'mdi:water-percent'
    color: lightblue

  - entity: cover.terras_screen
    name: Terras
