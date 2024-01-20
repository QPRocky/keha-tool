import path from 'path'
import { app, ipcMain } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import search from './db/search'
import track from './db/track'
import Connection from '../interfaces/Connection'
import { connect, disconnect, testConnection } from './db/db'
import GetTablesRequest from '../interfaces/GetTablesRequest'
import searchSpecificTables from './db/searchSpecificTables'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

; (async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./Search')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/Search`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('search', async (event, arg: string) => {
  const searchResult = await search(arg);
  event.reply('search', searchResult)
})

ipcMain.on('track', async (event, arg) => {
  const allTablesData = await track();
  event.reply('track', allTablesData)
})

ipcMain.on('connect', async (event, arg) => {
  connect(arg as Connection);
  //event.reply('connect', "ok")
})

ipcMain.on('disconnect', async (event, arg) => {
  disconnect();
  //event.reply('disconnect', "ok")
})

ipcMain.on('testConnection', async (event, arg) => {
  const error = await testConnection(arg as Connection);
  event.reply('testConnection', error)
})

ipcMain.on('getTables', async (event, arg: GetTablesRequest) => {
  const dbData = await searchSpecificTables(arg)
  event.reply('getTables', dbData)
})
