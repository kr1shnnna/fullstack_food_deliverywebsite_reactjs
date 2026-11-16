import {assets} from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='flex items-center justify-between bg-white px-5 py-4 shadow-[0_1px_8px_rgba(36,48,71,0.06)] sm:px-8'>
        <div className="flex items-center gap-3">
          <img className='w-[145px]' src={assets.logo} alt="ZaykaWala" />
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-[#243047]">Administrator</p>
            <p className="text-xs text-[#8b94a7]">Store management</p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-full bg-[#fff0ed] text-[tomato]" aria-label="Administrator profile">
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <circle cx="12" cy="8" r="3.25" />
              <path d="M5.5 19c.8-3.1 3.1-4.75 6.5-4.75s5.7 1.65 6.5 4.75" strokeLinecap="round" />
            </svg>
          </span>
        </div>


    </div>
  )
}

export default Navbar