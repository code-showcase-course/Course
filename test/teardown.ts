import { disconnectFromDatabase } from './setup';

module.exports = async () => {
  await disconnectFromDatabase();
};
