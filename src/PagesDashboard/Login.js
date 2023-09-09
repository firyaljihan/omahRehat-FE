import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            isModalOpen: false,
            logged: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
        e.preventDefault()
        let data = {
            email: this.state.email,
            password: this.state.password
        }
        let url = "http://localhost:8080/user/login"
        axios.post(url, data)
            .then(response => {
                this.setState({ logged: response.data.data.logged })
                if (response.status === 200) {
                    let id = response.data.data.id_user
                    let token = response.data.data.token
                    let role = response.data.data.role
                    let email = response.data.data.email
                    let nama_user = response.data.data.nama_user
                    localStorage.setItem("id", id)
                    localStorage.setItem("token", token)
                    localStorage.setItem("role", role)
                    localStorage.setItem("email", email)
                    localStorage.setItem("nama_user", nama_user)
                    alert("Success Login")
                    window.location.href = "/dashboard"
                } else {
                    alert(response.data.message)
                    this.setState({ message: response.data.message })

                }
            })
            .catch(error => {
                console.log("error", error.response.status)
                if (error.response.status === 500 || error.response.status === 404) {
                    window.alert("Failed to login dashboard");
                }
            })
    }

    render() {
        return (
            <div className="dashboard1 relative">
                <div class="login-container absolute bg-[#394867] bg-opacity-20 shadow-md top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl p-10 max-w-sm w-full">
                        <form  onSubmit={(e) => this.handleLogin(e)}>
                            <p class="text-black text-2xl font-bold text-center">LOGIN</p>
                            <p class="text-black text-lg font-light mb-8 text-center">Enter your details to get sign into your account</p>
                            <div class="mb-4">
                                <label class="block text-black text-sm font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                            </div>
                            <div class="mb-6">
                                <label class="block text-black text-sm font-bold mb-2" for="password">
                                    Password
                                </label>
                                <input class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                            </div>
                            <div class="flex items-center justify-between">
                                <button class="bg-[#212A3E] hover:bg-[#9BA4B5] text-white font-bold py-2 w-full rounded-full focus:outline-none focus:shadow-outline" type="submit">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="w-full bg-gray-500 bg-fixed text-center">
                        <img src="/assets/login.png" className="w-screen h-screen" alt="" />
                    </div>
                </div>
            
        );
    }
}
