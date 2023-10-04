import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import Navbar from "../Components/Navbar";
import LinesEllipsis from "react-lines-ellipsis";
import $ from "jquery";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default class Rooms extends React.Component {
    constructor() {
        super()
        this.state = {
            typeroom: [],
            detail: [],
            tipeKamarId: "",
            nama_tipe_kamar: "",
            harga: "",
            deskripsi: "",
            foto: "",
            keyword: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleClose = () => {
        $("#modal_detail").hide()
    }

    handleFile = (e) => {
        this.setState({
            photo: e.target.files[0]
        })
    }

    handleDetail = (item) => {
        $("#modal_detail").show()
        this.setState({
            id: item.id,
            nama_tipe_kamar: item.nama_tipe_kamar,
            harga: item.harga,
            deskripsi: item.deskripsi,
            foto: item.foto

        })

    }

    _handleFilter = () => {
        let data = {
            keyword: this.state.keyword,
        }
        let url = "http://localhost:8080/tipeKamar/findTipeKamar/"
        axios.post(url, data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        typeroom: response.data.data
                    })
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
            })
    }

    getTypeRoom = () => {
        let url = "http://localhost:8080/tipeKamar/getAllTipeKamar"
        axios.get(url)
            .then(response => {
                this.setState({
                    typeroom: response.data.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    componentDidMount() {
        this.getTypeRoom()
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="m-6 pl-6 ">
                    <p className="text-5xl font-bold mt-14">Best Room For You</p>
                    <div className="flex mt-6">
                        <div className="flex rounded w-1/2">
                        <input
                    type="text"
                    className="w-5/6 block px-12 py-2 bg-white border rounded-full focus:border-white focus:ring-white focus:outline-none focus:ring focus:ring-opacity-40 relative"
                    placeholder="Search..."
                    name="keyword"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                    onKeyUp={this._handleFilter}
                  />
                  <button
                    className="w-1/8 ml-4 py-2 text-black absolute"
                    onClick={this._handleFilter}
                  >
                    <FontAwesomeIcon icon={faSearch} color="black" />
                  </button>
                        </div>
                    </div>

                    <div class="grid grid-cols-4 gap-4 mt-8">
                        {this.state.typeroom.map((item) => (
                            <div class="col-span-1">
                                {/* Card untuk type room */}
                                <div className="CardEvent">
                      <div className="max-w-sm h-3/4 mb-8 rounded-lg overflow-hidden shadow-xl border-1 border-black bg-white">
                        <div className="container">
                          <img
                            className="w-full h-48"
                            src={"http://localhost:8080/foto/" + item.foto}
                          />
                        </div>
                        <div className="px-6 py-4 text-black">
                          <div className="font-medium text-3xl mb-2">
                            {item.nama_tipe_kamar}
                          </div>
                          <p className="text-black text-light mb-4">
                            <LinesEllipsis
                              text={item.deskripsi}
                              maxLine="1"
                              ellipsis="..."
                            />
                          </p>
                          <div className="font-bold text-xl mb-2 text-[#212A3E]">
                            IDR {item.harga}/night
                          </div>
                        </div>
                        <div className="px-6 pb-2">
                          <button
                            className="mb-4 bg-[#9BA4B5] hover:bg-[#F1F6F9] text-black font-light  w-1/3 rounded-full focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => this.handleDetail(item)}
                          >
                            {" "}
                            Detail
                          </button>
                        </div>
                      </div>
                                </div>

                            </div>
                        ))}
                    </div>

                </div>

                {/* modal detail */}
                <div id="modal_detail" tabindex="-1" class="overflow-x-auto fixed top-0 left-0 right-0 z-50 hidden w-full pt-10 pb-10 pl-96 md:inset-0 h-modal md:h-full  bg-black bg-opacity-50" >
                    <div class="relative w-full h-full max-w-lg md:h-auto border-2 border-gray-500 rounded-lg shadow shadow-2xl items-center">
                        {/* <!-- Modal content --> */}
                        <div class="relative bg-white rounded-lg">
                            {/* <!-- Modal header --> */}
                            <div class="flex items-center justify-between p-5 border-b rounded-t border-gray-500">
                                <h3 class="p-2 text-xl font-medium text-gray-900 ">
                                    {this.state.nama_tipe_kamar} Room
                                </h3>
                                <button type="button" class="text-gray-400 bg-transparent hover:bg-red-500 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white" data-modal-hide="medium-modal" onClick={() => this.handleClose()}>
                                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    <span class="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div class="p-6">

                                <div className='container'>
                                    <img class="rounded-md w-200 h-100" src={"http://localhost:8080/foto/" + this.state.foto} />
                                </div>
                                <div class="px-2 py-4">
                                    <div class="font-bold text-2xl mb-2">{this.state.nama_tipe_kamar}</div>
                                    <div class="font-bold text-xl mb-2 text-blue-600">{this.state.harga}/night</div>
                                    <p class="text-black-700 text-base">
                                        {this.state.deskripsi}
                                    </p>
                                </div>

                            </div>
                            {/* <!-- Modal footer --> */}
                            {/* <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button data-modal-hide="medium-modal" type="button" class="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center " onClick={() => this.handleClose()}>Close</button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}