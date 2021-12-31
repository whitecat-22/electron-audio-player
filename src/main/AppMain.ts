import { app } from 'electron'
import { initializeIpcEvents, releaseIpcEvents } from './IPCEvents'
import { createMainWindow } from './WindowManager'
import { createMainMenu } from './MainMenu'
import { setImageSaveDir } from './MusicMetadataReader'
import path from 'path'

app.name = 'AudioPlayer'

app.on('ready', () => {
  /// #if env == 'DEBUG'
  console.log('Initialize Application')
  /// #endif

  createMainWindow()
  createMainMenu()
  setImageSaveDir(path.join(app.getPath('userData'), 'images'))
  initializeIpcEvents()
})

/// #if env == 'DEBUG'
app.on('quit', () => {
  console.log('Application is quit')
})
/// #endif

app.on('window-all-closed', () => {
  /// #if env == 'DEBUG'
  console.log('All of the window was closed.')
  /// #endif

  releaseIpcEvents()
  app.quit()
})
