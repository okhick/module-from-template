# module-from-template
Takes in a directory filled with {{ ModuleName }} placholders and replaces it with a real name.

Will keep file structure and copy any files with a `.template` extension. If ModuleName is in the filename, it will be replaced with the new module name.

Takes 3 arguments. All are currently required.
```
Name (-n | --name) The name of the module. Should be ProperCase.
Template Directory (-t | --template-dir) The template directory.
Output (-o | --output) The directory where the new files should go.
```
