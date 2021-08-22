import glob from "glob";
import { outputFile } from 'fs-extra';
import { program } from 'commander';
import { renderFile } from 'template-file';

/**
 * Get some args from the CLI
 */
program
  .option('-n, --name <name>', 'The name of the module. Should be ProperCase')
  .option('-t, --template-dir <templateDir>', 'The template directory')
  .option('-o, --output <output>', 'The directory where the new files should go')
  .parse();

const options = program.opts();

/**
 * Convert the module name to camel and kabob casing
 */
const newModuleNameMap = {
  NewModule: options.name,
  newModule: options.name.charAt(0).toLowerCase() + options.name.slice(1),
  "new-module": kebabize(options.name)
};

/**
 * Make the new module
 */
glob(`${options.templateDir}/**/*.template`, async (err, matches) => {
  if (err) throw err;

  matches.forEach(async (file) => {
    const templatedString = await renderFile(file, newModuleNameMap);
    const outputPath = file
      // remame to the new module where needed
      .replace('NewModule', newModuleNameMap.NewModule)
      .replace('newModule', newModuleNameMap.newModule)
      .replace('new-module', newModuleNameMap['new-module'])
      // change the output dir
      .replace(`${options.templateDir}`, options.output)
      // remove the 'template' extension
      .replace('.template', '')
    
    console.log(`Creating ${outputPath}`);
    await outputFile(outputPath, templatedString);
  });
});


/**
 * Ripped from StackOverflow on 2021-08-22
 * https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case-in-javascript
 */
function kebabize(str) {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
     ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
     : letter;
  }).join('');
}

