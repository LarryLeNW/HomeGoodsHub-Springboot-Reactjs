import TruncateText from "services/TruncateText";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
    return (
        <footer className="bg-dark text-white text-center text-lg-start">
            <div className="container p-4 mt-5">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">WEB FASHION</h5>
                        <p>
                        Chào mừng bạn đến với thế giới thời trang đẳng cấp.  Với bộ sưu tập đa dạng từ
                          áo quần, phụ kiện đến giày dép, chúng tôi cam kết đem đến cho bạn phong cách thời trang 
                          hiện đại, sang trọng và đầy cá tính. Khám phá và trải nghiệm ngay hôm nay!
                        </p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Giới Thiệu</h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="#!" className="text-white">Facebook  </a>  </li>
                            <li><a href="#!" className="text-white">Instagram</a></li>
                            
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled mb-0">
                            <li><a href="#!" className="text-white">Link 1</a></li>
                            <li><a href="#!" className="text-white">Link 2</a></li>
                            <li><a href="#!" className="text-white">Link 3</a></li>
                            <li><a href="#!" className="text-white">Link 4</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          <TruncateText text={" © 2023 Copyright"} maxLength = {50} />     
            </div>
        </footer>
    );
}

export default Footer;