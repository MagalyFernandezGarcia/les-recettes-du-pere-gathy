import "./addButton.css";

export const AddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="addLineButton" type="button" onClick={onClick}>
      +
    </button>
  );
};
