const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { start, PORT } = require('./server.cjs');

const ORIGIN = `http://localhost:${PORT}`;
let win = null, srv = null;

function openExternal(url) { if (/^(https?:|mailto:)/i.test(url)) shell.openExternal(url); }

async function createWindow() {
  if (!srv) {
    try { srv = await start(); }
    catch (e) { console.error('Local server failed (port in use?)', e); app.quit(); return; }
  }
  win = new BrowserWindow({
    width: 1360, height: 900, minWidth: 360, minHeight: 600,
    backgroundColor: '#030e1b', autoHideMenuBar: true,
    icon: path.join(__dirname, '..', 'assets', 'icon.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadURL(`${ORIGIN}/index.html`);
  win.webContents.setWindowOpenHandler(({ url }) => { openExternal(url); return { action: 'deny' }; });
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith(ORIGIN)) { e.preventDefault(); openExternal(url); } });
  win.on('closed', () => { win = null; });
}

if (!app.requestSingleInstanceLock()) app.quit();
else {
  app.on('second-instance', () => { if (win) { if (win.isMinimized()) win.restore(); win.focus(); } });
  app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
  });
  app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
  app.on('before-quit', () => { try { srv && srv.server.close(); } catch {} });
}
