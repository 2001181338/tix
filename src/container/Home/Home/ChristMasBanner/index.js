import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ChristMasBanner() {
    return (
        <div className="ChristMasBanner">
            <div className="ChristMasBanner__line">
            </div>
            <div className="ChristMasBanner__contents">
                <div className="ChristMasBanner__top">
                    <i className="fa fa-air-freshener" />
                    <i className="fa fa-map-signs" />
                    <i className="fa fa-socks" />
                    <i className="fa fa-bell" />
                </div>
                <div className="ChristMasBanner__middle">
                    <i className="fa fa-star"></i>
                    <div className="ChristMasBanner__text">
                        <h2>Nhận nhiều ưu đãi</h2>
                        <p>Khi đăng ký thành viên</p>
                        <NavLink to="/dangky">Đăng ký</NavLink>
                    </div>
                    <i className="fa fa-snowflake"></i>
                </div>
                <div className="ChristMasBanner__bottom">
                    <i className="fa fa-candy-cane"></i>
                    <i className="fa fa-heart"></i>
                    <i className="fa fa-snowboarding"></i>
                    <i className="fa fa-gifts"></i>
                </div>
            </div>
        </div>
    )
}
