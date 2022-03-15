import React from "react";
import CSS from "./styles.module.scss";

const PageWrapper = ({ children }) => {
  return <div className={CSS.PageWrapper}>{children}</div>;
};

export default PageWrapper;
