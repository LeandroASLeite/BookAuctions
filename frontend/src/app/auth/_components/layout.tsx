import Navbar from "./navbar";
const Layout = ({ children, setActivePage }) => {
  return (
    <div>
      <Navbar setActivePage={setActivePage} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;