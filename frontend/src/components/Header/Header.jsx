const Header = () => {
  return (
    <div className='relative my-[30px] h-[34vw] overflow-hidden rounded-xl bg-[url("/header_img.png")] bg-cover bg-center bg-no-repeat'>

        <div className="absolute bottom-[10%] left-[6vw] flex max-w-[50%] flex-col items-start gap-[1.5vw] animate-[fadeIn_3s] max-[1050px]:max-w-[45%] max-[750px]:max-w-[65%]">
            <h2 className="text-[max(4.5vw,22px)] font-medium text-white">Order your favourite food here </h2>
            <p className="text-[1vw] text-white max-[750px]:hidden">Choose from a diverse menu featuring a selectable array of dishes crafted with the finest ingredients and satisfy your cravings  and elevate your dining experience,one delicious meal at a time </p>
            <button
                    className="cursor-pointer rounded-full border-none bg-white px-[2.3vw] py-[1vw] text-[max(1vw,13px)] font-medium text-[#747474] hover:bg-black hover:text-white active:scale-90 max-[750px]:px-[4vw] max-[750px]:py-[2vw]"
                    onClick={() => {
                        document.getElementById('food-display').scrollIntoView({
                            behavior: 'smooth'
                        })
                    }}
                >
                    View Menu
                </button>
        </div>
    </div>
  )
}

export default Header