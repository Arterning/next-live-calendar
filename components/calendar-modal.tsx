"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProModal } from "@/hooks/useModal";
import usePartner from "@/hooks/usePartner";
import useFreeTime from "@/hooks/useFreeTime";
import { useSWRConfig } from "swr";

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const { data: parteners = [] } = usePartner();

  const [partner, setPartner] = useState(parteners[0]?.id);
  const [action, setAction] = useState("1");

  const onSubscribe = async () => {
    let response;

    try {
      setLoading(true);

      console.log(partner, action, proModal.startAt, proModal.date);

      response = await axios.post("/api/reserve", {
        partner,
        action,
        startAt: proModal.startAt,
        date: proModal.date,
      });
      // window.location.reload();

      toast.success("Success");
    } catch (error: AxiosError | any) {
      console.log(error);
      // toast.error(response?.data.message || "Something went wrong");
      console.log(response);

      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
      proModal.onClose();
    }
  };

  const actions = [
    {
      id: "1",
      label: "空闲",
    },
    {
      id: "2",
      label: "预约",
    },
    {
      id: "3",
      label: "取消",
    },
  ];

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Genius
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            <Select onValueChange={setPartner} value={partner}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a 合伙人" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>合伙人</SelectLabel>
                  {parteners.map((partner: Record<string, any>) => (
                    <SelectItem key={partner.id} value={partner.id}>
                      {partner.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={setAction} value={action}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a 类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>类型</SelectLabel>
                  {actions.map((actioin: Record<string, any>) => (
                    <SelectItem key={actioin.id} value={actioin.id}>
                      {actioin.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            className="w-full"
          >
            Submit
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
