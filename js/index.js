// Includes
const ipc        = require('electron').ipcRenderer;
const mainWindow = require('electron').remote.mainWindow;
const http       = require('http');

let connectionData;

// Receive connection data
ipc.on('connectionInit', (event, message) => {
    connectionData = JSON.parse(message);
});

/*
Extracts data from the HTTP response and returns it, just some simple regex stuff.
It's very ugly, but alas it's not quite possible to make this code more appealing
as it's just scraping data and storing it into one big array...
*/
function extractData(data) {
    ret = [[], [], [], [], []];
    
    // Downstream
    const re_dsChannels = /\d<\/td><td align="right">(\d{1,2})<\/td>/gi
    const re_dsSnr = /<td align="right">(\d{1,2}\.\d) dB<\/td>/gi
    const re_dsPwr = /&nbsp;<\/td><td align="right">(\s|-)?(\d{1,2}\.\d) dBmV<\/td><t/gi

    // Upstream
    const re_usChannels = /\d<\/td><td align="right">(\d)<\/td>/gi
    const re_usPower = /<td align="right">?(\d{1,2}\.\d) dBmV<\/td><\//gi

    // Execute downstream regex matching
    let ds_channels = re_dsChannels.exec(data);
    let ds_snr = re_dsSnr.exec(data);
    let ds_pwr = re_dsPwr.exec(data);
    // Loop through all the results
    while(ds_snr != null) { // Will be the same for all three
        ret[0].push(ds_channels[1]);
        ret[1].push(ds_snr[1]);
        ret[2].push(ds_pwr[2]);

        ds_channels = re_dsChannels.exec(data);
        ds_snr = re_dsSnr.exec(data);
        ds_pwr = re_dsPwr.exec(data);
    }

    // Now do the same for upstream
    let us_channels = re_usChannels.exec(data);
    let us_pwr = re_usPower.exec(data);
    while(us_pwr != null) {
        ret[3].push(us_channels[1]);
        ret[4].push(us_pwr[1]);

        us_channels = re_usChannels.exec(data);
        us_pwr = re_usPower.exec(data);
    }    

    return ret;
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
    //var auth = 'Basic ' + new Buffer(':admin').toString('base64');
    var auth = 'Basic ' + new Buffer(connectionData['username'] + ':' + connectionData['password']).toString('base64');
    var options = {
        host: connectionData['defaultGateway'],
        path: connectionData['statsURL'],
        port: connectionData['protocol'] == 'http' ? '80' : '8080',
        /*host: '192.168.0.1',
        path: '/RgConnect.asp',
        port: '80',*/
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
            callback(ret);
        });

        response.on('error', function(e) {
            console.log(e);
        });
    }

    http.request(options, res).end();
}

exports.connectionData = connectionData;