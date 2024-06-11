import {TestEnvironmentUtils} from "../../helpers/TestEnvironmentUtils.js";
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const studyData = await TestEnvironmentUtils.getStudyByName()

export abstract class ParticipantApiService {
    protected payload: any;
    private cookies: Record<string, string> = {};
    public static userName:string = "";
    public static loggedInUsername:string = "";
    private maxRetries: number = 3; // Maximum number of retries


    public getHost(): string {
        return studyData.webParticipantAppUrl;
    }

    public abstract getEndpoint(): string;

    public getURL(): string {
        return this.getHost() + this.getEndpoint();
    }

    private async checkLogin(): Promise<boolean> {
        return !this.cookies || Object.keys(this.cookies).length === 0 || ParticipantApiService.loggedInUsername !== ParticipantApiService.userName;
    }

    public async login(): Promise<void> {
        if (await this.checkLogin()){
            try {
                const basicAuth = 'Basic ' + Buffer.from(`${ParticipantApiService.userName}:${studyData.participantDefaultPassword}`).toString('base64');
                const response: AxiosResponse = await axios.post(studyData.webParticipantAppLoginEndpoint, {
                    headers: {
                        Authorization: basicAuth,
                    },
                });

                if (response.status === 200) {
                    // Assuming cookies are returned in the response headers
                    // @ts-ignore
                    this.cookies = await this.parseCookies(response.headers['set-cookie']);
                } else {
                    throw new Error('Login failed');
                }
            } catch (error) {
                console.error('Error occurred during login:', error);
                throw error;
            }
        }
    }

    private async parseCookies(cookiesHeader: string | string[]): Promise<Record<string, string>> {
        const cookies: Record<string, string> = {};

        if (Array.isArray(cookiesHeader)) {
            cookiesHeader.forEach((cookie) => {
                const [name, value] = cookie.split(';')[0].split('=');
                cookies[name.trim()] = value.trim();
            });
        } else {
            {
                const [name, value] = cookiesHeader.split(';')[0].split('=');
                cookies[name.trim()] = value.trim();
            }
        }

        return cookies;
    }

    private async serializeCookies(cookies: Record<string, string>): Promise<string> {
        return Object.entries(cookies)
            .map(([name, value]) => `${name}=${value}`)
            .join('; ');
    }

    private async sendRequest(method: 'post' | 'put' | 'delete' | 'get', payload?: any, retries: number = this.maxRetries): Promise<any> {
        await this.login();

        const config: AxiosRequestConfig = {
            method,
            url: this.getURL(),
            headers: {
                'Content-Type': 'application/json',
                'Cookie': await this.serializeCookies(this.cookies),
            },
            data: payload,
        };

        try {
            const response: AxiosResponse = await axios(config);
            return response.data;
        } catch (error) {
            if (retries > 0 && error.response && error.response.status === 401) {
                // Handle 401 error (cookie expired)
                console.warn('Cookie expired. Re-authenticating...');
                await this.login(); // Re-login
                return this.sendRequest(method, payload, retries - 1); // Retry the request with decremented retries
            } else {
                console.error(`Error occurred while sending ${method.toUpperCase()} request to API: ${this.getURL()} :`, error);
                throw error;
            }
        }
    }

    public post(payload: any): Promise<any> {
        return this.sendRequest('post', payload);
    }

    public put(payload: any): Promise<any> {
        return this.sendRequest('put', payload);
    }

    public delete(payload: any): Promise<any> {
        return this.sendRequest('delete', payload);
    }

    public get(): Promise<any> {
        return this.sendRequest('get');
    }
}