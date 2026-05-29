import Nano from 'nano';

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

const nano = Nano(DATABASE_URL);

export const tasksDb = nano.db.use('tasks');

export const initDb = async (): Promise<void> => {
  const dbName = 'tasks';
  const existing = await nano.db.list();

  if (!existing.includes(dbName)) {
    await nano.db.create(dbName);
    console.log(`Database "${dbName}" created`);
  } else {
    console.log(`Database "${dbName}" already exists`);
  }
};
