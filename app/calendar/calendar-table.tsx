"use client";

import { generateTimeRanges, getHourAndMinute } from "@/lib/utils";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React from "react";
import useReserve from "@/hooks/useReserve";
import usePartner from "@/hooks/usePartner";
import { CalendarIcon, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useFreeTime from "@/hooks/useFreeTime";
import { useProModal } from "@/hooks/useModal";
import { ColumnDef } from "@tanstack/react-table";

export const CalendarTable = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  const { data: parteners = [] } = usePartner();

  const { data: freeTimes = [] } = useFreeTime(format(date, "yyyy-MM-dd"));

  const { data: reserves = [] } = useReserve(format(date, "yyyy-MM-dd"));

  const columns = [
    {
      accessorKey: "reserveAt",
      header: "时间",
    },
  ] as ColumnDef<Record<string, any>>[];

  const partenersCoulumns = parteners.map((partner: Record<string, any>) => ({
    accessorKey: partner.id,
    header: partner.name,
  }));

  columns.push(...partenersCoulumns);

  const proModal = useProModal();

  columns.push({
    accessorKey: "actions",
    header: "操作",
    cell: ({ row }) => {
      const original = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(original.id);
                proModal.onOpen();
                proModal.setStart(original.reserveAt.split(" ")[0]);
                if (date) {
                  proModal.setDate(format(date, "yyyy-MM-dd"));
                }
              }}
            >
              操作
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  });

  const timeRanges = generateTimeRanges();

  const rows = timeRanges.map((timeRange) => {
    const found: any = reserves.find((reverse: Record<string, any>) => {
      return reverse.startAt.trim() == timeRange.start.trim();
    });

    const row: Record<string, any> = {
      reserveAt: timeRange.label,
    };

    partenersCoulumns.map(
      (partner: { accessorKey: string; header: string }) => {
        if (
          found?.partner === partner.header ||
          found?.partner === partner.accessorKey
        ) {
          row[partner.accessorKey] = found.entrepreneur;
        } else {
          const free = freeTimes.find((freeTime: Record<string, any>) => {
            return (
              freeTime.startAt.trim() === timeRange.start.trim() &&
              (freeTime.partner === partner.accessorKey ||
                freeTime.partner === partner.header)
            );
          });
          if (free) {
            row[partner.accessorKey] = "空闲";
          } else {
            row[partner.accessorKey] = "";
          }
        }
      }
    );

    return row;
  });

  return (
    <div className="container mx-auto py-10 flex flex-col gap-5">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "yyyy-MM-dd") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => setDate(date as Date)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <DataTable columns={columns} data={rows} />
    </div>
  );
};

export default CalendarTable;
