/*  eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import Flag from "../images/flag.gif";
import { Button } from "react-bootstrap";
import CSS from "./styles.module.scss";
import PageWrapper from "./PageWrapper";

const Home = (props) => {
  return (
    <PageWrapper>
      <img className={CSS.flag} src={Flag} alt="Flag" />
      <h1 className={CSS.title}>What should my opinion be?</h1>
      <Link to="/step-1">
        <Button className={CSS.button}>Find out!</Button>
      </Link>
    </PageWrapper>
  );
};

export default Home;
