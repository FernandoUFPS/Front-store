import { Route, Routes } from "react-router-dom";
import Auth from "../modules/Login/Index";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import Client from "../modules/Client/Index";
import { ProductProvider } from "../context/products/ProductContext";
import { CategoryProvider } from "../context/categories/CategoryContext";
import Detail from "../modules/Client/pages/Products/Detail";
import { CartProvider } from "../context/Cart/CartContext";
import { ShoppingProvider } from "../context/shopping/ShoppingContext";
import Sales from "../modules/Client/pages/Sales/Sales";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="home"
        element={
          <PublicRoute>
            <CartProvider>
              <ProductProvider>
                <CategoryProvider>
                  <ShoppingProvider>
                    <Client />
                  </ShoppingProvider>
                </CategoryProvider>
              </ProductProvider>
            </CartProvider>
          </PublicRoute>
        }
      />
      <Route
        path="products/:id"
        element={
          <PublicRoute>
            <CartProvider>
              <ProductProvider>
                <ShoppingProvider>
                  <Detail />
                </ShoppingProvider>
              </ProductProvider>
            </CartProvider>
          </PublicRoute>
        }
      />
      <Route
        path="sales"
        element={
          <PublicRoute>
            <CartProvider>
              <ShoppingProvider>
                <Sales />
              </ShoppingProvider>
            </CartProvider>
          </PublicRoute>
        }
      />
      <Route
        path="login"
        element={
          <PublicRoute>
            <Auth />
          </PublicRoute>
        }
      />
      <Route path="not-found" element={<>Error</>} />
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <DashboardRoutes />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
