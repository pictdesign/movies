import './SideDrawer.css';

const SideDrawer = ({ children, onCloseDrawer }) => {
  return (
    <div className="sidedrawer__backdrop" onClick={onCloseDrawer}>
      <div className="sidedrawer">{children}</div>
      <button className="sidedrawer__close" onClick={onCloseDrawer}></button>
    </div>
  );
};

export default SideDrawer;
