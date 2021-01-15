import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from 'react-router-dom';
// import { Container } from './styles';

function MoviesPopular() {
    let [movies, setMovies] = useState([]);
    let fetchMovies = useSelector(state => state.QuanLyPhimReducer.dsPhim);
    useEffect(() => {
        setMovies(fetchMovies);
    }, [fetchMovies])
    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        rows: 1,
        autoplay: true,
        cssEase: "linear"
    };
    const renderMovies = (check) => {
        if (movies !== null) {
            if(check){
                return movies.map((movie, index) => {
                    return <div className="homeMovies__item showHover" key={index}>
                        <button>
                            <div className="homeMovies__wrap">
                                <img src={movie.hinhAnh} alt={movie.tenPhim} />
                                <div className="homeMovies__background">
                                </div>
                                <div className="homeMovies__new">
                                    <p>New</p>
                                </div>
                            </div>
                        </button>
                        <div className="homeMovies__text">
                            {movie.tenPhim}
                        </div>
                        <div className="homeMovies__selected">
                            <NavLink to={`/chitietphim/${movie.maPhim}`}>
                                XEM CHI TIẾT
                        </NavLink>
                        </div>
                    </div>
                })
            }
            else{
                return movies.reverse().map((movie, index) => {
                    return <div className="homeMovies__item showHover" key={index}>
                        <button>
                            <div className="homeMovies__wrap">
                                <img src={movie.hinhAnh} alt={movie.tenPhim} />
                                <div className="homeMovies__background">
                                </div>
                                <div className="homeMovies__new">
                                    <p>New</p>
                                </div>
                            </div>
                        </button>
                        <div className="homeMovies__text">
                            {movie.tenPhim}
                        </div>
                        <div className="homeMovies__selected">
                            <NavLink to={`/chitietphim/${movie.maPhim}`}>
                                XEM CHI TIẾT
                        </NavLink>
                        </div>
                    </div>
                })
            }
        }
    }
    return (<div className="moviesPopular">
        <div className="movie__title">
            <h2>Phim Yêu Thích</h2>
        </div>
        <div className="homeMovies__card">
            <Slider {...settings}>
                {renderMovies(true)}
            </Slider>
        </div>
        <div className="movie__title">
            <h2>Phim Phổ Biến</h2>
        </div>
        <div className="homeMovies__card">
            <Slider {...settings}>
                {renderMovies(false)}
            </Slider>
        </div>
    </div>)
}

export default React.memo(MoviesPopular);