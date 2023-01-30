import { componentsRoot, libOutput } from '@demi-ui/build-utils'
import { dest, src } from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import minfycss from 'gulp-minify-css'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import { resolve, sep } from 'path'

const bundleStyleDirectory = resolve(libOutput, 'dist')
const styleDirectory = resolve(libOutput, 'style')

export const buildBundleStyle = async () => {
  src('**/*.css', { cwd: componentsRoot, absolute: true })
    .pipe(autoprefixer({ cascade: false }))
    .pipe(minfycss())
    .pipe(
      rename((path) => {
        path.dirname = path.dirname
          .split(sep)
          .filter((i) => !['src', 'style'].includes(i))
          .join(sep)
      })
    )
    .pipe(dest(styleDirectory))
    .pipe(concat('style.css'))
    .pipe(dest(bundleStyleDirectory))
}
