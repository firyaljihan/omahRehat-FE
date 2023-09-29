import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import axios from "axios";

export default class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      customer: [],
      tipe_kamar: [],
      kamar: [],
      role: "",
      token: "",
      action: "",
    };

    if (localStorage.getItem("token")) {
      if (
        localStorage.getItem("role") === "admin" ||
        localStorage.getItem("role") === "resepsionis"
      ) {
        this.state.token = localStorage.getItem("token");
        this.state.role = localStorage.getItem("role");
      } else {
        window.alert("You're not admin or resepsionis!");
        window.location = "/";
      }
    }
  }

  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` },
    };
    return header;
  };

  getUser = () => {
    let url = "http://localhost:8080/user";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          users: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getCustomer = () => {
    let url = "";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          customer: response.data.count,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getRoom = () => {
    let url = "http://localhost:8080/kamar";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          kamar: response.data.count,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTypeRoom = () => {
    let url = "http://localhost:8080/tipeKamar";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          tipe_kamar: response.data.count,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  checkRole = () => {
    if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
      localStorage.clear();
      window.alert("You're not admin or resepsionis!");
      window.location = "/";
    }
  };

  componentDidMount() {
    this.getUser();
    this.getCustomer();
    this.getRoom();
    this.getTypeRoom();
    this.checkRole();
  }

  render() {
    return (
      <div class="flex flex-row min-h-screen bg-white text-gray-800">
        <Sidebar />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <Header />
          
            <div className="container ml-[600px] flex flex-col items-center px-4 py-16 text-center md:py-72 md:px-10 lg:px-10 xl:max-w-3xl h-screen">
              <h1 className="text-4xl font-bold leadi sm:text-5xl">
                Quisquam necessita vel
                <span className="dark:text-blue-600">laborum doloribus</span>
                delectus
              </h1>
              <p className="px-8 mt-8 mb-12 text-lg">
                Cupiditate minima voluptate temporibus quia? Architecto beatae
                esse ab amet vero eaque explicabo!
              </p>
              <div className="flex flex-wrap justify-center">
    
                <button className="px-8 py-3 m-2 text-lg border rounded dark:text-black dark:border-gray-700">
                  Learn more
                </button>
            
            </div>
            </div>
          <footer class="footer px-4 py-2">
            <div class="footer-content">
              <p class="text-sm text-gray-600 text-center">
                © Brandname 2023. All rights reserved.{" "}
                <a href="https://instagram.com/fjhn.hra">by hantu</a>
              </p>
            </div>
          </footer>
        </main>
      </div>
    );
  }
}
