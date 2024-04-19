import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const param = searchParams.get("reserveAt") as string;

  console.log("param", param);

  try {
    const reserves = await db.reserve.findMany({
      where: {
        reserveAt: new Date(param),
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
          date: new Date(values.date),
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
        // return new NextResponse("必须先合伙人空闲然后才能预约", {
        //   status: 500,
        // });
        return NextResponse.json(
          {
            message: "必须先合伙人空闲然后才能预约",
            code: 500,
          },
          {
            status: 500,
          }
        );
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
