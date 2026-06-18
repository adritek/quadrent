import { response } from 'express';
import Nano from 'nano';

const DATABASE_URL = process.env.COUCHDB_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const nano = Nano(DATABASE_URL);

export const tasksDb = nano.db.use('tasks');

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const initDb = async (retries = 5, delay = 3000): Promise<void> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const existing = await nano.db.list();
      if (!existing.includes('tasks')) {
        await nano.db.create('tasks');
        console.log('Database "tasks" created');
      } else {
        console.log('Database "tasks" already exists');
      }
      return;
    } catch (error) {
      console.log(
        `CouchDB is waking up! Attempt: ${attempt}/${retries}. Retrying in ${delay}ms...`,
      );
      if (attempt === retries) throw error;
      await wait(delay);
    }
  }
};
