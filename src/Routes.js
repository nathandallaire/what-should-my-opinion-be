import React, { useEffect } from "react";
import { Routes as RoutesComp, Route } from "react-router-dom";
import Home from "./pages/Home";
import Steps from "./pages/Steps";
import { useLocation } from "react-router-dom";
//import ReactGA from "react-ga";

const Routes = () => {
  const location = useLocation();
  useEffect(() => {
    //ReactGA.pageview(location.pathname);
  }, [location]);

  return (
    <RoutesComp>
      <Route path="/step-4" element={<Steps.Step4 />}></Route>
      <Route path="/step-3" element={<Steps.Step3 />}></Route>
      <Route path="/step-2" element={<Steps.Step2 />}></Route>
      <Route path="/step-1" element={<Steps.Step1 />}></Route>
      <Route path="/" element={<Home />}></Route>
    </RoutesComp>
  );
};

export default Routes;
