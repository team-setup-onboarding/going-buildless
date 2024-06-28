import {html, css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

class DietListItem extends LitElement {
  static properties = {
    circleSize: {
      type: Number,
      attribute: 'circle-size'},
    colour: {
      type: Number,
      attribute: 'colour-index'},
  };

  static shadowRootOptions = { ...LitElement.shadowRootOptions, mode: "closed" };
  
  static styles = css`
      p {
        display: grid;
        grid-template-columns: 1fr 5fr 4fr 1fr;
        margin: 5% 10%;
      }
      svg {
        display: inline;
        height: 20px;
      }
      .grey-rect {
        border-radius: 10px;
        background-color: #eeeeee;
        height: 100%;
        padding: 2px 10px;
        margin: 0 10px;
      }
    `;

  constructor() {
    super();
    this.circleSize = 5;
    this.colour = 1;
    this.red = "#c61a10";
    this.darkgreen = "#209900";
    this.lightgreen = "#60df4c";
    this.amber = "#fac828";
    this.dietcolours = [this.red, this.amber, this.darkgreen, this.lightgreen];
  }

  getColour() {
    return this.dietcolours[this.colour % 4];
  }

  render() {
    return html`
      <p>
        <svg viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="${this.circleSize}" style="fill: ${this.getColour()}" />
        </svg>
        <slot name="description"></slot>
        <span class="grey-rect">
          <slot name="quantifier"></slot>
        </span>
        <button @click="${() => (this.colour = this.colour + 1)}">&gt;</button>
      </p>
    `;
  }
}
customElements.define('diet-list-item', DietListItem);

