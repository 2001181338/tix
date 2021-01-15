import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik';
import { funcDispatch } from '../../../redux/actions/QuanLyPhimActions'
import { DANG_NHAP } from '../../../redux/constants/QuanLyPhimConstants';
import { Redirect } from 'react-router-dom'
import { userService } from '../../../services/User';

function SignIn() {
    const [login, setLogin] = useState(false)
    const [loaiND, setLoaiND] = useState('KhachHang');
    let dispatch = useDispatch()
    useEffect(() => {
        let taiKhoan = localStorage.getItem('taiKhoan');
        if (taiKhoan === null) {
            setLogin(false)
        } else {
            setLogin(true)
        }
    }, [])
    const handleSubmit = (user) => {
        userService.dangNhapAxios(user).then(res => {
            let { taiKhoan, accessToken, maLoaiNguoiDung } = res.data;
            localStorage.setItem('taiKhoan', taiKhoan)
            localStorage.setItem('token', accessToken)
            localStorage.setItem('loaiND', maLoaiNguoiDung)
            setLoaiND(maLoaiNguoiDung)
            dispatch(funcDispatch(DANG_NHAP, res.data))
            setLogin(true)

        }).catch(e => {
            alert(e.response.data)
            setLogin(false)
        })
    }
    if (login && loaiND === 'KhachHang') {
        return <Redirect to="/" />
    }
    if (login && loaiND === 'QuanTri') {
        return <Redirect to="/admin" />
    }
    return <div className="signIn">
        <div className="signIn__background">
            <div className="signIn__wrap">
                <div className="signIn__content">
                    <h1>Đăng nhập</h1>
                    <Formik initialValues={{
                        taiKhoan: '',
                        matKhau: ''
                    }}
                        onSubmit={handleSubmit}
                    >
                        {(formikProps) => (
                            <Form>
                                <div className="form-group">
                                    <label>Tài khoản</label>
                                    <Field type="text" className="form-control" name="taiKhoan" onChange={formikProps.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label>Mật khẩu</label>
                                    <Field type="password" className="form-control" name="matKhau" onChange={formikProps.handleChange} />
                                </div>
                                {!login ? '' : <p className="text-danger">Tài khoản hoặc mật khẩu không đúng</p>}
                                <button type="submit" className="btn btn-success">Đăng nhập</button>
                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </div>
    </div>;
}

export default React.memo(SignIn);