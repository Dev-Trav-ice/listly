"use client";

import { usePathname, useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";

export default function Delete({ id, refresh }) {
  const router = useRouter();
  const pathName = usePathname();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete?")) return;

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete the item.");
      }

      if (pathName !== "/") {
        router.push("/");
      }
      if (refresh) {
        refresh();
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting item. Please try again.");
    }
  };

  return (
    <button className="cursor-pointer" onClick={handleDelete}>
      <MdDelete className="text-red-700" />
    </button>
  );
}
