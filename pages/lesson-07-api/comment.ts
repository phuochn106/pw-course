import { APIRequestContext } from "@playwright/test";
import { Article } from "./article";

export class Comments extends Article {
    commentId: number;
    constructor(request: APIRequestContext) {
        super(request);
    }

    async addComment(token: string, articleSlug: string, commentNo: number) {
        this.articleSlug = articleSlug;
        this.apiEndpoint = `api/articles/${this.articleSlug}/comments`;
        this.requestURL = await this.generateLink(this.apiEndpoint);
        const responseData = this.request.post(this.requestURL, {
            headers: {
                Authorization: token
            },
            data: {
                "comment": {
                    "body": `Comment 0${commentNo}`
                }
            }
        })
        return responseData;
    }

    async deleteComment(token: string, articleSlug: string, commentId: number) {
        this.articleSlug = articleSlug;
        this.commentId = commentId;
        this.apiEndpoint = `api/articles/${this.articleSlug}/comments/${this.commentId}`;
        this.requestURL = await this.generateLink(this.apiEndpoint);
        const responseData = this.request.delete(this.requestURL, {
            headers: {
                Authorization: token
            }
        })
        return responseData;
    }
}