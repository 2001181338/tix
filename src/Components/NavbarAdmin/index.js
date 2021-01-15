import React from 'react';
import { NavLink } from 'react-router-dom';

// import { Container } from './styles';

function NavbarAdmin() {
    return <div>
        <ul className="nav flex-column">
            <li className="nav-item">
                <NavLink to="/admin/quan-ly-phim" className="nav-link">
                    <i className="fa fa-film"></i>Quản lý phim
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/admin/tao-lich-chieu" className="nav-link">
                <i className="fa fa-plus"></i>Tạo lịch chiếu
                </NavLink>
            </li>
            {/* <li className="nav-item">
                <a className="nav-link" href="https://p.w3layouts.com/demos/modern_admin_panel/web/"> <i className="fa fa-user"></i>Quản lý người dùng</a>
            </li> */}
        </ul>
    </div>;
}

export default NavbarAdmin;