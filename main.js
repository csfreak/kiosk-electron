// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')

app.commandLine.appendSwitch('ignore-certificate-errors')

const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false
  })

  mainWindow.setKiosk(true)

  mainWindow.loadURL('https://homeassistant.apps.homelab.csfreak.com')

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
})

mainWindow.webContents.on('crashed', (e) => {
    app.relaunch();
    app.quit()
});