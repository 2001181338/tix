import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik'
import { domain, maNhom } from '../../../../Config/config';
import { moviesSchema } from '../../../../services/User';
import "react-datepicker/dist/react-datepicker.css";
import { DatePickerField } from './DatePicker';
import moment from 'moment';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
function ThemPhim() {
    const [hinhAnh, setHinhAnh] = useState();
    const [addMovie, setAddMovie] = useState(false);
    const handleSubmit = (phim) => {
        // console.log(phim)
        var d1 = new Date(phim.ngayKhoiChieu)
        phim.danhGia = parseInt(phim.danhGia)
        let ngayFormat = moment(phim.ngayKhoiChieu).format("DD/MM/yyyy");
        phim.ngayKhoiChieu = ngayFormat;
        if (d1.getTime() < Date.now() ) {
            alert("Ngày khởi chiếu không hợp lệ");
            return;
        }
      
        // let token = localStorage.getItem('token');
        if (hinhAnh === undefined) {
            alert("Vui lòng chọn hình ảnh");
            return;
        }
        //Thêm phim
        // quanLyPhimService.themPhim(phim, token).then(res => {
        //     // alert("Thêm thành công");
        // }).catch(e => {
        //     alert(e.response?.data);
        //     return;
        // })
        phim.hinhAnh = hinhAnh;
        console.log(phim)
        // Upload hình
        var form_data = new FormData();
        for (var key in phim) {
            form_data.append(key, phim[key]);
        }
        Axios({
            method: 'post',
            url: `${domain}/api/QuanLyPhim/ThemPhimUploadHinh`,
            data: form_data,
        }).then(res => {
            setAddMovie(true);
        }).catch(e => {
            alert(e.response?.data);
        })

    }
    const changeHinhAnh = (e) => {
        // console.log(e.target.files[0])
        let objHinhAnh = e.target.files[0];
        setHinhAnh(objHinhAnh);
    }
    if (addMovie) {
        alert("Thêm thành công");
        return <Redirect to="/admin" />
    }
    return <div className="addMovie">
        <h1 className="text-danger text-center">Thêm phim</h1>
        <Formik initialValues={{
            maPhim: 0,
            tenPhim: "",
            biDanh: "",
            trailer: "",
            hinhAnh: {},
            moTa: "",
            maNhom: maNhom,
            ngayKhoiChieu: "",
            danhGia: 0
        }}
            onSubmit={handleSubmit}
            validationSchema={moviesSchema}
        >
            {(formilkProps) => (
                <Form>
                    <div className="row bg-white py-4 px-2">
                        <div className="col-md-6">
                            {/* <div className="form-group">
                                <span htmlFor="maPhim">Mã phim</span>
                                <Field type="text" className="form-control" name="maPhim" onChange={formilkProps.handleChange} />
                                <ErrorMessage name="maPhim">
                                    {msg => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </div> */}
                            <div className="form-group">
                                <span htmlFor="tenPhim">Tên phim</span>
                                <Field type="text" className="form-control" name="tenPhim" onChange={formilkProps.handleChange} />
                                <ErrorMessage name="tenPhim">
                                    {msg => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <span htmlFor="biDanh">Bí danh</span>
                                <Field type="text" className="form-control" name="biDanh" onChange={formilkProps.handleChange} />
                                <ErrorMessage name="biDanh">
                                    {msg => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <span htmlFor="hinhAnh">Hình ảnh</span>
                                <input type="file" name="hinhAnh" className="form-control" onChange={changeHinhAnh} />

                            </div>

                        </div>
                        <div className="col-md-6">

                            <div className="form-group">
                                <span htmlFor="trailer">Trailer</span>
                                <Field type="text" className="form-control" name="trailer" onChange={formilkProps.handleChange} />
                                <ErrorMessage name="trailer">
                                    {msg => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <span htmlFor="moTa">Mô tả</span>
                                <Field type="text" className="form-control" name="moTa" onChange={formilkProps.handleChange} />
                                <ErrorMessage name="moTa">
                                    {msg => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </div>

                            <div className="form-group">
                                <span htmlFor="ngayKhoiChieu">Ngày khởi chiếu</span>
                                <div>
                                    <DatePickerField name="ngayKhoiChieu" />
                                </div>
                                <ErrorMessage name="ngayKhoiChieu">
                                    {msg => <p className="text-danger">{msg}</p>}
                                </ErrorMessage>
                            </div>
                        </div>
                        <div className="text-center w-100">
                            <button className="btn btn-success my-3" type="submit">
                                Thêm phim
                             </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    </div>;
}

export default ThemPhim;