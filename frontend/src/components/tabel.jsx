import { IoIosArrowDown } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { Fragment, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { debounce } from "lodash";

const API = import.meta.env.VITE_BOOK_API;

function Tabel() {
  const [tabs, setTabs] = useState(null);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [countSkroll, setCountScoll] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  const lang = searchParams.get("lang") || "en-US";
  const like = searchParams.get("like") || 1;
  const seed = searchParams.get("seed") || 42;
  const review = searchParams.get("reviews") || 1;

  function toggleExpand(id) {
    setTabs((prev) => (prev == id ? null : id));
  }

  async function getData() {
    try {
      const res = await axios.get(
        `${API}/api/books?seed=${seed}&locale=${lang}&likes=${like}&reviews=${review}&count=${countSkroll}&page=0`
      );
      if (res.data.books.length < countSkroll) {
        setHasMore(false);
      }
      return res.data;
    } catch (err) {
      console.log(err);
      return { books: [] };
    }
  }

  const { data: books } = useQuery({
    queryKey: ["data", seed, like, review, lang, countSkroll],
    queryFn: getData,
  });

  const handleScroll = useCallback(
    debounce(() => {
      if (loading || !hasMore) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        loadMoreItems();
      }
    }, 300),
    [loading, hasMore]
  );

  const loadMoreItems = useCallback(() => {
    setLoading(true);
    setCountScoll((prev) => prev + 10);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  return (
    <div className="px-[20px] pt-[350px] sm:pt-[110px] overflow-x-auto">
      <table className="w-full bg-[#fff]">
        <thead className="sticky top-0 bg-[#fff] z-10">
          <tr className="border-b-[2px] border-[#444]">
            <td className="min-w-[40px] text-[#fff]">.</td>
            <td className="min-w-[50px] text-[17px] py-[5px] font-[700]">#</td>
            <td className="min-w-[200px] text-[17px] py-[5px] font-[700]">ISBN</td>
            <td className="min-w-[200px] text-[17px] py-[5px] font-[700]">Title</td>
            <td className="min-w-[200px] text-[17px] py-[5px] font-[700]">Author(s)</td>
            <td className="min-w-[200px] text-[17px] py-[5px] font-[700]">Publisher</td>
          </tr>
        </thead>
        <tbody>
          {books?.books?.map((item) => (
            <Fragment key={item.index}>
              <tr
                onClick={() => toggleExpand(item.index)}
                className={`border-y-[1px] cursor-pointer border-[#a9a9a9] ${
                  tabs == item.index ? "bg-[#d2e1fc]" : "bg-transparent"
                }`}
              >
                <td className="cursor-pointer w-[40px]">
                  {tabs != item.index && <IoIosArrowDown className="text-center mx-auto" />}
                  {tabs == item.index && (
                    <IoIosArrowDown className="text-center rotate-[180deg] mx-auto" />
                  )}
                </td>
                <td className="text-[17px] py-[5px] font-[700]">{item.index}</td>
                <td className="text-[17px] py-[5px] font-[400]">{item.isbn}</td>
                <td className="text-[17px] py-[5px] font-[400] pr-[10px]">{item.title}</td>
                <td className="text-[17px] py-[5px] font-[400]">{item.authors}</td>
                <td className="text-[17px] py-[5px] font-[400]">{item.publisher}</td>
              </tr>
              {tabs === item.index && (
                <tr>
                  <td></td>
                  <td className="w-full" colSpan={5}>
                    <div className="flex py-[20px] gap-[40px]">
                      <div>
                        <div className="w-[200px] h-[300px] text-center">
                          <img src={item.coverImage} alt="cover image" />
                        </div>
                        <button className="bg-[#2c70f4] cursor-pointer flex gap-[5px] px-[10px] mx-auto mt-[10px] items-center rounded-[20px]">
                          <p className="text-[17px] text-[#fff] px-[7x]">{item.likes}</p>
                          <AiFillLike className="text-[#fff]" />
                        </button>
                      </div>
                      <div>
                        <h2 className="text-[30px] font-[600] capitalize">
                          {item.title} <span className="text-[20px] text-[#666]">Paperback</span>
                        </h2>
                        <h3 className="text-[20px]">
                          by <i>{item.authors}</i>
                        </h3>
                        <p className="text-[18px] text-[#666]">{item.publisher}</p>
                        <h4 className="text-[20px]">Review</h4>
                        {item.reviews.map((rev, i) => (
                          <div key={i}>
                            <p className="text-[16px]">{rev.text}</p>
                            <p className="text-[16px] text-[#666] mb-[10px]">
                              - {rev.author}, <i>{rev.company}</i>
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      {loading && (
        <div className="text-center py-[20px]">
          <ClipLoader />
        </div>
      )}
    </div>
  );
}

export default Tabel;