import * as React from 'react';

interface IProfilState {
    lastname: string;
    firstname: string;
    avatar: string;
    email: string;
    isAccountValid: boolean;
}

class Profil extends React.Component<any, IProfilState> {
    constructor(props: any, context: IProfilState) {
        super(props, context);
        let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
        let session: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));
        let user: any = session.user;
        if (user.isAccountValidate === null)
            user.isAccountValidate = false;

        this.state = {
            lastname: user.lastname,
            firstname: user.firstname,
            avatar: user.avatar,
            email: user.email,
            isAccountValid: user.isAccountValidate 
        };
    }
    render() {
        return (
            <div>
                Avatar ici sinon une photo par default<br/>
                Last Name : {this.state.lastname} <br/>
                First Name : {this.state.firstname} <br/>
                Email: {this.state.email} <br/>
                Compte Valider: {this.state.isAccountValid ? 'Yes' : 'No'} <br/>

                Ajouter le reset password
            </div>
            );
    }
}

export default Profil;