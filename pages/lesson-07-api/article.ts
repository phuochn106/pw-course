import { APIRequestContext } from "@playwright/test";
import { UtilPage } from "./util";

export class Article extends UtilPage {
    articleName: string = "API in Playwright";
    articleAbout: string = "How to user Playwright to create an article";
    articleBody: string = "Lgin then create";
    articleTagList: string[] = ["Playwright Viet Nam", "pw", "pw-k6"];
    articleSlug: string;

    constructor(request: APIRequestContext) {
        super(request);
    }

    async addArticleWithOtherInfo(token: string, article: {}) {
        this.apiEndpoint = "api/articles/";
        this.requestURL = await this.generateLink(this.apiEndpoint);
        const responseData = this.request.post(this.requestURL, {
            headers: {
                Authorization: token
            },
            data: {
                article
            }
        })
        return responseData;
    }

    async addNewArticle(token: string) {
        this.apiEndpoint = "api/articles/";
        this.requestURL = await this.generateLink(this.apiEndpoint);
        const responseData = this.request.post(this.requestURL, {
            headers: {
                Authorization: token
            },
            data: {
                "article": {
                    "title": `this.articleName${Math.floor(Math.random() * 9000) + 1000}`,
                    "description": this.articleAbout,
                    "body": this.articleBody,
                    "tagList": this.articleTagList
                }
            }
        })
        return responseData;
    }

    async deleteArticle(token: string, articleSlug: string) {
        this.articleSlug = articleSlug;
        this.apiEndpoint = `api/articles/${this.articleSlug}`;
        this.requestURL = await this.generateLink(this.apiEndpoint);
        const responseData = this.request.delete(this.requestURL, {
            headers: {
                Authorization: token
            }
        })
        return responseData;
    }
}