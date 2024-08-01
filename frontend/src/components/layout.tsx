import React from "react";
import Navbar from "../app/auth/_components/navbar";
interface LayoutProps {
  children: React.ReactNode;
  setActivePage: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, setActivePage }) => {
  return (
    <div>
      <Navbar setActivePage={setActivePage} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
