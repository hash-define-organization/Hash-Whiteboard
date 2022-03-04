import "./App.scss";
import React, { Suspense, lazy } from "react";
import Preloader from "./Components/Preloader/Preloader";
const Header = lazy(() => import("./Components/Header/Header"));
const Main = lazy(() => import("./Components/Main/Main"));

function App() {
  return (
    <>
      <Suspense fallback={<Preloader />}>
        <div className="app">
          <Header />
          <Main />
        </div>
      </Suspense>
    </>
  );
}

export default App;
