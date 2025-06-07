import axios from "axios"
import { useQuery } from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom"
import {ClipLoader} from "react-spinners"
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_BOOK_API

function Cards() {
    const [searchParams] = useSearchParams()
    const [loading, setLoading] = useState(false);
    const [countSkroll, setCountScoll] = useState(20)
    
    const lang = searchParams.get('lang') || "en-US"
    const like = searchParams.get('like') || 1
    const seed = searchParams.get('seed') || 40
    const review = searchParams.get('reviews') || 1

    async function getData() {
        try {
            const res = await axios.get(`${API}/api/books?seed=${seed}&locale=${lang}&likes=${like}&reviews=${review}&count=${countSkroll}&page=0`)
            return res.data
        }
        catch(err) {
            console.log(err)
        }
    }

    const { data: books} = useQuery({
        queryKey: ["data", seed, like, review, lang, countSkroll],
        queryFn: getData,
    });

     // skroling
    const handleScroll = () => {
        if (loading) return;
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const fullHeight = document.documentElement.scrollHeight;
        if (scrollTop + windowHeight >= fullHeight - 100) {
            loadMoreItems();
        }
    };
    const loadMoreItems = () => {
        setLoading(true);
        setTimeout(() => {
            setCountScoll(prev => prev += 10)
            setLoading(false);
        }, 2000); 
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, [loading]);
  return (
    <div className="px-[20px] md:px-[80px] pt-[350px] sm:pt-[110px] ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
            {books?.books?.map(item => (
                <div key={item.index}>
                    <div className="rounded-[10px] shadow-xl p-[20px] h-[600px]">
                        <div className="w-full ">
                            <img src={item.coverImage} className="w-[150px] mx-auto object-contain" alt="coverimage" />
                        </div>
                        <div>
                            <h2 className="text-[30px] font-[600] capitalize">{item.title} <span className="text-[20px] text-[#666]">Paperback</span></h2>
                            <h3 className="text-[20px]">by <i>{item.authors}</i></h3>
                            <p className="text-[18px] text-[#666]">{item.publisher}</p>
                            <h4 className="text-[20px] mb-[20px]">Review</h4>
                            {item.reviews.map((rev, i) => (
                                <div key={i}>
                                    <p className="text-[16px]">{rev.text}</p>
                                    <p className="text-[16px] text-[#666] mb-[10px]">- {rev.author}, <i>{rev.company}</i></p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        {loading && (
            <div className="text-center py-[20px]">
                <ClipLoader />
            </div>)}
    </div>
  )
}

export default Cards