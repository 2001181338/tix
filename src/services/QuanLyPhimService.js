import Axios from "axios"
import { domain } from "../Config/config"

class QuanLyPhimService{
    layDanhSachPhim = ()=>{
        return Axios({
            method: 'get',
            url: `${domain}/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP11`
        })
    }
    layChiTietPhim = (maPhim)=>{
        return Axios({
            method: 'get',
            url: `${domain}/api/QuanLyPhim/LayThongTinPhim?MaPhim=`+maPhim
        })
    }
}
export const quanLyPhimService = new QuanLyPhimService();