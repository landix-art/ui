#!/usr/bin/env node

const { execSync } = require("child_process");

const args = process.argv.slice(2);
const command = args[0]; 
const componentName = args[1]; 

if (command === "add" && componentName) {
  const baseUrl = "https://raw.githubusercontent.com/landix-art/ui/main/public/r";
  const jsonUrl = `${baseUrl}/${componentName}.json`;

  console.log(`🚀 Installing ${componentName} from Landix...`);
  
  try {
    execSync(`npx shadcn@latest add "${jsonUrl}"`, { stdio: "inherit" });
    console.log(`✅ ${componentName} installed successfully!`);
  } catch (error) {
    console.error(`❌ Failed to install ${componentName}. Please check if the component exists.`);
  }
} else {
  console.log("Usage: npx landix add <component-name>");
  console.log("Example: npx landix add landix-button");
}
