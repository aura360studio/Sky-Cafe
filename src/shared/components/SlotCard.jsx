export const SlotCard = ({ time, isAvailable, isSelected, onClick }) => {
  return (
    <div 
      className={`slot-card ${!isAvailable ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={() => isAvailable && onClick(time)}
    >
      {time}
    </div>
  );
};
