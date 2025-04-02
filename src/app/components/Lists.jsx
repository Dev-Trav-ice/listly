"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Loading from "../loading";
import Delete from "./Delete";

export default function Lists() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTopics = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/topics/", {
        cache: "no-store",
        next: { revalidate: 0 },
      });

      if (!res.ok) {
        throw new Error("Error fetching topics");
      }

      const data = await res.json();
      setTopics(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTopics();
  }, []);

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      {topics.length > 0 ? (
        topics.map((topic) => (
          <div
            key={topic._id}
            className="flex items-center justify-between px-4 mt-4 border shadow-lg border-gray-400 rounded-lg py-3"
          >
            <Link href={`/topic/${topic._id}`}>
              <h1 className="text-xl font-bold">{topic.title}</h1>
              <p className="text-sm text-gray-700">{topic.description}</p>
              <span className="text-xs text-gray-600">
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(new Date(topic.createdAt))}
              </span>
            </Link>
            <div className="flex items-center gap-4 text-xl">
              <Link href={`/editTopic/${topic._id}`}>
                <FaEdit className="text-slate-700" />
              </Link>
              <Delete id={topic._id} refresh={getTopics} />
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center mt-4">No topics available.</p>
      )}
    </>
  );
}
