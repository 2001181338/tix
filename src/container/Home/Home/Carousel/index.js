import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
// import { NavLink } from "react-router-dom";
export default function Carousel() {
    let getDsPhim = useSelector(state => state.QuanLyPhimReducer.dsPhim);
    let [dsPhim, setDSPhim] = useState();

    useEffect(() => {
        setDSPhim(getDsPhim)
    }, [getDsPhim])
    let renderCarousel = () => {
        if (dsPhim) {
            return dsPhim.map((phim, index) => {
                if (index < 5) {
                    if (index === 0) {
                        return (
                            <div key={index} className="carousel-item active">
                                <NavLink to={`/chitietphim/${phim.maPhim}`}>  <div className="carousel__wrap">
                                    <img className="d-block img__background" src={phim.hinhAnh} alt={index} />
                                    <img className="d-block" src={phim.hinhAnh} alt={index} />
                                </div>
                                </NavLink>
                            </div>
                        )
                    }
                    return (
                        <div key={index} className="carousel-item">
                            <NavLink to={`/chitietphim/${phim.maPhim}`} className="w-100">  <div className="carousel__wrap">
                                <img className="d-block img__background" src={phim.hinhAnh} alt={index} />
                                <img className="d-block" src={phim.hinhAnh} alt={index} />
                            </div>
                            </NavLink>
                        </div>
                    )
                }
                else{
                    return null
                }
            })
        }
    }
    return (
        <div className="home__carousel">
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel" data-interval="4000">
                <div className="carousel-inner">
                    {renderCarousel()}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    )
}
