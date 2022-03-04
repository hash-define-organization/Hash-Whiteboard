import "./App.scss";
import React, { Suspense, lazy } from "react";
import Preloader from "./Components/Preloader/Preloader";

const Header = lazy(() => {
  return Promise.all([
    import("./Components/Header/Header"),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]).then(([moduleExports]) => moduleExports);
});
const Main = lazy(() => {
  return Promise.all([
    import("./Components/Main/Main"),
    new Promise((resolve) => setTimeout(resolve, 3000)),
  ]).then(([moduleExports]) => moduleExports);
});

function App() {
  return (
    <div className="app">
      <Suspense fallback={<Preloader />}>
        <>
          <Header />
          <Main />
        </>
      </Suspense>
    </div>
  );
}

export default App;
