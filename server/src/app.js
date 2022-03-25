const { createApp } = require('./api');
const { logger } = require('./utils/utils');

const app = createApp();

app.listen(8080, () => logger.info('Server started listening'));
