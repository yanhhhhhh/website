import fs, { readFileSync } from 'fs'
import path from 'path'
import SVGSpriter from 'svg-sprite'

const args = process.argv

const pathname = path.resolve() + args[2]

async function createNormalSvg() {
  const spriter = new SVGSpriter({
    sprite: 'sprite.symbol.svg',
    shape: {
      id: {
        generator: function (name, file) {
          const fileName = path.parse(file.basename).name
          return 'icon-' + fileName
        },
      },
      dimension: {
        maxWidth: 1024, // Max. shape width
        maxHeight: 1024, // Max. shape height
        precision: 2, // Floating point precision
        attributes: false, // Width and height attributes on embedded shapes
      },
    },
    svg: {
      xmlDeclaration: false, // Add XML declaration to SVG sprite
      doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
      namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
      namespaceIDPrefix: '', // Add a prefix to the automatically generated namespaceIDs
      namespaceClassnames: false, // Add namespace token to all CSS class names in SVG shapes
      dimensionAttributes: true, // Width and height attributes on the sprite
    },
    mode: {
      symbol: true,
    },
  })

  const svgsPath = pathname + '\/icon-svg\/'
  const iconFiles = await fs
    .readdirSync(svgsPath, {
      encoding: 'utf-8',
    })
    .filter((name) => name.endsWith('.svg'))

  await Promise.allSettled(
    iconFiles.map(async (fileName) => {
      const filePath = svgsPath + fileName
      const file = await readFileSync(filePath, 'utf-8')

      const svgContent = file.replace(/ fill=".*?"/g, ' fill="currentColor"')

      spriter.add(filePath, null, svgContent)
    }),
  )

  const { result } = await spriter.compileAsync()

  return {
    names: iconFiles,
    content: result.symbol.sprite.contents,
  }
}

async function createColorSvg() {
  const spriter = new SVGSpriter({
    sprite: 'sprite.symbol.svg',
    shape: {
      id: {
        generator: function (name, file) {
          const fileName = path.parse(file.basename).name
          return 'icon-image-' + fileName
        },
      },
      dimension: {
        maxWidth: 1024, // Max. shape width
        maxHeight: 1024, // Max. shape height
        precision: 2, // Floating point precision
        attributes: false, // Width and height attributes on embedded shapes
      },
    },
    svg: {
      xmlDeclaration: false, // Add XML declaration to SVG sprite
      doctypeDeclaration: false, // Add DOCTYPE declaration to SVG sprite
      namespaceIDs: true, // Add namespace token to all IDs in SVG shapes
      namespaceIDPrefix: '', // Add a prefix to the automatically generated namespaceIDs
      namespaceClassnames: false, // Add namespace token to all CSS class names in SVG shapes
      dimensionAttributes: true, // Width and height attributes on the sprite
    },
    mode: {
      symbol: true,
    },
  })

  const svgsPath = pathname + '\/icon-image\/'
  const iconFiles = await fs
    .readdirSync(svgsPath, {
      encoding: 'utf-8',
    })
    .filter((name) => name.endsWith('.svg'))

  await Promise.allSettled(
    iconFiles.map(async (fileName) => {
      const filePath = svgsPath + fileName
      const file = await readFileSync(filePath, 'utf-8')

      spriter.add(filePath, null, file)
    }),
  )

  const { result } = await spriter.compileAsync()

  return {
    names: iconFiles,
    content: result.symbol.sprite.contents,
  }
}

async function generateCreator(contents, svgNames, colorSvgNames) {
  const outputPath = '/icons.ts'

  const typeContent = `export type IconName = ${
    [...svgNames, ...colorSvgNames.map((name) => 'image-' + name)]
      .map((name) => `"${path.parse(name).name}"`)
      .join(' | ') || '""'
  }`

  const outputContent = `
${typeContent}
  
export function create() {
  const element = document.createElement('div')
  element.innerHTML = '${contents}'
  element.style.cssText = "position: fixed; top: -9999px; left: -9999px; width: 1px; height: 1px; overflow: hidden;"
  document.body.insertBefore(element, document.body.firstElementChild);
}`

  return await fs.writeFileSync(pathname + outputPath, outputContent)
}

try {
  const { names: svgNames, content: svgContent } = await createNormalSvg()
  const { names: colorSvgNames, content: colorSvgContent } =
    await createColorSvg()

  await generateCreator(svgContent + colorSvgContent, svgNames, colorSvgNames)

  console.info(
    `> icon 生成完毕，共写入 ${svgNames.length + colorSvgNames.length} 个 svg.`,
  )
} catch (e) {
  console.info(e)
} finally {
  process.exit()
}
