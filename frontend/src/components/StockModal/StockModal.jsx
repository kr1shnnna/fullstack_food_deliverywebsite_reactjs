import "./StockModal.css";

const StockModal = ({ show, onClose, foodName, stock }) => {

  if (!show) return null;

  return (
    <div className="stock-modal-overlay">

      <div className="stock-modal">

        <div className="stock-warning-icon">
          ⚠
        </div>

        <h2>Maximum Stock Reached</h2>

        <p>
          Sorry! Only <b>{stock}</b> {foodName}
          {stock > 1 ? " are" : " is"} currently available.
        </p>

        <button onClick={onClose}>
          Okay
        </button>

      </div>

    </div>
  );

};

export default StockModal;