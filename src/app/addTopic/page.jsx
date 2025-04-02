"use client";

import React, { useState } from "react";
import EditForm from "../components/EditForm";
import { useRouter } from "next/navigation";

export default function addTopic() {
  const [inputs, setInputs] = useState({});
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        method: "POST",
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
    <div className="px-2">
      <EditForm
        title={"Add Topic"}
        setInputs={setInputs}
        btnName={"Add Topic"}
        onSubmit={handleSubmit}
      />
      ;
    </div>
  );
}
