import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faSearch } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import moment from 'moment';
import '@progress/kendo-theme-material/dist/all.css';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import numeral from 'numeral'; //rupiah

//ini untuk print
const PrintElement = (props) => {
    const { item } = props;
    let hari = moment(item.tgl_check_out, 'YYYY-MM-DD').diff(moment(item.tgl_check_in, 'YYYY-MM-DD'), 'days')
    let jumlah = item.jumlah_kamar

    return (
        <div className="mt-4 tracking-wider">
            <div className="hotel-invoice">
                <h1 className="font-bold">Invoice Booking Room</h1>

                <div className="invoice-details">
                    <div className="text-md">
                        <p><span className="font-semibold">Hotel Name:</span> OmahRehat</p>
                        <p><span className="font-semibold mt-2">Address:</span> Jl. Menuju Surga</p>
                        <p><span className="font-semibold mt-2">Phone:</span> 03544-76875</p>
                    </div>
                    <div className="text-md mr-4">
                        <p><span className="font-semibold">Date: </span> {moment(Date.now()).format('DD-MM-YYYY')}</p>
                        <p><span className="font-semibold">Invoice:</span> </p>
                        <span className="mt-1 px-3 py-2 inline-flex text-[16px] leading-5 font-semibold rounded bg-[#9BA4B5] text-[#394867]">
                            BOOK - {item.nomor_pemesanan}
                        </span>
                    </div>
                </div>

                <div className="text-sm mb-4 flex gap-48">
                <p><span className="font-semibold mt-2">Check In:</span> {moment(item.tgl_check_in).format('DD-MM-YYYY')}</p>
                        <p><span className="font-semibold mt-2 justify-end">Check Out:</span> {moment(item.tgl_check_out).format('DD-MM-YYYY')}</p>
                </div>
                <table className="invoice-items text-md w-full">
                    <thead>
                        <tr>
                            <th className="p-4 text-left">Type Room</th>
                            <th className="p-4 text-center">Total-Room</th>
                            <th className="p-4 text-center">Total-Day</th>
                            <th className="p-4 text-center">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 text-left">{item.tipe_kamar.nama_tipe_kamar}</td>
                            <td className="p-4 text-center">{jumlah}</td>
                            <td className="p-4 text-center">{hari} days</td>
                            <td className="p-4 text-left">{numeral(item.tipe_kamar.harga).format('0,0')}</td>
                        </tr>
                    </tbody>
                </table>
            <div className="flex gap-[350px] mt-8">
                <h2 className="">Total :</h2>
                <p>{numeral(item.tipe_kamar.harga * hari * jumlah).format('0,0')}</p>

            </div>
            </div>
        </div>
    )
}

export default class MyBookings extends React.Component {
    constructor() {
        super()
        this.state = {
            pemesanan: [],
            booking: [],
            id: "",
            id_user: "",
            id_customer: "",
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
            dataPrint: {},
            container: React.createRef(null),
            pdfExportComponent: React.createRef(null),
            isPrint: false
        }

        this.state.id_customer = localStorage.getItem("id")
        if (localStorage.getItem("token")) {
            if (
                localStorage.getItem("role") == "customer"
            ) {
                this.state.token = localStorage.getItem("token");
                this.state.role = localStorage.getItem("role");
            } else {
                window.alert("You must register or login as customer !");
                window.location = "/logincust";
            }
        }
    }

    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getBookingByCust = () => {
        const email = localStorage.getItem("email")
        let url = "http://localhost:8080/pemesanan/getAll/" + email
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({
                    booking: response.data.data
                })
                console.log(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    _handleFilter = () => {
        let data = {
            keyword: this.state.keyword,
        }
        let url = "http://localhost:8080/pemesanan/findPemesanan/" + this.state.status_pemesanan
        axios.post(url, data)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        pemesanan: response.data.data
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

    checkRole = () => {
        if (this.state.role !== "customer") {
            localStorage.clear()
            window.alert("You must register or login as customer !")
            window.location = '/loginCust'
        }
    }

    handlePrint = (item) => {
        let element = this.state.container.current;

        this.setState({
            dataPrint: item,
            isPrint: true
        })

        setTimeout(() => {
            savePDF(element, {
                fileName: `invoice-${item.nomor_pemesanan}`
            })
            this.setState({
                isPrint: false
            })
        }, 500)
    }

    componentDidMount() {
        this.getBookingByCust()
        this.checkRole()
    }

    render() {
        return (
            <div>
                <Navbar />

                <div className="m-6 pl-6">
                    <p className="text-5xl font-bold mt-14 mb-8">Transaction List</p>
                    
                </div>

                <div className="flex flex-col mt-2 ml-12 mr-8">
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
                                                Guest Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Type Room
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
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                            >
                                                Print
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {this.state.booking.map((item, index) => {
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
                                                        <div className="flex items-center">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {item.nama_tamu}
                                                            </div>
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
                                                            {moment(item.tgl_pemesanan).format('DD-MM-YYYY')}

                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {moment(item.tgl_check_in).format('DD-MM-YYYY')}

                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {moment(item.tgl_check_out).format('DD-MM-YYYY')}

                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        {item.status_pemesanan === "baru" &&
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                                                                {item.status_pemesanan}
                                                            </span>
                                                        }
                                                        {item.status_pemesanan === "check_in" &&
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                                {item.status_pemesanan}
                                                            </span>
                                                        }
                                                        {item.status_pemesanan === "check_out" &&
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                                {item.status_pemesanan}
                                                            </span>
                                                        }
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <button class="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded" onClick={() => this.handlePrint(item)}>
                                                            <FontAwesomeIcon icon={faPrint} size="lg" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="hidden-on-narrow"
                >
                    <PDFExport ref={this.state.pdfExportComponent}>
                        <div ref={this.state.container}>
                            {this.state.isPrint ? <PrintElement item={this.state.dataPrint}/> : null}
                        </div>
                    </PDFExport>
                </div>

            </div >
        )
    }

}