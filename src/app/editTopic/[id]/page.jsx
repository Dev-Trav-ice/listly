"use client";

import { use, useEffect, useState } from "react";
import EditForm from "../../components/EditForm";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

export default function page({ params }) {
  const [topic, setTopic] = useState({});
  const [loading, setLoading] = useState(false);
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [inputs, setInputs] = useState({});

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
  const router = useRouter();

  useEffect(() => {
    getTopic();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EditForm
      title={"Edit Topic"}
      btnName={"save"}
      defaultDescription={topic?.description}
      defaultTitle={topic?.title}
      setInputs={setInputs}
      onSubmit={handleSubmit}
    />
  );
}
