import { createElement, render, Component } from 'preact';
let h = createElement;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      h('div', {}, "Hello from Preact!")
    )
  }
}

render(h(App), document.querySelector('#root'));