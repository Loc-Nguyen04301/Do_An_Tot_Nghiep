export function resolveUrlString(host: string, path: string): string {
    host = host.trim();
    path = path.trim();
    while (host.endsWith('/') || host.endsWith('\\')) {
        host = host.slice(0, -1);
    }
    while (path.startsWith('/') || path.startsWith('\\')) {
        path = path.slice(1);
    }
    return `${host}/${path}`;
}

export const HTML_TEMPLATE_CREATE = (bill_id: number, customer_name: string) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
      </head>
      <body>
       <div style="font-family:&quot;Arial&quot;,Helvetica Neue,Helvetica,sans-serif;line-height:18pt"><div class="adM">

  </div><p>Xin chào ${customer_name}
  </p>
  <p>Đơn hàng mã #${bill_id} của Anh/chị đã được ghi nhận, Wheystore.vn sẽ liên hệ với Anh/chị qua số điện thoại để xác nhận đơn hàng. Xin cảm ơn!</p>

  <p>Cám ơn Anh/chị đã đặt mua hàng tại <strong>THOL</strong>. Vào website để cập nhật những sản phẩm mới nhất:</p>
  <div style="margin-top:25px"><span style="padding:14px 35px;background:#357ebd"><a href="https://do-an-tot-nghiep-7dr3.vercel.app/" style="font-size:16px;text-decoration:none;color:#fff" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://gymstore.vn&amp;source=gmail&amp;ust=1719069692778000&amp;usg=AOvVaw0-Ammvxp72H40LEq_cjut-">Đến cửa hàng của chúng tôi</a></span></div> &nbsp;
  <hr>
  <p style="text-align:right">Nếu Anh/chị có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại <a href="mailto:nguyengialoc7@gmail.com" style="color:#357ebd" target="_blank">nguyengialoc7@gmail.com</a></p>
  <p style="text-align:right"><i>Trân trọng,</i></p>
  <p style="text-align:right"><strong>Ban quản trị cửa hàng</strong></p>
</div>
      </body>
    </html>
  `;
}

export const HTML_TEMPLATE_REJECT = (bill_id: number, customer_name: string) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>NodeMailer Email Template</title>
      </head>
      <body>
       <div style="font-family:&quot;Arial&quot;,Helvetica Neue,Helvetica,sans-serif;line-height:18pt"><div class="adM">

  </div><p>Xin chào ${customer_name}
  </p>
  <p>Đơn hàng #${bill_id} của Anh/chị tại <strong>THOL</strong> đã bị hủy bỏ do một số tình huống bất khả kháng.</p>
  <p>Cám ơn Anh/chị đã đặt mua hàng tại <strong>THOL</strong>. Vào website để cập nhật những sản phẩm mới nhất:</p>
  <div style="margin-top:25px"><span style="padding:14px 35px;background:#357ebd"><a href="https://do-an-tot-nghiep-7dr3.vercel.app/" style="font-size:16px;text-decoration:none;color:#fff" target="_blank" data-saferedirecturl="https://www.google.com/url?q=http://gymstore.vn&amp;source=gmail&amp;ust=1719069692778000&amp;usg=AOvVaw0-Ammvxp72H40LEq_cjut-">Đến cửa hàng của chúng tôi</a></span></div> &nbsp;
  <hr>
  <p style="text-align:right">Nếu Anh/chị có bất kỳ câu hỏi nào, xin liên hệ với chúng tôi tại <a href="mailto:nguyengialoc7@gmail.com" style="color:#357ebd" target="_blank">nguyengialoc7@gmail.com</a></p>
  <p style="text-align:right"><i>Trân trọng,</i></p>
  <p style="text-align:right"><strong>Ban quản trị cửa hàng</strong></p>
</div>
      </body>
    </html>
  `;
}