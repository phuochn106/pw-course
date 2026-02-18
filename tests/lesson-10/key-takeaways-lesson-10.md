# Lesson 10: Many Concepts

## 1. Async & Await

- Đồng bộ: chạy từng dòng một theo thứ tự
- Bất đồng bộ: chạy song song, không cần chờ dòng trước hoàn thành
- `async`: dùng để khai báo hàm bất đồng bộ
- `await`: dùng để "chờ" Promise hoàn tất trước khi thực hiện tiếp

## 2. Test Generator

- Tự sinh ra code test khi thao tác trên giao diện
- Cách sử dụng:
  * Trong VS Code: Record new test, Record at cursor
  * Trong terminal: `npx playwright codegen <url>`
- Có thể dùng để pick locators nhanh

## 3. Visual Comparison

- So sánh ảnh chụp giữa các lần chạy test
- Có thể update snapshot bằng:
  * `--update-snapshots`
  * `npx playwright test -g "@IMAGE" --update-snapshots`
- Có thể sử dụng `mask` để bỏ qua khu vực cần ẩn

```ts
await expect(page).toHaveScreenshot({
  mask: [page.locator('img')],
  maskColor: '#00FF00'
});
```

## 4. Video Recording

- Ghi lại video khi chạy test
- Cấu hình trong `playwright.config.ts`:

```ts
video: {
  mode: 'on',
  size: { width: 640, height: 480 }
}
```

## 5. Test Report

- Có thể dùng reporter mặc định hoặc cài thêm từ bên thứ 3
- Xem thêm: https://playwright.dev/docs/test-reporters

## 6. Test Emulation

- Giả lập môi trường chạy test như:
  * device, viewport, locale, timezone, permission, color scheme...

```ts
test.use({
  locale: "es_ES",
  timezoneId: "Europe/Madrid",
  permissions: ["camera"]
});
```

## 7. Drag and Drop

- Dùng `dragTo`:

```ts
await page.locator('#item-to-be-dragged').dragTo(page.locator('#item-to-drop-at'));
```

- Hoặc thao tác thủ công:

```ts
await page.locator('#item-to-be-dragged').hover();
await page.mouse.down();
await page.locator('#item-to-drop-at').hover();
await page.mouse.up();
```

## 8. Global Setup & Teardown

- **Global Setup**: chạy 1 lần duy nhất trước khi tất cả các test chạy
- **Global Teardown**: chạy 1 lần duy nhất sau khi tất cả test kết thúc

| So sánh        | Fixture            | Global Setup           |
| -------------- | ------------------ | ---------------------- |
| Thời điểm chạy | Trước/Sau mỗi test | Trước/Sau toàn bộ test |
| Số lần chạy    | Mỗi test một lần   | Một lần duy nhất       |

- Dùng khi cần chuẩn bị hoặc dọn dẹp logic toàn cục

---

## Bổ sung kiến thức để làm bài

### Chụp hình full page

- Mặc định Playwright chỉ chụp trong viewport
- Để chụp toàn bộ trang:

```ts
await expect(page).toHaveScreenshot({
  fullPage: true
});
```

### Emulation (giả lập môi trường)

- Dùng `test.use()` để giả lập locale, timezone, permission...

```ts
test.use({
  locale: "es_ES",
  timezoneId: "Europe/Madrid",
  permissions: ["camera"]
});
```

- Ví dụ test sử dụng:

```ts
test('my test with geolocation', async ({ page }) => {
  await page.goto("https://material.playwrightvn.com/017-detect-user-agent.html");
  await page.waitForTimeout(60_000);
});