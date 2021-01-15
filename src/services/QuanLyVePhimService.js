import Axios from "axios";
import { domain } from "../Config/config"

class QuanLyVePhim{
    datVeXemPhim = (objectDatVe, token) =>{
        return Axios({
            url: `${domain}/api/QuanLyDatVe/DatVe`,
            method: 'POST',
            data: objectDatVe,
            headers: {
                'Authorization': `Bearer ` + token
            }
        })
    }
}

export const quanLyVePhim = new QuanLyVePhim();