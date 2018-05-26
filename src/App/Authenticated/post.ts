let post = function(url: string) {
    let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
    let sessionId: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));

    return fetch(url, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'authorization': sessionId.token
        }),
    })
    .then((res) => { 
        return res.json(); 
    });
};

let postWithPayload = function(url: string, payload: any) {
    let sessionKey = String(process.env.REACT_APP_AUTH_SESSION_KEY);
    let sessionId: any = JSON.parse(String(window.sessionStorage.getItem(sessionKey)));

    let conf = {
        method: 'POST',
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

export {post, postWithPayload};