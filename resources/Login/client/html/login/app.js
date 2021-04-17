const { creatElement, render, Component } = preact;
const h = creatElement;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        console.log("Ready!");
    }

    render() {
        return h('div', {}, 'Hello from Preact!');
/*             <div class="container">

            <div class="main">
    
    
                <h2>HolyV Login</h2>
                <form id="form_id" method="post" name="myform">
    
                    <input type="text" name="username" placeholder="Username" id="username" />
    
                    <input type="password" name="password" placeholder="Passwort" id="password" />
    
                    <input type="button" value="Login" id="submit" />
    
                    <p>Zum Account erstellen klicke <a href="register.html"> hier</a>!</p>
    
                </form>
    
            </div>
        </div> */
    }

}

render(h(App), document.querySelector('#render'));







