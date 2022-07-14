import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const { eventId } = req.query;
  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, commentText } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !commentText ||
      commentText.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid" });
      return;
    }

    const newComment = { email, name, commentText, eventId };
    let client;

    try {
      await insertDocument(client, "comments", { comment: newComment });
      res.status(201).json({ message: "added comment", result });
    } catch (error) {
      res.status(500).json({ message: "Error inserting document" });
      return;
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error getting documents" });
      return;
    }
  }
  client.close();
}
export default handler;
