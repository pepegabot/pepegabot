const Aoijs = require("aoi.js")
const config = require('./config.json')
require('dotenv').config();

const bot = new Aoijs.Bot({
  sharding: false, //true or false 
  shardAmount: 2, //Shard amount 
  mobile: false, //true or false - Discord Mobile Status
  //dbhToken: "API KEY", Remove // if using, get an API Key from their Server
  token: process.env.TOKEN, //Discord Bot Token
  prefix: ["$getServerVar[prefix]"] //Change PREFIX to your Prefix
})

//ивенты
bot.musicStartCommand({
 channel: "$channelID", 
 code: `$log[$songInfo[title]]
Сейчас играет "**$songInfo[title]**"
`})
bot.musicEndCommand({ 
channel: "$channelID", 
code: `Очередь кончилась`})

 
bot.onMessage() // Allows Commands to Executed
bot.loadCommands(`./commands/`) //Allows Commands executed by `commands` folder
bot.command({
name: "ping", 
code: `
$title[🏓 Pong!]
$description[\`$botPing\` ms.
Websocket: \`$ping\` ms.]
$footer[Uptime: $uptime]
$color[DD2E44]
` 
})
//реакции на ass и sus
bot.command({
name: "$alwaysExecute",
code: `$addCmdReactions[♂️]
$onlyIfMessageContains[$noMentionMessage;ass;]
` 
})
bot.command({
  name: "$alwaysExecute",
  code: `$addCmdReactions[😂]
  $onlyIfMessageContains[$noMentionMessage;sus;]
  `})
bot.readyCommand = ({
    channel: "754334389822947333",
    code:`
$if[$pruneMusic==false]
$pruneMusic
$else
$endif
жив
`});

bot.channelCreateCommand({ 
        channel: "753673183298846730", 
        code: `$author[Создан новый канал]
        $title[<#$newChannel[id]>]
        $color[GREEN]
        $addField[$if[$newChannel[type]==text]
        #️⃣
        $else
        🎙
        $endif $newChannel[name];$newChannel[id];yes] $addField[Тема канала;$newChannel[topic];yes] $addField[NSFW?;$if[$newChannel[nsfw]==true]
        Да
$else
Нет
$endif;yes] $addField[Слоумод;$newChannel[slowmode];yes] $addTimestamp`
        })
bot.onChannelCreate()

bot.channelDeleteCommand({ 
        channel: "753673183298846730", 
        code: `$author[Удалён канал]
        $color[RED]
        $addField[$if[$oldChannel[type]==text]
        #️⃣
        $else
        🎙
        $endif $oldChannel[name];$oldChannel[id];yes] $addField[Тема канала;$oldChannel[topic];yes] $addField[NSFW?;$if[$oldChannel[nsfw]==true]
        Да
$else
Нет
$endif;yes] $addField[Слоумод;$oldChannel[slowmode];yes] $addTimestamp`
        })
bot.onChannelDelete()

bot.channelUpdateCommand({ 
        channel: "753673183298846730", 
        code: `$author[Обновлён канал]
        $color[YELLOW]
$addField[До;После;yes]
        $addField[$if[$oldChannel[type]==text]
        #️⃣
        $else
        🎙
        $endif $oldChannel[name];$if[$newChannel[type]==text]
        #️⃣
        $else
        🎙
        $endif $newChannel[name];yes] $addField[$oldChannel[topic];$newChannel[topic];yes] $addField[$if[$oldChannel[nsfw]==true]
        NSFW-канал был
$else
NSFW-канал не был
$endif;$if[$newChannel[nsfw]==true]
        NSFW-канал стал
$else
Не NSFW-канал
$endif;yes] $footer[$newChannel[id]] $addTimestamp`
        })
bot.onChannelUpdate()

bot.presenceUpdateCommand({ 
        channel: "753673183298846730",
        code: `$author[$userTag;$authorAvatar] $addField[Старый статус:;$oldPresence[status]\n$oldPresence[activities]\n\nID: $oldPresence[id];yes] $addField[Новый статус:;$status\n$activity;yes]
$footer[ID: $authorID] $addTimestamp`
        })
bot.onPresenceUpdate()

bot.rateLimitCommand({ 
channel: "753673183298846730",
code: `$title[Рейтлимиты!]
$description[Limit: $rateLimit[limit]
Method: $rateLimit[method]
Path: $rateLimit[path]
Route: $rateLimit[route]]
$addTimestamp
`
})
bot.onRateLimit()

//переменные
bot.variables({
    prefix: "p!",
    chatbot: "off",
    chatbot_channel: "",
    webhook_id: "0",
    webhook_token: "",
    pause: "0",
    counter: "817846771220348928",
    weather: "off"
})
// Status
bot.status({
  text: "neokeyte",
  type: "STREAMING",
  url: "https://twitch.tv/neokeyte",
  time: 120
});
bot.status({
    text: "Lords of Lockerroom",
    type: "WATCHING",
    time: 120
});
bot.status({
    text: "время | $hour:$minute UTC+5:00 $timezone[Asia/Yekaterinburg]",
    type: "WATCHING",
    time: 5
});
bot.status({
    text: "Need For Speed Most Wanted: Pepega Mod",
    type: "PLAYING",
    time: 180
});
