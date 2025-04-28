import { Client, GatewayIntentBits } from "discord.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

/* This part of the code sets up event listeners for the Discord client (`client`). */
client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
  console.log(`Received message: ${message.content}`); 
  console.log("message: ", message);
  if (message.author.bot) return;

  if (message.content.startsWith("!shorten")) {
    console.log("Shorten command detected"); 
    const args = message.content.split(" ").slice(1);
    if (args.length < 1) {
      return message.reply(
        "Please provide a URL to shorten. Usage: `!shorten <URL>`"
      );
    }

    const longUrl = args[0];
    console.log(`URL to shorten: ${longUrl}`); 
    try {
      const response = await axios.post("http://localhost:9600/short-url", {
        longUrl,
      });
      const shortUrl = response.data.shortUrl;
      message.reply(`Shortened URL: ${shortUrl}`);
    } catch (error) {
      console.error("Error shortening URL:", error);
      message.reply("Failed to shorten the URL. Please try again.");
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);