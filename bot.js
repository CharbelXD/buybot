const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');
const Database = require('better-sqlite3');

// Replace with your actual bot token
const bot = new Telegraf('7525322231:AAHTKL7544IejblJaxkh223GHaixriix52A');

// Initialize SQLite database
const db = new Database('database.db');
db.prepare('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY)').run();

// Command to start the bot
bot.start((ctx) => {
  const userId = ctx.from.id;
  db.prepare('INSERT OR IGNORE INTO users (id) VALUES (?)').run(userId);
  ctx.reply('Welcome! Type /help to see available commands.');
});

// Command to get help
bot.help((ctx) => {
  ctx.reply('Here are the commands you can use:\n/start - Start the bot\n/help - Show help message');
});

// Example command to fetch a duck image
bot.command('duck', async (ctx) => {
  try {
    const response = await fetch('https://random-d.uk/api/v2/random');
    const data = await response.json();
    ctx.replyWithPhoto(data.url);
  } catch (error) {
    ctx.reply('Failed to fetch duck image.');
  }
});

// Start the bot
bot.launch().then(() => {
  console.log('Bot is running...');
});
