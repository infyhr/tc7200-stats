// Includes
const ipc        = require('electron').ipcRenderer;
const mainWindow = require('electron').remote.mainWindow;
const http = require('http');

let connectionData;

// Receive connection data
ipc.on('connectionInit', (event, message) => {
    connectionData = JSON.parse(message);

    console.log('wow it works: ');
    console.log(connectionData);
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/*
This will be called periodically to load new stats, so called short-polling
Must be exported because we'd like to access it outside, async events could have also been used
good read: http://electron.rocks/different-ways-to-communicate-between-main-and-renderer-process/
*/
//exports.getData = () => {
exports.getData = function(callback) {
    data = [123]; // Will hold all pairs

    //The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
    var auth = 'Basic ' + new Buffer(':admin').toString('base64');
    var options = {
        host: '192.168.0.1',
        path: '/RgConnect.asp',
        port: '80',
        headers: {'Authorization': auth}
    };

    res = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log('end!!!');
            data = [
                [
                getRandomArbitrary(20, 40),
                40.8,
                12.5,
                41.5,
                38.7,
                37.1
                ],
                [
                43.0,
                43.0
                ]
            ]
            //console.log(str);*/
            callback(data);
        });

        response.on('error', function(e) {
            console.log(e);
        });
    }
    http.request(options, res).end();

    //return data;
}