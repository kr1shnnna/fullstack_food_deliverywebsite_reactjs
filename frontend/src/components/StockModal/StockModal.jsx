const StockModal = ({ show, onClose, foodName, stock }) => {

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">

      <div className="w-[400px] max-w-[90%] animate-[modalPop_0.3s_ease] rounded-[15px] bg-white px-[30px] py-[35px] text-center">

        <div className="mb-2.5 text-[45px]">
          ⚠
        </div>

        <h2 className="mb-[15px] text-[#333]">Maximum Stock Reached</h2>

        <p className="mb-[25px] leading-[1.6] text-[#666]">
          Sorry! Only <b>{stock}</b> {foodName}
          {stock > 1 ? " are" : " is"} currently available.
        </p>

        <button className="cursor-pointer rounded-lg border-none bg-[#ff4c24] px-[35px] py-2.5 text-base text-white hover:opacity-90" onClick={onClose}>
          Okay
        </button>

      </div>

    </div>
  );

};

export default StockModal;