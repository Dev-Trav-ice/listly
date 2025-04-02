import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-4 bg-slate-700">
      <Link href={"/"} className="text-white font-bold text-xl">
        Listly
      </Link>
      <Link
        href={"/addTopic"}
        className="bg-white font-semibold text-sm py-1 px-4 rounded-lg"
      >
        Add Topic
      </Link>
    </nav>
  );
}
