// import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { LAY_DANH_SACH_PHIM } from "../constants/QuanLyPhimConstants";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
export const layDanhSachPhimAxios = () => {
    return dispatch => {
        quanLyPhimService.layDanhSachPhim().then(res => {
            dispatch({
                type: LAY_DANH_SACH_PHIM,
                dsPhim: res.data,
            })
        }).catch(err => {
            console.log(err.response.data);
        })
    }
  
}