const AuthAlert = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 px-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="auth-alert-title"
        className="w-full max-w-[400px] rounded-xl bg-white p-7 text-center shadow-xl"
      >
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-[#fff0eb] text-2xl text-[tomato]">
          !
        </div>
        <h2 id="auth-alert-title" className="mb-2 text-xl font-semibold text-[#333]">
          Login required
        </h2>
        <p className="mb-6 text-[#666]">
          Please log in before adding items to your cart.
        </p>
        <button
          type="button"
          className="w-full cursor-pointer rounded bg-[tomato] px-4 py-3 font-medium text-white transition hover:opacity-90"
          onClick={onClose}
        >
          Okay
        </button>
      </div>
    </div>
  );
};

export default AuthAlert;
