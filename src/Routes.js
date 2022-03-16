import React, { useEffect } from "react";
import { Routes as RoutesComp, Route } from "react-router-dom";
import Home from "./pages/Home";
import Steps from "./pages/Steps";
import { useLocation } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import useStore from "./store";

const Routes = () => {
  const {
    affiliation,
    topic,
    newsOpinion,
    finalOpinion,
    setAffiliation,
    setTopic,
    setNewsOpinion,
    setFinalOpinion,
  } = useStore((state) => state);
  const location = useLocation();
  const _localStorage = useLocalStorage();

  useEffect(() => {
    const currentState = _localStorage.getState();
    if (!currentState) return;
    setAffiliation(currentState.affiliation ? currentState.affiliation : "");
    setTopic(currentState.topic ? currentState.topic : "");
    setNewsOpinion(currentState.newsOpinion ? currentState.newsOpinion : "");
    setFinalOpinion(currentState.finalOpinion ? currentState.finalOpinion : "");
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    _localStorage.set({
      path: location.pathname,
      affiliation,
      topic,
      newsOpinion,
      finalOpinion,
    });
  }, [_localStorage, location, affiliation, topic, newsOpinion, finalOpinion]);

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
