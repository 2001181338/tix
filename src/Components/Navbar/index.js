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
                        <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat">Lịch chiếu</a></li>
                        <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat">Cụm rạp</a></li>
                        <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat">Tin tức</a></li>
                        <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat">Ứng dụng</a></li>
                    </ul>
                </div>
                <div className="header__login">
                    <ul>
                        <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat"><i className="fa fa-user-circle"></i>Đăng nhập</a></li>
                        <li><a href="https://glyphsearch.com/?fbclid=IwAR3TS2iiKN3iIWznYVRPu6BYK-9gL2rlJ3rfve1XFVBFKvBDHONkxhOwrCY&library=font-awesome&query=stat">Đăng Ký</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
