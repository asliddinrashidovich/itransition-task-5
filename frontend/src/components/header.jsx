import Slider from '@mui/material/Slider';
import { MdGridOn } from "react-icons/md";
import { SiMdbook } from "react-icons/si";

function Header() {
    function valuetext(value) {
        return `${value}°C`;
    }
  return (
    <header className="px-[50px] py-[30px] z-99 fixed w-full bg-[#fff]">
        <div className="flex items-center justify-center gap-[40px]">
            <div className="border-[2px] border-[#e9eaed] p-[5px] rounded-[6px] cursor-pointer w-full">
                <p className="leading-[100%] text-[#777] text-[15px]">Laguage</p>
                <select name="lang" id="lang" className="outline-none cursor-pointer w-full">
                    <option value="en">English</option>
                    <option value="uz">Uzbek</option>
                    <option value="ru">Russion</option>
                </select>
            </div>
            <div className="border-[2px] border-[#e9eaed] p-[5px] rounded-[6px] cursor-pointer w-full">
                <p className="leading-[100%] text-[#777] text-[15px]">Seed</p>
                <p className="w-full text-[16px]">123123444324</p>
            </div>
            <div className="border-[2px] h-[52px] border-[#e9eaed] p-[5px] rounded-[6px] cursor-pointer w-full">
                <p className="leading-[100%] text-[#777] text-[15px]">Likes</p>
                <Slider aria-label="Small steps" defaultValue={1} getAriaValueText={valuetext} step={0.1} marks  min={0} max={10} valueLabelDisplay="auto" />
            </div>
            <div className="border-[2px] border-[#e9eaed] p-[5px] rounded-[6px] cursor-pointer w-full">
                <p className="leading-[100%] text-[#777] text-[15px]">Review</p>
                <input type="number" defaultValue={1} className='outline-none w-full'/>
            </div>
            <div className='rounded-[7px] border-[2px] border-[#2c70f4] flex '>
                <button className='flex cursor-pointer justify-center items-center bg-[#2c70f4] p-[10px]'>
                    <MdGridOn className='text-[20px] text-[#fff] '/>
                </button>
                <button className='flex cursor-pointer rounded-[7px] justify-center items-center bg-[#fff] p-[10px]'>
                    <SiMdbook className='text-[20px] text-[#2c70f4]'/>
                </button>
            </div>
        </div>
    </header>
  )
}

export default Header