"use client";

import Delete from "@/app/components/Delete";
import Loading from "@/app/loading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

function page({ params }) {
  const [topic, setTopic] = useState({});
  const [loading, setLoading] = useState(false);
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const router = useRouter();
  const pathName = usePathname();

  const getTopic = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`);
      const data = await res.json();
      setTopic(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getTopic();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white px-6 py-4 mt-8 rounded-lg border md:w-[500px] mx-auto shadow-lg border-gray-300">
        <div>
          <h1 className="text-3xl text-center my-4 font-bold">
            {topic?.title}
          </h1>
          <p className=" text-gray-600">{topic?.description}</p>
          <span className="text-xs text-gray-400 mt-4">{topic?.createdAt}</span>
        </div>
        <div className="flex items-center text-3xl py-6 gap-6">
          <Link href={`/editTopic/${topic?._id}`}>
            <FaEdit className="text-slate-700" />
          </Link>
          <Delete id={topic?._id} router={router} pathName={pathName} />
        </div>
      </div>
    </div>
  );
}

export default page;
