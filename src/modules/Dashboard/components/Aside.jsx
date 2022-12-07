import React from "react";
import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
    >
      <div className="app-brand demo">
        <Link to={"/dashboard"} className="app-brand-link">
          <span className="app-brand-text demo menu-text fw-bolder ms-2">
            admin
          </span>
        </Link>

        <a
          href=""
          className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
        >
          <i className="bx bx-chevron-left bx-sm align-middle"></i>
        </a>
      </div>

      <div className="menu-inner-shadow"></div>

      <ul className="menu-inner py-1">
        {/* <!-- Dashboard --> */}
        <li className="menu-item">
          <Link to={"/dashboard"} className="menu-link">
            <i className="menu-icon tf-icons bx bx-home-circle"></i>
            <div data-i18n="Analytics">Dashboard</div>
          </Link>
        </li>

        <li className="menu-header small text-uppercase">
          <span className="menu-header-text">Pages</span>
        </li>
        {/* <!-- Report --> */}
        <li className="menu-item">
          <Link to={"/report"} className="menu-link">
            <i className="menu-icon tf-icons bx bxs-report"></i>
            <div data-i18n="Analytics">Report</div>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
