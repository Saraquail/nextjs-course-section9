import { connectDatabase, insertDocument } from "../../../helpers/db-util";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email" });
      return;
    }
    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Error connecting to database" });
      return;
    }

    try {
      await insertDocument(client, "emails", { email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Error inserting document" });
      return;
    }

    res.status(201).json({ message: "Success" });
  }
}

export default handler;
