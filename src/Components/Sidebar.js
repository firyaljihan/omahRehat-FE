import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBed,
  faUser,
  faHistory,
  faList,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      role: "",
      email: "",
      nama_user: "",
    };
    this.state.role = localStorage.getItem("role");
    this.state.email = localStorage.getItem("email");
    this.state.nama_user = localStorage.getItem("nama_user");
  }

  logOut = () => {
    if (window.confirm("Are you sure to logout")) {
      window.location = "/";
      localStorage.clear();
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
    }
  };

  checkRole = () => {
    if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
      localStorage.clear();
      window.alert("You're not admin or resepsionis!");
      window.location = "/";
    }
  };

  componentDidMount() {
    this.checkRole();
  }

  render() {
    return (
      <aside class="sidebar w-80 fixed h-full transform z-10 -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-[#394867] border-x-2 border-slate-500">
        <div class="sidebar-header flex items-center justify-center py-4">
          <div class="inline-flex">
            <a href="#" class="inline-flex flex-row items-center">
              {/* <img
                src="/assets/logo.png"
                class="w-12 h-12 text-red-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              /> */}
              <span class="leading-10 text-white text-2xl font-bold ml-1 ">
                OmahRehat
              </span>
            </a>
          </div>
        </div>
        <div class=" mt-8 items-center">
          <div class="flex flex-col items-center">
            <img
              src="/assets/5856.jpg"
              alt=""
              class="h-20 w-20 bg-gray-200 border rounded-full"
            />
            <div class="flex flex-col text-center">
              <span class="text-white font-bold text-lg leading-none mt-3">
                {this.state.role}
              </span>
              <span class="text-white text-xs leading-none mt-1 mb-10">
                {this.state.email}
              </span>
            </div>
          </div>
        </div>

        <div class="sidebar-content px-4 py-6 ml-4">
          <ul class="flex flex-col w-full">
            <li class="my-px">
              <a
                href="/dashboard"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-200 hover:text-black font-base"
              >
                <span class="mr-2 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faHome} color="white" />
                </span>
                <span class="ml-3">Dashboard</span>
              </a>
            </li>
            <li class="my-px">
              <a
                href="/typeroom"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-200 hover:text-black font-base"
              >
                <span class="mr-2 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faBed} color="white" />
                </span>
                <span class="ml-3">Type Room</span>
              </a>
            </li>
            <li class="my-px">
              <a
                href="/room"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-200 hover:text-black font-base"
              >
                <span class="mr-3 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faList} color="white" />
                </span>
                <span class="ml-3">Room</span>
              </a>
            </li>
            <li class="my-px">
              <a
                href="/user"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-200 hover:text-black font-base"
              >
                <span class="mr-3 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faUser} color="white" />
                </span>
                <span class="ml-4">User</span>
              </a>
            </li>
            <li class="my-px">
              <a
                href="/customer"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-200 hover:text-black font-base"
              >
                <span class="mr-3 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faUsers} color="white" />
                </span>
                <span class="ml-2">Customer</span>
              </a>
            </li>
            <li class="my-px">
              <a
                href="/historytransaksi"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-200 hover:text-black font-base"
              >
                <span class="mr-3 flex items-center justify-center text-lg text-gray-400">
                  <FontAwesomeIcon icon={faHistory} color="white" />
                </span>
                <span class="ml-3">History Transaksi</span>
              </a>
            </li>
            <li class="my-px" onClick={() => this.logOut()}>
              <a
                href="/"
                class="flex flex-row items-center h-10 px-3 rounded-lg text-white hover:bg-gray-200 hover:text-black font-base"
              >
                <span class="mr-3 flex items-center justify-center text-lg text-white">
                  <svg
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="h-6 w-6"
                  >
                    <path d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </span>
                <span class="ml-2" onClick={() => this.logOut()}>
                  Logout
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    );
  }
}
