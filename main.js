// Modules to control application life and create native browser window
const { app, ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const ipc = require('electron').ipcMain

var mainWindow;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    backgroundColor: '#112233',
    center: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true, // !important for renderer.js to be executed
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Hide menu bar
  mainWindow.removeMenu()

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// Resize window to fit its content
ipcMain.on('itemsAdded', (event, args) => {
  let windowBounds = mainWindow.getBounds()
  let windowContentBounds = mainWindow.getContentBounds()
  
  let bodyPadding = 5
  let hBoundsDifferential = windowBounds.width - windowContentBounds.width
  let vBoundsDifferential = windowBounds.height - windowContentBounds.height

  let groupsCount = args
  let groupWidth = 620
  let groupHeight = 63
  let groupBottomMargin = 10

  let contentWidth = hBoundsDifferential
                    + bodyPadding
                    + groupWidth
                    + bodyPadding
  ;

  let contentHeight = vBoundsDifferential 
                    + bodyPadding
                    + (groupsCount * groupHeight) 
                    + ((groupsCount - 1) * groupBottomMargin) 
                    + bodyPadding
  ;

  //mainWindow.setSize(contentWidth, contentHeight)
});
