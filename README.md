# Cow-Guard_bot
A discord bot for getting passwords with https://onetimesecret.com/ if having a certain role

## Features
This bot can run the following commands:
* ```help```: Shows all commands or more information about a specific command
* ```pw```: Without args: List of all passwords; With args: Get password when you have a whitelisted discord role!

## Preparations
* You need [node.js](https://nodejs.org/en/) (v16.14.0 or higher) installed.
* You need a [Discord API Bot](https://discord.com/developers/applications) with it's token.
* You need a [Discord server](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server) on which you can set permissions, so you can invite the bot and give it the following permissions:
    * View Channels
    * Send Messages
    * Send Messages in Threads

## Configuration
1. Rename the configuration file *(/config/config-template.json)* from ```config-template.json``` to ```config.json```
2. Open and set the configuration file (now ```config.json```) (see [Config-Table](#Config-Table) below)
3. Run ```npm install```.

## Config-File
### Config-Table
| Key    | Description                                                         | Value-Type      | Must be set |
|--------|---------------------------------------------------------------------|-----------------|-------------|
| prefix | The bot's prefix                                                    | String          | yes         |
| token  | The bot's token                                                     | String          | yes         |
| pw     | The saved passwords. Fill with [Password-Objects](#Password-Object) | Array of Object | yes         |

### Password-Object
```json
"<PW_NAME_1>": {  // the label for the password! It will be accessable via pw command (pw <PW_NAME>) 
      "user": "<USERNAME>", // The username to for your application (this will send via plain text)
      "password": "<PASSWORD>", // The secret password for your application (this will send via onetimesecret)
      "role_ids_with_access": [ "<ROLE-ID_1>", "<ROLE-ID_2>", "<ROLE-ID_3>" ] // only if a member has one of this roles, he/she has access to get this password via pw <PW_NAME>
    }
```

## Run
Run ```index.js``` with ```npm start``` or ```node index.js```. \
Alternative you can use `npm run pm`, `npm run pm-restart` and `npm run pm-stop`.
This will use [pm2](https://discordjs.guide/improving-dev-environment/pm2.html) for executing

