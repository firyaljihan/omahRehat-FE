import React from "react";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilSquare,
  faSearch,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import $ from "jquery";
import moment from "moment";

export default class HistoryTransaksi extends React.Component {
  constructor() {
    super();
    this.state = {
      pemesanan: [],
      typeroom: [],
      user: [],
      tgl: "",
      history: [],
      originalHistory: [],
      id: "",
      id_user: "",
      id_tipe_kamar: "",
      nomor_pemesanan: "",
      nama_pemesan: "",
      email_pemesan: "",
      tgl_pemesanan: "",
      tgl_check_in: "",
      tgl_check_out: "",
      nama_tamu: "",
      jumlah_kamar: "",
      status_pemesanan: "",
      role: "",
      token: "",
      action: "",
      keyword: "",
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearchTgl(e);
    }
  };

  handleClose = () => {
    $("#modal_booking").hide();
  };

  handleEditStatus = (item) => {
    $("#modal_booking").show();
    this.setState({
      id: item.id,
      status_pemesanan: item.status_pemesanan,
      action: "update",
    });
  };

  handleSave = (e) => {
    e.preventDefault();

    let form = {
      id: this.state.id,
      status_pemesanan: this.state.status_pemesanan,
    };
    if (this.state.action === "update") {
      let url =
        "http://localhost:8080/pemesanan/updateBooking/" + this.state.id;
      axios
        .put(url, form, this.headerConfig())
        .then((response) => {
          this.getBooking();
          this.handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  _handleFilter = () => {
    let data = {
      status_pemesanan: this.state.keyword,
    };
    let url = "http://localhost:8080/pemesanan/findPemesanan";
    axios
      .post(url, data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            pemesanan: response.data.data,
          });
        } else {
          alert(response.data.message);
          this.setState({ message: response.data.message });
        }
      })
      .catch((error) => {
        console.log("error", error.response.status);
      });
  };

  handleSearchTgl = (e) => {
    const value = e.target.value.toLowerCase();
    this.setState({ tgl: value });

    const filteredHistory = this.state.originalHistory.filter((type) => {
      // Ubah format tgl_check_in sesuai dengan format yang diinputkan oleh input tanggal
      const formattedCheckInDate = type.tgl_check_in.split("T")[0]; // misalnya '2023-09-30T00:00:00' menjadi '2023-09-30'
      return formattedCheckInDate.includes(value);
    });
    this.setState({ history: filteredHistory });
  };

  handleSearchNama = (e) => {
    const input = e.target.value.toLowerCase();
    this.setState({ input });

    const filteredHistory = this.state.originalHistory.filter((type) => {
      return type.nama_tamu.toLowerCase().includes(input);
    });

    this.setState({ history: filteredHistory });
  };

  getBooking = () => {
    let url = "http://localhost:8080/pemesanan/getAllPemesanan";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          pemesanan: response.data.data,
        });
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTypeRoom = () => {
    let url = "http://localhost:8080/tipeKamar/getAllTipeKamar";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          typeroom: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getUser = () => {
    let url = "http://localhost:8080/user/getAllUser";
    axios
      .get(url, this.headerConfig())
      .then((response) => {
        this.setState({
          user: response.data.data,
        });
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
    this.getBooking();
    this.checkRole();
  }

  render() {
    return (
      <div class="flex flex-row min-h-screen bg-white text-gray-800">
        <Sidebar />
        <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
          <Header />
          <div className="main-content flex flex-col flex-grow p-4 z-0 pl-80">
            <h1 className="font-bold text-2xl text-black-700 ml-12 mb-4">
              History Transaksi
            </h1>

            <div className=" mt-2 mr-4">
              <div className="flex rounded-full w-1/2 ml-12 mb-4">
                <input
                  type="date"
                  className="block px-4 py-2 bg-white border font-normal rounded-md focus:border-priamry/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Tanggal..."
                  name="tgl"
                  value={this.state.tgl}
                  onBlur={this.handleSearchTgl}
                  onChange={(e) => this.setState({ tgl: e.target.value })}
                  onKeyDown={this.handleKeyPress}
                />
                <input
                  type="text"
                  className="block px-4 py-2 bg-white border font-normal rounded-md focus:border-priamry/10 focus:ring-primary/20 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Guest Name..."
                  name="input"
                  value={this.state.input}
                  onKeyUp={this.handleSearchNama}
                  onChange={(e) => this.setState({ input: e.target.value })}
                />
                {/* <button
                    className="w-1/8 ml-4 py-2 text-black absolute"
                    onClick={this._handleFilter}
                  >
                    <FontAwesomeIcon icon={faSearch} color="black" />
                  </button> */}
                {this.state.role === "resepsionis" && (
                  <button
                    className="w-1/5 ml-2 px-4 text-white bg-[#212A3E] rounded hover:bg-[#9BA4B5]"
                    onClick={() => this.handleAdd()}
                  >
                    <FontAwesomeIcon icon={faPlus} /> Add
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-2 mr-4 ml-12">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Booking Number
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nama Cust
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Tipe Room
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Total Room
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Booking
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Check In
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Check Out
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          {this.state.role === "resepsionis" && (
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Aksi
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 ">
                        {this.state.pemesanan.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium text-gray-900">
                                    {item.nomor_pemesanan}
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.nama_pemesan}
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {item.tipe_kamar?.nama_tipe_kamar}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.jumlah_kamar}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {moment(item.tgl_pemesanan).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {moment(item.tgl_check_in).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {moment(item.tgl_check_out).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.status_pemesanan === "baru" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                    {item.status_pemesanan}
                                  </span>
                                )}
                                {item.status_pemesanan === "check_in" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    {item.status_pemesanan}
                                  </span>
                                )}
                                {item.status_pemesanan === "check_out" && (
                                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                    {item.status_pemesanan}
                                  </span>
                                )}
                              </td>
                              {this.state.role === "resepsionis" && (
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <button
                                    class={`bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded mt-2 ${
                                      item.status_pemesanan === "check_out"
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                    }`}
                                    onClick={() => this.handleEditStatus(item)}
                                    disabled={
                                      item.status_pemesanan === "check_out"
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faPencilSquare}
                                      size="lg"
                                    />
                                  </button>
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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

        {/* Modal Form */}
        <div
          id="modal_booking"
          tabindex="-1"
          aria-hidden="true"
          class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50"
        >
          <div class="flex lg:h-auto w-auto justify-center ">
            <div class="relative bg-white rounded-lg shadow dark:bg-white w-1/3">
              <button
                type="button"
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => this.handleClose()}
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Tutup modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-black">
                  Edit Status Booking{" "}
                </h3>
                <form
                  class="space-y-6"
                  onSubmit={(event) => this.handleSave(event)}
                >
                  <div>
                    <label
                      for="status_pemesanan"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-800"
                    >
                      Status
                    </label>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-800 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:text-black"
                      placeholder="Pilihan status"
                      name="status_pemesanan"
                      value={this.state.status_pemesanan}
                      onChange={this.handleChange}
                      required
                    >
                      <option value="">Pilih Status</option>
                      <option value="baru">Baru</option>
                      <option value="check_in">Check In</option>
                      <option value="check_out">Check Out</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    class="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                  >
                    Simpan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
