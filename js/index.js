const ipc        = require('electron').ipcRenderer;
const mainWindow = require('electron').remote.mainWindow;

ipc.on('connectionInit', (event, message) => {
    var obj = JSON.parse(message);
    console.log(obj);
});