class CustomPowerButtonCard extends HTMLElement {  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._hass = null;
    this.config = null;
    this.holdTimer = null;
    this.holdStarted = false;
  }

  setConfig(config) {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    
    if (!config.entity) {
      throw new Error('Entity is required');
    }
    
    if (!config.bar_entity) {
      throw new Error('Bar entity is required');
    }

    this.config = {
      tap_action: { action: 'more-info' },
      show_state: true,
      show_icon: false,
      bar_min: 0,
      bar_max: 1500,
      color_good: 'var(--success-color)',
      color_bad: 'var(--error-color)',
      color_mid: 'var(--warning-color)',
      ...config
    };
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (!this._hass || !this.config) return;

    const entity = this._hass.states[this.config.entity];
    const barEntity = this._hass.states[this.config.bar_entity];
    
    if (!entity || !barEntity) {
      this.shadowRoot.innerHTML = `
        <ha-card>
          <div style="padding: 16px; color: var(--error-color);">
            Entity not found: ${!entity ? this.config.entity : this.config.bar_entity}
          </div>
        </ha-card>
      `;
      return;
    }

    const barValue = parseFloat(barEntity.state || 0);
    const percentage = Math.max(0, Math.min(100, 
      ((barValue - this.config.bar_min) / (this.config.bar_max - this.config.bar_min)) * 100
    ));

    let barColor;
    if (percentage <= 33) {
      barColor = this.config.color_good;
    } else if (percentage <= 66) {
      barColor = this.config.color_mid;
    } else {
      barColor = this.config.color_bad;
    }

    const isOn = entity.state === 'on';
    const unit = barEntity.attributes?.unit_of_measurement || '';

    this.shadowRoot.innerHTML = `      <style>
        ha-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .card-content {
          position: relative;
          padding: 12px;
          border-radius: 12px;
          background: ${isOn ? 'var(--card-background-color)' : 'var(--disabled-text-color)'};
          opacity: ${isOn ? '1' : '0.6'};
          min-height: 42px;
        }
          .name {
          font-size: 14px;
          font-weight: 500;
          color: ${isOn ? 'var(--primary-text-color)' : 'var(--secondary-text-color)'};
          margin-bottom: 2px;
          line-height: 1.2;
        }
        
        .state {
          font-size: 12px;
          position: absolute;
          right: 12px;
          top: 12px;
          color: ${isOn ? 'var(--primary-text-color)' : 'var(--secondary-text-color)'};
        }
        
        .bar {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 18px;
          width: 100%;
          background: linear-gradient(to right, 
            ${barColor} 0%, 
            ${barColor} ${percentage}%, 
            var(--disabled-text-color) ${percentage}%, 
            var(--disabled-text-color) 100%);
          border-radius: 0 0 12px 12px;
          opacity: ${isOn ? '1' : '0.3'};
        }
        
        .bar-label {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          height: 18px;
          line-height: 18px;
          font-size: 11px;
          font-weight: bold;
          color: ${isOn ? 'white' : 'var(--secondary-text-color)'};
          text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
          pointer-events: none;
        }
      </style>
      
      <ha-card>
        <div class="card-content">
          <div class="name">
            ${this.config.name || entity.attributes.friendly_name}
          </div>
          
          ${this.config.show_state ? `
            <div class="state">
              ${entity.state}
            </div>
          ` : ''}
          
          <div class="bar"></div>
          
          <div class="bar-label">
            ${Math.trunc(barValue)}${unit}
          </div>
        </div>
      </ha-card>
    `;    // Add click and hold handlers
    const card = this.shadowRoot.querySelector('ha-card');
    
    // Handle regular click
    card.addEventListener('click', (e) => {
      if (!this.holdStarted) {
        this.handleTap();
      }
    });

    // Handle hold start (mousedown/touchstart)
    const handleHoldStart = (e) => {
      this.holdStarted = false;
      this.holdTimer = setTimeout(() => {
        this.holdStarted = true;
        this.handleHold();
      }, 500); // 500ms hold time
    };

    // Handle hold end (mouseup/touchend/mouseleave)
    const handleHoldEnd = (e) => {
      if (this.holdTimer) {
        clearTimeout(this.holdTimer);
        this.holdTimer = null;
      }
      // Reset holdStarted after a short delay to prevent click after hold
      setTimeout(() => {
        this.holdStarted = false;
      }, 50);
    };

    // Mouse events
    card.addEventListener('mousedown', handleHoldStart);
    card.addEventListener('mouseup', handleHoldEnd);
    card.addEventListener('mouseleave', handleHoldEnd);

    // Touch events
    card.addEventListener('touchstart', handleHoldStart, { passive: true });
    card.addEventListener('touchend', handleHoldEnd);
    card.addEventListener('touchcancel', handleHoldEnd);
  }
  handleHold() {
    if (!this._hass || !this.config || !this.config.bar_entity) return;
    
    // Open more-info for the bar entity (power sensor)
    const event = new Event('hass-more-info', {
      bubbles: true,
      composed: true,
    });
    event.detail = {
      entityId: this.config.bar_entity,
    };
    this.dispatchEvent(event);
  }

  handleTap() {
    if (!this._hass || !this.config) return;
    
    const action = this.config.tap_action;
    
    if (action.action === 'more-info') {
      const event = new Event('hass-more-info', {
        bubbles: true,
        composed: true,
      });
      event.detail = {
        entityId: this.config.entity,
      };
      this.dispatchEvent(event);
    } else if (action.action === 'toggle') {
      this._hass.callService('homeassistant', 'toggle', {
        entity_id: this.config.entity,
      });
    } else if (action.action === 'call-service' && action.service) {
      const [domain, service] = action.service.split('.');
      this._hass.callService(domain, service, action.service_data || {});
    } else if (action.action === 'navigate' && action.navigation_path) {
      history.pushState(null, '', action.navigation_path);
      const event = new Event('location-changed', {
        bubbles: true,
        composed: true,
      });
      event.detail = { replace: false };
      window.dispatchEvent(event);
    } else if (action.action === 'url' && action.url_path) {
      window.open(action.url_path);
    }
  }

  getCardSize() {
    return 1;
  }

  static getConfigElement() {
    return document.createElement('custom-power-button-card-editor');
  }

  static getStubConfig() {
    return {
      entity: 'switch.example',
      bar_entity: 'sensor.example_power',
      name: 'Example Device',
      bar_min: 0,
      bar_max: 1500
    };
  }
}

// Register the custom element
customElements.define('custom-power-button-card', CustomPowerButtonCard);

// Register with Home Assistant
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'custom-power-button-card',
  name: 'Custom Power Button Card',
  description: 'A button card with power consumption bar display',
  preview: true,
  documentationURL: 'https://github.com/yourusername/custom-power-button-card'
});

console.info(
  `%c CUSTOM-POWER-BUTTON-CARD %c 1.0.0 `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
);
