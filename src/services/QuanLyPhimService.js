import Axios from "axios"
import { domain, maNhom, soPhimTrenTrang } from "../Config/config"

class QuanLyPhimService {
    layDanhSachPhim = () => {
        return Axios({
            method: 'get',
            url: `${domain}/api/QuanLyPhim/LayDanhSachPhim?maNhom=` + maNhom
        })
    }
    layChiTietPhim = (maPhim) => {
        return Axios({
            method: 'get',
            url: `${domain}/api/QuanLyPhim/LayThongTinPhim?MaPhim=` + maPhim
        })
    }
    layThongTinHeThongRap = () => {
        return Axios({
            method: 'get',
            url: `${domain}/api/QuanLyRap/LayThongTinHeThongRap`
        })
    }
    layThongTinLichChieu = (maPhim) => {
        return Axios({
            method: 'get',
            url: `${domain}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=` + maPhim
        })
    }
    layDanhSachPhongVe = (maLichChieu) => {
        return Axios({
            method: 'get',
            url: `${domain}/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=` + maLichChieu
        })
    }
    layPhimTheoTrang = (soTrang) => {
        return Axios({
            method: 'get',
            url: `${domain}/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP11&soTrang=${soTrang}&soPhanTuTrenTrang=${soPhimTrenTrang}`
        })
    }
    themPhim = (phim, token) =>{
        console.log(phim)
        console.log(token)
        return Axios({
            method: 'post',
            url: `${domain}/api/QuanLyPhim/ThemPhim`,
            data: phim,
            headers: {
                'Authorization': `Bearer ` + token
            }
        })
    }
    xoaPhim = (maPhim, token)=>{
        return Axios({
            method: 'DELETE',
            url: `${domain}/api/QuanLyPhim/XoaPhim`,
            params: {
                MaPhim : maPhim,
            },
            headers: {
                'Authorization': `Bearer ` + token
            }
        })
    }
}
export const quanLyPhimService = new QuanLyPhimService();