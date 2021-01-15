import { DANG_NHAP, DANG_XUAT, LAY_DANH_SACH_PHIM } from "../constants/QuanLyPhimConstants";

const initialState = {
    dsPhim: [],
    userLogin: false
}
export default (state = initialState, action) => {
    switch (action.type) {
        case LAY_DANH_SACH_PHIM: {
            state.dsPhim = action.data;
            return { ...state }
        }
        case DANG_NHAP: {
            state.userLogin = true;
            return { ...state }
        }
        case DANG_XUAT: {
            state.userLogin = false;
            return { ...state }
        }
        default:
            return state;
    }
}

