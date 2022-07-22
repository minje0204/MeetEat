import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "Components/common/nav/Header";
import IndexPage from "views/index/IndexPage";
import RestaurantPage from "views/restaurant/RestaurantPage";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/">
              <Route index element={<IndexPage />} />
              <Route path="restaurant/:id" element={<RestaurantPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
