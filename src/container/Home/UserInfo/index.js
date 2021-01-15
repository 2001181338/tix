import React, { useEffect, useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { userService } from '../../../services/User';
import moment from 'moment';
// import { Container } from './styles';

function UserInfo() {
    const [thongTinDatVe, setThongTinDatVe] = useState([])
    useEffect(() => {
        let taiKhoanLocal = localStorage.getItem('taiKhoan');
        let user = {
            taiKhoan: ''
        }
        if (taiKhoanLocal !== null) {
            user.taiKhoan = taiKhoanLocal;
            userService.layThongTinTaiKhoan(user).then(res => {
                setThongTinDatVe(res.data.thongTinDatVe)
            }).catch(e => {
                console.log(e.response.text)
            })
        }
    }, [])
    const renderThongTin = () => {
        if (thongTinDatVe !== []) {
            return thongTinDatVe.map((thongTin, index) => {
                return <tr key={index} >
                    <td className="align-middle">{thongTin.tenPhim}</td>
                    <td className="align-middle">
                        <p>Ngày đặt: {moment(thongTin.ngayDat).format('DD-MM-YYYY')}</p>
                        <p> Giờ đặt: {moment(thongTin.ngayDat).format('HH:MM')}</p>
                    </td>
                    <td className="align-middle">
                        {renderThongTinGheDat(thongTin.danhSachGhe)}
                    </td>
                </tr>
            })
        }
    }
    const renderThongTinGheDat = (danhSachGhe) => {
        return danhSachGhe.map((ghe, index) => {
            return (
                <div key={index}>
                    <span> {ghe.maHeThongRap}</span> -
                    <span> {ghe.tenGhe}</span>
                </div>
            )
        })
    }
    return <div className="userInfo">
        <div className="container my-5">
            <h2 className="text-center text-danger ">Lịch sử đặt vé</h2>
            <table className="table table-striped text-center">
                <thead className="table-dark">
                    <tr>
                        <th>Tên phim</th>
                        <th>Ngày đặt</th>
                        <th>Cụm rạp - Số ghế</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    {renderThongTin()}
                </tbody>
            </table>
        </div>
    </div>;
}

export default UserInfo;