const fs = require("fs");
const { writeFile } = require("fs/promises");
const path = require( 'path' );
const axios = require('axios');
const { url } = require("inspector");
const fetch = require('node-fetch');
const Pornsearch = require('pornsearch');
const Loli = require('lolis.life');
const ffmpeg = require("ffmpeg")
const { downloadMediaMessage } = require('@adiwajshing/baileys')
const { allmenu } = require(path.resolve('menus/allmenu'))
const { menuprincipal } = require(path.resolve('menus/menuprincipal'))
const { menuadm } = require(path.resolve('menus/menuadm'))
const { menudono } = require(path.resolve('menus/menudono'))
const { menudownload } = require(path.resolve('menus/menudownload'))
const { menufigurinhas } = require(path.resolve('menus/menufigurinhas'))
const { menuhentai } = require(path.resolve('menus/menuhentai'))
const { menuanime } = require(path.resolve('menus/menuanime'))
const { menuvip } = require(path.resolve('menus/menuvip'))
//Client
module.exports = sock = async(sock, mek, settings, color) => {
 try {
  const from = mek.key.remoteJid;
  const type = Object.keys(mek.message).find((key) => !['senderKeyDistributionMessage', 'messageContextInfo'].includes(key));

  await sock.sendPresenceUpdate('available', from);
  await sock.sendReadReceipt(from, mek.key.participant, [mek.key.id]);
  
  // Algumas funcoes
  // Funcao pra pegar todos os Admins
  const getGroupAdmins = (participants) => {
    admins = []
    for (let i of participants) {
      if(i.admin=='admin'){
        admins.push(i.id)
      }
    }
    return admins
  }
  // Funcao pra responder alguma mensagem
  const reply = (text) => {
    return sock.sendMessage(from, {
    text: text
    }, {
    quoted: mek
    });
  }

  mensagem = {
      spam: '[ ❗ ] Aviso\n\nEsse comando foi usado recentemente... Aguarde 30 segundos antes de usar novamente..._',
      wait: '⌛ Em processo ⌛',
      success: '✔️ Pronto ✔️',
      error: {
        stick: '❌ Falha, ocorreu um erro ao converter a imagem em um adesivo ❌',
        Iv: '❌ Link não é valido ❌'
      },
      only: {
        group: '❌ Este comando só pode ser usado em grupos! ❌',
        ownerB: '❌ Este comando só pode ser usado pelo dono do bot! ❌',
        admin: '❌ Este comando só pode ser usado por admins! ❌',
        adminBot: '❌ Este comando só pode ser usado quando o bot é um administrador! ❌',
        premium: '❌ Esse comando só pode ser usado por pessoas que possui premium ❌'
      }
    }

    

  //Selo verificado
  const verified = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": 'CoringaBot', "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync(path.resolve(settings.fotoMenu))} } }

  // Prefix: /
  const prefix = settings.prefix;
  const budy = (type === 'conversation') ? mek.message.conversation: (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text: ''
  const body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation: (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption: (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption: (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text: (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == 'templateButtonReplyMessage') ? mek.message.templateButtonReplyMessage.selectedId: (type === 'messageContextInfo') ? mek.message[type].singleSelectReply.selectedRowId: (type == 'sock.sendMessageButtonMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId: (type == 'stickerMessage') && ((mek.message[type].fileSha256.toString('base64')) !== null && (mek.message[type].fileSha256.toString('base64')) !== undefined) ? (mek.message[type].fileSha256.toString('base64')): "" || mek.message[type]?.selectedButtonId || ""
  const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
  const isCmd = body.startsWith(prefix);
  const me = sock.user;
  const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
  const isGroup = from.endsWith('@g.us');
  const groupMetadata = isGroup ? await sock.groupMetadata(from): '';
  const groupMembers = isGroup ? groupMetadata.participants : ''
  const sender = isGroup ? (mek.key.participant ? mek.key.participant: mek.participant): mek.key.remoteJid;
  const groupName = isGroup ? groupMetadata.subject: '';
  const owner = settings.owner.filter(obj => obj === sender);
  const isOwner = owner.indexOf(sender) === 0;
  const pushname = mek.pushName || "-";
  const marcaDAgua = settings.marcaDAgua;
  const botVersion = settings.botVersion
  const nomeBot = settings.nomeBot
  const apiKey = settings.apiKey
  //Variaveis de outros bots
  
  const body2 = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'videoMessage') && mek.message[type].caption.startsWith(prefix) ? mek.message[type].caption : (type == 'extendedTextMessage') && mek.message[type].text.startsWith(prefix) ? mek.message[type].text : (type == 'listResponseMessage') && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : (type == 'buttonsResponseMessage') && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : (type == 'stickerMessage') && ((mek.message[type].fileSha256.toString('base64')) !== null && (mek.message[type].fileSha256.toString('base64')) !== undefined) ? (mek.message[type].fileSha256.toString('base64')) : ""
  const args2 = body2.trim().split(/ +/).slice(1)
  const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
  const isGroupAdmins = groupAdmins.includes(sender) || false
  const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
  const content = JSON.stringify(mek.message)
  const isMedia = (type === 'imageMessage' || type === 'videoMessage')
  const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
  const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
  const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')

  ///////////////////////////

  //Mostrar no CMD as mensagens
  if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m CMD \x1b[1;37m]', color(command, "yellow"), 'do', color(pushname, "yellow"), 'Em', color(groupName));
  if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32m MSG \x1b[1;37m]', color("Mensagem", "yellow"), 'do', color(pushname, "yellow"), 'Em', color(groupName));
  

  //Bot em manutencao
  if(settings.manutencao == "true"){
    if(mek.message['conversation'][0]==prefix){
      reply('Bot em manutencao, tente novamente mais tarde')
    }
  }

  //COMANDOS
  switch (command) {

  ///MENUS
  case 'menu':
    await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    sendImg = {
      image: imagem,
      }
    await sock.sendMessage(from, sendImg, {quoted: verified})
    // const sections = [
    //   {
    //   title: "Menus",
    //   rows: [
    //           {title: "👺 𝕸𝖊𝖓𝖚 𝕻𝖗𝖎𝖓𝖈𝖎𝖕𝖆𝖑", rowId: "option1"},
    //           {title: "💲 𝕸𝖊𝖓𝖚 𝕱𝖎𝖌𝖚𝖗𝖎𝖓𝖍𝖆", rowId: "option2"},
    //           {title: "👑 𝕸𝖊𝖓𝖚 𝕬𝖉𝖒", rowId: "option3"},
    //           {title: "🎟️ 𝕸𝖊𝖓𝖚 𝕻𝖗𝖊𝖒𝖎𝖚𝖒", rowId: "option4"},
    //           {title: "🧸 𝕸𝖊𝖓𝖚 𝕯𝖔𝖓𝖔", rowId: "option5"},
    //           {title: "📲 𝕸𝖊𝖓𝖚 𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖘", rowId: "option6"},
    //           {title: "𝕲𝖗𝖚𝖕𝖔 𝕻𝖗𝖎𝖓𝖈𝖎𝖕𝖆𝖑 𝖉𝖔 𝕭𝖔𝖙", rowId: "option6"},
    //         ]
    //   },
    // ]
    const sections = [
      {
      title: "Menus",
      rows: [
              {title: "/menuprincipal", rowId: "option1"},
              {title: "/menufigurinhas", rowId: "option2"},
              {title: "/menudownload", rowId: "option3"},
              {title: "/menuvip", rowId: "option4"},
              {title: "/menudono", rowId: "option5"},
              {title: "/menuhentai", rowId: "option6"},
              {title: "/grupoprincipal", rowId: "option6"},
            ]
      },
    ]

    var date = new Date();
    var current_date = date.toLocaleDateString();
    var id = mek.key.id;
    var deviceType = id.length > 21 ? 'Android' : id.substring(0, 2) === '3A' ? 'iOS' : 'Web'
  
    const listMessage = {
      text: "     🎭 🅼🅴🅽🆄 🅻🅸🆂🆃 🎭",
      footer: `User: ${deviceType} | Versão: ${botVersion} | Data: ${current_date}`,
      title: `    Bem vindo ao ${nomeBot}`,
      buttonText: "Ver lista de comandos",
      sections
     }
  
    await sock.sendMessage(from, listMessage, {quoted: verified})
  break

  //Menu principal do bot
  case 'menuall': case 'menu all':
    await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    var menuIMG = {
        image: imagem,
        caption: allmenu(prefix)
    }
    await sock.sendMessage(from, menuIMG)    
    break 

  case 'menuprincipal': case 'menu principal': 
    // await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve(settings.fotoMenu));
    var menuIMG = {
        image: imagem,
        caption: menuprincipal(prefix)
    }
    await sock.sendMessage(from, menuIMG)    
    break 

  case 'menuadm': case 'menu adm':
    // await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    var menuIMG = {
        image: imagem,
        caption: menuadm(prefix)
    }
    await sock.sendMessage(from, menuIMG)    
    break 

  case 'menudono': case 'menu dono':
    // await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    var menuIMG = {
        image: imagem,
        caption: menudono(prefix)
    }
    await sock.sendMessage(from, menuIMG)    
    break 

  case 'menudownload': case 'menu download':
    // await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    var menuIMG = {
        image: imagem,
        caption: menudownload(prefix)
    }
    await sock.sendMessage(from, menuIMG)    
    break 

  case 'menufigurinhas': case 'menu figurinhas': case 'menufigu': case 'menu figu':
    // await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    var menuIMG = {
        image: imagem,
        caption: menufigurinhas(prefix)
    }
    await sock.sendMessage(from, menuIMG)    
    break 

  case 'menuhentai': case 'menu hentai':
    // await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    var menuIMG = {
        image: imagem,
        caption: menuhentai(prefix)
    }
    await sock.sendMessage(from, menuIMG)    
    break 
  
  case 'menuanime': case 'menu anime':
    // await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    var menuIMG = {
        image: imagem,
        caption: menuanime(prefix)
    }
    await sock.sendMessage(from, menuIMG)    
    break 

  case 'menuvip': case 'menu vip':
    // await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    var menuIMG = {
        image: imagem,
        caption: menuvip(prefix)
    }
    await sock.sendMessage(from, menuIMG)    
    break 
  //////////////////// Fim dos menus

  ///Comandos comuns
  case 'marcaradms':
    if (!isGroup) return reply(mensagem.only.group) 
    teks =''
    teks += `Quantidade: ${groupAdmins.length}\n`
    for (let mem of groupAdmins) {
      teks += `╠➥ @${mem.split('@')[0]}\n`          
    }
    reply(teks)
    break

  case 'cep':
    query = args2.join(' ')
    if(query < 1) reply(mensagem.error.Iv)
    await axios.get(`https://viacep.com.br/ws/${query}/json/`).then(res => {
      sock.sendMessage(from, {text: 
  `Cep: ${res.data.cep}
Logradouro: ${res.data.logradouro}
Localidade: ${res.data.localidade}
Bairro: ${res.data.bairro}
DDD: ${res.data.ddd}
Complemento: ${res.data.complemento}
Uf: ${res.data.uf}
Ibge: ${res.data.ibge}
Gia: ${res.data.gia}
Siafi: ${res.data.siafi}`}, {quoted: mek})
    }) 
    break

  case 'imagem':
  query = args2.join(' ')
  if(query < 1) reply(mensagem.error.Iv)
  await axios.get(`https://imsea.herokuapp.com/api/1?q=${query}`).then(res => {
    array = res.data.results
    random= Math.floor(Math.random() * array.length);
    if(random==0){
      reply("Erro, pesquise por uma imagem normal")
      return
    }else{
      sock.sendMessage(from, {image: {url:`${array[random]}`} }, {quoted: mek})
    }
    
  }) 
  break

  case 'cc':
  await axios.get(`https://fakerapi.it/api/v1/credit_cards?_quantity=1`).then(res => {
    array = res.data.data[0]
    // reply(`${JSON.stringify(array)}`)
    sock.sendMessage(from, {text:
`*Bandeira:* ${array['type']}
*Titular:* ${array['owner']}
*Número:* ${array['number']}
*Expira em:* ${array['expiration']}`}, {quoted: mek})
    
  }) 
  break

  case 'ytmp4':
    query = args2.join(' ')
    if(query < 1) reply(mensagem.error.Iv)
    query = query.replace("https://www.youtube.com/watch?v=", '');
    await axios({ 
      method: 'get',
      url: `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${query}`,
      headers:
      {
      "X-RapidAPI-Key": apiKey, 
      "X-RapidAPI-Host": "ytstream-download-youtube-videos.p.rapidapi.com"
      } }).then(async res => {
        reply("Baixando... Aguarde");

        var response = await fetch(res.data.formats[2].url);
        var buffer = await response.buffer();
        fs.writeFile(path.resolve('name.mp4'), buffer, async () => {
        console.log('Finished downloading video!'),
            await sock.sendMessage(from, { 
            video: fs.readFileSync(path.resolve('name.mp4')),
            caption: "Pronto!"
          }, {quoted: mek})
          
        fs.unlinkSync(path.resolve("name.mp4")) 
        })
        sock.sendMessage(from, { text:`Titulo: ${res.data.title}
Video: ${res.data.formats[2].url}` } , { quoted: mek }); 
      })
    break

    
  case 'ytmp3':
    query = args2.join(' ')
    if(query < 1) reply(mensagem.error.Iv)
    query = query.replace("https://www.youtube.com/watch?v=", '');
    await axios({ 
      method: 'get',
      url: `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${query}`,
      headers:
      {
      "X-RapidAPI-Key": apiKey, 
      "X-RapidAPI-Host": "ytstream-download-youtube-videos.p.rapidapi.com"
      } }).then(async res => {
        reply("Baixando... Aguarde");

        var response = await fetch(res.data.formats[0].url);
        var buffer = await response.buffer();
        var file = path.resolve('name.mp3')
        fs.writeFile(file, buffer, async () => {
        console.log('Finished downloading video!'),
            await sock.sendMessage(from, { 
            audio: fs.readFileSync(file), mimetype: 'audio/mp4' 
          }, {quoted: mek})
          
        fs.unlinkSync(file) 
        })
      })
    break

  case 'sticker': case 's': case 'stiker': case 'stick':
    if (!mek.message) return reply(mensagem.error.stick)// if there is no text or media message
    const messageType = Object.keys (mek.message)[0]// get what type of message it is -- text, image, video
    // if the message is an image
    if (messageType === 'imageMessage' || messageType === 'videoMessage') {
      // download the message
      const buffer = await downloadMediaMessage(
          mek, 'buffer',
      )
      // save to file
      file = path.resolve('sticker.jpeg')
      
      await writeFile(file, buffer)
      imagem = fs.readFileSync(file);
      await sock.sendMessage(from, 
        {
          sticker:imagem
        }, 
        {
          quoted: mek
        })
        fs.unlinkSync(file)
    }
    break

  //Comandos NSFW
  case 'loli':
    const loli = new Loli();
      await loli.getSFWLoli().then(async res => {
        var response = await fetch(res.url)
        
        var buffer = await response.buffer();
        fs.writeFile(path.resolve('midia/nsfw/waifu/name.jpeg'), buffer, async () => {
        var data = await new ffmpeg(path.resolve('midia/nsfw/waifu/name.jpeg'))
        var watermarkPath = path.resolve(marcaDAgua)
        var newFilepath = path.resolve('midia/nsfw/waifu/name2.jpeg')
    
        var settings = {
            position: "SE", // Position: NE NC NW SE SC SW C CE CW
            margin_nord: null, // Margin nord
            margin_sud: null, // Margin sud
            margin_east: null, // Margin east
            margin_west: null // Margin west
        }
        // deletes any existing data so we can replace it
        if(fs.existsSync(newFilepath)){
          fs.unlinkSync(newFilepath)
        }
        // creates our watermarked data
        data.fnAddWatermark(watermarkPath, newFilepath, settings)
        // reply("marca de agua aplicada")
      })
      await sock.sendMessage(from, {image: fs.readFileSync(path.resolve('midia/nsfw/waifu/name2.jpeg')) }, {quoted: mek})    
      }) 

    break

  case 'waifu':
    await axios.get("https://api.waifu.pics/nsfw/waifu").then(async res => {
      var response = await fetch(res.data.url);
      var buffer = await response.buffer();
      fs.writeFile(path.resolve('midia/nsfw/waifu/name.jpeg'), buffer, async () => {
      var video = await new ffmpeg(path.resolve('midia/nsfw/waifu/name.jpeg'))
      var watermarkPath = path.resolve(marcaDAgua)
      var newFilepath = path.resolve('midia/nsfw/waifu/name2.jpeg')
  
      var settings = {
          position: "SE", // Position: NE NC NW SE SC SW C CE CW
          margin_nord: null, // Margin nord
          margin_sud: null, // Margin sud
          margin_east: null, // Margin east
          margin_west: null // Margin west
      }
      // deletes any existing video so we can replace it
      if(fs.existsSync(newFilepath)){
        fs.unlinkSync(newFilepath)
      }
      // creates our watermarked video
      video.fnAddWatermark(watermarkPath, newFilepath, settings)
      // reply("marca de agua aplicada")
    })
    await sock.sendMessage(from, {image: fs.readFileSync(path.resolve('midia/nsfw/waifu/name2.jpeg')) }, {quoted: mek})    
    }) 
    break

  case 'neko':
    await axios.get("https://api.waifu.pics/nsfw/neko").then(async res => {
      var response = await fetch(res.data.url);
      var buffer = await response.buffer();
      fs.writeFile(path.resolve('midia/nsfw/neko/name.jpeg'), buffer, async () => {
      var video = await new ffmpeg(path.resolve('midia/nsfw/neko/name.jpeg'))
      var watermarkPath = path.resolve(marcaDAgua)
      var newFilepath = path.resolve('midia/nsfw/neko/name2.jpeg')
  
      var settings = {
          position: "SE", // Position: NE NC NW SE SC SW C CE CW
          margin_nord: null, // Margin nord
          margin_sud: null, // Margin sud
          margin_east: null, // Margin east
          margin_west: null // Margin west
      }
      // deletes any existing video so we can replace it
      if(fs.existsSync(newFilepath)){
        fs.unlinkSync(newFilepath)
      }
      // creates our watermarked video
      video.fnAddWatermark(watermarkPath, newFilepath, settings)
      // reply("marca de agua aplicada")
    })
      sock.sendMessage(from, {image: fs.readFileSync(path.resolve('midia/nsfw/neko/name2.jpeg')) }, {quoted: mek})
    }) 
    break
  case 'blowjob':
    await axios.get("https://api.waifu.pics/nsfw/blowjob").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'neko2':
    await axios.get("https://neko-love.xyz/api/v1/nekolewd").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break

  case 'redtube':
    query = args2.join(' ')
    if(query < 1) reply(mensagem.error.Iv)
    const Searcher = new Pornsearch(query, driver = 'redtube');
    Searcher.videos()
    .then(async videos => {
      link = videos[0].url,
      formatedLink = link.replace("https://www.redtube.com/", ""),
      console.log(formatedLink)
      await axios.get(`https://appsdev.cyou/xv-ph-rt/api/?site_id=redtube&video_id=${formatedLink}`)
      .then(res => {
        array = JSON.parse(JSON.stringify(res.data))
        // video = array.mp4['1080p'] ? array.mp4['1080p']=='' : video = array.mp4['720p'];
        video = array.mp4['720p'];
        console.log(video);
        return video   
      }).then( async video =>{
        reply("Baixando... Aguarde");
        var response = await fetch(video);
        var buffer = await response.buffer();
        fs.writeFile(path.resolve('name.mp4'), buffer, async () => {
        console.log('Finished downloading video!'),
            await sock.sendMessage(from, { 
            video: fs.readFileSync(path.resolve('name.mp4')),
            caption: "Pronto!"
          }, {quoted: mek})
          
        fs.unlinkSync(path.resolve("name.mp4")) 
        })
      })
    })
    break

  /// COMANDOS DE ANIME
  case 'shinobu':
    await axios.get("https://api.waifu.pics/sfw/shinobu").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'megumin':
    await axios.get("https://api.waifu.pics/sfw/megumin").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'bully':
    await axios.get("https://api.waifu.pics/sfw/bully").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'cuddle':
    await axios.get("https://api.waifu.pics/sfw/cuddle").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'cry':
    await axios.get("https://api.waifu.pics/sfw/cry").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'hug':
    await axios.get("https://api.waifu.pics/sfw/hug").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'awoo':
    await axios.get("https://api.waifu.pics/sfw/awoo").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'kiss':
    await axios.get("https://api.waifu.pics/sfw/kiss").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'lick':
    await axios.get("https://api.waifu.pics/sfw/lick").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'pat':
    await axios.get("https://api.waifu.pics/sfw/pat").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'smug':
    await axios.get("https://api.waifu.pics/sfw/smug").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'bonk':
    await axios.get("https://api.waifu.pics/sfw/bonk").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'yeet':
    await axios.get("https://api.waifu.pics/sfw/yeet").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'blush':
    await axios.get("https://api.waifu.pics/sfw/blush").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'smile':
    await axios.get("https://api.waifu.pics/sfw/smile").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'wave':
    await axios.get("https://api.waifu.pics/sfw/wave").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'highfive':
    await axios.get("https://api.waifu.pics/sfw/highfive").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'handhold':
    await axios.get("https://api.waifu.pics/sfw/handhold").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'nom':
    await axios.get("https://api.waifu.pics/sfw/nom").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'bite':
    await axios.get("https://api.waifu.pics/sfw/bite").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'glomp':
    await axios.get("https://api.waifu.pics/sfw/glomp").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'slap':
    await axios.get("https://api.waifu.pics/sfw/slap").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'kill':
    await axios.get("https://api.waifu.pics/sfw/kill").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'kick':
    await axios.get("https://api.waifu.pics/sfw/kick").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'happy':
    await axios.get("https://api.waifu.pics/sfw/happy").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'poke':
    await axios.get("https://api.waifu.pics/sfw/poke").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'dance':
    await axios.get("https://api.waifu.pics/sfw/dance").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break
  case 'cringe':
    await axios.get("https://api.waifu.pics/sfw/cringe").then(res => {
      sock.sendMessage(from, {image: {url: res.data.url} }, {quoted: mek})
    }) 
    break


  /// COMANDOS DE 𝘼𝘿𝙄𝙈𝙄𝙉𝙄𝙎𝙏𝙍𝘼𝘿𝙊𝙍𝙀𝙎
  case 'linkgp':
    if (!isBotGroupAdmins) return reply(mensagem.only.adminBot)
    const linkzin = await sock.groupInviteCode(from)
    reply('https://chat.whatsapp.com/'+linkzin)
    break

  // Ban - Serve para banir alguem de um grupo marcando @ ou respondendo a mensagem
  case 'ban':
    if (!isGroup) return reply(mensagem.only.group)
    if (!isOwner) if (!isGroupAdmins) reply (mensagem.only.admin)
    if (!isBotGroupAdmins) return reply(mensagem.only.adminBot)
      if (mek.message.extendedTextMessage.contextInfo.participant) {
        sock.groupParticipantsUpdate(from, [mek.message.extendedTextMessage.contextInfo.participant], "remove")
        } 
      else if (!mek.message.extendedTextMessage.contextInfo.participant) {
        cucu = body2.slice(6) + '@s.whatsapp.net';
        sock.groupParticipantsUpdate(from, [mek.message.extendedTextMessage.contextInfo.participant], "remove")
      }
  break

  // Marcar - Serve para marcar todos os membros de um grupo, voce pode tambem deixar uma mensagem (Ex: /marcar Bom Dia)
  case 'marcar':
    if (!isGroup) return reply(mensagem.only.group)
    if (!isOwner) if (!isGroupAdmins) reply (mensagem.only.admin)
    members_id = []
    teks = (args2.length > 1) ? body2.slice(8).trim() : ''
    teks += '\n\n'
    for (let mem of groupMetadata.participants) {
        teks += `╠➥ @${mem.id.split('@')[0]}\n`
        members_id.push(mem.id)
    }
    reply(teks)
    break

  // Ping - Serve para verificar se o bot esta recebendo e enviando mensagens
  case 'ping':
    reply('Pong!');
    break;
  //////////////////// Fim dos comandos adm

  /// COMANDOS DE VIPS
  // Arquivargp - Serve para banir todos os integrantes de um grupo
  case 'arquivargp':
    if (!isGroup) return reply(mensagem.only.group)
    if (!isOwner) if (!isGroupAdmins) reply (mensagem.only.admin)
    if (!isBotGroupAdmins) return reply(mensagem.only.adminBot)
    reply(`Okay`)
    members_id = []
    teks = (args2.length > 1) ? body.slice(8).trim() : ''
    teks += '\n\n'  
    for (let mem of groupMetadata.participants) {
        teks += `${mem.id.split('@')}\n`
        members_id.push(mem.id)
    }

    for (let ix = 0; ix < members_id.length; ix++){
      
      if( members_id[ix] == settings.owner[0] ||  members_id[ix] == settings.owner2[0] ||  members_id[ix] == settings.owner3[0] ||  members_id[ix] == settings.botNumber[0]){
        reply('Não posso banir meus donos')
      }else{
        sock.groupParticipantsUpdate(from, [members_id[ix]], "remove")    
      }
      //sleep de 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2800));
    
    }
    reply('Grupo arquivado com sucesso!')
  break
  
  // Listamembros - Cria uma lista de membros daquele grupo, para usar futuramente para Roubar Membros e trazer para o seu grupo
  case 'listamembros':
    if (!isGroup) return reply(mensagem.only.group)
    if (!isOwner) if (!isGroupAdmins) reply (mensagem.only.admin)
    if (!isBotGroupAdmins) return reply(mensagem.only.adminBot)
    members_id = []
    teks = (args2.length > 1) ? body2.slice(8).trim() : ''
    for (let mem of groupMetadata.participants) {
        teks += `${mem.id},`
        members_id.push(teks)
    }
    fs.writeFile('membersList.txt', teks, (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;
    
        // success case, the file was saved
        console.log('Membros salvos!');
    });
    reply('Lista de membros criada com sucesso')
  break
  
  // Roubarmembros - Funciona em sincronia com o Listamembros e serve para trazer todos os membros da lista para o grupo desejado
  case 'roubarmembros':
    if (!isGroup) return reply(mensagem.only.group)
    if (!fs.existsSync('./membersList.txt') ) {
        reply(
        `Primeiro você precisa criar a lista de membros do grupo que deseja roubar os membros \n Vá até o grupo alvo em que o bot se encontra e digite:
        /listamembros`)
    } 
    try {
    var memlist = fs.readFileSync('membersList.txt');
    const arr = memlist.toString().split(',');
    memarray = []

    for(let i of arr) {
      memarray.push(i)
    }
      memarray.pop()
      console.log(memarray);
      for(let x in memarray){
          
        sock.groupParticipantsUpdate(from, [memarray[x]], "add")
        //sleep de 2 segundos
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    } catch (e) {
        console.log('Error :', e)
        reply('Falha ao adicionar usuário,talvez ele esteja com privacidade ativada para contatos')
    }
    reply('Membros adicionados com sucesso')
    break
  //////////////////// Fim dos comandos vip
  


  ///Comandos de teste
  case 'watermark':
      var video = await new ffmpeg(path.resolve('name.mp4'))
      var watermarkPath = path.resolve(settings.marcaDAgua)
      var newFilepath = path.resolve('namex.mp4')
  
      var settings = {
          position: "SE", // Position: NE NC NW SE SC SW C CE CW
          margin_nord: null, // Margin nord
          margin_sud: null, // Margin sud
          margin_east: null, // Margin east
          margin_west: null // Margin west
      }
  
      // deletes any existing video so we can replace it
      // fs.unlinkSync(newFilepath)
  
      // creates our watermarked video
      video.fnAddWatermark(watermarkPath, newFilepath, settings)
      reply("marca de agua aplicada")

    break

  case 'eval':
    if (!isOwner) return reply('Recurso privado para meu dono!');
    try {
     eval(`(async () => {
      try {
      await reply('× [ Eval ] Comando executado!');
      ${budy.slice(5)}
      } catch(err) {
      console.log("Error : %s", color(err, "red"));
      reply(String(err));
      }
      })();`);
    } catch(err) {
     reply(String(err));
     console.log("Error : %s", color(err, "red"));
    }
    break;

   default:
    // code
   }
   /* code */
  } catch (e) {
   err = String(e);
   console.log("Error : %s", color(err, "red"));
  };
 }

 let file = require.resolve(__filename);
 fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update file: ${__filename}`);
  delete require.cache[file];
  require(file);
 });