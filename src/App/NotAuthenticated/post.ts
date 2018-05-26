export default function(url: string, payload: any) {
    let conf = {
        method: 'POST',
        body:  JSON.stringify( payload ) ,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    };
    let myRequest = new Request(url, conf);

    return fetch (myRequest, conf)
    .then((res) => { 
        return res.json(); 
    });
}