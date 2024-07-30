'use client'
import { useState } from "react";
import withAuth from '../../../utils/withAuth';

import BookRegistration from "./pages/book-registration-form";
import Home from "./pages/home";
import ManageBooks from "./pages/manage-books";
import MyOffers from "./pages/my-offers";
import ViewRegistredBooks from "./pages/view-registred-books";
import Layout from "../../components/layout";

function Page() {
  const [activePage, setActivePage] = useState('home');

  const renderPage = () => {
    switch (activePage) {
      case 'book-registration':
        return <BookRegistration />;
      case 'view-registered-books':
        return <ViewRegistredBooks />;
      case 'manage-books':
        return <ManageBooks />;
      case 'my-offers':
        return <MyOffers />;
      default:
        return <Home />;
    }
  }

  return (
    <>
      <Layout setActivePage={setActivePage}>
        {renderPage()}
      </Layout>
    </>
  );
}

export default withAuth(Page);
