"use client";

export default function EditForm({
  title,
  btnName,
  setInputs,
  onSubmit,
  defaultTitle,
  defaultDescription,
}) {
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="py-4 text-2xl font-bold">{title}</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-6 md:w-[400px]">
        <input
          type="text"
          name="title"
          onChange={handleChange}
          defaultValue={defaultTitle}
          autoComplete="off"
          className="p-4 bg-gray-200 border-none outline-none"
          placeholder="Title"
        />
        <input
          type="text"
          name="description"
          autoComplete="off"
          onChange={handleChange}
          defaultValue={defaultDescription}
          className="p-4 bg-gray-200 border-none outline-none"
          placeholder="Description"
        />
        <button
          type="submit"
          className="w-fit px-6 py-2 text-white bg-green-500 hover:bg-green-400 transition-all rounded-xl cursor-pointer"
        >
          {btnName}
        </button>
      </form>
    </div>
  );
}
