import React from "react";

import HeadMain from "../components/MainScreen/Header";
import FooterMain from "../components/MainScreen/FooterMain";

const AppLayout = ({ children }) => {
  return (
    <>
      <HeadMain />
      {children}
      <FooterMain />
    </>
  );
};

export default AppLayout;
