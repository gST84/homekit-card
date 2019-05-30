

import {
    LitElement,
    html,
    css
  } from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

customElements.whenDefined('card-tools').then(() => {
    var cardTools = customElements.get('card-tools');
    // YOUR CODE GOES IN HERE
    // /@click="${ev => this._toggle(stateObj)}"
  //@ha-hold="${cardTools.popUp("title" , "message", false)}"
   
    class MyPlugin extends cardTools.LitElement {
        static get properties() {
            return {
              hass: {},
              config: {}
            };
          }
        setConfig(config) {
            if (!config.entities) {
              throw new Error("You need to define entities");
            }
            this.config = config;
          }
  
      render() {
        return cardTools.LitHtml`
        ${ console.log(cardTools)}
       
        <div class="container" >
        <div class="card-title" >${this.config.title}</div><br>
    
          <div class="homekit-card"  >
        ${this.config.entities.map(ent => {
            const stateObj = this.hass.states[ent.entity];
            
  
            return stateObj
              ? cardTools.LitHtml`
              
                  <homekit-button  
                    class=" ${stateObj.state === "off" ? 'button': 'button button-on'}" 
                    @click="${ev => this._toggle(stateObj)}" 
                    @ha-hold="${cardTools.popUp("title" , "message", false)}
                    
                   >
                  
                  <span class=" ${stateObj.state === "off" ? 'name': 'name name-on'}" >
                  ${ent.name || stateObj.attributes.friendly_name}
                  </span>
                  <span class=" ${stateObj.state === "off" ? 'state': 'state state-on'}">
                  ${stateObj.state} 
                  
                  </span>
                  <span class=" ${stateObj.state === "off" ? 'value': 'value value-on'}">
                  ${Math.round(stateObj.attributes.brightness/2.55) || "" }${stateObj.attributes.brightness ? "%" : ""}
                  </span>
                  
                  <span class=" ${stateObj.state === "off" ? 'icon': 'icon icon-on'}">
                    <ha-icon icon="${ent.icon || 'mdi:lightbulb'}" class=" ${ent.spin && stateObj.state === "on" ? 'spin': ""}"/>
                  </span>
                  </homekit-button
                `
              : html`
                  <div class="not-found">Entity ${ent} not found.</div>
                `;
          })}
          </div></div>
        `;
        
      }
      firstUpdated() {
        cardTools.longpress(this.shadowRoot.querySelector('homekit-button'));
      }
      getCardSize() {
            return this.config.entities.length + 1;
        }
        _toggle(state) {
            this.hass.callService("homeassistant", "toggle", {
              entity_id: state.entity_id
            });
          }
        
          static get styles() {
            return css`
              :host {
                
              }
              .card-title {
                  margin-bottom:-10px;
                  margin-left: 4px;
                  
                  font-size: 18px;
                  color: rgb(90,90,90);
              }
              .homekit-card{
                
                
              }
              .container {
                  float: left;
                  clear: left;
                  margin-top: 10px;
                  padding: 4px;
                  white-space: nowrap;
                  width: 100%;
              }
             
              .button {
                cursor: pointer;
                float: left;
                width: 116px;
                height: 116px;
                background-color: rgba(255,255,255, 0.5);
                border-radius: 12px;
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
                margin: 3px;
                position: relative;
              }
              .button.button-on {
                background-color: rgba(255,255,255, 1);
              }
              .name{
                position: absolute;
                top: 70px;
                left: 10px;
                font-family: Arial;
                font-size: 18px;
                font-weight: bold;
                color: rgba(0,0,0, 0.4); 
              }
              .name.name-on{
                color: rgba(0,0,0, 1); 
              }
              .state{
                position: absolute;
                top: 90px;
                left: 10px;
                font-family: Arial;
                font-size: 18px; 
                color: rgba(0,0,0, 0.4); 
                text-transform: capitalize;
              }
              .value{
                  visibility: hidden;
              }
              .value-on{
                visibility: visible;
                position: absolute;
                top: 95px;
                left: 40px;
                font-family: Arial;
                font-size: 12px; 
                color: rgba(255,0,0, 1); 
                text-transform: capitalize;
              }
              .state.state-on{
                color: rgba(0,0,0, 1); 
              }
              .icon{
                position: absolute;
                top: 15px;
                left: 5px; 
                height: 40px;
                width: 40px;  
                color: rgba(0,0,0, 0.3);     
              }
              .icon.icon-on{
                color: #f7d959;     
              }
              ha-icon{
                height: 100%;
                width: 100%;
              }
              .not-found {
                background-color: yellow;
                font-family: sans-serif;
                font-size: 20px;
                padding: 8px;
              }
              .spin {
                
                animation-name: spin;
                animation-duration: 1000ms;
                animation-iteration-count: infinite;
                animation-timing-function: linear; 
              }
              @keyframes spin {
                from {
                    transform:rotate(0deg);
                }
                to {
                    transform:rotate(360deg);
                }
            }
        
            `;
          }
    }
  
    customElements.define("homekit-card-beta", MyPlugin);
  }); // END OF .then(() => {
  
  setTimeout(() => {
    if(customElements.get('card-tools')) return;
    customElements.define('homekit-card-beta', class extends HTMLElement{
      setConfig() { throw new Error("Can't find card-tools. See https://github.com/thomasloven/lovelace-card-tools");}
    });
  }, 2000);
