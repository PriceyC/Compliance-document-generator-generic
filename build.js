const fs = require('fs');

// Read index.html
const html = fs.readFileSync('./index.html', 'utf8');

// Replace placeholders with actual environment variables
const updatedHtml = html
    .replace('{{USERNAME}}', process.env.USERNAME)
    .replace('{{PASSWORD}}', process.env.PASSWORD);

// Write updated HTML back
fs.writeFileSync('./index.html', updatedHtml, 'utf8');
console.log('Environment variables injected successfully.');