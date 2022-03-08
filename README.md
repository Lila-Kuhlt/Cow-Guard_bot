# Discord-Bot-Template_slim
A very slim and easier variant of my [Discord-Bot-Template](https://github.com/EliasSchaut/Discord-Bot-Template)

## How to set up and run code
1. [Set Up](https://github.com/EliasSchaut/Discord-Bot-Template/wiki/Set-up)
1. [Run](https://github.com/EliasSchaut/Discord-Bot-Template/wiki/Run)

## Add a command
1. Create a new JS file named \<command name\>.js inside the folder [`commands`](https://github.com/EliasSchaut/Discord-Bot-Template_slim/tree/main/src/commands)
2. Fill the newly created JS file with the **command skeleton** below
3. Fill `name`, `description` and `usage` (used for args clarifications) and also your code to execute

**Command Skeleton**: See [template folder](https://github.com/EliasSchaut/Discord-Bot-Template_slim/blob/main/template/command.js)

## Difference between slim and full template
* Just reacting to commands from normal discord messages
* Only one level of hierachy in commands-folder (all commands are directly in commands folder and not in subfolders)
* Only `name`, `description` and `usage` as command modifications only used by `help` command (also no handler and error handling for that)
* Only `help` command preimplemented
* Very minor config file
* No slash commands or Discord interactions (like buttons or menu) at all
* No different langs (hard code text in command files)
* No database
* No bot admins
* No logger (use `console.log`)
