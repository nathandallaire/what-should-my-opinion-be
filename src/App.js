import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useStore from "./store";

import Routes from "./Routes";

function App() {
  const store = useStore((state) => state);
  const { affiliation, topic, newsOpinion } = store;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return setLoading(false);
    }

    if (
      !affiliation &&
      !topic &&
      !newsOpinion &&
      window.location.pathname !== "/"
    ) {
      window.location.href = "/";
    } else {
      setLoading(false);
    }
  }, [affiliation, topic, newsOpinion]);

  return (
    <>
      {!loading && (
        <Router>
          <Routes />
        </Router>
      )}
    </>
  );
}

export default App;
