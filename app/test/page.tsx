"use client"

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import toast from "react-hot-toast";

const TestPage = () => {
  return (
    <div>
      <Button
        onClick={() => {
          console.log("clicked");
          toast.success("Hey, You are on Book Page");
        }}
      >
        Button
      </Button>
      <Button variant="outline" onClick={() => toast.error("Something Wrong")}>
        Cancel
      </Button>
      <Calendar />
    </div>
  );
};

export default TestPage;
