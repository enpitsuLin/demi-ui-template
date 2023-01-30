import {
  componentsRoot,
  libOutput,
  libPackage,
  libRoot,
} from '@demi-ui/build-utils'
import { copySync, readdir, readJSON, outputJson } from 'fs-extra'
import path from 'path'
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
          path.basename(fpath, '.css'),
          path.basename(fpath)
        ),
      ])
      .map(([src, dest]) => copySync(src, dest))
  )
}

export const writePackages = async () => {
  const content = await readJSON(libPackage)
  content.scripts = {
    ...content.scripts,
    postinstall: 'node ./scripts/postinstall.js',
  }
  delete content.publishConfig.directory
  await outputJson(path.resolve(libOutput, 'package.json'), content, {
    EOL: '\n',
    spaces: 2,
  })
}
