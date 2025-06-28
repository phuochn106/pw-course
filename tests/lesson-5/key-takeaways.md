# Lesson 05: Playwright Tests & CSS/Playwright Selectors

## 1. Git

### 1.1. Clone

- Clone = lấy toàn bộ mã nguồn từ remote về local
- Câu lệnh:
    * git clone <url> 
    * git clone <url> <tên-thư-mục> (clone nhưng muốn dùng với tên thư mục khác)

### 1.2. Push

- Push = đưa code từ repository lên remote server
- Câu lệnh:
    * git push <remote_name> <branch_name>
    * git push origin main

### 1.3. Pull

- Pull = lấy dữ liệu từ nhánh trên remote về local
- Khác clone: pull chỉ lấy cập nhật mới nhất của branch
- Câu lệnh:
    * git pull origin <branch_name>

### 1.4. Merge Request & Reviewer

- Merge Request (MR) = gộp code từ nhánh A sang nhánh B
- Reviewer = người review code
    * Review là cơ hội học hỏi
    * Đẩy code sớm để được review sớm

### 1.5. Convention

- Tên branch: <type>/<short-description>
- Commit message: <type>: <short-description>

| type  | Ý nghĩa               |
| ----- | --------------------- |
| feat  | Tính năng mới         |
| fix   | Sửa lỗi               |
| conf  | Cấu hình              |
| chore | Thay đổi nhỏ, dọn dẹp |

- Ví dụ tên branch:
    * feat/lesson-5
    * conf/update-timeout

- Ví dụ commit:
    * feat: add solution for test 1
    * fix: add missing continue

## 2. Playwright Test Suite

### 2.1. Describe

- Test suite = nhóm các test case
- Cú pháp:
    * test.describe('<suite name>', async () => { ... })

### 2.2. Hooks

- Hook là các thời điểm chạy trước, trong, sau khi test
- Các hook:
    * beforeAll 
    * beforeEach
    * afterEach
    * afterAll

## 3. Playwright Assertion

- Dùng để kiểm tra trạng thái element trong test. Có 2 loại 
  * Assertion: dành cho các giá trị logic trong code. Dùng khi biết trước là element có giá trị
  * Web-first Assertion: Dùng để kiểm tra element có tồn tại, có hiển thị, có chứa text,... trên web

## 4. CSS Selector

| CSS Selector    | XPath                                       |
| --------------- | ------------------------------------------- |
| div             | //div                                       |
| #id             | //form[@id="id"]                            |
| .class          | //div[@class="class"]                       |
| #parent > input | //div[@id='parent']/input                   |
| #ancestor div   | //div[@id='ancestor']//div                  |
| div, input      | //div                                       | //input |
| #parent + div   | //div[@id='parent']/following-sibling::*[1] |
| #parent ~ div   | //div[@id='parent']/following-sibling::*    |

## 5. Playwright Selector

- Các locator phổ biến:
    * page.getByRole()
    * page.getByText()
    * page.getByLabel()
    * page.getByPlaceholder()
    * page.getByAltText()
    * page.getByTitle()
    * page.getByTestId()
