import { test, expect } from '@playwright/test';
import { PersonalNotePage } from '../../pages/01-pom';

test('Personal Notes - Add, Search, Verify Results', async ({ page }) => {
    const notePage = new PersonalNotePage(page);
    notePage.xpathNotePage = "//a[contains(text(),'Personal notes')]";
    notePage.inputTitle = page.locator('//input[@id="note-title"]');
    notePage.inputBody = page.locator('//textarea[@id="note-content"]');
    notePage.btnAdd = page.locator('//button[@id="add-note"]');
    notePage.inputSearch = page.locator('//input[@id="search"])');
    notePage.listNotes = page.locator('//ul[@id="notes-list"]');

    await test.step('Open Personal Notes page', async () => {
        await notePage.openMaterialPage();
        await notePage.gotoPage(notePage.xpathNotePage);
    });

    await test.step('Add 10 notes from vnexpress.net/khoa-hoc', async () => {
        const notes = [
            { title: 'Vũ trụ giãn nở nhanh', body: 'Các nhà khoa học phát hiện vũ trụ đang giãn nở nhanh hơn dự đoán.' },
            { title: 'Tàu vũ trụ NASA', body: 'Tàu của NASA gửi hình ảnh đầu tiên về Trái Đất từ không gian xa.' },
            { title: 'Thí nghiệm vật lý lượng tử', body: 'Các nhà khoa học thực hiện thí nghiệm mới chứng minh giả thuyết lượng tử.' },
            { title: 'Tế bào gốc trong y học', body: 'Ứng dụng tế bào gốc trong điều trị bệnh mãn tính.' },
            { title: 'Trí tuệ nhân tạo', body: 'AI được ứng dụng trong nghiên cứu y học và thiên văn.' },
            { title: 'Kính viễn vọng James Webb', body: 'Kính viễn vọng James Webb phát hiện hành tinh giống Trái Đất.' },
            { title: 'Sự sống ngoài hành tinh', body: 'Khả năng tồn tại sự sống ngoài hành tinh ở hệ sao Alpha Centauri.' },
            { title: 'Địa chất học sao Hỏa', body: 'Địa chất học trên sao Hỏa tiết lộ quá khứ có nước.' },
            { title: 'Pin mặt trời mới', body: 'Pin mặt trời hiệu suất cao gấp đôi công nghệ cũ.' },
            { title: 'Rác vũ trụ', body: 'Giải pháp xử lý rác thải trong không gian đang được phát triển.' },
        ];

        for (const note of notes) {
            await notePage.addNote(note.title, note.body);
        }
    });

    await test.step('Search for keyword "vũ trụ"', async () => {
        await notePage.search('vũ trụ');
    });

    await test.step('Verify all results contain keyword', async () => {
        const keyword = 'vũ trụ';
        const results = await notePage.getSearchResultTexts();
        for (const result of results) {
            expect(result.toLowerCase()).toContain(keyword.toLowerCase());
        }
    });
});