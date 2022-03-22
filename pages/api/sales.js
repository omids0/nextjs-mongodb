import { connectToDatabase } from "../../lib/mongodb";

export default async (req, res) => {
  if (req.method === "GET") {
    const { db } = await connectToDatabase();

    const sales = await db
      .collection("sales")
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    res.json(sales);
  } else if (req.method === "POST") {
    const customer = req.body.customers;
    const { db } = await connectToDatabase();

    const customers = await db.collection("customer").insertOne(req.body.customers);

    res.status(201).json(customers);
  }
};
