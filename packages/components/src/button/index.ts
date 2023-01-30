/* eslint-disable @typescript-eslint/no-explicit-any */
import { App, isVue2 } from 'vue-demi'
import Button from './src/button.vue'

export const DButton = Button

DButton.install = (app: App) => {
  if (isVue2) {
    app.component(DButton.name, DButton as any)
  }
}
