# Lesson 08: Git Advance & Other POM Styles

## 1. Git Nâng cao

### 1.1. Merge

- Merge code = gộp code từ nhánh A vào nhánh B
- Merge strategy:
  * Fast-forward merge: không tạo commit merge
  * Three-way merge: tạo commit merge khi có khác biệt giữa 2 nhánh

### 1.2. Conflict

- Conflict xảy ra khi 2 người cùng sửa một file rồi merge lại với nhau
- Cấu trúc conflict:
  <<<<<<< HEAD
  code của bạn
  =======
  code của nhánh khác
  >>>>>>> branch-name

### 1.3. Rebase

- Rebase = thay đổi base commit của nhánh hiện tại
- Câu lệnh:
  * git rebase main

### 1.4. Squash

- Squash = gộp nhiều commit thành 1 commit duy nhất
- Câu lệnh:
  * git rebase -i HEAD~số_commit

---

## 2. Other POM Styles

### 2.1. POM Manager

- Quản lý nhiều Page Object từ một nơi duy nhất
- Page Object chỉ được tạo khi cần thiết
- Ví dụ:
  * getLoginPage() → return new LoginPage(this.page);
  * getDashboardPage() → return new DashboardPage(this.page);

### 2.2. Return POM from another POM

- Một Page Object có thể trả về một Page Object khác
- Ví dụ:
  * login() → return new DashboardPage(this.page);

---

## 3. Kiến thức bổ sung để làm bài

### 3.1. expect().toBeInstanceOf()

- Kiểm tra một đối tượng có thuộc kiểu của một class hay không
- Cú pháp:
  expect(obj).toBeInstanceOf(ClassName);

- Ví dụ:
  const myPage = await basePage.gotoPage("Product page");
  expect(myPage).toBeInstanceOf(ProductPage);

### 3.2. Ép kiểu (Type Casting)

- Khi hàm trả về nhiều kiểu, dùng type casting để cụ thể kiểu giá trị
- Cú pháp:
  object as ClassName

- Ví dụ:
  const myPage = await basePage.gotoPage("Product page");
  const productPage = myPage as ProductPage;