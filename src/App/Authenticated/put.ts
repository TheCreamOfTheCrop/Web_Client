let putWithPayload = function(url: string, payload: any) {
    let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
    let sessionId: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));

    let conf = {
        method: 'PUT',
        body:  JSON.stringify( payload ) ,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'authorization': sessionId.token
        }
    };

    return fetch (url, conf)
            .then((res) => { 
                return res.json(); 
            });
};

export { putWithPayload};