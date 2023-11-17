import React, { useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBars,
  faBriefcase,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { DepensesCategories } from "./DepensesCategories";
import { DepensesSocio } from "./DepensesSocio";
import { ListCollectes } from "./ListCollectes";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const links = [
    {
      label: "Dépenses Achat",
      icon: faBagShopping,
      path: "/depenses_categories",
      isExact: true,
    },
    {
      label: "Dépenses Travail",
      icon: faBriefcase,
      path: "/depenses",
      isExact: false,
    },
    {
      label: "Export Collectes",
      icon: faDownload,
      path: "/collectes",
      isExact: false,
    },
  ];

  return (
    <div className="mt-5">
      <BrowserRouter basename="/data_export">
        <div
          className={`d-flex ${isSideBarOpen ? "toggled" : ""}`}
          id="wrapper"
        >
          {/* <!-- Sidebar --> */}
          <div id="sidebar-wrapper">
            <div className="list-group pl-3">
              {links.map((menuItem) => {
                return (
                  <NavLink
                    key={menuItem.label}
                    className="nav-link list-group-item list-group-item-action"
                    to={menuItem.path}
                    exact={`${menuItem.isExact}`}
                  >
                    <FontAwesomeIcon className="fa-fw" icon={menuItem.icon} />{" "}
                    {menuItem.label}
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* <!-- Page Content --> */}
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <main role="main" className=" ml-sm-auto">
                <div
                  className="d-flex align-items-center p-2"
                  style={{ backgroundColor: "#D3D3D3" }}
                >
                  <button
                    className="btn-sm navbar-toggler"
                    type="button"
                    aria-label="Toggle sidebar"
                    onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>

                  <span>Export Data</span>
                </div>
                <Routes>
                  <Route
                    path="/depenses_categories"
                    element={<DepensesCategories />}
                  />
                  <Route path="/depenses" element={<DepensesSocio />} />
                  <Route path="/collectes" element={<ListCollectes />} />
                  <Route
                    path="*"
                    element={<Navigate to="/depenses_categories" replace />}
                  />
                </Routes>
              </main>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
