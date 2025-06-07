import Slider from '@mui/material/Slider';
import { MdGridOn } from "react-icons/md";
import { SiMdbook } from "react-icons/si";
import { FaShuffle } from "react-icons/fa6";
import {useNavigate, useSearchParams} from "react-router-dom"
import { useState } from 'react';

function Header() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [seedValue, setSeedValue] = useState()
    const seed = searchParams.get('seed') || seedValue
    const [typeBooks, setTypeBooks] = useState('table')
    const navigate = useNavigate()

    // seed
    function handleSeed() {
        const randomSeed = Math.floor(Math.random() * 1000000);
        setSeedValue(randomSeed)
        searchParams.set('seed', randomSeed)
        setSearchParams(searchParams)
    }
    const handleSeedchange = (e) => {
        const value = parseFloat(e.target.value);
        searchParams.set('seed', value);
        setSearchParams(searchParams);
    };
    
    // lang
    function handleSetLang(e) {
        searchParams.set('lang', e)
        setSearchParams(searchParams)
    }
    
    // liked
    function handleLikes(e, value) {
        searchParams.set('like', value)
        setSearchParams(searchParams)
    }

    // review
    const handleReviewsChange = (e) => {
        const value = parseFloat(e.target.value);
        searchParams.set('reviews', value);
        setSearchParams(searchParams);
    };

    function handleTable() {
        setTypeBooks('table')
        navigate('/')
    }
    function handleCards() {
        setTypeBooks('card')
        navigate('/cards')
    }
  return (
    <header className="px-[20px] md:px-[50px] py-[30px] z-99 fixed w-full bg-[#fff]">
        <div className="flex items-center justify-center flex-col sm:flex-row gap-[10px] md:gap-[20px] lg:gap-[40px]">
            <div className="border-[2px] border-[#e9eaed] p-[5px] rounded-[6px] cursor-pointer w-full">
                <p className="leading-[100%] text-[#777] text-[15px]">Laguage</p>
                <select onChange={(e) => handleSetLang(e.target.value)} name="lang" id="lang" className="outline-none cursor-pointer w-full">
                    <option value="en-US">English</option>
                    <option value="de-DE">German</option>
                    <option value="ru-RU">Russion</option>
                </select>
            </div>
            <div className="border-[2px] relative border-[#e9eaed] p-[5px] rounded-[6px] cursor-pointer w-full">
                <p className="leading-[100%] text-[#777] text-[15px]">Seed</p>
                <input onChange={handleSeedchange} type="number" value={seed} defaultValue={42} className='outline-none w-[60%]'/>
                <button onClick={handleSeed} className='absolute right-[10px] top-[35%] '>
                    <FaShuffle className='cursor-pointer'/>
                </button>
            </div>
            <div className="border-[2px] h-[52px] border-[#e9eaed] p-[5px] rounded-[6px] cursor-pointer w-full">
                <p className="leading-[100%] text-[#777] text-[15px]">Likes</p>
                <Slider aria-label="Small steps" defaultValue={1} onChange={handleLikes} step={0.1} marks  min={0} max={10} valueLabelDisplay="auto" />
            </div>
            <div className="border-[2px] border-[#e9eaed] p-[5px] rounded-[6px] cursor-pointer w-full">
                <p className="leading-[100%] text-[#777] text-[15px]">Review</p>
                <input onChange={handleReviewsChange} type="number" defaultValue={1} className='outline-none w-full' step="0.1" min="0"/>
            </div>
            <div className='rounded-[9px] border-[2px] border-[#2c70f4] flex '>
                <button onClick={handleTable} className={`flex cursor-pointer rounded-l-[7px] justify-center  items-center p-[10px] ${typeBooks == 'table' ? 'bg-[#2c70f4]' : 'bg-[#fff]'}`}>
                    <MdGridOn className={`text-[20px]  ${typeBooks == 'table' ? 'text-[#fff]' : 'text-[#2c70f4]'}`}/>
                </button>
                <button onClick={handleCards} className={`flex cursor-pointer rounded-r-[7px] justify-center items-center ${typeBooks == 'card' ? 'bg-[#2c70f4]' : 'bg-[#fff]'} p-[10px]`}>
                    <SiMdbook className={`text-[20px] ${typeBooks == 'card' ? 'text-[#fff]' : 'text-[#2c70f4]'}`}/>
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header