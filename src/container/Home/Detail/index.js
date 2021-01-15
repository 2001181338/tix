import React, { useEffect, useState } from 'react'
import { quanLyPhimService } from '../../../services/QuanLyPhimService';
import moment from 'moment'
import { NavLink } from 'react-router-dom';
import ReactPlayer from "react-player"
function ChiTietPhim(props) {
    const [chiTietLichChieu, setChiTietLichChieu] = useState({})
    const [pause, setPause] = useState(false);
    const [userLogin, setUserLogin] = useState(false)
    useEffect(() => {
        const { maPhim } = props.match.params;
        let taiKhoan = localStorage.getItem('taiKhoan');
        if (taiKhoan === null) {
            setUserLogin(false)
        }
        else {
            setUserLogin(true)
        }
        quanLyPhimService.layThongTinLichChieu(maPhim).then((res) => {
            let chiTietPhim = res.data;
            console.log(chiTietPhim)
            setChiTietLichChieu(chiTietPhim)
        }).catch((e) => {
            console.log(e.response.data)
        })
    }, [])
    const renderRate = (number) => {
        let star = [];
        for (let i = 0; i < number; i++) {
            star.push(<i className="fa fa-star" key={i}></i>)
        }
        return star;
    }
    const renderBackground = () => {
        let phim = chiTietLichChieu;
        return (
            <div className="moviesDetail__background" >
                <img src={phim.hinhAnh} alt={phim.biDanh} className="moviesDetail__img" />
                <div className="moviesDetail__wrap">
                    <div className="moviesDetail__card">
                        <div className="moviesDetail__video">
                            <img src={phim.hinhAnh} alt={phim.biDanh} />
                            <div className="moviesDetail__play">
                                <button href="https://getbootstrap.com/docs/4.5/components/navs/" data-toggle="modal" data-target="#myVideo" onClick={() => {
                                    setPause(true);
                                }}>
                                    <i className="fa fa-play"></i>
                                </button>
                            </div>
                        </div>
                        <div className="moviesDetail__text">
                            <p>{moment(phim.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                            <h2>{phim.tenPhim}</h2>
                            <div className="moviesDetail__rate">
                                {renderRate(phim.danhGia)}
                            </div>
                            <a href="#moviesBooking">Mua vé</a>
                        </div>

                    </div>
                </div>
                <div className="modal fade" id="myVideo" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                                    setPause(false)
                                }}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <ReactPlayer url={phim.trailer === null ? 'http://www.youtube.com/watch?v=7sDY4m8KNLc&t=255s' : phim.trailer} playing={pause} controls width="100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    const renderMenuHeThongRap = () => {
        return chiTietLichChieu.heThongRapChieu?.map((heThongRap, index) => {
            return (
                <li className="nav-item moviesSchedular__item" role="presentation" key={index}>
                    <a className="nav-link" id="profile-tab" data-toggle="tab" href={`#${heThongRap.maHeThongRap}`} role="tab" aria-controls="profile" aria-selected="false">
                        <img src={heThongRap.logo} alt={heThongRap.maHeThongRap} />
                    </a>
                </li>

            )
        })
    }
    const renderNoiDungHeThongRap = () => {
        return chiTietLichChieu.heThongRapChieu?.map((heThongRap, index) => {
            return <div className="tab-pane fade" id={heThongRap.maHeThongRap} role="tabpanel" aria-labelledby="profile-tab" key={index}>
                {heThongRap.cumRapChieu?.map((cumRap, index) => {
                    return (
                        <div key={index}>
                            <h2>{cumRap.tenCumRap}</h2>
                            <div className="row moviesSchedular__time">
                                {cumRap.lichChieuPhim?.slice(0, 12).map((lichChieu, index) => {
                                    if (userLogin) {
                                        return <NavLink className="col-md-3" key={index} to={`/bookingTicket/${lichChieu.maLichChieu}`}>
                                            {moment(lichChieu.ngayChieuGioChieu).format('DD-MM hh:mm a')}
                                        </NavLink>
                                    }
                                    else {
                                        return <NavLink className="col-md-3" key={index} to='/dangnhap'>
                                            {moment(lichChieu.ngayChieuGioChieu).format('DD-MM hh:mm a')}
                                        </NavLink>
                                    }
                                })}
                            </div>
                        </div>
                    )
                })
                }

            </div>

        })
    }
    return (
        <div className="moviesDetail">
            {renderBackground()}
            <div className="moviesSchedular" id="moviesBooking">
                <div className="container moviesSchedular__content">
                    <div className="row moviesSchedular__wrap">
                        <div className="col-md-4 moviesSchedular__menu">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                {renderMenuHeThongRap()}
                            </ul>
                        </div>
                        <div className="col-md-8 moviesSchedular__schedular">
                            <div className="tab-content" id="myTabContent">
                                {renderNoiDungHeThongRap()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(ChiTietPhim)