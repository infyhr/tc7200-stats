const {app, BrowserWindow} = require('electron');
const url  = require('url');
const path = require('path');
const ipc  = require('electron').ipcMain;
const nunjucks = require('nunjucks');

let mainWindow;
let connectionDialog;
global.projectDir = __dirname;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false // Start as hidden
    });

    mainWindow.setMenu(null); // Remove the menu

    // test
    nunjucks.configure('html', { autoescape: true });

    // Load the main window
    let html = nunjucks.render('index.html');
    html = 'data:text/html,' + encodeURIComponent(html);
    mainWindow.loadURL(html);

    /*mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/html/base.html'),
        protocol: 'file:',
        slashes: true
    }))*/

    // Load the connection dialog
    openConnectionDialog();

    // Emitted when the main windows has been closed
    mainWindow.on('closed', () => {
        mainWindow = null
    })
});

// Grab data from the Connection Dialog
ipc.on('connectionInit', (event, message) => {
    console.log("Received: " + message);

    // Since we received, we can close the modal dialog
    connectionDialog.close();

    // Send it to the renderer now
    mainWindow.webContents.send('connectionInit', message);

    // Show the main window
    mainWindow.show();

    // debug
    mainWindow.webContents.openDevTools();
});

// Spawns a Connection Dialog
function openConnectionDialog() {
    connectionDialog = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: true,
        width: 600,
        height: 300
    })

    connectionDialog.setMenu(null);

    connectionDialog.loadURL(url.format({
        pathname: path.join(__dirname, '/html/connection.html'),
        protocol: 'file:',
        slashes: true
    }))

    connectionDialog.webContents.openDevTools();
}

// Quit when the connection dialog is closed
/*connectionDialog.on('close', () =>{
    app.quit();
});*/

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Not sure what this does just yet lol
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})