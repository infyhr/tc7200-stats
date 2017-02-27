const ipc = require('electron').ipcRenderer;
const remote = require('electron').remote;

function grabData() {
    let data = {};

    ["defaultGateway", "protocol", "statsURL", "username", "password", "interval"].forEach(v => {
        console.log("Currently fetching " + v);
        data[v] = document.querySelector('[name=' + v + ']').value;
    });

    return data;
}

const abortBtn  = document.querySelector('button[name="abort"]');
const submitBtn = document.querySelector('button[name="submit"]');
abortBtn.addEventListener('click', e => {
    e.preventDefault();
    remote.app.quit();
});
submitBtn.addEventListener('click', e => {
    e.preventDefault();
    /*
    To send data from the dialog window to the main window, since the dialog
    is clueless about its presence, we need to do the following:
    dialog -> main.js -> mainWindow. So, from Renderer to Main to Renderer.
    Use IPC to accomplish this.

    If the main windowd had spawned this window, then we could simply 
    get an instance of the main window (since it would spawn it),
    and use mainWindow.webContents.send(...). The mainWindow would then
    receive it via ipcRenderer.

    useful: https://kahlillechelt.com/how-to-communicate-between-two-electron-windows-166fdbcdc469#.fgu1sc10q
    */
    let data = grabData();
    ipc.send('connectionInit', JSON.stringify(data));
});