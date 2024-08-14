import "./Contact.scss";

const Contact = () => {
    return (
        <>
            <div className="container" id="wrapper-about">

                        <h5 className="card-title text-center">LIÊN HỆ VỚI CHÚNG TÔI</h5>
                        <div className="">
                            <p><i className="fas fa-phone me-2"></i> Hotline : 0345204733</p>
                            <p><i className="fas fa-map-marker-alt me-2"></i> Địa chỉ : 137 Nguyễn Thị Thập - Hòa Minh - Liên Chiểu - TP.Đà Nẵng</p>
                            <p><i className="fas fa-clock me-2"></i> Giờ làm việc : 7h - 22h, T2 - T7</p>
                            <p><i className="fas fa-envelope me-2"></i> Email : Nguyenquyet2017zz@gmail.com</p>
                        </div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8018881525713!2d108.1699479!3d16.075767099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218e6e72e66f5%3A0x46619a0e2d55370a!2zMTM3IE5ndXnhu4VuIFRo4buLIFRo4bqtcCwgVGhhbmggS2jDqiBUw6J5LCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZw!5e0!3m2!1sen!2s!4v1708437412035!5m2!1sen!2s"
                            width="100%"
                            height="450px"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                    </div>
        </>
    );
};

export default Contact;
