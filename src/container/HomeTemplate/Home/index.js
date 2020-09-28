import React, { useEffect } from 'react'
import Carousel from './Carousel'
import { useDispatch } from "react-redux";
import { layDanhSachPhimAxios } from '../../../redux/actions/QuanLyPhimActions'
import DanhSachPhim from './DanhSachPhim';

export default function HomePage() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAxios());
    })

    return (
        <div className="home">
            <Carousel />
            <DanhSachPhim/>
        </div>
    )
}
