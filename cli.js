#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];

if (command === 'init') {
  const source = path.join(__dirname, '.agents');
  const target = path.join(process.cwd(), '.agents');

  if (!fs.existsSync(source)) {
    console.error('Error: Source .agents folder not found in the package.');
    process.exit(1);
  }

  try {
    // Copy the .agents folder recursively to the current working directory
    fs.cpSync(source, target, { recursive: true, force: true });
    console.log('Successfully initialized SkillAnti agents and skills in the current directory!');
  } catch (err) {
    console.error('Error initializing SkillAnti:', err.message);
    process.exit(1);
  }
} else {
  console.log('SkillAnti CLI');
  console.log('Usage: npx https://github.com/duyxyz/SkillAnti init');
}
