import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'

export default class Register extends React.Component {
    constructor() {
        super()
        this.state = {
            nik: "",
            nama: "",
            no_hp: "",
            email: "",
            password: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = (e) => {
        e.preventDefault()
        
        let data = {
            nik : this.state.nik,
            nama : this.state.nama,
            no_hp : this.state.no_hp,
            email : this.state.email,
            password : this.state.password
        }
        let url = "http://localhost:8080/customer/addCust"
        axios.post(url, data)
            .then(res => {
                window.alert("Success to Register")
                window.location.href = "/logincust"
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500) {
                    window.alert("Failed Register as Customer");
                }
            }) 
    }

    render() {
        return (
            <div className="dashboard1">
                <div class="flex">
                    <div class="w-1/2 bg-gray-200 text-left">
                        <form class="bg-gray-100 shadow-md rounded px-8 pt-6 p-8 m-24 mt-6" onSubmit={(e) => this.handleRegister(e)}>
                            <p class="text-gray-700 text-2xl font-bold mb-4 text-center">Register to OmahRehat</p>
                            <p class="text-gray-700 text-sm font-normal mb-6 text-center">Silahkan Register sebagai Customer Hotel OmahRehat</p>
                            <div class="">
                                <label class="block text-gray-700 text-sm font-bold " for="nik">
                                    NIK
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nik" name="nik" placeholder="NIK" value={this.state.nik} onChange={this.handleChange} required />
                            </div>
                            <div class="">
                                <label class="block text-gray-700 text-sm font-bold " for="customer_name">
                                    Nama Lengkap
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="nama" name="nama" placeholder="Nama Lengkap" value={this.state.nama} onChange={this.handleChange} required />
                            </div>
                            <div class="">
                                <label class="block text-gray-700 text-sm font-bold " for="address">
                                    Nomor HP
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="no_hp" name="no_hp" placeholder="Nomor HP" value={this.state.no_hp} onChange={this.handleChange} required />
                            </div>
                            <div class="">
                                <label class="block text-gray-700 text-sm font-bold " for="email">
                                    Email
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                            </div>
                            <div class="mb-2">
                                <label class="block text-gray-700 text-sm font-bold " for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                                    Register
                                </button>
                            </div>

                        </form>
                    </div>
                    <div class="w-1/2 bg-gray-500 text-center">
                        <img src="/assets/login.png" className="w-screen h-screen" alt="" />
                    </div>
                </div>
            </div>
        );
    }
}
