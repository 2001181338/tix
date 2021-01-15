import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { funcDispatch } from '../../redux/actions/QuanLyPhimActions'
import { DANG_XUAT } from '../../redux/constants/QuanLyPhimConstants'
function Navbar() {
    let dispatch = useDispatch();
    const [taiKhoan, setTaiKhoan] = useState('')
    const [loaiNguoiDung, setLoaiNguoiDung] = useState('');
    const userLogin = useSelector(state => state.QuanLyPhimReducer.userLogin);
    useEffect(() => {
        let userName = localStorage.getItem('taiKhoan');
        let loaiND = localStorage.getItem('loaiND');
        setTaiKhoan(userName)
        setLoaiNguoiDung(loaiND)
    }, [userLogin])
    const handleSignOut = () => {
        localStorage.removeItem('taiKhoan');
        localStorage.removeItem('token');
        localStorage.removeItem('loaiND');
        dispatch(funcDispatch(DANG_XUAT, false));
        setTaiKhoan(null)
    }
    return (
        <div className="header">
            <div className="header__title">
                <NavLink to="/">
                    <h1><span>M</span>ovies</h1>
                </NavLink>
            </div>
            <div className="header__menu">
                <ul>
                    <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat">Lịch chiếu</a></li>
                    <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat">Cụm rạp</a></li>
                    <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat">Tin tức</a></li>
                    <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat">Ứng dụng</a></li>
                </ul>
            </div>
            <div className="header__login">
                {taiKhoan !== null ? (
                <p>Xin chào, 
                    {loaiNguoiDung === "KhachHang" ? <NavLink to="/thong-tin-tai-khoan">{taiKhoan}</NavLink> :
                    <NavLink to="/admin">{taiKhoan}</NavLink>}
                    <button onClick={() => {
                        handleSignOut()
                    }}><i className="fa fa-sign-out-alt"></i></button>
                </p>)
                    : (<ul><li>
                        <NavLink to="/dangnhap">
                            <i className="fa fa-user-circle"></i>
                                Đăng nhập
                            </NavLink>
                    </li>
                        <li>
                            <NavLink to="/dangky">
                                Đăng ký
                            </NavLink>
                        </li>
                    </ul>
                    )}

            </div>
        </div>
    )

}

export default Navbar;