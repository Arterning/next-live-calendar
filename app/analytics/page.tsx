import React from "react";
import { DataTable } from "./data-table";
import { getAllParteners, getAllReserve } from "@/lib/calendar";
import { generateTimeRanges } from "@/lib/utils";
import CalendarTable from "./calendar-table";

interface IAnalyticsProps {}

const Analytics: React.FC<IAnalyticsProps> = async (props) => {
  return (
    <>
      <CalendarTable />
    </>
  );
};

export default Analytics;
