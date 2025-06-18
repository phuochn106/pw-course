# Lesson 03: Git & Javascript Basic (Continue)

## 1. Git

### 1.1. Undo các hành động

- Thay đổi nội dung commit cuối:
    * Lệnh: git commit --amend
    * Cần bấm phím i để vào chế độ insert -> tiến hành chỉnh sửa
    * Sau khi sửa xong, bấm ESC để thoát insert
    * Bấm :wq để lưu và thoát (write and quit)
    * Ví dụ: sửa nội dung commit sau khi đã commit xong

- Đưa file từ vùng staging về working directory:
    * Lệnh: git restore --staged <file>

- Undo commit (đưa từ repository về working directory):
    * Lệnh: git reset HEAD~1

### 1.2. .gitignore

- Dùng để bỏ qua file/folder không cần Git theo dõi
    * Bỏ qua file: <file_name>
    * Bỏ qua folder: <folder_name>/

### 1.3. Branching

- Tạo branch mới:
    * Lệnh: git branch <ten_branch>
- Chuyển sang branch:
    * Lệnh: git checkout <ten_branch>
- Tạo và chuyển branch:
    * Lệnh: git checkout -b <ten_branch>

*Ví dụ:*
    - git checkout -b feature/new-login
    - Bạn có thể làm việc trên nhánh riêng mà không ảnh hưởng nhánh chính

## 2. JavaScript

### 2.1. Coding convention

- snake_case: chưa dùng
- kebab-case: tên file
- camelCase: tên biến
- PascalCase: tên class

### 2.2. Object

- Object dùng để lưu trữ nhiều giá trị trong 1 biến/hằng
- Cú pháp: let/const object = { key: value, ... }
- Truy cập và gán lại bằng: obj.key hoặc obj["key"]

### 2.3. Logical operator

- &&: cả hai điều kiện đúng
- ||: một trong hai đúng
- !: phủ định

### 2.4. Array

- Lưu danh sách giá trị
- Truy xuất bằng chỉ số (index)
- Đo độ dài bằng length

### 2.5. Function

- Là tập hợp lệnh thực thi một nhiệm vụ
- Có thể nhận tham số và trả giá trị

### 2.6. Phạm vi biến và hoisting

- Global scope: toàn cục
- Block scope: trong {}
- Hoisting: biến được "kéo lên" trên khi biên dịch

### 2.7. Câu điều kiện nâng cao

- if...else
- if...else if...else
- switch...case

### 2.8. So sánh == và ===

| Toán tử | Kiểu so sánh | Có chuyển kiểu dữ liệu |
| ------- | ------------ | ---------------------- |
| ==      | Lỏng lẻo     | Có                     |
| ===     | Nghiêm ngặt  | Không                  |

### 2.9. Vòng lặp nâng cao

- for...in: duyệt qua key của object  
    * Cú pháp: for (let key in object) { ... }

- forEach: duyệt qua từng phần tử mảng  
    * Cú pháp: array.forEach(function(element) { ... })

- for...of: duyệt qua value của iterable (array, string, ...)  
    * Cú pháp: for (let value of iterable) { ... }

### 2.10. break và continue

- continue: bỏ qua lần lặp hiện tại
- break: thoát khỏi vòng lặp