import React from "react";
import CalendarTable from "./calendar-table";

interface ICalendarPageProps {}

const CalendarPage: React.FC<ICalendarPageProps> = async (props) => {
  return (
    <>
      <CalendarTable />
    </>
  );
};

export default CalendarPage;
