import React, { useEffect, useState } from 'react';
import { NavLink, Redirect, Route } from 'react-router-dom';
import NavbarAdmin from '../Components/NavbarAdmin';

// import { Container } from './styles';

function AdminTemplate({ Component, ...props }) {
    const [loaiND, setLoaiND] = useState("QuanTri");
    const [userName, setUserName] = useState("");
    useEffect(() => {
        let loaiND = localStorage.getItem("loaiND");
        let taiKhoan = localStorage.getItem("taiKhoan");
        setUserName(taiKhoan);
        setLoaiND(loaiND);
    }, [])
    if (loaiND !== "QuanTri") {
        return <Redirect to="/" />
    }
    return <Route
        {...props}
        render={propComponent => (
            <div className="admin">
                <div className="admin__header">
                    <NavLink to="/admin">
                        <span>M</span>ovies
                    </NavLink>
                    {
                        userName === null ?
                            <NavLink to="/dangnhap">
                                <p> Đăng nhập</p>
                            </NavLink>
                            : (<p>
                                Xin chào,
                                <span>{userName}</span>
                            </p>)
                    }
                </div>
                <div className="container-fluid ">
                    <div className="row">
                        <div className="col-md-3 admin__menu">
                            <NavbarAdmin />
                        </div>
                        <div className="col-md-9 admin__content">
                            <Component {...propComponent} />
                        </div>
                    </div>
                </div>

            </div>
        )}>

    </Route>
}

export default AdminTemplate;