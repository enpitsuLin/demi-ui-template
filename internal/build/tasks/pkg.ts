import { libOutput, libRoot } from '@demi-ui/build-utils'
import { copySync, readdir } from 'fs-extra'
import path from 'path'

export const copyFiles = async () => {
  const files = await readdir(libRoot)

  return Promise.all(
    files.map((file) =>
      copySync(path.resolve(libRoot, file), path.resolve(libOutput, file))
    )
  )
}
