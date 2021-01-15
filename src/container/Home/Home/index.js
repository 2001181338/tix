import React, { useEffect, lazy, Suspense } from 'react'
import Carousel from './Carousel'
import { useDispatch } from "react-redux";
import { layDanhSachPhimAxios } from '../../../redux/actions/QuanLyPhimActions'
import ChristMasBanner from './ChristMasBanner'
import MoviesPopular from './MoviesPopular';
const ComponentLstPhim = lazy(() => import("./DanhSachPhim"))

export default function HomePage() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachPhimAxios());
    }, [])
    return (
        <div className="home">
            <Suspense fallback={<div>Loading...</div>}>
                <Carousel />
                <ComponentLstPhim />
                <ChristMasBanner />
                <MoviesPopular />
            </Suspense>
        </div>
    )
}
