// import { quanLyPhimService } from "../../services/QuanLyPhimService";
import { LAY_DANH_SACH_PHIM } from "../constants/QuanLyPhimConstants";
import { quanLyPhimService } from "../../services/QuanLyPhimService";
export const funcDispatch = (type, data) => ({
    type,
    data
})
export const layDanhSachPhimAxios = () => {
    return dispatch => {
        quanLyPhimService.layDanhSachPhim().then(res => {
            dispatch(funcDispatch(LAY_DANH_SACH_PHIM, res.data))
        }).catch(err => {
            console.log(err.response.data);
        })
    }
}


