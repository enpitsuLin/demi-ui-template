import { App } from 'vue-demi'
import * as components from './components'

const install = (app: App) => {
  Object.entries(components).forEach(([key, component]) => {
    app.component(key, component)
  })
}
const version = '0.0.1'

export default { install, version }

export * from './components'
