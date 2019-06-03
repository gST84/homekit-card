

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
        
       
        <div class="container" >
        <div class="card-title" >${this.config.title}</div><br>
    
          <div class="homekit-card"  >
        ${this.config.entities.map(ent => {
            const stateObj = this.hass.states[ent.entity];
            var type = ent.entity.split('.')[0];
            if(type == "light"){
            return stateObj
              ? cardTools.LitHtml`
              
                  <homekit-button  
                    class=" ${stateObj.state === "off" ? 'button': 'button button-on'}" 
                    @click="${ev => this._toggle(stateObj, ent.service)}" 
                   
                    
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
                    <ha-icon icon="${stateObj.attributes.icon || ent.icon || 'mdi:lightbulb'}" class=" ${ent.spin && stateObj.state === "on" ? 'spin': ""}"/>
                  </span>
                  </homekit-button
                `
              : html`
                  <div class="not-found">Entity ${ent} not found.</div>
                `;

        }



        if(type == "climate"){
          return stateObj
            ? cardTools.LitHtml`
            
                <homekit-button class="button button-on" >
                
                <span class=" ${stateObj.state === "off" ? 'name': 'name name-on'}" >
                ${ent.name || stateObj.attributes.friendly_name}
                </span>
                <span class="circle"> </span> 
                <span class="temp"> ${Math.round(stateObj.attributes.current_temperature)}°</span>
                <span class=" ${stateObj.state === "off" ? 'state': 'state state-on'}">
                ${stateObj.state}
                  </span>
                  <span class=" ${stateObj.state === "off" ? 'value': 'value value-on'}">
                  ${stateObj.attributes.temperature}°
                  </span>
                  
                </homekit-button
              `
            : html`
                <div class="not-found">Entity ${ent} not found.</div>
              `;

      }
      if(type == "cover"){
        return stateObj
          ? cardTools.LitHtml`
            
              <homekit-button  
                class=" ${stateObj.state === "off" ? 'button': 'button button-on'}" 
                @click="${ev => this._toggleCover(stateObj)}" 
               
                
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
              
              <span class=" icon black">
                <ha-icon icon="${ent.icon || stateObj.state === "open" ? 'mdi:window-open': 'mdi:window-closed'}" class=" ${ent.spin && stateObj.state === "on" ? 'spin': ""}"/>
              </span>
              </homekit-button
            `
          : html`
              <div class="not-found">Entity ${ent} not found.</div>
            `;

    }
    if(type == "sensor"){
      console.log(stateObj)
      return stateObj
        ? cardTools.LitHtml`
        
            <homekit-button  
              class=" button button-on" 
              @click="${ev => this._toggle(stateObj, ent.service)}" 
             >
            
              <span class=" name name-on" >
              ${ent.name || stateObj.attributes.friendly_name}
              </span>

              <span class=" state state-on">
              ${stateObj.state} ${stateObj.attributes.unit_of_measurement}
              </span>
          
              <span class="icon icon-on" style="color: ${ent.color || 'black'};" >
                <ha-icon icon="${stateObj.attributes.icon || ent.icon || 'mdi:lightbulb'}" class=" ${ent.spin && stateObj.state === "on" ? 'spin': ""}"/>
              </span>

            </homekit-button
          `
        : html`
            <div class="not-found">Entity ${ent} not found.</div>
          `;

  }
          })}
          </div></div>
        `;
        
      }
    
      getCardSize() {
            return this.config.entities.length + 1;
        }
        _toggle(state, service ) {
            this.hass.callService("homeassistant", service || "toggle", {
              entity_id: state.entity_id
            });
          }
          _toggleCover(state ) {
            
            if(state.state === "open"){
              console.log(state.entity_id)
              this.hass.callService("cover",  "close_cover", {
                entity_id: state.entity_id
                
              });

            }
            if(state.state === "closed"){
              this.hass.callService("cover",  "open_cover", {
                entity_id: state.entity_id
              });

            }
            
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
                white-space: nowrap; 
                overflow: hidden;
                text-overflow: ellipsis;
                width: 100px;
              }
              .name.name-on{
                color: rgba(0,0,0, 1); 
              }
              .state{
                position: relative;
                top: 90px;
                margin-left: 10px;
                font-family: Arial;
                font-size: 18px; 
                color: rgba(0,0,0, 0.4); 
                text-transform: capitalize;
                float: left;
              }
              .value{
                  visibility: hidden;
              }
              .value-on{
                visibility: visible;
                position: relative;
                top: 95px;
                margin-left: 5px;
                font-family: Arial;
                font-size: 12px; 
                color: rgba(255,0,0, 1); 
                text-transform: capitalize;
                float: left;
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
              .icon.black{
                color:rgba(0,0,0, 1);     
              }
              ha-icon{
                height: 100%;
                width: 100%;
              }
              .circle{
                position: absolute;
                top: 17px;
                left: 10px; 
                height: 35px;
                width: 35px;  
                background-color: rgba(0,255,0, 1);
                border-radius: 20px;   
              }
              .temp{
                position: absolute;
                top: 26px;
                left: 19px; 
                font-family: Arial;
                font-size: 14px;
                font-weight: bold;
                color:white;
              }
              .not-found {
                cursor: pointer;
                float: left;
                width: 116px;
                height: 116px;
                background-color: rgba(255,0,0, 1);
                border-radius: 12px;
                box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.3);
                margin: 3px;
                position: relative;
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
