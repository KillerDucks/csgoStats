[![npm version](https://badge.fury.io/js/csgostatsnode.svg)](https://badge.fury.io/js/csgostatsnode)
[![Downloads][downloads-image]][npm-url]
[![GitHub issues](https://img.shields.io/github/issues/KillerDucks/csgoStats.svg)](https://github.com/KillerDucks/csgoStats/issues)

# CSGO NodeJS wrapper

A nodeJS lib to provide CSGO Player stats.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Run the following command in npm

```
npm install --save csgostatsnode
```

## Example/Deployment

Require in the module as follows

```js
const csgoStats = require('csgoStatsNode');
const cStats = new csgoStats({"apikey":"<Put your Steam API key here >"});
```

Here is an example of getting a players K/D

```js
csStats.whatIsMyKD('76561198138999275', function(data){
  console.log("Your K/D is: " + data);
})
```

Here is another example of getting a players Steam ID from their vanity URL

```js
csStats.getMySteamID('xserv', function(data){
  console.log("Your Steam ID is: " + data);
});
```

### Options

when creating a new instance of the class eg:

```js
const cStat = new csgoStats();
```

**You must pass through your Steam API key**

* **apikey** - This is the key you will get for signing up for a to the Steam API (Its free to get it)

>You can obtain one at https://steamcommunity.com/dev

you can pass through options such as:

* **quiet** - This will suppress any console.log() messages that the class makes. This can be set to **1** to suppress the messages.
* **vanity** - This allows **just** vanity URL's to be used instead of Steam ID's. To use this set **vanity** to **true**.

to set the options all you have to do is put a JSON object when creating the class instance

```js
const cStat = new csgoStats({"quiet":"1", "vanity":"true", "apikey":"<Put your Steam API key here >"});
```

### Available Commands

All of these functions take the Steam ID or Vanity URL if the option is set with the exception of *getMySteamID* which only takes a Vanity URL
* **getStats** - This by its-self will return all CS:GO related data eg: Kills with each weapon, MVP medals and Achievements.
* **getProfile** - Gets all data relating to a players profile eg: Profile name, Profile Image, Last Logon Time, Game ID (If the player is
                   playing a game).
* **getProfilePic** - Uses the Data from *getProfile* and pulls your full size (184x184) profile image URL.
* **whatIsMyKD** - Basic function that calculates your CS:GO K/D to 2 dp (decimal Point).
* **getMySteamID** - Using a players vanity URL this functions will return the Steam ID.
* **getMyBans** - Get all bans from Steam eg: VAC Bans, Community Bans and Economy Bans.
* **isVac** - A simple function that takes the data from *getMyBans* and checks if the VACBanned key is true or false.

## Built With

* [Needle](https://www.npmjs.com/package/needle) - A HTTP client for NodeJS

## Authors

* **KillerDucks** - *Initial work* - [KillerDucks](https://github.com/KillerDucks)

See also the list of [contributors](https://github.com/KillerDucks/csgoStats/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


[npm-url]: https://npmjs.org/package/csgostatsnode
[downloads-image]: http://img.shields.io/npm/dm/csgostatsnode.svg
