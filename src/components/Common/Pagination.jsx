import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Pagination({ length, page, setPage }) {
  const total_pages = Math.ceil(parseInt(length) / 9);

  return (
    <div className="flex flex-wrap justify-end items-center gap-2 mt-5">
      <button
        className="hover:text-primary p-2 inline-flex items-center gap-2"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}>
        <IoIosArrowBack className="text-[#0077B6]" />
      </button>

      {[...Array(total_pages)].map((a, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx)}
          className={`w-7 h-7 text-[12px] rounded-md ${
            page === idx
              ? "bg-[#76C4EB] text-background text-white"
              : "border border-[#76C4EB] text-[#0077B6]"
          }`}>
          {idx + 1}
        </button>
      ))}
      <button
        className="hover:text-[#0077B6] p-2 inline-flex items-center gap-2"
        onClick={() => setPage(page + 1)}
        disabled={page === total_pages - 1}>
        <IoIosArrowForward className="text-[#0077B6]" />
      </button>
    </div>
  );
}
