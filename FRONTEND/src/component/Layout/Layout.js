import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Helmet } from "react-helmet";

export const Layout = ({ children, title, keywords, desc, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={desc} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "CampusBuy",
  desc: "mern stack",
  keywords: "mern,react,node,monogdb",
  author: "Abhijit",
};
