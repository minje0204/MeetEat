import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "components/common/nav/Header";
import IndexPage from "views/index/IndexPage";
import RestaurantPage from "views/restaurant/RestaurantPage";
import Conference from "views/conference/ConferencePage";
import ProfilePage from "views/profile/ProfilePage"

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
                path="profile"
                element={<ProfilePage />}
              />
              <Route
                path="restaurant/:restaurant_id"
                element={<RestaurantPage />}
              />
              <Route
                path="restaurant/:restaurant_id/conference/:conf_id"
                element={<Conference />}
              />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
