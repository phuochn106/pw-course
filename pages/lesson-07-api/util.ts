import { APIRequestContext, APIResponse } from "@playwright/test";

export class UtilPage {
    request: APIRequestContext;
    baseURL: string = "https://conduit-api.bondaracademy.com/";
    apiEndpoint: string;
    header: string;
    token: string;
    email: string;
    password: string;
    userName: string;
    requestURL: string;

    constructor(request: APIRequestContext) {
        this.request = request;
    }
    async generateLink(endPoint: string) {
        this.apiEndpoint = endPoint;
        const generatedLink = `${this.baseURL}${this.apiEndpoint}`;
        return generatedLink;
    }

    async registerAccount(email: string, userName: string, password: string) {
        this.email = email;
        this.userName = userName;
        this.password = password;
        this.requestURL = await this.generateLink("api/users");
        const response: APIResponse = await this.request.post(this.requestURL, {
            data: {
                "user": {
                    "email": this.email,
                    "username": this.userName,
                    "password": this.password
                }
            }
        });
        return response;
    }

    async login(email: string, password: string) {
        this.email = email;
        this.password = password;
        this.requestURL = await this.generateLink("api/users/login");
        const response = await this.request.post(this.requestURL, {
            data: {
                "user": {
                    "email": this.email,
                    "password": this.password
                }
            }
        });
        return response;
    }
}