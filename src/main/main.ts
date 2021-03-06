/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { authenticator } from '@otplib/preset-default';

const storage = require('electron-json-storage');

let keys: {
  [x: string]: { name: any; url: any; secret: any; timestamp: number; iconUrl: string };
};

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 460,
    height: 728,
    resizable: false,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

function normalizeURL(baseURL: string) {
  if (!baseURL.includes("http://") || !baseURL.includes("https://")) {
    return "https://" + baseURL;
  }
  return baseURL;
}

ipcMain.on('add', (event, message) => {
  console.log('IPCADD FIRED');
  if (message.url) {
    message.url = normalizeURL(message.url);
    message.iconUrl = message.url + "/favicon.ico";
  }
  else {
    message.iconUrl = "https://img.icons8.com/ios/50/000000/lock-2.png";
  }
  message.secret = message.secret.replace(/ /g, '');
  keys[message.id] = {
    name: message.name,
    url: message.url,
    secret: message.secret,
    timestamp: Date.now(),
    iconUrl: message.iconUrl,
  };
  storage.set('keys', keys, (error: any) => {
    if (error) {
      console.log(error);
    }
  });
});

ipcMain.on('read', (event, message) => {
  console.log('IPC read fired');
  // console.log(defaultDataPath);
  storage.get('keys', (error: any, data: any) => {
    if (error) throw error;
    keys = data;
    // console.log(keys);
    event.returnValue = data;
  });
});

ipcMain.on('get-tokens', (event) => {
  console.log('IPC GET TOKENS FIRED');
  const tokens: {
    [key: string]: string;
  } = {};
  let time: number;
  storage.getAll('keys', (error: any, data: any) => {
    if (error) throw error;
    if (JSON.stringify(data) !== '{}') {
      Object.keys(data.keys).forEach((key) => {
        tokens[key] = authenticator.generate(data.keys[key].secret);
      });
      time = authenticator.timeRemaining();
      console.log({ tokens, time });
      console.log(keys);
      event.returnValue = { tokens, time };
    }
  });
});

ipcMain.on('delete-key', (event, message) => {
  console.log(message);
  delete keys[message];
  storage.set('keys', keys, (error: any) => {
    if (error) throw error;
    console.log('deleted');
  });
  event.returnValue = '';
});



//<link\s+(?:type="[^"]+"\s*)?(?:rel="(?:shortcut\s+)?icon"\s*)?(?:type="[^"]+"\s*)?href="([^"]+)"(?:type="[^"]+"\s*)?(?:\s*rel="(?:shortcut\??????s+)?icon"\s*)?(?:type="[^"]+"\s*)?\s*>
//  use regex for favicon

// Todo
// - Refactor Code
// - Add icon fetching (?)  (regex for favicon)
// - UI changes
// - demo video of github auth
// - gif for readme.md showing the whole flow