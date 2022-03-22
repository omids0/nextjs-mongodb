import axios from "axios";
import { useEffect,useState } from "react";
import { connectToDatabase } from "../lib/mongodb";

export default function Sales({ sales }) {
  const [customers, setcustomers] = useState({
        customerName: 'omid',
        customerId: 'omids0',
        phoneNum: '09354403007',
      });
      
  let uniqId = Date.now();

  const response = fetch("/api/sales")
    .then((response) => response.json())
    .then((data) => console.log(data));

  const postHandler = async () => {
    const response = await fetch("/api/sales", {
      method: "POST",
      body: JSON.stringify({ customers }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div>
      <h1>List of Sales:</h1>
      <button onClick={postHandler}>Click me babe</button>
      {sales.map((item) => (
        <div key={item._id}>
          <h3>{`${item.storeLocation} (${item.purchaseMethod}):`}</h3>
          <ol>
            {item.items.map((sale) => (
              <li>{`${sale.name} | ${Object.values(sale.price)}$ * ${
                sale.quantity
              } => ${Object.values(sale.price) * sale.quantity}`}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("sales")
    .find({})
    .sort({ metacritic: -1 })
    .limit(100)
    .toArray();

  return {
    props: {
      sales: JSON.parse(JSON.stringify(movies)),
    },
  };
}
