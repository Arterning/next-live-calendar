import React from "react";
import { DataTable } from "./data-table";
import { Payment, columns } from "./columns";

interface IAnalyticsProps {}

const Analytics: React.FC<IAnalyticsProps> = async (props) => {
  async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return [
      {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
      },
      {
        id: "728ed52r",
        amount: 180,
        status: "pending",
        email: "m@example.com",
      },
      // ...
    ];
  }

  const data = await getData();

  return (
    <>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
};

export default Analytics;
