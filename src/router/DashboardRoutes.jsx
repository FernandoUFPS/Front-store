import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { CategoryProvider } from "../context/categories/CategoryContext";
import { ProductProvider } from "../context/products/ProductContext";
import { ShoppingProvider } from "../context/shopping/ShoppingContext";
import Aside from "../modules/Dashboard/components/Aside";
import Footer from "../modules/Dashboard/components/Footer";
import Navbar from "../modules/Dashboard/components/Navbar";
import Dashboard from "../modules/Dashboard/Index";
import Report from "../modules/Dashboard/pages/Report/Report";

export const DashboardRoutes = () => {
  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Aside />
        <div className="layout-page">
          <Navbar />
          <Toaster />
          <div className="content-wrapper">
            <div className="container-xxl flex-grow-1 container-p-y">
              <Routes>
                <Route
                  path="dashboard"
                  element={
                    <ProductProvider>
                      <CategoryProvider>
                        <ShoppingProvider>
                          <Dashboard />
                        </ShoppingProvider>
                      </CategoryProvider>
                    </ProductProvider>
                  }
                />
                <Route
                  path="report"
                  element={
                    <ShoppingProvider>
                      <Report />
                    </ShoppingProvider>
                  }
                />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="*" element={<Navigate to="/not-found" />} />
              </Routes>
            </div>
            <Footer />
            <div className="content-backdrop fade"></div>
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle"></div>
    </div>
  );
};
