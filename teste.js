const http = require('http');

let url = 'http://localhost:8080/customers/v1/providers/occupational?type=ODONTO'

async function get(options) {
    return new Promise((resolve, reject) => {
        let data = '';

       

        const req = http.request(options, res => {

            console.log(`statusCode: ${res.statusCode}`);

            res.on('data', d => {
                data += d;
                resolve(data);

            });
        });

        req.on('error', error => {
            console.error(error);
            reject(error)
        });

        req.write(data);
        req.end();
    });


};

async function getPerson() {
 //http://localhost:8080/customers/v1/providers/occupational?type=ODONTO
 const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/customers/v1/providers/occupational?type=ODONTO',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
};
    var v = await get(options);
    console.log('sss');
    console.log(v);
}
getPerson()


