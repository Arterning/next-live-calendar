import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { log } from "console";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { title, description } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const book = await db.book.create({
      data: {
        title,
        description,
        userId,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { title: string } }
) {
  try {
    const { userId } = auth();

    log(params);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const books = await db.book.findMany({
      where: {
        userId: userId,
      },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.log("[COLORS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
