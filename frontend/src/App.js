import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "components/common/nav/Header";
import IndexPage from "views/index/IndexPage";
import RestaurantPage from "views/restaurant/RestaurantPage";
<<<<<<< HEAD
import Conference from "views/conference/ConferencePage";
import SignUpPage from "views/Signup/SignupPage";
=======
import ConferencePage from "views/conference/ConferencePage";
import SignupPage from "views/signup/SignupPage";
>>>>>>> 34e41222e4e50990f8624f3020c238c6bb6b8ee4

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
<<<<<<< HEAD
              <Route path="signup" element={<SignUpPage />} />
=======
              <Route path="signup" element={<SignupPage />} />
>>>>>>> 34e41222e4e50990f8624f3020c238c6bb6b8ee4
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}
