import axios from 'axios';
import logger from '../logger/logger.js';

const adsOpenBrowser = async (userId) => {
  logger.info('Calling adsOpenBrowser');
  try {
    const response = await axios(`http://local.adspower.net:50325/api/v1/browser/start?user_id=${userId}`);
    const data = response.data;
    logger.info('adsOpenBrowser response received');
    logger.info('Full response data:', JSON.stringify(data, null, 2));

    if (!data || !data.data || !data.data.ws || !data.data.ws.puppeteer) {
      throw new Error('Invalid response structure: ws.puppeteer URL not found');
    }

    return data;
  } catch (e) {
    logger.error(`Error in adsOpenBrowser: ${e.message}`);
    return null;
  }
};

export default adsOpenBrowser;
