const { createApp } = require('./api');

const app = createApp();

app.listen(8080, () => console.log('listening on *:8080'));
