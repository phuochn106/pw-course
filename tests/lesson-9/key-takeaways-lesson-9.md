# Lesson 09: Fixtures & Environment Variables

## 1. Fixtures là gì?

- Là khái niệm đặc trưng của Playwright.
- Fixture giúp khởi tạo các môi trường riêng biệt cho mỗi test (isolated test).
- Fixture giúp nhóm các test dựa trên mục đích sử dụng thay vì chỉ setup chung.

### 1.1. Cách hoạt động

- Trước `use`: giống `beforeEach`
- Trong `use`: thực thi code của test
- Sau `use`: giống `afterEach`

### 1.2. Ví dụ định nghĩa fixture

const test = base.extend({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');
    await use(todoPage);
    await todoPage.removeAll();
  },
});

## 2. Built-in Fixtures của Playwright

| Tên Fixture | Kiểu              | Mô tả                                  |
| ----------- | ----------------- | -------------------------------------- |
| page        | Page              | Khởi tạo một page riêng biệt cho test  |
| context     | BrowserContext    | Tạo một browser context riêng biệt     |
| browser     | Browser           | Browser dùng chung giữa các test       |
| browserName | string            | chromium, firefox, hoặc webkit         |
| request     | APIRequestContext | Instance API độc lập dùng cho API test |

## 3. Tạo mới fixture

- Dùng `test.extend()` để mở rộng test object.
- Dùng `mergeTests()` để kết hợp nhiều fixture.

### 3.1. Ví dụ tạo fixture đơn

const test = base.extend<{ page2: Page2 }>({
  page2: async ({}, use) => {
    const page2 = new Page2();
    page2.sayMyName();
    await use(page2);
    console.log("after page2");
  }
});

### 3.2. Ví dụ merge nhiều fixture

import { mergeTests } from "@playwright/test";
import { test as t1 } from './fixture-1';
import { test as t2 } from './fixture-2';
export const test = mergeTests(t1, t2);

## 4. Managing Environment Variables

- Khi có nhiều môi trường (dev, prod), cần sử dụng dữ liệu khác nhau cho mỗi môi trường.

### 4.1. Các bước:

1. Cài thư viện `dotenv`:
   * npm install dotenv --save
2. Tạo file `.env` chứa biến môi trường
3. Tạo các file data tương ứng theo ENV
4. Import và sử dụng trong code:

import { config } from 'dotenv';
config();
console.log(process.env.ENV);

### 4.2. Ví dụ:

- URL production:  
  https://pw-practice.playwrightvn.com/wp-admin

- Nếu `ENV=prod` → sẽ dùng dữ liệu: `javascript`, `playwright`  
- Nếu `ENV=dev` → sẽ dùng dữ liệu: `tag1`, `tag2`