const express = require('express');
const app = express();

// Enter Channel IDs Here 
let dareId = ""
let truthId = ""
let wyrId = ""
let guildId = ""

// Enter Bot Token Here
let BOT_TOKEN = ""

app.listen(3000, () => {
  console.log('Project is running!')
});

app.get("/", (req, res) => {
  res.send('Hello World!')
})

const disc = require('discord.js')
const client = new disc.Client({ intents: ['Guilds', 'GuildMessages'] })
function commaCounter(str) {
    var commas = 0;
    var comma = ",";
    var cr = comma.split("");
    for (var i=0; i<str.length;i++) {
        if (cr.indexOf(str[i]) > -1) {
             commas = commas + 1;
        }
    }
    return commas;
}
function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}



client.on('ready', () => {
  const guild = client.guilds.cache.get(guildId)
    let commands

if(guild) {
  commands = guild.commands
} else {
  commands = client.application?.commands
}

  commands?.create({
  name: 'dare',
  description: 'Give a random dare!'
})

  commands?.create({
  name: 'truth',
  description: 'Give a random question that you have to answer truthfully!'
})
  
  commands?.create({
  name: 'wyr',
  description: 'Give a random would you rather question!'
})

  commands?.create({
    name: 'adddare',
    description: 'Add a dare to give when /dare is executed', 
    options: [{
      name: 'dare',
      description: 'Dare to add',
      type: 3,
      required: true
    }]
  })

    commands?.create({
    name: 'addtruth',
    description: 'Add a truth to give when /truth is executed', 
    options: [{
      name: 'truth',
      description: 'Truth to add',
      type: 3,
      required: true
    }]
  })

    commands?.create({
    name: 'addwyr',
    description: 'Add a would you rather to give when /wyr is executed', 
    options: [{
      name: 'wyr',
      description: 'Would you rather question to add',
      type: 3,
      required: true
    }]
  })
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'adddare') {
    const dchannel = client.channels.cache.get(dareId)
    let dString = interaction.options.getString('dare')
    dchannel.messages.fetch({ limit: 1 }).then(messages => {
      let dArray = messages.first().content
      if(dArray.includes(dString)) {
        interaction.reply('What nonsense bro its already there...')
      } else {
        dArray = dArray + ',' + dString
        interaction.reply('Dare added!')
        dchannel.send(dArray)
      }
    })
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'addtruth') {
    const tchannel = client.channels.cache.get(truthId)
    let tString = interaction.options.getString('truth')
    tchannel.messages.fetch({ limit: 1 }).then(messages => {
      let tArray = messages.first().content
      if(tArray.includes(tString)) {
        interaction.reply('What nonsense bro its already there...')
      } else {
        tArray = tArray + ',' + tString
        interaction.reply('Truth added!')
        tchannel.send(tArray)
      }
    })
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'dare') {
    const dchannel = client.channels.cache.get(dareId)
    dchannel.messages.fetch({ limit: 1 }).then(messages => {
      const dArray = messages.first().content
      const dComma = commaCounter(dArray)
      const cblpos = Math.floor(Math.random() * dComma + 1) + 1;
      const cposa = getPosition(dArray, ',', cblpos)
      if(cblpos === 0) {
        let dare = dArray.slice(0, cposa)
        interaction.reply(`Your dare is... ${dare}`)
      } else {
        let cposb = getPosition(dArray, ',', cblpos - 1)
        let dare = dArray.slice(cposb + 1, cposa)
        interaction.reply(`Your dare is... ${dare}`)
      }
    })
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'addwyr') {
    const wyrchannel = client.channels.cache.get(wyrId)
    let wyrString = interaction.options.getString('wyr')
    wyrchannel.messages.fetch({ limit: 1 }).then(messages => {
      let wyrArray = messages.first().content
      if(wyrArray.includes(wyrString)) {
        interaction.reply('What nonsense bro its already there...')
      } else {
        wyrArray = wyrArray + ',' + wyrString
        interaction.reply('Would you rather added!')
        wyrchannel.send(wyrArray)
      }
    })
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'truth') {
    const tchannel = client.channels.cache.get(truthId)
    tchannel.messages.fetch({ limit: 1 }).then(messages => {
      const tArray = messages.first().content
      const tComma = commaCounter(tArray)
      const cblpos = Math.floor(Math.random() * tComma + 1) + 1;
      const cposa = getPosition(tArray, ',', cblpos)
      if(cblpos === 0) {
        let truth = tArray.slice(0, cposa)
        interaction.reply(`Your truth question is... ${truth}`)
      } else {
        let cposb = getPosition(tArray, ',', cblpos - 1)
        let truth = tArray.slice(cposb + 1, cposa)
        interaction.reply(`Your truth question is... ${truth}`)
      }
    })
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'wyr') {
    const wyrchannel = client.channels.cache.get(wyrId)
    wyrchannel.messages.fetch({ limit: 1 }).then(messages => {
      const wyrArray = messages.first().content
      const wyrComma = commaCounter(wyrArray)
      const cblpos = Math.floor(Math.random() * wyrComma + 1) + 1;
      const cposa = getPosition(wyrArray, ',', cblpos)
      if(cblpos === 0) {
        let wyr = wyrArray.slice(0, cposa)
        interaction.reply(`Your would you rather question is... ${wyr}`)
      } else {
        let cposb = getPosition(wyrArray, ',', cblpos - 1)
        let wyr = wyrArray.slice(cposb + 1, cposa)
        interaction.reply(`Your would you rather question is... ${wyr}`)
      }
    })
  }
})

client.login(BOT_TOKEN)
