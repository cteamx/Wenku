import { app, BrowserWindow, Menu, Tray, globalShortcut, ipcMain, shell, screen } from 'electron'

import { menubar } from 'menubar';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let tray
let mainWindow

const isMac = 'darwin' === process.platform;
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 500,
    useContentSize: true,
    width: 343,
    frame: false,
    show: false,
    alwaysOnTop: true,
    // resizable: false, // 禁止变化尺寸
    transparent: true
  })

  mainWindow.setSkipTaskbar(true);
}

function createTray() {
  const menubarLogo = process.platform === 'darwin' ? `${__static}/mac.png` : `${__static}/win.png`

  tray = new Tray(menubarLogo)

  var windowPosition = "bottomRight";
  if (isMac) {
    windowPosition = "trayCenter";
  }

  const mb = menubar({
    tray,
    browserWindow: mainWindow,
    index: winURL,
    windowPosition: windowPosition
  });

  mainWindow.on('blur', function () {
    mb.hideWindow();
  })
}

function init() {
  createWindow();
  createTray();

  if (isMac) {
    app.dock.hide();
  }

  // mainWindow.on('blur', () => {
  //   mainWindow.hide()
  // })
}

ipcMain.on('exit', function () {
  app.quit();
})

const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.focus()
  }
})

if (shouldQuit) {
  app.quit()
}

app.on('ready', init)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
