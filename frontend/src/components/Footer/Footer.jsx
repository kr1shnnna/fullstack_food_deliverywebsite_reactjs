
import { assets } from "../../assets/assets";
const Footer = () => {
  return (
    <div className='flex w-full flex-col items-center gap-[30px] bg-[#323232] px-4 pb-[25px] pt-[70px] text-[#d9d9d9] sm:px-8 lg:px-16' id='footer'>
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[2.5fr_1fr_1fr] items-start gap-[70px] max-[750px]:grid-cols-1 max-[750px]:gap-[45px]">
        <div className="flex flex-col items-start gap-5 max-[750px]:items-center max-[750px]:text-center">

            <img className="w-[240px] max-[750px]:w-[190px]" src={assets.logo} alt="ZaykaWala" />
            <p className="max-w-[520px] leading-[1.8] text-[#cfcfcf]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro esse dolores blanditiis numquam impedit saepe et consequuntur, dolorem praesentium. Aut accusantium, totam quam quod veniam voluptas vitae soluta id optio!</p>
             <div className="mt-2.5 flex justify-center gap-[15px]">
                <img className="w-[38px] cursor-pointer transition hover:-translate-y-1" src={assets.facebook_icon} alt="Facebook" /><img className="w-[38px] cursor-pointer transition hover:-translate-y-1" src={assets.twitter_icon} alt="Twitter" /><img className="w-[38px] cursor-pointer transition hover:-translate-y-1" src={assets.linkedin_icon} alt="LinkedIn" />
             </div>
            </div> 

          <div className="flex flex-col items-start gap-5 max-[750px]:w-full max-[750px]:items-center max-[750px]:text-center">
            <h2 className="mb-2.5 text-[28px] text-white">COMPANY</h2>
            <ul className="p-0">
                <li className="mb-3 list-none cursor-pointer transition hover:text-[tomato]">Home</li>
                <li className="mb-3 list-none cursor-pointer transition hover:text-[tomato]">About Us</li>
                <li className="mb-3 list-none cursor-pointer transition hover:text-[tomato]">Delivery</li>
                <li className="mb-3 list-none cursor-pointer transition hover:text-[tomato]">Privacy Policy</li>
            </ul>
          </div>
        <div className="flex flex-col items-start gap-5 max-[750px]:w-full max-[750px]:items-center max-[750px]:text-center">
            <h2 className="mb-2.5 text-[28px] text-white">GET IN TOUCH</h2>
            <ul>
                <li className="mb-3 list-none cursor-pointer transition hover:text-[tomato]">+1-234-980-9090</li>
                <li className="mb-3 list-none cursor-pointer transition hover:text-[tomato]">contact@zaykawala.com</li>
            </ul>
        </div> 
      </div>
      <hr className="mx-auto h-px w-full max-w-[1200px] border-none bg-[#5c5c5c]" />
      <p className="mx-auto w-full max-w-[1200px] text-center text-[15px] text-[#bdbdbd] max-[750px]:text-sm">
        Copyright © 2026 Zaykawala. All Rights Reserved. Designed by Krishna
      </p>
    </div>
  )
}

export default Footer
