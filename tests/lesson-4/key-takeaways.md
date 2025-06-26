# Lesson 04: DOM Terminology, Selector, Playwright Basic

## 1. DOM

### Khái niệm DOM
* DOM = Document Object Model
* DOM mô tả cấu trúc tài liệu HTML như dạng cây.
* Mỗi phần tử HTML là một node: thẻ mở, thẻ đóng, thuộc tính, text, v.v.

### Các loại thẻ HTML thường gặp
* `<div>`: chia khối nội dung.
* `<h1>` đến `<h6>`: tiêu đề, theo cấp từ lớn đến nhỏ.
* `<form>`: chứa form.
* `<input>`: nhiều kiểu như text, email, radio, checkbox, file, v.v.
* `<textarea>`: ô nhập dạng lớn.
* `<radio>`: chọn một.
* `<checkbox>`: chọn nhiều.
* `<select>` (dropdown): danh sách thả xuống.
* `<button>`: nút bấm.
* `<table>`: bảng dữ liệu.
    * `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`
* `<date picker>`: chọn ngày.
* `<slider>`: thanh trượt.
* `<iframe>`: nhúng nội dung trang web khác.

### Mối quan hệ trong DOM
* **self**: chính node hiện tại.
* **parent**: cha của node hiện tại.
* **children**: con trực tiếp.
* **ancestor**: tổ tiên (cha, ông, cụ…)
* **descendant**: con, cháu, chắt của node hiện tại.
* **sibling**: anh em cùng cha.
* **following**: các node phía sau (tay phải).
* **preceding**: các node phía trước (tay trái).
* **following-sibling**: anh em phía sau.
* **preceding-sibling**: anh em phía trước.

## 2. Selector

### Khái niệm
* Selector dùng để chọn phần tử trong DOM.
* Có nhiều loại:
    * XPath selector
    * CSS selector
    * Playwright selector


### XPath Selector
* XPath = XML Path
* Có 2 loại:
    * **Tuyệt đối**: bắt đầu bằng `/`, đi theo đường dẫn cố định trên cây DOM.
    * **Tương đối**: bắt đầu bằng `//`, chọn theo thuộc tính hoặc cấu trúc – khuyến khích dùng.
        * Ví dụ: `//tag[@attr='value']`

### Phương pháp nâng cao trong XPath
* `*`: wildcard
* `@`: thuộc tính
* `and`, `or`
* `text()`: nội dung
* `normalize-space()` : bỏ qua khoảng trắng
* `contains()`, `starts-with()`, `not()`: có chứa, bắt đầu với, không chứa


Cú pháp:
`//tag/axis::tagname[@attr='value']`

## 3. Playwright Basic Syntax

### 3.1. Khai báo test

import { test } from '@playwright/test';

test('<tên test>', async ({ page }) => {
  // Code của test
});

### 3.2. Step trong test

await test.step('Tên step', async () => {
  // Code here
});

### 3.3. Lưu ý
* Step nên map 1-1 với test case để dễ maintain.

### 3.4. Các thao tác cơ bản

#### Navigate
await page.goto('https://pw-practice.playwrightvn.com/');

#### Click
* Click thường:
  await page.locator("//button").click();
* Click đôi:
  await page.locator("//button").dblclick();
* Click chuột phải:
  page.locator("//button").click({ button: 'right' })
* Click kết hợp phím:
  page.locator("//button").click({ modifiers: ['Shift'] })

#### Input
* Dán nội dung:
  page.locator("//input").fill('Playwright Viet Nam');
* Gõ từng chữ:
  page.locator("//input").pressSequentially('Playwright Viet Nam', {
    delay: 100,
  });

#### Radio / Checkbox
* Kiểm tra đã check:
  const isChecked = page.locator("//input").isChecked();
* Check:
  page.locator("//input").check();
* Uncheck:
  page.locator("//input").setChecked(false);