const { Client, Storage, ID } = require("node-appwrite");
const { InputFile } = require("node-appwrite/file");

const client = new Client()
  .setEndpoint(process.env.STORAGE_BASE_URL)
  .setProject(process.env.STORAGE_PROJECT_ID)
  .setKey(process.env.STORAGE_API_KEY);

const storage = new Storage(client);

const createFile = async (buffer, name) => {
  try {
    const fileId = ID.unique();
    await storage.createFile(
      process.env.STORAGE_BUCKET_ID,
      fileId,
      InputFile.fromBuffer(buffer, name || fileId)
    );
    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${process.env.STORAGE_BUCKET_ID}/files/${fileId}/view?project=${process.env.STORAGE_PROJECT_ID}`;
    return fileUrl;
  } catch (e) {
    console.log("Error while uploading file:", e);
  }
};

module.exports = {
  createFile,
};
