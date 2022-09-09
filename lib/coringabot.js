const fs = require("fs");
const path = require( 'path' );

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

  //Selo verificado
  const verified = { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": 'CoringaBot', "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=", "fileLength": "28777", "height": 1080, "width": 1079, "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=", "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=", "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69", "mediaKeyTimestamp": "1610993486", "jpegThumbnail": fs.readFileSync(path.resolve('teste.jpeg'))} } }

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
  // Ping - Serve para verificar se o bot esta recebendo e enviando mensagens
  case 'ping':
    reply('Pong!');
    break;
    
  case 'marcaradms':
    if (!isGroup) return reply("Este comando só funciona em grupos") 
    teks =''
    teks += `Quantidade: ${groupAdmins.length}\n`
    for (let mem of groupAdmins) {
      teks += `╠➥ @${mem.split('@')[0]}\n`          
    }
    reply(teks)
    
    break

  case 'menu':
    await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    sendImg = {
      image: imagem,
      }
    await sock.sendMessage(from, sendImg, {quoted: verified})
    const sections = [
      {
      title: "Menus",
      rows: [
              {title: "👺 𝕸𝖊𝖓𝖚 𝕻𝖗𝖎𝖓𝖈𝖎𝖕𝖆𝖑", rowId: "option1"},
              {title: "💲 𝕸𝖊𝖓𝖚 𝕱𝖎𝖌𝖚𝖗𝖎𝖓𝖍𝖆", rowId: "option2"},
              {title: "👑 𝕸𝖊𝖓𝖚 𝕬𝖉𝖒", rowId: "option3"},
              {title: "🎟️ 𝕸𝖊𝖓𝖚 𝕻𝖗𝖊𝖒𝖎𝖚𝖒", rowId: "option4"},
              {title: "🧸 𝕸𝖊𝖓𝖚 𝕯𝖔𝖓𝖔", rowId: "option5"},
              {title: "📲 𝕸𝖊𝖓𝖚 𝕯𝖔𝖜𝖓𝖑𝖔𝖆𝖉𝖘", rowId: "option6"},
              {title: "𝕲𝖗𝖚𝖕𝖔 𝕻𝖗𝖎𝖓𝖈𝖎𝖕𝖆𝖑 𝖉𝖔 𝕭𝖔𝖙", rowId: "option6"},
            ]
      },
    ]
    var date = new Date();
    var current_date = date.toLocaleDateString();
    var id = mek.key.id;
    var deviceType = id.length > 21 ? 'Android' : id.substring(0, 2) === '3A' ? 'iOS' : 'Web'
    const listMessage = {
      text: "     🎭 🅼🅴🅽🆄 🅻🅸🆂🆃 🎭",
      footer: `User: ${deviceType} | Versão: 1.0 | Data: ${current_date}`,
      title: "    Bem vindo ao 𝕮𝖔𝖗𝖎𝖓𝖌𝖆𝕭𝖔𝖙",
      buttonText: "Ver lista de comandos",
      sections
    }
    await sock.sendMessage(from, listMessage, {quoted: verified})
  break

  //Menu principal do bot
  case 'menu2':
    await sock.sendMessage(from, { audio: { url: (path.resolve('midia/audio/menu.mp3')) }, mimetype: 'audio/mpeg', ptt: true }, {quoted: verified} )
    imagem = fs.readFileSync(path.resolve('teste.png'));
    const menuIMG = {
        image: imagem,
        caption: `
        { MENU PROVISÓRIO }
        ===================
        /menu
        /ping
        /listamembros
        /roubarmembros
        /arquivargp
        /marcar
        /marcaradms
        /ban
        /linkgp
        ===================
        `
    }
  await sock.sendMessage(from, menuIMG)    
  break 

  //COMANDOS DE 𝘼𝘿𝙄𝙈𝙄𝙉𝙄𝙎𝙏𝙍𝘼𝘿𝙊𝙍𝙀𝙎

  case 'linkgp': //Bot tem que ser adm!!
  if (!isBotGroupAdmins) return reply(`O Bot precisa ser administrador para usar esse comando`)
  const linkzin = await sock.groupInviteCode(from)
  reply('https://chat.whatsapp.com/'+linkzin)
  break

  // Ban - Serve para banir alguem de um grupo marcando @ ou respondendo a mensagem
  case 'ban':
    if (!isGroup) return reply(`Este comando só funciona em grupos`)
    if (!isOwner) if (!isGroupAdmins) reply (`Este comando só pode ser usado por Admins`)
    if (!isBotGroupAdmins) return reply(`O Bot precisa ser administrador para usar esse comando`)
      if (mek.message.extendedTextMessage.contextInfo.participant) {
        sock.groupParticipantsUpdate(from, [mek.message.extendedTextMessage.contextInfo.participant], "remove")
        } 
      else if (!mek.message.extendedTextMessage.contextInfo.participant) {
        cucu = body2.slice(6) + '@s.whatsapp.net';
        sock.groupParticipantsUpdate(from, [mek.message.extendedTextMessage.contextInfo.participant], "remove")
      }
  break

  // Arquivargp - Serve para banir todos os integrantes de um grupo
  case 'arquivargp':
    if (!isGroup) return reply(`Este comando só funciona em grupos`)
    if (!isOwner) if (!isGroupAdmins) reply (`Este comando só pode ser usado por Admins`)
    if (!isBotGroupAdmins) return reply(`O Bot precisa ser administrador para usar esse comando`)
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
    if (!isGroup) return reply(`Este comando só funciona em grupos`)
    if (!isOwner) if (!isGroupAdmins) reply (`Este comando só pode ser usado por Admins`)
    if (!isBotGroupAdmins) return reply(`O Bot precisa ser administrador para usar esse comando`)
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
    if (!isGroup) return reply(`Este comando só funciona em grupos`)
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
  
  // Marcar - Serve para marcar todos os membros de um grupo, voce pode tambem deixar uma mensagem (Ex: /marcar Bom Dia)
  case 'marcar':
    if (!isGroup) return reply(`Este comando só funciona em grupos`)
    if (!isOwner) if (!isGroupAdmins) reply (`Este comando só pode ser usado por Admins`)
    members_id = []
    teks = (args2.length > 1) ? body2.slice(8).trim() : ''
    teks += '\n\n'
    for (let mem of groupMetadata.participants) {
        teks += `╠➥ @${mem.id.split('@')[0]}\n`
        members_id.push(mem.id)
    }
    reply(teks)
    break

  

  //Comandos de teste

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