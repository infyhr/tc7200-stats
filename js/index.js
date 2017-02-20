// Includes
const ipc        = require('electron').ipcRenderer;
const mainWindow = require('electron').remote.mainWindow;

let connectionData;

// Receive connection data
ipc.on('connectionInit', (event, message) => {
    connectionData = JSON.parse(message);

    console.log('wow it works: ');
    console.log(connectionData);
});