import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom';
import ModalVideo from '../ModalVideo';
function DanhSachPhim() {
    let [dsPhim, setDSPhim] = useState([]);
    const [modal, setModal] = useState("");
    let getDsPhim = useSelector(state => state.QuanLyPhimReducer.dsPhim);
    useEffect(() => {
        setDSPhim(getDsPhim)
    }, [getDsPhim])
    let renderLstPhim = () => {
        if (dsPhim) {
            return dsPhim.map((phim, index) => {
                // if (index < 18) {
                    return <div className="homeMovies__item showHover" key={index}>
                        <button data-toggle="modal" data-target="#exampleModal" onClick={() => {
                            setModal(phim.trailer)
                        }} >
                            <div className="homeMovies__wrap">
                                <img src={phim.hinhAnh} alt={phim.tenPhim} />
                                <div className="homeMovies__background">
                                </div>
                                <div className="homeMovies__new">
                                    <p>New</p>
                                </div>
                                <div className="homeMovies__video">
                                    <i className="far fa-play-circle"></i>
                                </div>
                            </div>
                        </button>
                        <div className="homeMovies__text">
                            {phim.tenPhim}
                        </div>
                        <div className="homeMovies__selected">
                            <NavLink to={`/chitietphim/${phim.maPhim}`}>
                                XEM CHI TIẾT
                            </NavLink>
                        </div>
                    </div>
                // }
                // else {
                //     return null
                // }
            })
        }
    }
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        rows: 2,
        autoplay: true,
    };
    return (
        <div className="container homeMovies">
            <div className="movie__title">
                <h2>Đang Chiếu | Sắp Chiếu</h2>
            </div>
            <div className="homeMovies__card">
                <Slider {...settings}>
                    {renderLstPhim()}
                </Slider>
            </div>
            <ModalVideo modal={modal} />
        </div>

    )

}
export default React.memo(DanhSachPhim);