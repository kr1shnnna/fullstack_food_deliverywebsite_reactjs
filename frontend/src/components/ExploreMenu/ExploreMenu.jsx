import {menu_list} from '../../assets/assets'

const ExploreMenu = ({category,setCategory  }) => {
  return (
    <div className='flex flex-col gap-5' id='explore-menu'>
        <h1 className="font-medium text-[#262626]"> Explore our menu</h1>
        <p className='max-w-[60%] text-[#808080] max-[1050px]:max-w-full max-[1050px]:text-sm'>Choose from a diverse menu featuring  a delectable array of dishes. Our mission is to full your tummy with joy and happiness </p>
        <div className='flex items-center justify-between gap-[30px] overflow-x-auto text-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
            {menu_list.map((item,index)=>{
              return(
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?'All':item.menu_name)} key={index} className="shrink-0">
                  <div className="relative inline-block">
                    <img className={`w-[7.5vw] min-w-20 cursor-pointer rounded-full transition-all duration-200 ${category===item.menu_name?'border-4 border-[tomato] p-0.5':''}`} src={item.menu_image} alt={item.menu_name} />
                    {category === item.menu_name && (
                      <button
                        type="button"
                        aria-label={`Clear ${item.menu_name} filter`}
                        className="absolute right-1 top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-[tomato] text-base font-semibold leading-none text-white shadow-sm ring-2 ring-white transition hover:scale-110 hover:bg-[#e64b2e]"
                        onClick={(event) => {
                          event.stopPropagation()
                          setCategory("All")
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <p className="mt-2.5 cursor-pointer text-[max(1.4vw,16px)] text-[#747474]">{item.menu_name}</p>
                </div>
              )
            })}
        </div>
        <hr className="my-2.5 h-0.5 border-none bg-[#e2e2e2]" />
      
    </div>
  )
}

export default ExploreMenu
