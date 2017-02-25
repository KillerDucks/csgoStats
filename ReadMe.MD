# CSGO NodeJS wrapper (Made for Discord Bots)

A nodeJS lib to provide CSGO Play stats. (Can be used in Discord)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

Run the following command in npm

```
npm install --save csgoStatsNode
```

## Example/Deployment

Require in the module as follows

```js
const csgoStats = require('csgoStatsNode');
const cStats = new csgoStats();
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

## Built With

* [Needle](https://www.npmjs.com/package/needle) - A HTTP client for NodeJS

## Authors

* **KillerDucks** - *Initial work* - [KillerDucks](https://github.com/KillerDucks)

See also the list of [contributors](https://github.com/KillerDucks/csgoStats/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
