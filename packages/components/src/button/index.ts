/* eslint-disable @typescript-eslint/no-explicit-any */
import { App } from 'vue-demi'
import Button from './src/button.vue'

export const DButton = Button

DButton.install = (app: App) => {
  app.component(DButton.name, DButton as any)
}
