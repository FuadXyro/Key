const approvedRequests = [];
const rejectedRequests = [];

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const groupId = m.chat;
  try {
    const joinRequestList = await conn.groupRequestParticipantsList(groupId);

    switch (command) {
      case "acc":
        const subCommand = args[0];

        switch (subCommand) {
          case "list":
            // Display the list of join requests, including approved and rejected ones
            const formattedList = joinRequestList.map((request, index) => {
              const phoneNumber = request.jid.split('@')[0];
              return (
                `│ \`\`\`${index + 1}. Nomor: ${phoneNumber}\`\`\`\n` +
                `│ \`\`\`Metode: ${request.request_method}\`\`\`\n` +
                `│ \`\`\`Waktu: ${new Date(request.request_time * 1000).toLocaleString()}\`\`\`\n` +
                `├━━━━━━━━━━━━━━━━━━━━━┈─`
              );
            });
            await m.reply("*Daftar Permintaan Bergabung:*\n" + '\n╭━━━━━━━━━━━━━━━━━━━━━┈─◂\n'+ formattedList.join("\n") + '\n╰━━━━━━━━━━━━━━━━━━━━━┈─◂');
            break;

          case "approve":
          case "reject":
            const action = subCommand;
            const requestIndexes = args[1].split("|").map(index => parseInt(index));
            const validIndexes = requestIndexes.filter(index => !isNaN(index) && index > 0 && index <= joinRequestList.length);

            const delayBetweenActions = 200;
            const responseMessages = [];

            async function processRequest(index) {
              if (index < validIndexes.length) {
                const indexToProcess = validIndexes[index];
                const jidToProcess = joinRequestList[indexToProcess - 1].jid;

                try {
                  const response = await conn.groupRequestParticipantsUpdate(groupId, [jidToProcess], action);
                  if (action === "approve") {
                    approvedRequests.push(jidToProcess);
                  } else if (action === "reject") {
                    rejectedRequests.push(jidToProcess);
                  }
                  const phoneNumber = jidToProcess.split('@')[0];
                  const formattedResponse = (
                    `│ \`\`\`${indexToProcess}. Nomor: ${phoneNumber}\`\`\`\n` +
                    `│ \`\`\`Status: ${action}\`\`\`\n` +
                    `│ \`\`\`Time ${action}: ${new Date().toLocaleString()}\`\`\`\n` +
                    `├━━━━━━━━━━━━━━━━━━━━━┈─`
                  );
                  responseMessages.push(formattedResponse);
                } catch (error) {
                  console.error(error);
                  const phoneNumber = jidToProcess.split('@')[0];
                  const errorResponse = `Terjadi kesalahan saat ${action} permintaan bergabung *${phoneNumber}*.`;
                  responseMessages.push(errorResponse);
                }

                setTimeout(() => {
                  processRequest(index + 1);
                }, delayBetweenActions);

                if (index === validIndexes.length - 1) {
                  const allResponses = '\n╭━━━━━━━━━━━━━━━━━━━━━┈─◂\n' + `│ \`\`\`Hasil ${action} :\`\`\`\n` + responseMessages.join("\n") + '\n╰━━━━━━━━━━━━━━━━━━━━━┈─◂';
                  await m.reply(allResponses);
                }
              }
            }

            processRequest(0);
            break;

          case "all":
            const delayBetweenActionsAll = 200;
            const responseMessagesAll = [];

            async function processRequestAll(index) {
              if (index < joinRequestList.length) {
                const jidToProcess = joinRequestList[index].jid;

                try {
                  const response = await conn.groupRequestParticipantsUpdate(groupId, [jidToProcess], "approve");
                  approvedRequests.push(jidToProcess);
                  const phoneNumber = jidToProcess.split('@')[0];
                  const formattedResponse = (
                    `│ \`\`\`${index + 1}. Nomor: ${phoneNumber}\`\`\`\n` +
                    `│ \`\`\`Status: approve\`\`\`\n` +
                    `│ \`\`\`Time approve: ${new Date().toLocaleString()}\`\`\`\n` +
                    `├━━━━━━━━━━━━━━━━━━━━━┈─`
                  );
                  responseMessagesAll.push(formattedResponse);
                } catch (error) {
                  console.error(error);
                  const phoneNumber = jidToProcess.split('@')[0];
                  const errorResponse = `Terjadi kesalahan saat approve permintaan bergabung *${phoneNumber}*.`;
                  responseMessagesAll.push(errorResponse);
                }

                setTimeout(() => {
                  processRequestAll(index + 1);
                }, delayBetweenActionsAll);

                if (index === joinRequestList.length - 1) {
                  const allResponses = '\n╭━━━━━━━━━━━━━━━━━━━━━┈─◂\n' + `│ \`\`\`Hasil approve :\`\`\`\n` + responseMessagesAll.join("\n") + '\n╰━━━━━━━━━━━━━━━━━━━━━┈─◂';
                  await m.reply(allResponses);
                }
              }
            }

            processRequestAll(0);
            break;

          case "allreject":
            const delayBetweenActionsReject = 200;
            const responseMessagesReject = [];

            async function processRequestReject(index) {
              if (index < joinRequestList.length) {
                const jidToProcess = joinRequestList[index].jid;

                try {
                  const response = await conn.groupRequestParticipantsUpdate(groupId, [jidToProcess], "reject");
                  rejectedRequests.push(jidToProcess);
                  const phoneNumber = jidToProcess.split('@')[0];
                  const formattedResponse = (
                    `│ \`\`\`${index + 1}. Nomor: ${phoneNumber}\`\`\`\n` +
                    `│ \`\`\`Status: reject\`\`\`\n` +
                    `│ \`\`\`Time reject: ${new Date().toLocaleString()}\`\`\`\n` +
                    `├━━━━━━━━━━━━━━━━━━━━━┈─`
                  );
                  responseMessagesReject.push(formattedResponse);
                } catch (error) {
                  console.error(error);
                  const phoneNumber = jidToProcess.split('@')[0];
                  const errorResponse = `Terjadi kesalahan saat reject permintaan bergabung *${phoneNumber}*.`;
                  responseMessagesReject.push(errorResponse);
                }

                setTimeout(() => {
                  processRequestReject(index + 1);
                }, delayBetweenActionsReject);

                if (index === joinRequestList.length - 1) {
                  const allResponses = '\n╭━━━━━━━━━━━━━━━━━━━━━┈─◂\n' + `│ \`\`\`Hasil reject :\`\`\`\n` + responseMessagesReject.join("\n") + '\n╰━━━━━━━━━━━━━━━━━━━━━┈─◂';
                  await m.reply(allResponses);
                }
              }
            }

            processRequestReject(0);
            break;

          default:
            await m.reply("Perintah tidak valid. Gunakan 'acc list', 'acc approve|reject [nomor(s)]', atau 'acc all' untuk approve semua, atau 'acc allreject' untuk reject semua.");
        }
        break;

      default:
        await m.reply("Perintah tidak valid. Gunakan 'acc list', 'acc approve|reject [nomor(s)]', atau 'acc all' untuk approve semua, atau 'acc allreject' untuk reject semua.");
    }
  } catch (error) {
    console.error(error);
    await m.reply("Terjadi kesalahan saat mendapatkan daftar permintaan bergabung.");
  }
}

handler.help = ['acc *[opsi] [nomor(s)]*']
handler.tags = ['group']
handler.command = /^(acc)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
handler.fail = null

export default handler;