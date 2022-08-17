import './FilterCheckbox.css'

const FilterCheckbox = ({onChange, isShort}) => {

  return (
    <label className="switch">
      <input type="checkbox" checked={isShort} onChange={onChange} />
      <span className="slider"></span>
    </label>
  );
};

export default FilterCheckbox;
