import AdminPage from "../container/Admin"
import QuanLyPhim from "../container/Admin/QuanLyPhim"
import ChinhSuaPhim from "../container/Admin/QuanLyPhim/ChinhSuaPhim"
import TaoLichChieu from "../container/Admin/QuanLyPhim/TaoLichChieu"
import ThemPhim from "../container/Admin/QuanLyPhim/ThemPhim"
import BookingTicket from "../container/Home/BookingTicket"
import ChiTietPhim from "../container/Home/Detail"
import HomePage from "../container/Home/Home"
import Register from "../container/Home/Register"
import SignIn from "../container/Home/SignIn"
import UserInfo from "../container/Home/UserInfo"

const routesHome = [
    {
        exact: true,
        path: "/",
        component: HomePage
    },
    {
        exact: true,
        path: "/chitietphim/:maPhim",
        component: ChiTietPhim
    },
    {
        exact: true,
        path: "/bookingTicket/:maLichChieu",
        component: BookingTicket
    },
    {
        exact: true,
        path: "/dangnhap",
        component: SignIn
    },
    {
        exact: true,
        path: "/dangky",
        component: Register
    },
    {
        exact: true,
        path: '/thong-tin-tai-khoan',
        component: UserInfo
    }
]
const routesAdmin = [
    {
        exact: true,
        path: '/admin',
        component: AdminPage
    },
    {
        exact: true,
        path: '/admin/quan-ly-phim',
        component: QuanLyPhim
    },
    {
        exact: true,
        path: '/admin/them-phim',
        component: ThemPhim
    },
    {
        exact: true,
        path: '/admin/chinh-sua-phim/:maPhim',
        component: ChinhSuaPhim
    },
    {
        exact: true,
        path: '/admin/tao-lich-chieu',
        component: TaoLichChieu
    },

]
export { routesHome, routesAdmin }