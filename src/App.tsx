import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import "./scss/app.scss";
import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "{Cart}"*/ "./pages/Cart")
);
const PizzaPage = React.lazy(
  () => import(/* webpackChunkName: "{PizzaPage}"*/ "./pages/PizzaPage")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "{NotFound}"*/ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path=""
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <PizzaPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
