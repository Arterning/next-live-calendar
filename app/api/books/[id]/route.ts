import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

function authCheck() {
  const { userId } = auth();

  if (!userId) {
    throw new NextResponse("Unauthorized", { status: 401 });
  }

  return userId;
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {

    try {

        const userId = authCheck();

        const values = await req.json();

        const { id } = params;

        const course = await db.book.update({
            where: {
              id,
              userId
            },
            data: {
              ...values,
            }
          });
      
        return NextResponse.json(course);

    } catch(error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    authCheck();

    const deleted = await db.book.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json(deleted);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
