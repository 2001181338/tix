import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker'
import { domain } from '../../../../Config/config';
import { Form, Field, Formik } from 'formik'
import moment from 'moment'
// import { Container } from './styles';

function TaoLichChieu() {
    const [ngayKhoiChieu, setNgayKhoiChieu] = useState(Date.now)
    const [heThongRap, setHeThongRap] = useState([])
    const [cumRapTheoHeThong, setCumRapTheoHeThong] = useState([])
    const [maHeThongRap, setMaHeThongRap] = useState()
    const [cumRap, setCumRap] = useState({
        diaChi: '',

    })
    const [lichChieu, setLichChieu] = useState({
        maPhim: '',
        giaVe: 0,
        maHeThongRap: ''
    })
    const [maRapDefault, setMaRapDefault] = useState('')
    useEffect(() => {
        Axios({
            method: 'get',
            url: `${domain}/api/QuanLyRap/LayThongTinHeThongRap`
        }).then(res => {
            setHeThongRap(res.data);
        }).catch(e => {
            console.log(e.response?.text);
        })
    }, [])
    useEffect(() => {
        if (maHeThongRap !== undefined) {
            Axios({
                method: 'get',
                url: `${domain}/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=` + maHeThongRap
            }).then(res => {
                setMaRapDefault(res.data[0].danhSachRap[0].maRap);
                setCumRapTheoHeThong(res.data);
            }).catch(e => {
                console.log(e.response?.text);
            })
        }
    }, [maHeThongRap])
    useEffect(() => {
        // console.log(cumRapTheoHeThong[0])
        setCumRap(cumRapTheoHeThong[0])
    }, [cumRapTheoHeThong])
    const renderGioChieu = () => {
        let lstGio = []
        for (let i = 0; i < 24; i++) {
            lstGio.push(<option key={i}>{i}</option>)
        }
        return lstGio
    }
    const renderPhutChieu = () => {
        let lstPhut = []
        for (let i = 0; i < 60; i++) {
            lstPhut.push(<option key={i}>{i}</option>)
        }
        return lstPhut
    }
    const renderHeThongRap = () => {
        return heThongRap.map((heThong, index) => {
            return <option key={index}>{heThong.maHeThongRap}</option>
        })
    }
    const renderCumRap = () => {
        return cumRapTheoHeThong.map((cumRap, index) => {
            return <option key={index} value={cumRap.maCumRap}>{cumRap.maCumRap}</option>
        })
    }
    const handleChangeCumRap = (maCumRap) => {
        let cumRapFetch = cumRapTheoHeThong.find(cum => cum.maCumRap === maCumRap);
        setCumRap(cumRapFetch)
    }

    const renderRap = () => {
        return cumRap?.danhSachRap?.map((rap, index) => {
            return <option value={rap.maRap} key={index}>{rap.tenRap}</option>
        })
    }
    const handleSubmit = (obj) => {
        if (maRapDefault === '') {
            alert('Vui lòng chọn hệ thống rạp')
            return;
        }
        if (obj.maRap === '') {
            obj.maRap = maRapDefault
        }
        if (obj.maPhim === '') {
            alert('Mã phim không được để trống')
            return;
        }
        let d = new Date(ngayKhoiChieu);
        // console.log(dateFormat)
        // let year = moment(dateFormat).year()
        // console.log(year)
        let newDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), obj.gioChieu, obj.phutChieu, 0, 0);
        let dateFormat = moment(newDate).format('DD/MM/yyyy HH:mm:ss')
        let objLichChieu = {
            maPhim: obj.maPhim,
            ngayChieuGioChieu: dateFormat,
            maRap: obj.maRap,
            giaVe: obj.giaVe,
        }
        let token = localStorage.getItem('token');
        Axios({
            method: 'post',
            url: `${domain}/api/QuanLyDatVe/TaoLichChieu`,
            data: objLichChieu,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then(res => {
            alert('Đặt lịch phim thành công');
            // console.log(res)
        }).catch(e => {
            alert(e.response?.data)
        })
    }
    return <div>
        <h1 className="text-danger text-center">Tạo lịch chiếu</h1>
        <Formik initialValues={{
            maPhim: '',
            giaVe: 0,
            gioChieu: 0,
            phutChieu: 0,
            maRap: '',
        }}
            onSubmit={handleSubmit}
        >
            {(formikProps) => (
                <Form>
                    <div className="bg-white p-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span>Mã phim</span>
                                    <Field type="text" className="form-control" name="maPhim" onChange={formikProps.handleChange} />
                                </div>
                                <div className="form-group">
                                    <span>Ngày chiếu</span>
                                    <DatePicker className="form-control" dateFormat={"dd/MM/yyyy"} selected={ngayKhoiChieu} onChange={date => setNgayKhoiChieu(date)} />
                                </div>
                                <div className="form-group">
                                    <span>Hệ thống rạp</span>
                                    <select className="form-control" name="maHeThongRap" onChange={e => {
                                        setMaHeThongRap(e.target.value)
                                    }}>
                                        {renderHeThongRap()}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <span>Địa chỉ</span>
                                    <input type="text" defaultValue={cumRap?.diaChi} className="form-control" disabled />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <span>Giá vé</span>
                                    <Field type="text" className="form-control" name="giaVe" onChange={formikProps.handleChange} />
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Giờ</span>
                                            <select name="gioChieu" className="form-control" onChange={formikProps.handleChange}>
                                                {renderGioChieu()}
                                            </select>

                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <span>Phút</span>
                                            <select name="phutChieu" className="form-control" onChange={formikProps.handleChange}>
                                                {renderPhutChieu()}
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="form-group">
                                    <span>Mã cụm rạp</span>
                                    <select className="form-control" name="maCumRap" onChange={e => {
                                        console.log(e.target.value)
                                        handleChangeCumRap(e.target.value)

                                    }}>
                                        {renderCumRap()}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <span>Rạp</span>
                                    <select className="form-control" name="maRap" onChange={formikProps.handleChange}>
                                        {renderRap()}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-success" type="submit">Tạo Lịch Chiếu</button>
                        </div>
                    </div>

                </Form>
            )}
        </Formik>

    </div>;
}

export default TaoLichChieu;