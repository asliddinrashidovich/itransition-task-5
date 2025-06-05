import { IoIosArrowDown } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { Fragment, useState } from "react";
import axios from "axios"
import { useQuery } from "@tanstack/react-query";

function Tabel() {
    const [tabs, setTabs] = useState(null)
    
    function toggleExpand(id) {
        setTabs(prev => (prev == id ? null : id))
    }

    async function getData() {
        try {
            const res = await axios.get('http://localhost:3000/api/books?seed=42&locale=de-DE&likes=3.5&reviews=4.7&page=0')
            return res.data
        }
        catch(err) {
            console.log(err)
        }
    }

    const { data: books} = useQuery({
        queryKey: ["data"],
        queryFn: getData,
    });
    console.log(books)
  return (
    <div className="px-[20px] pt-[130px] ">
        <table className="w-full bg-[#fff]">
            <thead>
                <tr className="border-b-[2px] border-[#444]">
                    <td className="min-w-[20px] max-w-[20px]"></td>
                    <td className="min-w-[50px] text-[17px] py-[5px] font-[700]">#</td>
                    <td className="min-w-[200px] text-[17px] py-[5px] font-[700]">ISBN</td>
                    <td className="min-w-[100px] text-[17px] py-[5px] font-[700]">Title</td>
                    <td className="min-w-[100px] text-[17px] py-[5px] font-[700]">Author(s)</td>
                    <td className="min-w-[100px] text-[17px] py-[5px] font-[700]">Publisher</td>
                </tr>
            </thead>
            <thead>
                {books?.books?.map(item => (
                    <Fragment key={item.index}>
                        <tr onClick={() => toggleExpand(item.index)}  className={`border-y-[1px] cursor-pointer border-[#a9a9a9] ${tabs == item.index ? 'bg-[#d2e1fc]' : 'bg-transparent'}`}>
                            <td className="cursor-pointer text-center"><IoIosArrowDown className="text-center mx-auto"/></td>
                            <td className="text-[17px] py-[5px] font-[700]">{item.index}</td>
                            <td className="text-[17px] py-[5px] font-[400]">{item.isbn}</td>
                            <td className="text-[17px] py-[5px] font-[400]">{item.title}</td>
                            <td className="text-[17px] py-[5px] font-[400]">{item.authors}</td>
                            <td className="text-[17px] py-[5px] font-[400]">{item.publisher}</td>
                        </tr>
                        {tabs === item.index && (
                            <tr>
                                <td></td>
                                <td className="w-full" colSpan={5}>
                                    <div className="flex py-[20px] gap-[40px]">
                                        <div>
                                            <div className="max-w-[300px]">
                                                <img src="/image.png" alt="" />
                                            </div>
                                            <button className="bg-[#2c70f4] cursor-pointer flex gap-[5px] px-[10px] mx-auto mt-[10px] items-center rounded-[20px]">
                                                <p className="text-[17px] text-[#fff] px-[7x]">{item.likes}</p>
                                                <AiFillLike className="text-[#fff]"/>
                                            </button>
                                        </div>
                                        <div>
                                            <h2 className="text-[30px] font-[600] capitalize">{item.title} <span className="text-[20px] text-[#666]">Paperback</span></h2>
                                            <h3 className="text-[20px]">by <i>{item.authors}</i></h3>
                                            <p className="text-[18px] text-[#666]">{item.publisher}</p>
                                            <h4 className="text-[20px]">Review</h4>
                                            {item.reviews.map((rev, i) => (
                                                <div key={i}>
                                                    <p className="text-[16px]">{rev.text}</p>
                                                    <p className="text-[16px] text-[#666] mb-[10px]">- {rev.author}, <i>{rev.company}</i></p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </Fragment>
                ))}
            </thead>
        </table>
    </div>
  )
}

export default Tabel