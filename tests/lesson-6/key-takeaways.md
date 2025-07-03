# Lesson 06: Class, Class Extends & Page Object Model (POM)

## 1. Class trong JavaScript

- Class dùng để khai báo kiểu dữ liệu tùy chỉnh.
- Thành phần:
  * Tên class
  * Constructor
  * Property
  * Methods (có thể có tham số)

- Lợi ích:
  * Tái sử dụng code
  * Tăng tính linh hoạt

- Sử dụng:
  * const student = new Student();
  * student.sayMyName();

- Ví dụ: Khai báo class LoginPage với method: fillLogin(username, password)

## 2. Class Extends

- Dùng `extends` để kế thừa class khác
- Cú pháp:
  * class A extends B { constructor() { super(); } }
- `super()` gọi tới constructor của class cha
- Class con thừa hưởng toàn bộ property và method của class cha

## 3. Page Object Model (POM)

### 3.1. POM là gì?

- POM = Page Object Model
- Là một design pattern phổ biến trong automation test

### 3.2. Lợi ích của POM

- Tái sử dụng code
- Giúp tổ chức code rõ ràng, gọn gàng
- Dễ bảo trì

### 3.3. Tiêu chuẩn của POM

- Không có tiêu chuẩn cố định
- Phụ thuộc vào:
  * Framework
  * Ngôn ngữ lập trình
  * Người viết code

### 3.4. Cách viết POM

- Mỗi page là một class
- Mỗi class có:
  * Property: biểu thị các element trên trang
  * Method: biểu thị hành động của người dùng

### 3.5. Multiple POM và extends

- Một class có thể kế thừa class khác để mở rộng
- Có thể override thuộc tính và phương thức nếu cần