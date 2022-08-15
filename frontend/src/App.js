import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "components/common/nav/Header";
import IndexPage from "views/index/IndexPage";
import RestaurantPage from "views/restaurant/RestaurantPage";
import ConferencePage from "views/conference/ConferencePage";
import SignUpPage from "views/signup/SignupPage";
import Login from "views/login/Login";
import UserEditPage from "views/user/UserEditPage";

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
                element={<ConferencePage />}
              />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="login/:provider" element={<Login />} />
              <Route path="user/edit" element={<UserEditPage />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
