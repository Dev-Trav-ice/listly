import { NextResponse } from "next/server";
import Topic from "@/app/models/topics";
import connectDb from "@/app/libs/db";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectDb();
  await Topic.create({ title, description });
  return NextResponse.json({ message: "Topic created" }, { status: 201 });
}

export async function GET() {
  await connectDb();
  const topics = await Topic.find().sort({ createdAt: -1 });
  return NextResponse.json(topics);
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectDb();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "topic deleted" }, { status: 200 });
}
