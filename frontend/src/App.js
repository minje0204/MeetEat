import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import IndexPage from "views/index/IndexPage";
import RestaurantPage from "views/restaurant/RestaurantPage";
import ConferencePage from "views/conference/ConferencePage";
import SignUpPage from "views/signup/SignupPage";
import Login from "views/login/Login";
import UserEditPage from "views/user/UserEditPage";
import { isLogin } from "utils/account/GetAccess";

export default function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/">
              <Route index element={<IndexPage />} />
              <Route
                path="restaurant/:restaurant_id"
                element={<RestaurantPage />}
              />
              <Route
                path="restaurant/conference/:conf_id"
                element={!isLogin() ? <Navigate to="/" /> : <ConferencePage />}
              />
              <Route path="signup" element={<SignUpPage />} />
              <Route path="login/:provider" element={<Login />} />
              <Route
                path="user/edit"
                element={!isLogin() ? <Navigate to="/" /> : <UserEditPage />}
              />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
