import React from 'react'
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header';
import axios from 'axios'


export default class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [],
            customer: [],
            tipe_kamar: [],
            kamar: [],
            role: "",
            token: "",
            action: ""

        }

        if (localStorage.getItem("token")) {
            if (localStorage.getItem("role") === "admin" ||
                localStorage.getItem("role") === "resepsionis") {
                this.state.token = localStorage.getItem("token")
                this.state.role = localStorage.getItem("role")
            } else {
                window.alert("You're not admin or resepsionis!")
                window.location = "/"
            }
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header;
    }

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
        let url = ""
        axios.get(url)
            .then((response) => {
                this.setState({
                    customer: response.data.count
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    getRoom = () => {
        let url = "http://localhost:8080/kamar"
        axios.get(url)
            .then(response => {
                this.setState({
                    kamar: response.data.count
                })
                console.log(response.data.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    getTypeRoom = () => {
        let url = "http://localhost:8080/tipeKamar"
        axios.get(url)
            .then(response => {
                this.setState({
                    tipe_kamar: response.data.count
                })
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    checkRole = () => {
        if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
            localStorage.clear()
            window.alert("You're not admin or resepsionis!")
            window.location = '/'
        }
    }

    componentDidMount() {
        this.getUser();
        this.getCustomer();
        this.getRoom()
        this.getTypeRoom()
        this.checkRole()
    }

    render() {
        return (
            <div class="flex flex-row min-h-screen bg-white text-gray-800">
                <Sidebar />
                <main class="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
                    <Header />
                    <div class="main-content flex flex-col flex-grow p-4 z-0 pl-96">
                        
                        <div class="flex flex-row h-72 place-content-center">
                            <div class="w-2/5 text-black-700 text-center bg-[#F1F6F9] px-4 py-2 m-2 rounded-md border-2  border-[#F1F6F9] ">
                                <p class="mt-24  text-2xl font-bold text-center">Type Room</p>
                            </div>
                            <div class="w-2/5 text-black-700 text-center bg-[#9BA4B5] px-4 py-2 m-2 rounded-md border-2  border-[#9BA4B5] ">
                                <p class="mt-24  text-2xl font-bold text-center">User</p>
                            </div>
                        </div>
                        
                    </div>
                    <footer class="footer px-4 py-2">
                        <div class="footer-content">
                            <p class="text-sm text-gray-600 text-center">© Brandname 2023. All rights reserved. <a href="https://twitter.com/iaminos">by hantu</a></p>
                        </div>
                    </footer>
                </main>
            </div>
        );
    }
}