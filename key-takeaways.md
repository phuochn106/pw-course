 # Lesson 07: API Testing

## 1. API là gì?

- API = Application Programming Interface
- Là công cụ trung gian giúp giao tiếp giữa hệ thống backend và giao diện người dùng
- Hoạt động theo mô hình Client - Server:
  * Client gửi Request
  * Server trả về Response

- Ví dụ minh hoạ: API giống như bồi bàn giữa khách hàng và đầu bếp

## 2. Tại sao cần test API?

- Phát hiện lỗi sớm, kể cả khi frontend chưa hoàn thiện
- Kiểm tra tích hợp giữa các service

## 3. Định dạng dữ liệu trong API

- **XML**: cấu trúc giống HTML, thường dùng trong SOAP
- **JSON**: phổ biến trong REST API
  * Dữ liệu dạng: { "key": value } với value có thể là string, number, boolean, object, array, null

## 4. Các loại API phổ biến

- **SOAP**: trả về XML
- **RPC**: Remote Procedure Call
- **REST**: phổ biến nhất, trả về JSON

## 5. Authentication trong API

- Xác thực bằng:
  * Header: thêm token vào header
  * Cookie: lưu thông tin session

- Khuyến khích sử dụng Header trong API Testing

## 6. Các thành phần trong API

- **Giao thức**: HTTP (không mã hoá), HTTPS (có mã hoá)
- **Client**: gửi yêu cầu
- **Server**: xử lý và trả kết quả

### 6.1. Request

- Thành phần:
  * URL = Base URL + Endpoint + Parameters
  * Method: GET, POST, PUT, PATCH, DELETE, OPTION, HEAD
  * Header
  * Body (nếu có)

### 6.2. Response

- Thành phần:
  * Status code
  * Header
  * Body

- Phân loại Status Code:

| Mã  | Ý nghĩa                                             |
| --- | --------------------------------------------------- |
| 1xx | Thông tin                                           |
| 2xx | Thành công (200 OK, 201 Created)                    |
| 3xx | Chuyển hướng (301, 302)                             |
| 4xx | Lỗi từ phía Client (400 Bad Request, 404 Not Found) |
| 5xx | Lỗi từ phía Server (500 Internal Server Error)      |

- Công cụ API doc: Swagger

## 7. API với Postman

- Sử dụng Postman để gửi request, kiểm tra response
- Các ví dụ:
  * Lấy thông tin bài viết: GET
  * Đăng nhập: POST với body chứa user/password
  * Tạo article mới: POST + Authorization header

## 8. API với Playwright

- Dùng request fixture để gọi API trực tiếp trong code, không cần qua browser
- Lấy response qua:
  * response.json()
  * response.text()

## 9. POM cho API Test

- Mục tiêu:
  * Giữ cho file test gọn gàng, dễ bảo trì
  * Không chứa setup baseURL hoặc endpoint trực tiếp trong test

- Tổ chức:
  * Thuộc tính: request
  * Thuộc tính: baseURL
  * Define các endpoint giống như define XPath trong UI test