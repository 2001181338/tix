
import React, { useEffect, useState } from 'react';
import { quanLyPhimService } from '../../../../services/QuanLyPhimService';
import { domain, maNhom } from '../../../../Config/config';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
function ChinhSuaPhim(props) {
    const [chiTietPhim, setChiTietPhim] = useState({
        maPhim: "",
        tenPhim: "",
        biDanh: "",
        trailer: "",
        hinhAnh: {},
        moTa: "",
        maNhom: maNhom,
        ngayKhoiChieu: new Date(),
        danhGia: 0
    });
    const [chinhSua, setChinhSua] = useState(false);
    const [hinhAnh, setHinhAnh] = useState("");
    useEffect(() => {
        let { maPhim } = props.match.params;
        quanLyPhimService.layChiTietPhim(maPhim).then(res => {
            let { tenPhim, biDanh, trailer, hinhAnh, moTa, ngayKhoiChieu, danhGia } = res.data;
            let dateFormat = new Date(ngayKhoiChieu);
            setChiTietPhim({
                maNhom,
                maPhim,
                tenPhim,
                biDanh,
                trailer,
                hinhAnh,
                moTa,
                danhGia,
                ngayKhoiChieu: dateFormat
            })
            setHinhAnh(hinhAnh)
        }).catch(e => {
            alert(e.response?.data);
        })
    }, [])
    const handleSubmit = () => {
        let token = localStorage.getItem('token');
        let formData = new FormData();
        // console.log(ngayFormat)
        // let dateFormat = new Date(Date.UTC(moment(ngayFormat).year(), moment(ngayFormat).month(), moment(ngayFormat).day()));
        // let ngay =  moment(dateFormat).format("DD/MM/yyyy");
        // let dateFormat = new Date(chiTietPhim.ngayKhoiChieu);
        // console.log(dateFormat)
        // console.log(chiTietPhim.ngayKhoiChieu)
        // console.log(moment(ngayFormat).);
        // console.log(ngayFormat)
        // chiTietPhim.maPhim = parseInt(chiTietPhim.maPhim)
        //Khi thay đổi hình ảnh
        if (typeof (chiTietPhim.hinhAnh) !== "string") {
            console.log("thay đổi ảnh")
            for (let key in chiTietPhim) {
                formData.append(key, chiTietPhim[key]);
            }
            chiTietPhim.hinhAnh = `${domain}/hinhanh/${chiTietPhim.hinhAnh.name}`;
            Axios({
                method: 'post',
                url: `${domain}/api/QuanLyPhim/UploadHinhAnhPhim`,
                data: formData,
                headers: {
                    'Authorization': `Bearer ` + token
                }
            }).then(res => {
                
            }).catch(e => {
                alert(e.response?.data)
                return;
            })
        }
        else {
            chiTietPhim.hinhAnh = hinhAnh;
        }
        let ngayFormat = moment(chiTietPhim.ngayKhoiChieu).format("DD/MM/yyyy");
        chiTietPhim.ngayKhoiChieu = ngayFormat;

        Axios({
            method: 'post',
            url: `${domain}/api/QuanLyPhim/CapNhatPhim`,
            data: chiTietPhim,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            alert("Chỉnh sửa thành công");
            setChinhSua(true);
        }).catch(e => {
            console.log(e.response)
        })
        console.log(chiTietPhim)

    }
    const handleChange = (e) => {
        let { name, value } = e.target;
        setChiTietPhim({ ...chiTietPhim, [name]: value });
    }
    if (chinhSua) {
        return <Redirect to="/admin" />
    }
    return <div className="editMovie">
        <div className="row bg-white py-4 px-2">
            <div className="col-md-6">
                <div className="form-group">
                    <span htmlFor="tenPhim">Tên phim</span>
                    <input type="text" className="form-control" value={chiTietPhim.tenPhim} name="tenPhim" onChange={(e) => {
                        handleChange(e)
                    }} />
                </div>
                <div className="form-group">
                    <span htmlFor="ngayKhoiChieu">Ngày khởi chiếu</span>
                    <div>
                        <DatePicker name="ngayKhoiChieu" dateFormat={"dd/MM/yyyy"} selected={chiTietPhim.ngayKhoiChieu} className="form-control" onChange={date => {
                            setChiTietPhim({ ...chiTietPhim, ngayKhoiChieu: date })
                        }} />
                    </div>
                </div>
                <div className="form-group">
                    <span htmlFor="danhGia">Đánh giá</span>
                    <input type="text" className="form-control" value={chiTietPhim.danhGia} name="danhGia" onChange={(e) => {
                        handleChange(e)
                    }} />
                </div>
                <div className="form-group">
                    <span htmlFor="moTa">Mô tả</span>
                    <div>
                        <textarea cols="20" name="moTa" rows="5" value={chiTietPhim.moTa} className="form-control" onChange={e => {
                            handleChange(e)
                        }}>
                        </textarea>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                    <span htmlFor="biDanh">Bí danh</span>
                    <input type="text" className="form-control" value={chiTietPhim.biDanh} name="biDanh" onChange={(e) => {
                        handleChange(e);
                    }} />
                </div>
                <div className="form-group">
                    <span htmlFor="trailer">Trailer</span>
                    <input type="text" className="form-control" value={chiTietPhim.trailer} name="trailer" onChange={(e) => {
                        handleChange(e)
                    }} />
                </div>
                <div className="form-group">
                    <p>Hình ảnh
                        <input type="file" name="hinhAnh" onChange={e => {
                            setChiTietPhim({ ...chiTietPhim, hinhAnh: e.target.files[0] })
                            // setHinhAnh(e.target.files[0]);
                        }} />
                    </p>
                    <img src={hinhAnh} alt={chiTietPhim.tenPhim} width="150" height="250" />
                </div>
            </div>
            <div className="text-center w-100">
                <button className="btn btn-success my-3" type="submit" onClick={() => {
                    handleSubmit();
                }}>
                    Chỉnh sửa
                </button>
            </div>
        </div>
    </div>;
}

export default ChinhSuaPhim;