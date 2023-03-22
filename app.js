const { Client } = require("whatsapp-web.js");
const fs = require("fs");
const qrcode = require("qrcode-terminal");

let client, sessionData;

const SESSION_FILE_PATH = "./session.json";

const withSession = () => {};

/**
 *
 */

const withoutSession = () => {
  console.log("No auth session stored");
  const client = new Client();

  client.on("qr", (qr) => {
    console.log("QR RECEIVED", qr);
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", (session) => {
    // storing credentials for future use

    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });

  client.on("ready", () => {
    console.log("Client is ready!");
  });

  client.initialize();
};

fs.existsSync(SESSION_FILE_PATH) ? withSession() : withoutSession();
