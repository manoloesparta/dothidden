import { logger } from './utils/utils';
import { createApp } from './api'

const app = createApp();

app.listen(8080, () => logger.info('Server started listening'));
