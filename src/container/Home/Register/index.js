import React, { useEffect, useState } from 'react';
import { maNhom } from '../../../Config/config';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signupUserSchema, userService } from '../../../services/User';
import { Redirect } from 'react-router-dom';

function Register() {
    const [loginUser, setLoginUser] = useState(false)
    const [register, setRegister] = useState(false)
    const handleSubmit = (user) => {
        //Kiểm tra tài khoản trùng
        userService.dangKyAxios(user).then(res => {
            alert('Đăng ký thành công');
            setRegister(true)
        }).catch(e => {
            alert(e.response.data);
            setRegister(false)
        })
    }
    useEffect(() => {
        let taiKhoan = localStorage.getItem('taiKhoan');
        if (taiKhoan === null) {
            setLoginUser(false)
        }
        else {
            setLoginUser(true)
        }
    }, [])
    if (loginUser) {
        alert("Vui lòng đăng xuất trước khi đăng ký")
        return <Redirect to="/" />
    }
    if (register) {
        return <Redirect to="/dangnhap" />
    }
    return <div className="signIn">
        <div className="signIn__background">
            <div className="signIn__wrap">
                <div className="signIn__content">
                    <h1>Đăng ký</h1>
                    <Formik initialValues={{
                        taiKhoan: '',
                        matKhau: '',
                        email: "",
                        soDt: "",
                        maNhom: maNhom,
                        maLoaiNguoiDung: "KhachHang",
                        hoTen: ""
                    }}
                        validationSchema={signupUserSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formikProps) => (
                            <Form>
                                <div className="form-group">
                                    <label>Tài khoản</label>
                                    <Field type="text" className="form-control" name="taiKhoan" onChange={formikProps.handleChange} />
                                    <p className="text-danger">
                                        <ErrorMessage name="taiKhoan">
                                            {msg => msg}
                                        </ErrorMessage>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu</label>
                                    <Field type="password" className="form-control" name="matKhau" onChange={formikProps.handleChange} />
                                    <p className="text-danger">
                                        <ErrorMessage name="matKhau">
                                            {msg => msg}
                                        </ErrorMessage>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label>Họ tên</label>
                                    <Field type="text" className="form-control" name="hoTen" onChange={formikProps.handleChange} />
                                    <p className="text-danger">
                                        <ErrorMessage name="hoTen">
                                            {msg => msg}
                                        </ErrorMessage>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field type="text" className="form-control" name="email" onChange={formikProps.handleChange} />
                                    <p className="text-danger">
                                        <ErrorMessage name="email">
                                            {msg => msg}
                                        </ErrorMessage>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <Field type="text" className="form-control" name="soDt" onChange={formikProps.handleChange} />
                                    <p className="text-danger">
                                        <ErrorMessage name="soDt">
                                            {msg => msg}
                                        </ErrorMessage>
                                    </p>
                                </div>
                                <button type="submit" className="btn btn-success w-100">Đăng ký</button>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </div>
    </div>;
}

export default React.memo(Register);