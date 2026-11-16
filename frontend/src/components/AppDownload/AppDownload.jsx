import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='mx-auto mb-[120px] mt-[100px] scroll-mt-[200px] text-center text-[max(3vw,20px)] font-medium' id='app-download'>
      
      <p>For Better Experience Download <br/> ZaykaWala App</p>

      <div className="mt-10 flex justify-center gap-[max(2vw,10px)]">
        <img className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition duration-500 hover:scale-105" src={assets.play_store} alt="Google Play" /><img className="w-[max(30vw,120px)] max-w-[180px] cursor-pointer transition duration-500 hover:scale-105" src={assets.app_store} alt="App Store" />
      </div>
    </div>
  )
}

export default AppDownload
