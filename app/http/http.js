const http = require('http');

async function callApi(options) {

    console.log('*** callApi *** ')
    console.log(options)
    console.log('*** callApi *** ')

    return new Promise((resolve, reject) => {
        let data = '';

        const req = http.request(options, res => {

            console.log(`statusCode: ${res.statusCode}`);
            res.on('data', d => {
                data += d;
               let response={
                    statusCode:res.statusCode,
                     data:data
                }
                console.log(`response: ${data}`);

                resolve(response);

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


module.exports={callApi}