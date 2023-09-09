import React from 'react'


export default class Header extends React.Component {
    constructor(){
        super()
        this.state = {
            role: "",
            email : "",
            nama_user : ""

        }

        this.state.role = localStorage.getItem("role")
        this.state.email = localStorage.getItem("email")
        this.state.nama_user = localStorage.getItem("nama_user")
    }

    checkRole = () => {
        if (this.state.role !== "admin" && this.state.role !== "resepsionis") {
            localStorage.clear()
            window.alert("You're not admin or resepsionis!")
            window.location = '/'
        }
    }

    componentDidMount() {
        this.checkRole()
    }

    render() {
        return (
            <header class="header bg-white py-4 px-4">
                <div class="header-content flex items-center flex-row">
                    <form action="#">
                        <div class="hidden md:flex relative"></div> 
                        
                        <div class="flex md:hidden">
                            <a href="#" class="flex items-center justify-center h-10 w-10 border-transparent">
                                <svg
                                    class="h-6 w-6 text-gray-500"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </a>
                        </div>
                    </form>
                    
                </div>
            </header>
        )
    }

}