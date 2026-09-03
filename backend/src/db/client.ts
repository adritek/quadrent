import Nano from 'nano';

const COUCHDB_URL = process.env.COUCHDB_URL;

if (!COUCHDB_URL) {
  throw new Error('COUCHDB_URL is not defined in environment variables');
}

const nano = Nano(COUCHDB_URL);

export const tasksDb = nano.db.use('tasks');

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const waitForCouchDB = async (retries = 10, delay = 5000): Promise<void> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await nano.info();
      console.log('CouchDB is ready');
      return;
    } catch {
      console.log(
        `CouchDB is waking up! Attempt: ${attempt}/${retries}. Retrying in ${delay}ms...`,
      );
      if (attempt === retries)
        throw new Error('CouchDB failed to respond after maximum retries');
      await wait(delay);
    }
  }
};

export const initDb = async (): Promise<void> => {
  await waitForCouchDB();

  const existing = await nano.db.list();
  if (!existing.includes('tasks')) {
    await nano.db.create('tasks');
    console.log('Database "tasks" created');
  } else {
    console.log('Database "tasks" already exists');
  }
};
