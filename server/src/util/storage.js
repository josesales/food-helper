const sdk = require("node-appwrite");

const client = new sdk.Client()
  .setEndpoint(process.env.STORAGE_BASE_URL)
  .setProject(process.env.STORAGE_PROJECT_ID)
  .setKey(process.env.STORAGE_API_KEY);

const storage = new sdk.Storage(client);

// async function fetchBuckets() {
//   try {
//     const buckets = await storage.listBuckets();
//     return buckets;
//   } catch (error) {
//     throw error;
//   }
// }

module.exports = {
  storage,
};
