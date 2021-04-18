import { h, render, Component } from 'preact';

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <form>
          <input type="text" />
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

render(<App />, document.body);