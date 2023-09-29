import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from 'axios'
import Navbar from "../Components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBowlFood, faBed , faSwimmingPool, faWifi, faPeopleRoof, faSmoking} from "@fortawesome/free-solid-svg-icons";

export default class Services extends React.Component {
    render() {
        return (
            <div>
                <Navbar />

                <div className="text-center pb-8">
                    <p className='p-8 text-5xl font-bold'>The <span className="text-blue-600">Services</span> You Get From OmahRehat</p>
                    <p className="mr-64 ml-64  text-gray-600 text-xl">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration variations of passages of Lorem Ipsum available</p>
                </div>

                <div class="flex flex-row ml-48 mt-4 mx-auto">
                <div className="grid grid-cols-3 gap-20">
                    <div class="basis-1/3">
                        <div class="max-w-sm p-6 bg-gray-100 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md">
                            <div className="mb-2"><FontAwesomeIcon icon={faBowlFood} size="2x" color="#394867" /></div>
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-semibold text-black-600">24hr Restaurant</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration</p>

                        </div>
                    </div>
                    <div class="basis-1/3">
                        <div class="max-w-sm p-6 bg-gray-100 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md">
                            <div className="mb-2"><FontAwesomeIcon icon={faBed} size="2x" color="#394867" /></div>
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-semibold text-black-600">Simple & Elegant Room</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration</p>

                        </div>
                    </div>
                    <div class="basis-1/3">
                        <div class="max-w-sm p-6 bg-gray-100 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md">
                            <div className="mb-2"><FontAwesomeIcon icon={faSwimmingPool} size="2x" color="#394867" /></div>
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-semibold text-black-600">Swimming Pool</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration</p>
                        </div>
                    </div>
                    <div class="basis-1/3">
                        <div class="max-w-sm p-6 bg-gray-100 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md">
                            <div className="mb-2"><FontAwesomeIcon icon={faWifi} size="2x" color="#394867" /></div>
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-semibold text-black-600">Fast Wi-Fi</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration</p>
                        </div>
                    </div>
                    <div class="basis-1/3">
                        <div class="max-w-sm p-6 bg-gray-100 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md">
                            <div className="mb-2"><FontAwesomeIcon icon={faPeopleRoof} size="2x" color="#394867" /></div>
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-semibold text-black-600">Meeting Room</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration</p>
                        </div>
                    </div>
                    <div class="basis-1/3">
                        <div class="max-w-sm p-6 bg-gray-100 rounded-lg shadow h-60 border border-gray-200 drop-shadow-md">
                            <div className="mb-2"><FontAwesomeIcon icon={faSmoking} size="2x" color="#394867" /></div>
                            <a href="#">
                                <h5 class="mb-2 text-2xl font-semibold text-black-600">Smoking Area</h5>
                            </a>
                            <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration</p>
                        </div>
                    </div>
                    
                </div>
                </div>

            </div>
        )
    }
}