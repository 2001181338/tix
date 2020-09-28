import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
export default function DanhSachPhim() {
    let getDsPhim = useSelector(state => state.QuanLyPhimReducer.dsPhim);
    let [dsPhim, setDSPhim] = useState();
    useEffect(() => {
        setDSPhim(getDsPhim);
    })
    let renderDanhGia = (number) => {
        let lstStar = [];
        for (let i = 0; i < number; i++) {
            lstStar.push(<i key={i} className="fa fa-star"></i>)
        }
        return lstStar;
    }
    let renderLstPhim = () => {
        if (dsPhim) {
            return dsPhim.map((phim, index) => {
                // return  <div className="lstPhim__item" key={index}>
                //     <img src={phim.hinhAnh} alt={phim.tenPhim} />
                //     <div className="lstPhim__text">
                //         <h4>{phim.tenPhim}</h4>
                //         <p>Đánh giá {renderDanhGia(phim.danhGia)}</p>
                //     </div>
                // </div>
                return <div key={index}>AbC</div>
            })
        }
    }
    return (
        <div className="container home__lstPhim">
            <div className="lstPhim__title">
                <h2>Đang Chiếu | Sắp Chiếu</h2>
            </div>  
            <div className="lstPhim__card">
                <OwlCarousel items={4}
                    className="owl-theme"
                    loop
                    nav
                    margin={8} >
                    {renderLstPhim()}
                    {/* <div>abc</div>
                    <div>abc</div>
                    <div>abc</div> */}
                </OwlCarousel>
                {/* {renderLstPhim()} */}
            </div>


        </div>


    )

}

