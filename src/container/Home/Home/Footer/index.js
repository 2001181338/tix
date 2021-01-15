import React, { useEffect, useState } from 'react';
import { quanLyPhimService } from '../../../../services/QuanLyPhimService';

function Footer() {
    const [partners, setPartners] = useState([])
    useEffect(() => {
        quanLyPhimService.layThongTinHeThongRap().then(res => {
            setPartners(res.data)
        }).catch(e => {
            console.log(e.respone.data)
        })
    }, [])

    const renderPartners = () => {
        return partners.map((partner, index) => {
            return (
                <li className="footer__partner" key={index}>
                    <a href="https://www.galaxycine.vn">
                        <img src={partner.logo} alt={partner.maHeThongRap} />
                    </a>
                </li>
            )
        })
    }
    return <div className="footer">
        <div className="container footer__content">
            <div className="row">
                <div className="col-md-3 footer__intro">
                    <p>GIỚI THIỆU</p>
                    <ul>
                        <li><a href="https://www.facebook.com/thin.nguyen.1690671/">VỀ CHÚNG TÔI</a></li>
                        <li><a href="https://www.facebook.com/thin.nguyen.1690671/">THỎA THUẬN SỬ DỤNG</a></li>
                        <li><a href="https://www.facebook.com/thin.nguyen.1690671/">CHÍNH SÁCH BẢO MẬT</a></li>
                        <li> <a href="https://www.facebook.com/thin.nguyen.1690671/">QUY CHẾ HOẠT ĐỘNG</a></li>
                    </ul>
                </div>
                <div className="col-md-3 footer__support">
                    <p>HỖ TRỢ</p>
                    <ul>
                        <li><a href="https://www.facebook.com/thin.nguyen.1690671/">GÓP Ý</a></li>
                        <li><a href="https://www.facebook.com/thin.nguyen.1690671/">SALE & SERVICES</a></li>
                        <li><a href="https://www.facebook.com/thin.nguyen.1690671/">RẠP / GIÁ VÉ</a></li>
                        <li> <a href="https://www.facebook.com/thin.nguyen.1690671/">TUYỂN DỤNG</a></li>
                    </ul>
                </div>
                <div className="col-md-3 footer__partners">
                    <p>ĐỐI TÁC</p>
                    <ul>
                        {renderPartners()}
                    </ul>
                </div>
                <div className="col-md-3 footer__contact">
                    <p>Liên hệ: </p>
                    <ul>
                        <li>
                            <a href="https://www.facebook.com/thin.nguyen.1690671/"><i className="fab fa-facebook"></i></a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/thin.nguyen.1690671/"><i className="fa fa-envelope"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
}

export default React.memo(Footer);