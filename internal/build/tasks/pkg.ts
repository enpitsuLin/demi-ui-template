import { componentsRoot, libOutput, libRoot } from '@demi-ui/build-utils'
import { copySync, readdir } from 'fs-extra'
import path, { basename } from 'path'
import glob from 'fast-glob'

const ignorePath = ['node_modules', 'release']

export const copyFiles = async () => {
  const files = (await readdir(libRoot)).filter(
    (p) => !ignorePath.some((ip) => p.includes(ip))
  )

  return Promise.all(
    files.map((file) =>
      copySync(path.resolve(libRoot, file), path.resolve(libOutput, file))
    )
  )
}

export const copyFullStyle = async () => {
  const styleFiles = await glob('**/*.css', {
    cwd: componentsRoot,
  })

  return Promise.all(
    styleFiles
      .map((fpath) => [
        path.resolve(componentsRoot, fpath),
        path.resolve(
          libOutput,
          'styles',
          basename(fpath, 'css'),
          basename(fpath)
        ),
      ])
      .map(([src, dest]) => copySync(src, dest))
  )
}
