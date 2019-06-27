const roblox = require('roblox-js')
const Discord = require('discord.js')
const client = new Discord.Client();
var token = "NTg4NTEyODEwODU4OTcxMTM4.XQGNbQ.mNpmXhcFhnNc2-3x8U5fUpwwwfE";

client.login(token)

var prefix = '!';


function login() {
    const rbx = require('roblox-js');
const fs = require('fs');

const cookieFile = './cookie';
const cookie = JSON.parse('{"cookie": "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_03AA2AFCE41E5254F43FD6BDA0BEE4FAC40D32ED06CBEB235CCF201F678A16F022085D111EDD0F2D4DEBC3AD0BB4CD11C0FD0F50935A837252B0C5C0E80B96932C9184EE37E93AB9E5FC43C9A3B854F799C1B0758995B0167196AB6039D2DA8E5CE01AA5E548DA5A3B4650FDFE28D83BBCFB4E7E347C1654BD771A19527566F4E360D308C622A09087FB83B633F86F8BB7CA82F5E8BF927A749E6B2D4D1486F0ABDB0E570800E239BDF236F8F5BA38F64023A4E97EE71EDD4E33A712CBAF01739E172F32A68B83E3BB362AAB4A9C89E5295DD233A85E64B4F4DB1E0B97135767C34652D8196D2F5CB28906F7BB19802C7ECB35673C6056A811B355DBE8CB110E100748B99F8BEA9F5BB34EE99E36888B6DD98BA1BF7959414A4EC0BCFD06CFCCD05A30C3"}').cookie;
rbx.options.jar.session = cookie;
const relog = () => {
  return rbx.getVerification({url: 'https://www.roblox.com/my/account#!/security'})
    .then((ver) => {
      return rbx.getGeneralToken().then((token) => {
        return rbx.http({
          url: 'https://www.roblox.com/authentication/signoutfromallsessionsandreauthenticate',
          options: {
            method: 'POST',
            resolveWithFullResponse: true,
            verification: ver.header,
            jar: null,
            headers: {
              'X-CSRF-TOKEN': token
            },
            form: {
              __RequestVerificationToken: ver.inputs.__RequestVerificationToken
            }
          }
        }).then((res) => {
          console.log(res.statusCode);
          console.log(res.body);
          var cookies = res.headers['set-cookie'];
          if (cookies) {
            rbx.options.jar.session = cookies.toString().match(/\.ROBLOSECURITY=(.*?);/)[1];
            fs.writeFile(cookieFile, JSON.stringify({cookie: rbx.options.jar.session}), (err) => {
              if (err) {
                console.error('Failed to write cookie');
              }
            });
          }
        });
      });
    });
};

(async () => {
  console.log('...' + rbx.options.jar.session.substr(-20));
  console.log(await rbx.getCurrentUser());
  await relog();
  console.log('...' + rbx.options.jar.session.substr(-20));
  console.log(await rbx.getCurrentUser());
})();
    return relog();
}
//setInterval(function() {
login()
    .then(function() {
        console.log('Logged in.') 
    })
    .catch(function(error) { 
        console.log(`Login error: ${error}`) 
    });
//  }, 10000);
 
function isCommand(command, message){
    var command = command.toLowerCase();
    var content = message.content.toLowerCase();
    return content.startsWith(prefix + command);
}



 
client.on('message', (message) => {
  client.user.setActivity('friend requests', { type: "WATCHING" })
    if (message.author.bot) return; 
    var args = message.content.split(/[ ]+/)
    var why = new Discord.RichEmbed()
    .addField("Friend Requests", "Accepting Friend Request")
    .setFooter("Whitelist Bot#8328", client.user.avatarURL)
    .setColor(0x0000FF)
    
    var help = new Discord.RichEmbed()
    .addField("Help", "!accept -- accepts friend request")
    .setFooter("Whitelist Bot#8328", client.user.avatarURL)
    .setColor(0x0000FF)


   
    if(isCommand('accept', message)){
        if(!args[1]) return message.channel.send("Please put a userID and sent a friend request.")
        //if(roblox.getUsernameFromId(args[1])) return message.channel.send("Please Send valid id") 
        if (!message.member.roles.some(role => role.name === 'Whitelisted')) return message.channel.send("Get whistlisted first.");
        roblox.acceptFriendRequest(args[1]);
message.channel.sendEmbed(why);
   }

   if(isCommand('help', message)){
    message.channel.sendEmbed(help);
   }
  
})
