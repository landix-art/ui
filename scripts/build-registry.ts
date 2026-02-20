import fs from "fs-extra"
import path from "path"

const REGISTRY_PATH = path.join(process.cwd(), "registry/ui")
const PUBLIC_PATH = path.join(process.cwd(), "public/r")


const components = [
  {
    name: "landix-button",
    dependencies: ["framer-motion", "clsx", "tailwind-merge"],
    registryDependencies: [], 
  },
]

async function buildRegistry() {
  await fs.ensureDir(PUBLIC_PATH)

  for (const component of components) {
    console.log(`📦 Building ${component.name}...`)
    
    const content = await fs.readFile(
      path.join(REGISTRY_PATH, `${component.name}.tsx`),
      "utf8"
    )

    const schema = {
      name: component.name,
      type: "registry:ui",
      dependencies: component.dependencies,
      files: [
        {
          path: `${component.name}.tsx`,
          content: content,
          type: "registry:ui",
        },
      ],
    }

    await fs.writeFile(
      path.join(PUBLIC_PATH, `${component.name}.json`),
      JSON.stringify(schema, null, 2)
    )
  }

  console.log("✅ Build complete! Files are in public/r/")
}

buildRegistry().catch((err) => {
  console.error(err)
  process.exit(1)
})
