import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "Components/common/nav/Header";
import Main from "Components/main/Main";
import Restaurant from "Components/restaurant/Restaurant";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/">
              <Route index element={<Main />} />
              <Route path="restaurant/:id" element={<Restaurant />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
