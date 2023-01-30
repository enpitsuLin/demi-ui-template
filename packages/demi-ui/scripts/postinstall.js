const fs = require('fs-extra')
const mustache = require('mustache')

const pkg = './package.json'
const pkg_bak = './package.json.bak'

function checkVueVersion() {
  try {
    return require('vue').version
  } catch (e) {
    return null
  }
}

function writeManifest(content, version) {
  ;['main', 'module'].forEach((field) => {
    content[field] = writeVersion(content[field], 2)
  })

  Object.entries(content.exports).forEach(([field, value]) => {
    content.exports[field] = JSON.parse(writeVersion(JSON.stringify(value)))
  })
  return content

  function writeVersion(template) {
    return mustache.render(template, { version })
  }
}

function switchVersion(version) {
  if (fs.existsSync(pkg_bak)) {
    const pkgContent = fs.readJSONSync(pkg_bak)
    fs.outputJsonSync(pkg, writeManifest(pkgContent, version), {
      EOL: '\n',
      spaces: 2,
    })
  } else {
    const pkgContent = fs.readJSONSync(pkg)

    if (!fs.existsSync(pkg_bak)) {
      fs.outputJsonSync(pkg_bak, pkgContent, { EOL: '\n', spaces: 2 })
    }
    fs.outputJsonSync(pkg, writeManifest(pkgContent, version), {
      EOL: '\n',
      spaces: 2,
    })
  }
}

function main() {
  const vueVersion = checkVueVersion()

  if (typeof vueVersion !== 'string' || !vueVersion.match(/^2.7|3./)) {
    console.log(
      `[vue-demi-component-template] not current Vue version, please use Vue2/3`
    )
    return
  } else {
    switchVersion(vueVersion.startsWith('2.7') ? 2 : 3)
  }
}

main()
