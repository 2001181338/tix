import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { quanLyPhimService } from '../../../services/QuanLyPhimService';
import { soPhimTrenTrang } from '../../../Config/config';
import { NavLink } from 'react-router-dom';
// import { Container } from './styles';

function QuanLyPhim() {
    const [soLuongPhim, setSetSoLuongPhim] = useState(0);
    const [dsPhim, setDsPhim] = useState([]);
    const [xoaPhim, setXoaPhim] = useState(false);
    useEffect(() => {
        quanLyPhimService.layDanhSachPhim().then(res => {
            setSetSoLuongPhim(res.data.length);
        }).catch(e => {
            alert(e.response.text);
        })
        fetchDsPhimTheoTrang(1);
    }, [xoaPhim])
    const renderSoTrang = () => {
        let arrSoTrang = [];
        let phanDu = 1;
        if (soLuongPhim % soPhimTrenTrang === 0) {
            phanDu = 0;
        }
        for (let i = 1; i <= (soLuongPhim / soPhimTrenTrang) + phanDu; i++) {
            arrSoTrang.push(
                <button className="btn btn-info mx-2" key={i} style={{ width: "40px" }}
                    onClick={() => {
                        fetchDsPhimTheoTrang(i);
                    }}
                >
                    {i}
                </button>
            )
        }
        return arrSoTrang;
    }
    const fetchDsPhimTheoTrang = (soTrang) => {
        quanLyPhimService.layPhimTheoTrang(soTrang).then(res => {
            setDsPhim(res.data.items);
        }).catch(e => {
            alert(e.response.text);
        })
    }
    const handleDeletedMovie = (maPhim, tenPhim) => {

        let r = window.confirm("Bạn có muốn xóa phim " + tenPhim);
        if (r) {
            let token = localStorage.getItem("token");
            quanLyPhimService.xoaPhim(maPhim, token).then(res => {
                alert("Xóa thành công");
                setXoaPhim(xoaPhim === false ? true : false);
            }).then(e => {
            })
        }

    }
    const renderDsPhim = () => {
        return dsPhim.map((phim, index) => {
            return <tr key={index}>
                <td>{phim.maPhim}</td>
                <td >{phim.tenPhim}</td>
                <td>
                    <img src={phim.hinhAnh} width="100" height="150" alt={phim.tenPhim} />
                </td>
                <td>
                    <a href={phim.trailer} target="blank">Link trailer</a>
                </td>
                <td>{moment(phim.ngayKhoiChieu).format("hh:mm DD-MM-YYYY")}</td>
                <td>
                    <NavLink to={`/admin/chinh-sua-phim/${phim.maPhim}`} className="btn btn-dark mx-2">
                        <i className="fa fa-edit"></i>
                    </NavLink>
                    <button className="btn btn-danger" onClick={() => {
                        handleDeletedMovie(phim.maPhim, phim.tenPhim)
                    }}>
                        <i className="fa fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        })
    }
    return <div className="MoviesManager">
        <h2 className="text-center text-danger">Quản lý phim</h2>
        <NavLink to="/admin/them-phim" className="btn btn-success mb-2 float-right">Thêm phim</NavLink>
        <table className="table text-center bg-white">
            <thead>
                <tr>
                    <th>Mã phim</th>
                    <th>Tên phim</th>
                    <th>Hình ảnh</th>
                    <th>Trailer</th>
                    <th>Ngày khởi chiếu</th>
                    <td>Chỉnh sửa</td>
                </tr>
            </thead>
            <tbody>
                {renderDsPhim(1)}
            </tbody>
        </table>
        {renderSoTrang()}
    </div>;
}

export default React.memo(QuanLyPhim);