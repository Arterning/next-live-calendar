"use server";

import { db } from "@/lib/db";

export async function getAllReserve() {
  return await db.reserve.findMany({
    orderBy: {
      reserveAt: "desc",
    },
  });
}

export async function getAllParteners() {
  return await db.member.findMany({
    where: {
      isPartner: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function createReserve() {}
