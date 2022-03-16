/*  eslint-disable */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import keys from "../keys";
import useStore from "../store";
import CSS from "./styles.module.scss";
import LoadingGif from "../images/loading.gif";
import { Button, FormControl } from "react-bootstrap";
import PageWrapper from "./PageWrapper";
import { Helmet } from "react-helmet";

import constants from "../constants";

import { ReactComponent as TwitterIcon } from "../images/twitter.svg";
import { ReactComponent as FacebookIcon } from "../images/facebook.svg";

const StepTitle = ({ children }) => <p className={CSS.stepTitle}>{children}</p>;
const Title = ({ children, className }) => (
  <h1 className={`${className ? className : ""} ${CSS.title}`}>{children}</h1>
);
const LargeText = ({ children }) => (
  <h1 className={CSS.largeText}>{children}</h1>
);

const Step1 = () => {
  const store = useStore((state) => state);

  return (
    <PageWrapper>
      <Helmet>
        <title>Step 1 | {constants.SITE_NAME}</title>
      </Helmet>
      <StepTitle>Step 1</StepTitle>
      <Title>What is your political affiliation?</Title>
      {Object.values(keys.ANSWERS.STEP_1).map((answer, i) => (
        <Link to="/step-2" key={i}>
          <Button
            onClick={() => {
              store.setAffiliation(answer);
            }}
            className={CSS.button}
          >
            {answer}
          </Button>
        </Link>
      ))}
    </PageWrapper>
  );
};

const Step2 = () => {
  const store = useStore((state) => state);

  if (store.affiliation === keys.ANSWERS.STEP_1.INDEPENDENT) {
    return (
      <PageWrapper>
        <Helmet>
          <title>Step 2 | {constants.SITE_NAME}</title>
        </Helmet>
        <LargeText>Which way do you generally lean politically?</LargeText>
        <div>
          {Object.values(keys.ANSWERS.STEP_1)
            .filter((answer) => answer !== keys.ANSWERS.STEP_1.INDEPENDENT)
            .map((answer, i) => (
              <Button
                onClick={() => {
                  store.setAffiliation(answer);
                }}
                key={i}
                className={CSS.button}
              >
                {answer}
              </Button>
            ))}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>Step 2 | {constants.SITE_NAME}</title>
      </Helmet>
      <StepTitle>Step 2</StepTitle>
      <Title>What is the topic you want an opinion on?</Title>
      <LargeText>
        This can be something like "Putin", "masks", "Black Lives Matter" etc.
      </LargeText>
      <div className={CSS.inputTextGroup}>
        <FormControl
          value={store.topic}
          onChange={(e) => {
            store.setTopic(e.target.value);
          }}
          placeholder="Person, Place or Thing"
          className={CSS.inputText}
        />

        <Link
          to="/step-3"
          className={`${CSS.inputButton} ${
            store.topic.length === 0 ? CSS.disabled : ""
          }`}
        >
          <Button>Next</Button>
        </Link>
      </div>
    </PageWrapper>
  );
};

const Step3 = () => {
  const store = useStore((state) => state);

  return (
    <PageWrapper>
      <Helmet>
        <title>Step 3 | {constants.SITE_NAME}</title>
      </Helmet>
      <StepTitle>Step 3</StepTitle>
      <Title>
        Does the mainstream media view {store.topic} to be good or bad?
      </Title>
      {Object.values(keys.ANSWERS.STEP_3).map((answer, i) => (
        <Link to="/step-4" key={i}>
          <Button
            className={CSS.button}
            onClick={() => {
              store.setNewsOpinion(answer);
            }}
          >
            {answer}
          </Button>
        </Link>
      ))}
    </PageWrapper>
  );
};

const Step4 = () => {
  const store = useStore((state) => state);
  const { newsOpinion, affiliation, finalOpinion, setFinalOpinion, reset } =
    store;
  const [loading, setLoading] = useState(true);
  const shareText = `Hey everyone, I found out my opinion is: ${store.topic} = ${finalOpinion}. Find out what your opinion should be!`;
  const tweetLink = `https://twitter.com/intent/tweet?url=${window.location.origin}&text=${shareText}`;
  const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}&quote=${shareText}`;

  useEffect(() => {
    if (affiliation === keys.ANSWERS.STEP_1.LEFT) {
      setFinalOpinion(newsOpinion);
    } else {
      setFinalOpinion(
        newsOpinion === keys.ANSWERS.STEP_3.BAD
          ? keys.ANSWERS.STEP_3.GOOD
          : keys.ANSWERS.STEP_3.BAD
      );
    }
  }, [newsOpinion, affiliation, setFinalOpinion]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <PageWrapper>
      <Helmet>
        <title>Results | {constants.SITE_NAME}</title>
      </Helmet>
      {loading ? (
        <>
          <LargeText>Loading...</LargeText>
          <img className={CSS.loading} src={LoadingGif} alt="Loading" />
        </>
      ) : (
        <div>
          <LargeText>Your opinion should be:</LargeText>
          <Title
            className={`${CSS.finalOpinion} ${CSS[`opinion-${finalOpinion}`]}`}
          >
            {store.topic} <br className={CSS.mobileOnly} />=
            <br className={CSS.mobileOnly} /> {finalOpinion}
          </Title>
          <Link to="/step-1">
            <Button
              variant="secondary"
              className={CSS.button}
              onClick={() => {
                reset();
              }}
            >
              Start Over
            </Button>
          </Link>
          <p className={CSS.share}>
            <span>Share your opinion:</span>
            <a href={tweetLink} target="_blank">
              <TwitterIcon />
            </a>
            <a href={facebookLink} target="_blank">
              <FacebookIcon />
            </a>
          </p>
        </div>
      )}
    </PageWrapper>
  );
};

/*

I just learned what my opinion on {topic} should be. Find out your opinion here:

*/

export default {
  Step1,
  Step2,
  Step3,
  Step4,
};
