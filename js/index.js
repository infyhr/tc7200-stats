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
Extracts data from the HTTP response and returns it, just some simple regex stuff
*/
function extractData(data) {
    // Downstream
    const re_dsChannels = /\d<\/td><td align="right">(\d{1,2})<\/td>/gi
    const re_dsSnr = /<td align="right">(\d{1,2}\.\d) dB<\/td>/gi
    const re_dsPwr = /<td align="right">(\s|-)?([1-9]{1,2}\.\d) dBmV<\/td><t/gi

    // Upstream
    const re_usChannels = /\d<\/td><td align="right">\d{1,2}<\/td>/gi
    const re_usPower = /<td align="right">?(\d{1,2}\.\d) dBmV<\/td><\//gi

    // Execute downstream regex matching
    let ds_channels = re_dsChannels.exec(data);
    let ds_snr = re_dsSnr.exec(data);
    let ds_pwr = re_dsPwr.exec(data);
    // Loop through all the results
    while(ds_snr != null) { // Will be the same for all three
        console.log(ds_channels[1]);
        console.log(ds_snr[1]);
        console.log(ds_pwr[2]);

        ds_channels = re_dsChannels.exec(data);
        ds_snr = re_dsSnr.exec(data);
        ds_pwr = re_dsPwr.exec(data);
    }
}

/*
This will be called periodically to load new stats, so called short-polling
Must be exported because we'd like to access it outside, async events could have also been used
good read: http://electron.rocks/different-ways-to-communicate-between-main-and-renderer-process/

Also, *must* utilize a callback to return values from an asynchronous request, obviously.
*/
exports.getData = function(callback) {
    ret = []; // Will hold all pairs (to be returned)

    // Construct the header
    var auth = 'Basic ' + new Buffer(':admin').toString('base64');
    var options = {
        host: '192.168.0.1',
        path: '/RgConnect.asp',
        port: '80',
        headers: {'Authorization': auth}
    };

    res = function(response) {
        var data = '';

        // Another chunk of data has been recieved, so append it to `data`
        response.on('data', function (chunk) {
            data += chunk;
        });

        // The whole response has been recieved
        response.on('end', function () {
            ret = extractData(data);
            //console.log(test);
            /*data = [
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
            //console.log(data);
            callback(data);*/
        });

        response.on('error', function(e) {
            console.log(e);
        });
    }

    http.request(options, res).end();
}