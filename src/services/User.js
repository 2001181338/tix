import * as yup from 'yup'
import Axios from 'axios'
import { domain, maNhom } from '../Config/config'
let khongDeTrong = 'không được để trống';
export const signupUserSchema = yup.object().shape({
    taiKhoan: yup.string().required('Tài khoản ' + khongDeTrong),
    matKhau: yup.string().required('Mật khẩu ' + khongDeTrong),
    hoTen: yup.string().required('Họ tên ' + khongDeTrong),
    email: yup.string().required('Email ' + khongDeTrong).email('Email không đúng định dạng'),
    soDt: yup.string().matches(/^[0-9]+$/,  {message: "Số điện thoại không đúng định dạng"}).required('Số điện thoại ' + khongDeTrong)
})
export const moviesSchema = yup.object().shape({
    // maPhim: yup.string().required('Mã phim ' + khongDeTrong),
    tenPhim: yup.string().required('Tên phim ' + khongDeTrong).default("ABC"),
    biDanh: yup.string().required("Bí danh " + khongDeTrong).default("ABC"),
    trailer: yup.string().required("Trailer " + khongDeTrong).default("ABC"),
    // hinhAnh: yup.string().required("Hình ảnh " + khongDeTrong),
    moTa: yup.string().required("Mô tả " + khongDeTrong).default("ABC"),
    ngayKhoiChieu: yup.string().required("Ngày khởi chiếu " + khongDeTrong).default("22/12/2012"),
    // danhGia: yup.string().matches(/^[0-9]+$/, {message: "Đánh giá không đúng dịnh dạng"}).required('Đánh giá ' + khongDeTrong)
})

class UserService {
    dangNhapAxios = (user) => {
        return Axios({
            method: 'post',
            url: `${domain}/api/QuanLyNguoiDung/DangNhap`,
            data: user
        })
    }
    dangKyAxios = (user) => {
        return Axios({
            method: 'post',
            url: `${domain}/api/QuanLyNguoiDung/DangKy`,
            data: user
        })
    }
    
    layDanhSachNguoiDung = () => {
        return Axios({
            method: 'get',
            url: `${domain}/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=` + maNhom
        })
    }
    layThongTinTaiKhoan = (user) => {
        return Axios({
            method: 'post',
            url: `${domain}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
            data: user
        })
    }
}
export const userService = new UserService();