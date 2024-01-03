"use client"

import ImageUpload from "@/components/file-base64-upload";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import toast from "react-hot-toast";

const TestPage = () => {

  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState('');

  return (
    <div>
      <Button
        onClick={() => {
          console.log("clicked");
          toast.success("Hey, You are on Book Page");
          console.log(profileImage, coverImage);
        }}
      >
        Button
      </Button>
      <Button variant="outline" onClick={() => toast.error("Something Wrong")}>
        Cancel
      </Button>
      <Calendar />
      <div className="flex flex-col gap-4 w-1/3">
        <ImageUpload value={profileImage} disabled={isLoading} onChange={(image) => setProfileImage(image)} label="Upload profile image" />
        <ImageUpload value={coverImage} disabled={isLoading} onChange={(image) => setCoverImage(image)} label="Upload cover image" />
      </div>
    </div>
  );
};

export default TestPage;
