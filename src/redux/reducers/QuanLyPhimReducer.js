import { LAY_DANH_SACH_PHIM } from "../constants/QuanLyPhimConstants";

const initialState = {
    dsPhim: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case LAY_DANH_SACH_PHIM: {
            return { ...state, dsPhim: action.dsPhim }
        }
        default:
            return state;
    }
}

