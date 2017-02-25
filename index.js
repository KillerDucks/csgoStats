const needle = require('needle');
let quiet = 0; //All info messages are displayed if this equals 0

class csgoStatsNode {
  constructor(opts){
    if(opts['quiet'] == 1){
      quiet = 1;
    }
  }

  makePost(steamID = '76561197960287930', type = 'csgoStats' ,cb){
    try {
      switch (type) {

        case "csgoStats":
          needle.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=446CE43A060D39DF46941B405BA767D2&steamid='+ steamID, function(err, resp){
            if(err) throw err;
            if(quiet == 0){
              console.log("csgoStatsNode-> Raw Data Callback");
            }
            cb(resp.body);
          });
          break;

        case "vanityURL":
        needle.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=446CE43A060D39DF46941B405BA767D2&vanityurl='+ steamID, function(err, resp){
          if(err) throw err;
          console.log("csgoStatsNode-> VanityURL to Steam ID Callback");
          cb(resp.body);
        });
          break;
      }
    } catch (e) {
      console.log(e);
    }
  }

  getStats(steamID, cb){
    /**
      Main Class Purpose
      Will take a steamID and retun all CSGO related data later versions of the class will have seperate functions
      to get diffrent pieces of data
    **/
    this.makePost(steamID, function(data){
      cb(data);
    });
  }

  whatIsMyKD(steamID, cb){
    this.makePost(steamID, undefined ,function(data){
      let x = data['playerstats']['stats'][0]['value'];
      let y = data['playerstats']['stats'][1]['value'];
      let kd = (x/y).toFixed(2);
      cb(kd);
    });
  }
  //n http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=446CE43A060D39DF46941B405BA767D2&vanityurl=xserv
  getMySteamID(vanityURL, cb){
    this.makePost(vanityURL, "vanityURL" ,function(data){
      cb(data['response']['steamid']);
    });
  }

  isVac(steamID){
    /**
      WIP
      This function will check if the player/steamID Owner has any bans including VAC bans as said in the func name
      if this is true a randomly chosen VAC joke will be returned eg:
        Have a nice VACation
        All VACancy have been taken
        etc.r
    **/
  }

  ping(cb){
    cb('pong');
  }
}

module.exports = csgoStatsNode;
