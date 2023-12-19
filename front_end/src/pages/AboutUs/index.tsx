import React from "react"
import aboutUsBanner from "../../assets/images/aboutus_banner.jpg"
import aboutUsMain from "../../assets/images/aboutus_main.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

const AboutUs = () => {
  return (
    <div className="mx-auto max-w-[1140px] py-8 px-2">
      <div className="grid grid-cols-12">
        <div className="col-span-9 max-sm:col-span-12 px-4">
          <div className="border-b-[1px] border-border-color mb-8">
            <div className="text-category-title text-3xl font-bold uppercase border-b-[3px] border-border-color pb-2 w-fit">
              THOL - GYM PHỤC VỤ CUỘC SỐNG
            </div>
          </div>
          <div className="mb-12">
            <img src={aboutUsMain} className="w-full" />
          </div>
          <p className="bg-[#dff0d8] text-[#3c763d] p-4 rounded mb-6">
            Trên thị trường hiện nay có nhiều nhà cung cấp để cho khách hàng
            chọn lựa làm đơn vị cung ứng dài lâu.&nbsp;<strong>THOL</strong>
            &nbsp;tự hào là một trong những đơn vị đầu ngành đưa thực phẩm bổ
            sung tới tay người tiêu dùng với một mức giá hợp lý nhất và chất
            lượng luôn đảm bảo như công bố. 100% có sự kiểm tra khách quan độc
            lập từ các cơ quan ban ngành nhà nước Việt Nam.
          </p>
          <div className="mb-5">
            <div className="text-[#777777]">
              <strong className="lead">Về chất lượng sản phẩm:</strong>
            </div>
            <p className="text-[#777777]">
              <FontAwesomeIcon icon={faCheck} className="text-[#099342] mr-1" />
              Tất cả các sản phẩm của chúng tôi đều được trải qua một thời gian
              nghiên cứu, thí nghiệm lâm sàng tại các phòng thí nghiệm đạt tiêu
              chuẩn Mỹ tại các công ty đầu ngành thực phẩm bổ sung Hoa Kỳ. Không
              dừng lại ở đó, chúng tôi còn phải trải qua 2 kì kiểm tra sát hạch
              chất lượng sản phẩm ở Bộ Y Tế Việt Nam và Viện Vệ Sinh Y Tế công
              cộng Tp Hồ Chí Minh
              <br />
              <FontAwesomeIcon icon={faCheck} className="text-[#099342] mr-1" />
              Sản phẩm của chúng tôi được tin dùng và yêu thích bởi các vận động
              viên quốc gia Việt Nam và cộng đồng các anh em khắp mọi miền đất
              nước
            </p>
          </div>
          <div className="mb-20">
            <div className="text-[#777777]">
              <strong className="lead">Về giá cả:</strong>
            </div>
            <p className="text-[#777777]">
              <FontAwesomeIcon icon={faCheck} className="text-[#099342] mr-1" />
              Với nguồn hàng phong phú, đa dạng và sẵn có chúng tôi luôn có thể
              giao hàng trong thời gian nhanh nhất. THOL Gym Center luôn mở cửa
              hằng ngày từ 7h đến 22h hằng ngày. Trong nội thành Tp.HCM, chúng
              tôi miễn phí giao hàng trên địa bàn các quận:
              1,3,5,6,7,8,10,11,12, Tân Bình, Phú Nhuận, Bình Tân, Gò Vấp, Bình
              Thạnh. Các quận khác chúng tôi sẽ chuyển phát nhanh cho quý khách
              hàng
              <br />
              <FontAwesomeIcon icon={faCheck} className="text-[#099342] mr-1" />
              Còn đối với các địa phương khác chúng tôi sẽ chuyển phát nhanh
              hằng ngày và trung bình là sau 48h các bạn sẽ nhận được hàng của
              mình.
            </p>
          </div>
          <div className="mb-20">
            <div className="text-[#777777]">
              <strong className="lead">
                Kênh tư vấn bán hàng và hỗ trợ trực tuyến của THOL:
              </strong>
            </div>
            <p className="bg-[#d9edf7] text-[#31708f] p-4 rounded mb-6">
              <FontAwesomeIcon icon={faCheck} className="text-[#099342] mr-1" />
              Đội ngũ hỗ trợ và nhân viên tư vấn online( 7h AM – 22h PM), tư vấn
              kỹ thuật thể hình và sản phẩm:<strong>19002050</strong> –
              support@thehinhonline.com.vn.
              <br />
              <FontAwesomeIcon icon={faCheck} className="text-[#099342] mr-1" />
              Tư vấn bán hàng và chuyển phát nhanh:{" "}
              <strong>19002050 hoặc 0934111640 –</strong>
              sales@thehinhonline.com.vn.
            </p>
            <p className="bg-[#fcf8e3] text-[#8a6d3b] p-4 rounded mb-6">
              Toàn thể nhân viên công ty kính chúc quí khách hàng đạt hiệu quả
              cao trong tập luyện, thay đổi & hoàn thiện ngoại hình bản thân
              theo ý muốn!
            </p>
          </div>
        </div>
        <div className="col-span-3 max-sm:hidden px-4">
          <img src={aboutUsBanner} className="w-full" />
        </div>
      </div>
    </div>
  )
}

export default AboutUs
