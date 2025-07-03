# Lesson 06: Class, Class Extends & Page Object Model (POM)

## 1. Class trong JavaScript

- Class được dùng để khai báo kiểu dữ liệu tùy chỉnh
- Gồm:
  * Tên class
  * Constructor
  * Properties
  * Methods (có thể có tham số)

- Sử dụng class giúp:
  * Tái sử dụng code
  * Tăng tính linh hoạt

- Ví dụ sử dụng:
  * const student = new Student();
  * student.sayMyName();

## 2. Class Extends

- Sử dụng `extends` để kế thừa từ class khác
- Cú pháp:
  * class A extends B { constructor() { super(); } }
- `super()` dùng để gọi constructor của class cha
- Class con sẽ thừa hưởng tất cả thuộc tính và phương thức của class cha

## 3. Page Object Model (POM)

### 3.1. POM là gì?

- POM = Page Object Model
- Là một design pattern dùng trong automation test

### 3.2. Lý do sử dụng POM

- Tái sử dụng code
- Giúp tổ chức code rõ ràng, gọn gàng
- Dễ bảo trì

### 3.3. Tiêu chuẩn POM

- Không có chuẩn chung cố định
- Phụ thuộc vào:
  * Framework
  * Ngôn ngữ lập trình
  * Người viết code

### 3.4. Cách viết POM

- Mỗi page là một class
- Mỗi class có:
  * Property (thuộc tính): đại diện cho element trên trang
  * Method (phương thức): đại diện cho hành động người dùng

### 3.5. Multiple POM với extends

- Một class có thể kế thừa class khác để mở rộng
- Có thể override thuộc tính nếu cần