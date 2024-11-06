import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function Pagination({ length, page, setPage }) {
  const total_pages = Math.ceil(parseInt(length) / 6);

  return (
    <div className="flex flex-wrap justify-end items-center gap-2 pr-[23px] mt-5">
      <button
        className="hover:text-primary p-2 inline-flex items-center gap-2"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        {/* <span className="text-[#76C4EB]">«</span> */}
        <IoIosArrowBack className="text-[#76C4EB]" />
      </button>

      {[...Array(total_pages)].map((a, idx) => (
        <button
          key={idx}
          onClick={() => setPage(idx)}
          className={`w-7 h-7 text-[12px] rounded-md ${
            page === idx
              ? "bg-[#76C4EB] text-background text-white"
              : "border border-[#76C4EB] text-[#76C4EB]"
          }`}
        >
          {idx + 1}
        </button>
      ))}
      <button
        className="hover:text-[#76C4EB] p-2 inline-flex items-center gap-2"
        onClick={() => setPage(page + 1)}
        disabled={page === total_pages - 1}
      >
        {/* <span className="text-[#76C4EB]">»</span> */}
        <IoIosArrowForward className="text-[#76C4EB]" />
      </button>
    </div>
  );
}
