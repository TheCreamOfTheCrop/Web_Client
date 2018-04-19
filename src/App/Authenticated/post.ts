export default function(url: string, payload: any) {
    let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
    let sessionId: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));

    let conf = {
        method: 'POST',
        body:  JSON.stringify( payload ) ,
        headers: {
            'mode': 'cors',
            'Accept': 'application/json, text/plain, */*',
            'authorization': sessionId.token
        },
    };
    let myRequest = new Request(url, conf);

    return fetch (myRequest, conf)
            .then((res) => { 
                return res.json(); 
            });
}