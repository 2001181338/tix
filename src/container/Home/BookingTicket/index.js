import React, { useEffect, useState } from 'react';
import { quanLyPhimService } from '../../../services/QuanLyPhimService';
import { quanLyVePhim } from '../../../services/QuanLyVePhimService';

function BookingTicket(props) {
    const [dsGhe, setDsGhe] = useState([])
    const [thongTinPhim, setThongTinPhim] = useState({})
    const [dsGheChon, setDsGheChon] = useState({
        danhSachGhe: [],
        tongTien: 0
    })
    const [checkDatVe, setCheckDatVe] = useState(false);
    useEffect(() => {
        let { maLichChieu } = props.match.params;
        quanLyPhimService.layDanhSachPhongVe(maLichChieu).then(res => {
            let { danhSachGhe, thongTinPhim } = res.data;
            // console.log(danhSachGhe)
            // console.log(thongTinPhim)
            setDsGhe(danhSachGhe);
            setThongTinPhim(thongTinPhim);
            setCheckDatVe(false);
        }).catch(e => {
            console.log(e.response.data)
        })
    }, [checkDatVe])
    const handleSelectedChair = (gheSelected) => {
        let checkIndex = dsGheChon.danhSachGhe.findIndex(gheChon => gheChon.maGhe === gheSelected.maGhe);
        let dsGheUpdate = []
        if (checkIndex < 0) {
            let chairInsert = {
                maGhe: gheSelected.maGhe,
                giaVe: gheSelected.giaVe
            }
            dsGheUpdate = [...dsGheChon.danhSachGhe, chairInsert];
        }
        else {
            dsGheUpdate = dsGheChon.danhSachGhe.filter(gheChon => gheChon.maGhe !== gheSelected.maGhe)
        }
        let tongTien = dsGheUpdate.reduce((tong, ghe) => {
            return tong += ghe.giaVe
        }, 0)
        setDsGheChon({ danhSachGhe: dsGheUpdate, tongTien: tongTien })
    }
    const renderDanhSachGhe = () => {
        let dsGheVip = dsGhe.filter(ghe => ghe.loaiGhe === "Vip").slice(0, 18)
        let dsGheThuong = dsGhe.filter(ghe => ghe.loaiGhe === "Thuong").splice(0, 36)
        let dsGheTraVe = dsGheVip.concat(dsGheThuong)
        // console.log(dsGheChon.danhSachGhe)
        return dsGheTraVe.map((ghe, index) => {
            let checkIndex = dsGheChon.danhSachGhe.findIndex(gheChon => gheChon.maGhe === ghe.maGhe);
            if (checkIndex < 0) {
                if (ghe.daDat) {
                    return <div className="col-md-2" key={index}>
                        <button className="bookingTicket__chairBooked"></button>
                    </div>
                }
                else if (ghe.loaiGhe === "Vip") {
                    return (<div className="col-md-2" key={index}>
                        <button className="bookingTicket__chairVip" onClick={() => {
                            handleSelectedChair(ghe)
                        }}></button>
                    </div>)
                }
                else {
                    if (ghe.daDat) {
                        return <div className="col-md-2" key={index}>
                            <button className="bookingTicket__chairBooked"></button>
                        </div>
                    }
                    return <div className="col-md-2" key={index}>
                        <button className="bookingTicket__chairNormal" onClick={() => {
                            handleSelectedChair(ghe)
                        }}></button>
                    </div>
                }
            }
            else {
                return <div className="col-md-2" key={index}>
                    <button className="bookingTicket__chairSelected" onClick={() => {
                        handleSelectedChair(ghe)
                    }}></button>
                </div>
            }
        })
    }
    const handleSubmit = () => {
        let taiKhoan = localStorage.getItem('taiKhoan');
        let token = localStorage.getItem('token');
        let loaiND = localStorage.getItem('loaiND');
        if (loaiND !== null && loaiND === "QuanTri") {
            alert("Người quản trị không thể đặt vé")
            return
        }
        if (dsGheChon.danhSachGhe.length === 0) {
            alert("Vui lòng chọn ghế cần đặt");
            return;
        }
        if (taiKhoan === null) {
            alert('Vui lòng đăng nhập trước khi đặt vé');
        }
        else {
            let { maLichChieu } = props.match.params;
            let objectDatVe = {
                'maLichChieu': maLichChieu,
                'danhSachVe': dsGheChon.danhSachGhe,
                'taiKhoanNguoiDung': taiKhoan
            }
            quanLyVePhim.datVeXemPhim(objectDatVe, token).then(res => {
                setCheckDatVe(true)
                alert("Đặt vé thành công")
                setDsGheChon({
                    danhSachGhe: [],
                    tongTien: 0
                })
            }).catch(e => {
                alert("Đặt vé thất bại")
                setCheckDatVe(false)
            })

        }
    }
    return <div className="bookingTicket">
        <div className="bookingTicket__background">
            <div className="bookingTicket__content">
                <h1>{thongTinPhim.tenCumRap}</h1>
                <div className="row bookingTicket__screen">
                    <div className="col-md-6 bookingTicket__chairs">
                        <div className="row">
                            {renderDanhSachGhe()}
                        </div>
                    </div>
                    <div className="col-md-6 bookingTicket__bills">
                        <p><span>Phim: </span>{thongTinPhim.tenPhim}</p>
                        <p><span>Ngày chiếu: </span>{thongTinPhim.gioChieu}, {thongTinPhim.ngayChieu}</p>
                        <p><span>Địa chỉ: </span>{thongTinPhim.diaChi}</p>
                        <p>
                            <span>
                                Giá vé:
                            </span>
                        </p>
                        <p>
                            <button className="bookingTicket__chairVip"></button>
                            90.000 VNĐ
                            <button className="bookingTicket__chairNormal"></button>
                            75.000 VNĐ
                        </p>

                        <p><span>Số ghế chọn: </span> {dsGheChon.danhSachGhe.length}</p>
                        <p><span>Tổng tiền: </span>{dsGheChon.tongTien}</p>
                        <button className="btn btn-success w-100" onClick={() => {
                            handleSubmit()
                        }}>Đặt vé</button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default React.memo(BookingTicket);