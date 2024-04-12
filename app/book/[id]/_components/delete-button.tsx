"use client";

import { ConfirmModal } from "@/components/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface DeleteButtonProps {
  id?: string;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const router = useRouter();

  const onConfirm = async () => {
    // Implement your delete logic here

    console.log(id);

    const response = await axios.delete(`/api/books/${id}`);

    console.log(response);

    toast.success("Deleted");

    router.push("/book");
  };

  return (
    <ConfirmModal onConfirm={onConfirm}>
      <div className="w-9 mt-5">
        <Button variant="destructive">Delete</Button>
      </div>
    </ConfirmModal>
  );
};

export default DeleteButton;
