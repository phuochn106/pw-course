# Lesson 02: Git & Javascript Basic

## 1. Version Control System (VCS)

- VCS là hệ thống quản lý phiên bản.
- Gồm 3 loại chính:
  - Local: lưu trên máy cá nhân.
  - Centralized: lưu trên 1 máy chủ.
  - Distributed: lưu trên nhiều máy (Git)

---

## 2. Git Cơ Bản

- Git là công cụ quản lý phiên bản mã nguồn, hỗ trợ làm việc nhóm hiệu quả.

### So sánh Git vs GitHub

| Git               | GitHub                    |
| ----------------- | ------------------------- |
| Cài trên máy      | Dịch vụ web               |
| Command-line tool | Giao diện web             |
| Quản lý phiên bản | Lưu trữ & hỗ trợ teamwork |

### Các trạng thái trong Git

- Working Directory: nơi chứa file đang chỉnh sửa
- Staging Area: chứa file chuẩn bị commit
- Repository: nơi lưu trữ các commit

### Các câu lệnh Git thường dùng

- git init: khởi tạo repository
- git config --global user.name "<tên>": cấu hình tên người dùng
- git config --global user.email "<email>": cấu hình email
- git add <file>: thêm file vào staging
- git add .: thêm toàn bộ thay đổi vào staging
- git status: kiểm tra trạng thái file
- git commit -m "message": tạo commit
- git log: xem lịch sử commit

### Quy ước Commit

- Dạng: <type>: <short_description>
  - feat: thêm mới
  - fix: sửa lỗi
  - chore: thay đổi nhỏ (xóa file không dùng, sửa chính tả,...)

---

## 3. JavaScript Cơ Bản

### 3.1. Biến (Variables)

- Dùng để lưu trữ giá trị: var, let
- Quy tắc tên biến: chữ cái, _, $, không có khoảng trắng

### 3.2. Hằng số (Constants)

- const: không thay đổi giá trị được

### So sánh var vs let vs const

| Đặc điểm        | var      | let      | const    |
| --------------- | -------- | -------- | -------- |
| Khai báo lại    | ✔️        | ❌        | ❌        |
| Phạm vi         | Toàn cục | Block {} | Block {} |
| Gán lại giá trị | ✔️        | ✔️        | ❌        |

---

## 4. Kiểu Dữ Liệu & Toán Tử

- String: chuỗi ký tự như "hello"
- Number: số như 100, -5, 3.14
- Boolean: true, false

### 4.1. Toán tử so sánh

- >, <, ===, !==, >=, <=
NOTE:
=== Kiểm tra cả kiểu dữ liệu và giá trị
== Chỉ kiểm tra giá trị

### 4.2. Toán tử số học

- +, -, *, /

### 4.3. Toán tử một ngôi

- i++ tương đương i = i + 1

---

## 5. Cấu trúc điều kiện & vòng lặp

### 5.1. Câu điều kiện (if)

- Dùng để kiểm tra điều kiện trước khi chạy logic

### 5.2. Vòng lặp (for)

- Dùng để lặp một đoạn logic nhiều lần