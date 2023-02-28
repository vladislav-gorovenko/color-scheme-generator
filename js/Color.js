class Color {
  constructor(data) {
    Object.assign(this, data);
  }

  generateUrl() {
    const { color, mode, count } = this;
    return `https://www.thecolorapi.com/scheme?hex=${color}&mode=${mode}&count=${count}`;
    // return `./dummy/some.json`;
  }

  async fetchData() {
    const url = this.generateUrl();
    const response = await fetch(url, { method: "GET" });
    return response.json();
  }

  updateColor(color) {
    this.color = color;
  }

  updateMode(mode) {
    this.mode = mode;
  }

  updateCount(count) {
    this.count = count;
  }
}

export default Color;
