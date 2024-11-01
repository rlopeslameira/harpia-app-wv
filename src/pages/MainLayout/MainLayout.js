import React, { useRef, useState } from "react";

import './MainLayout.css';

import NavBar from "../../components/NavBar/NavBar";
import { FaMapMarkedAlt, FaUsers } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { TbCalendarBolt, TbCloudUpload } from "react-icons/tb";
import { FaCloudBolt, FaHouseUser, FaUserGear } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from "../../providers/auth";

import LoginLogo from '../../assets/img/logo-itv.svg'

const MainLayout = () => {
    const { isLoged } = useAuth();
    const navigate = useNavigate();

    if (!isLoged)
        navigate('/');

    const sidebar = useRef(null);

    const toggle = () => {
        document.querySelector("#sidebar").classList.toggle("expand");
    }

    return (
        <div style={{display: "flex", minHeight: '100vh'}}>
        <aside id="sidebar" ref={sidebar}>
                <div className="d-flex">
                    <button className="toggle-btn" type="button" onClick={toggle}>
                        <IoMenu size={40} color="#FFF" className="ms-1" />
                    </button>
                    <div className="sidebar-logo">
                        <a href="#">
                            <img width="80%" height="70%" src={LoginLogo} alt='Logo'/>
                        </a>
                    </div>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <HiHome className="m-2" size={20} />
                            <span>Principal</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <TbCalendarBolt className="m-2" size={20} />
                            <span>Clima Atual</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <FaCloudBolt className="m-2" size={20} />
                            <span>Clima Futuro</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <FaUsers className="m-2" size={20} />
                            <span>Usuarios</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <FaUserGear className="m-2" size={20} />
                            <span>Perfil</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <FaHouseUser className="m-2" size={20} />
                            <span>Clientes</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <FaMapMarkedAlt className="m-2" size={20} />
                            <span>Região</span>
                        </a>
                    </li>
                    <li className="sidebar-item">
                        <a href="#" className="sidebar-link">
                            <TbCloudUpload className="m-2" size={20} />
                            <span>Importação</span>
                        </a>
                    </li>
                    {/* <li className="sidebar-item">
                      <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                          data-bs-target="#auth" aria-expanded="false" aria-controls="auth">
                          <i className="lni lni-protection"></i>
                          <span>Auth</span>
                      </a>
                      <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                          <li className="sidebar-item">
                              <a href="#" className="sidebar-link">Login</a>
                          </li>
                          <li className="sidebar-item">
                              <a href="#" className="sidebar-link">Register</a>
                          </li>
                      </ul>
                  </li>
                  <li className="sidebar-item">
                      <a href="#" className="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                          data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                          <i className="lni lni-layout"></i>
                          <span>Multi Level</span>
                      </a>
                      <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                          <li className="sidebar-item">
                              <a href="#" className="sidebar-link collapsed" data-bs-toggle="collapse"
                                  data-bs-target="#multi-two" aria-expanded="false" aria-controls="multi-two">
                                  Two Links
                              </a>
                              <ul id="multi-two" className="sidebar-dropdown list-unstyled collapse">
                                  <li className="sidebar-item">
                                      <a href="#" className="sidebar-link">Link 1</a>
                                  </li>
                                  <li className="sidebar-item">
                                      <a href="#" className="sidebar-link">Link 2</a>
                                  </li>
                              </ul>
                          </li>
                      </ul>
                  </li> */}
                </ul>
            </aside>
            <div className="wrapper">
                
                <div className="main">

                    <NavBar />

                    <main className="content px-3 py-4">

                        <Outlet />

                    </main>
                    <footer className="footer">
                        <div className="container-fluid">
                            <div className="row text-body-secondary">
                                <div className="col-6 text-start ">
                                    <a className="text-body-secondary" href=" #">
                                        <strong>&copy;</strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;
