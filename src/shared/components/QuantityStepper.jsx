export const QuantityStepper = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <div className="quantity-stepper">
      <button className="stepper-btn" onClick={onDecrease}>-</button>
      <span className="stepper-val">{quantity}</span>
      <button className="stepper-btn" onClick={onIncrease}>+</button>
    </div>
  );
};
