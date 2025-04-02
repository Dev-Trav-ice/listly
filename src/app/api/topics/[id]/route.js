import connectDb from "@/app/libs/db";
import Topic from "@/app/models/topics";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = await params;
  const { title, description } = await request.json();
  await connectDb();
  await Topic.findByIdAndUpdate(id, { title, description }, { new: true });
  return NextResponse.json({ message: "topic updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = await params;
  await connectDb();
  const topic = await Topic.findById(id);
  return NextResponse.json(topic, { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  await connectDb();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "blog deleted" });
}
