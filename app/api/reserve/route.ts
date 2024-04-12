import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { reserveAt: Date } }
) {
  console.log("param", params);
  try {
    const reserves = await db.reserve.findMany({
      where: {
        reserveAt: params?.reserveAt,
      },
      orderBy: {
        reserveAt: "desc",
      },
    });

    return NextResponse.json(reserves);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const values = await req.json();

    console.log(values, userId);

    if (values.action === "1") {
      await db.freeTime.create({
        data: {
          partner: values.partner,
          startAt: values.startAt,
        },
      });
    }

    if (values.action === "2") {
      const free = await db.freeTime.findMany({
        where: {
          partner: values.partner,
          startAt: values.startAt,
        },
      });

      console.log(free);

      if (free.length === 0) {
        throw new Error("Free time not found");
      }

      const user = await clerkClient.users.getUser(userId);
      console.log(user);

      await db.reserve.create({
        data: {
          partner: values.partner,
          startAt: values.startAt,
          endAt: values.startAt,
          entrepreneur: user.username || "",
          reserveAt: new Date(),
        },
      });
    }

    if (values.action === "3") {
      await db.reserve.deleteMany({
        where: {
          partner: values.partner,
          startAt: values.startAt,
        },
      });
    }

    return NextResponse.json(values);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
