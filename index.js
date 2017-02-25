const needle = require('needle');
let quiet = 0; //All info messages are displayed if this equals 0
let vanity = false; //All functions that dont use vanity will need a Steam ID when this is false if true ONLY vanityURL will be used

class csgoStatsNode {

  constructor(opts){
    if(opts['quiet'] == 1){
      quiet = 1;
    }
    if(opts['vanity'] == "true"){
      vanity = true;
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

        case "getBans":
          needle.get('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=446CE43A060D39DF46941B405BA767D2&steamids='+ steamID, function(err, resp){
            if(err) throw err;
            if(quiet == 0){
              console.log("csgoStatsNode-> Ban Data Callback");
            }
            cb(resp.body);
          });
          break;

        case "getProfile":
        needle.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=446CE43A060D39DF46941B405BA767D2&steamids='+ steamID, function(err, resp){
          if(err) throw err;
          if(quiet == 0){
            console.log("csgoStatsNode-> Profile Data Callback");
          }
          cb(resp.body);
        });
        break;

        case "vanityURL":
        needle.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=446CE43A060D39DF46941B405BA767D2&vanityurl='+ steamID, function(err, resp){
          if(err) throw err;
          if(quiet == 0){
            console.log("csgoStatsNode-> VanityURL to Steam ID Callback");
          }
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
    if(vanity == true){
      this.getMySteamID(steamID, (data) => {
        this.makePost(data, undefined, (d7) => {
          cb(d7);
        })
      });

    } else {
      this.makePost(steamID, undefined ,function(data){
        cb(data);
      });
    }
  }

  getProfile(steamID, cb){
    this.makePost(steamID, "getProfile" ,function(data){
      cb(data['response']['players'][0]);
    });
  }

  getProfilePic(steamID, cb){
    this.makePost(steamID, "getProfile" ,function(data){
      cb(data['response']['players'][0]);
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

  getMyBans(steamID, cb){
    this.makePost(steamID, "getBans" ,function(data){
      cb(data['players'][0]);
    });
  }

  isVac(steamID, cb){
    this.getMyBans(steamID, function(data){
      if(data['VACBanned'] == true){
        if(quiet == 0){
          cb("You are currently VAC Banned");
        } else {
          cb(1); //Quiet Mode Callback
        }
      } else {
        if(quiet == 0){
          cb("You are currently not VAC Banned");
        } else {
          cb(0); //Quiet Mode Callback
        }
      }
    });
  }

  ping(cb){
    cb('pong');
  }
}

module.exports = csgoStatsNode;