import React, { Component } from 'react'
export default class Navbar extends Component {
    render() {
        return (
            <div className="header">
                <div className="header__logo">
                    <img src="./img/web-logo.png" alt="logo" />
                </div>
                <div className="header__menu">
                    <ul>
                        <li><a href="/">Lịch chiếu</a></li>
                        <li><a href="/">Cụm rạp</a></li>
                        <li><a href="/">Tin tức</a></li>
                        <li><a href="/">Ứng dụng</a></li>
                    </ul>
                </div>
                <div className="header__login">
                    Đăng nhập
                </div>
            </div>
        )
    }
}
