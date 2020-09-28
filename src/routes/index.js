import ChiTietPhim from "../container/HomeTemplate/Detail"
import HomePage from "../container/HomeTemplate/Home"

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
    }
]
const routesAdmin = [
    {

    }
]
export {routesHome, routesAdmin}