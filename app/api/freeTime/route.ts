import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const param = searchParams.get("date") as string;

    const freeTimes = await db.freeTime.findMany({
      where: {
        date: new Date(param),
      },
    });

    return NextResponse.json(freeTimes);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
