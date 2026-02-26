import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

// Simple file-based counter for development
// In production, replace with Upstash Redis or similar
const COUNTER_FILE = path.join(process.cwd(), ".visitor-count");

async function getCount(): Promise<number> {
  try {
    const data = await fs.readFile(COUNTER_FILE, "utf-8");
    return parseInt(data, 10) || 0;
  } catch {
    return 0;
  }
}

async function incrementCount(): Promise<number> {
  const count = (await getCount()) + 1;
  await fs.writeFile(COUNTER_FILE, String(count), "utf-8");
  return count;
}

export async function GET() {
  const count = await getCount();
  return NextResponse.json({ count });
}

export async function POST() {
  const count = await incrementCount();
  return NextResponse.json({ count });
}
