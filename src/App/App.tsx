import * as React from 'react';

import NotAuthenticated from './NotAuthenticated';
import Authenticated from './Authenticated';

import './App.css';

interface IAppState {
    isAuthenticated: boolean;
}

class App extends React.Component<any, IAppState> {
    constructor(props: any, context: IAppState) {
        super(props, context);

        let sessionKey  = String(process.env.REACT_APP_AUTH_SESSION_KEY);

        if (window.sessionStorage.getItem(sessionKey) !== 'null'
            && window.sessionStorage.getItem(sessionKey) !== 'undefined') {
                this.state = {
                    isAuthenticated: true
                };
        } 
        else {
            this.state = {
                isAuthenticated: false
            };
        }  
    }

    render() {
        return (
            <div className="App">
                {this.state.isAuthenticated ?
                     <Authenticated/> : <NotAuthenticated/>}
            </div>
        );
    }
}

export default App;
