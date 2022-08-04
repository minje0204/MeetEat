import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "components/common/nav/Header";
import IndexPage from "views/index/IndexPage";
import RestaurantPage from "views/restaurant/RestaurantPage";
import Conference from "views/conference/ConferencePage";
import SignUpPage from "views/Signup/SignupPage";

export default function App() {
  return (
    <>
      <Router>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/">
              <Route index element={<IndexPage />} />
              <Route
                path="restaurant/:restaurant_id"
                element={<RestaurantPage />}
              />
              <Route
                path="restaurant/:restaurant_id/conference/:conf_id"
                element={<Conference />}
              />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
