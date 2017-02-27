const needle = require('needle');
let quiet = 0; //All info messages are displayed if this equals 0
let vanity = false; //All functions that dont use vanity will need a Steam ID when this is false if true ONLY vanityURL will be used
let APIKey = ""; //Lmao not using my Steam API Key

class csgoStatsNode {

  constructor(opts){
    if(opts['quiet'] == 1){
      quiet = 1;
    }
    if(opts['vanity'] == "true"){
      vanity = true;
    }
    if(opts['apikey'] == "" | opts['apikey'] == undefined){
      console.log("You need a Steam API key to use this libary");
      process.exit(0);
    } else {
      APIKey = opts['apikey'];
    }
  }

  makePost(steamID = '76561197960287930', type = 'csgoStats' ,cb){
    try {
      switch (type) {

        case "csgoStats":
          needle.get('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=' + APIKey + '&steamid='+ steamID, function(err, resp){
            if(err) throw err;
            if(quiet == 0){
              console.log("csgoStatsNode-> Raw Data Callback");
            }
            cb(resp.body);
          });
          break;

        case "getBans":
          needle.get('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=' + APIKey + '&steamids='+ steamID, function(err, resp){
            if(err) throw err;
            if(quiet == 0){
              console.log("csgoStatsNode-> Ban Data Callback");
            }
            cb(resp.body);
          });
          break;

        case "getProfile":
        needle.get('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + APIKey + '&steamids='+ steamID, function(err, resp){
          if(err) throw err;
          if(quiet == 0){
            console.log("csgoStatsNode-> Profile Data Callback");
          }
          cb(resp.body);
        });
        break;

        case "vanityURL":
        needle.get('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=' + APIKey + '&vanityurl='+ steamID, function(err, resp){
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
    if(vanity){
      this.getMySteamID(steamID, (data) => {
        this.makePost(data, undefined, (d7) => {
          cb(d7);
        })
      });

    } else {

      this.makePost(steamID, undefined , (data) => {
        cb(data);
      });
    }

  }

  getProfile(steamID, cb){
    if(vanity){
      this.getMySteamID(steamID, (sID) => {
        this.makePost(sID, "getProfile" , (data) => {
          cb(data['response']['players'][0]);
        });
      });
    } else {
      this.makePost(steamID, "getProfile" , (data) => {
        cb(data['response']['players'][0]);
      });
    }
  }

  getProfilePromise(steamID, cb){
    return new Promise( (resolve, reject) => {
      if(vanity){
        this.getMySteamID(steamID, (sID) => {
          this.makePost(sID, "getProfile" , (data) => {
            // cb(data['response']['players'][0]);
            resolve(data['response']['players'][0]);
          });
        });
      } else {
        this.makePost(steamID, "getProfile" , (data) => {
          // cb(data['response']['players'][0]);
          resolve(data['response']['players'][0]);
        });
      }
    });
  }

  getProfilePic(steamID, cb){
    if(vanity){
      this.getProfile(steamID, (data) => {
        cb(data['avatarfull']);
      });
    } else {
      this.getProfile(steamID, (data) => {
        cb(data['avatarfull']);
      });
    }
  }

  getProfileName(steamID, cb){
    if(vanity){
      this.getProfile(steamID, (data) => {
        cb(data['personaname']);
      });
    } else {
      this.getProfile(steamID, (data) => {
        cb(data['personaname']);
      });
    }
  }

  whatIsMyKD(steamID, cb){
    if(vanity){
      this.getMySteamID(steamID, (sID) => {
        this.makePost(sID, undefined , (data) => {
          let x = data['playerstats']['stats'][0]['value'];
          let y = data['playerstats']['stats'][1]['value'];
          let kd = (x/y).toFixed(2);
          cb(kd);
        });
      });
    } else {
      this.makePost(steamID, undefined , (data) => {
        let x = data['playerstats']['stats'][0]['value'];
        let y = data['playerstats']['stats'][1]['value'];
        let kd = (x/y).toFixed(2);
        cb(kd);
      });
    }
  }

  getMySteamID(vanityURL, cb){
    this.makePost(vanityURL, "vanityURL" , (data) => {
      cb(data['response']['steamid']);
    });
  }

  getMyBans(steamID, cb){
    if(vanity){
      this.getMySteamID(steamID, (sID) => {
        this.makePost(sID, "getBans", (data) => {
          cb(data['players'][0]);
        })
      });
    } else {
      this.makePost(steamID, "getBans" , (data) => {
        cb(data['players'][0]);
      });
    }
  }

  isVac(steamID, cb){
    if(vanity){
      this.getMySteamID(steamID, (sID) => {
        this.getMyBans(sID, (data) => {
          if(data['VACBanned'] == true){
            if(quiet == 0){
              cb("You are currently VAC Banned");
            } else {
              cb(1); //Quiet Mode Callback
              return;
            }
          } else {
            if(quiet == 0){
              cb("You are currently not VAC Banned");
            } else {
              cb(0); //Quiet Mode Callback
              return;
            }
          }
        });
      });
    } else {
      this.getMyBans(steamID, (data) => {
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
  }

  ping(cb){
    cb('pong');
  }
}

module.exports = csgoStatsNode;
