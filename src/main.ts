import * as qs from 'querystring';
import * as request from 'request';
import { RequestResponse } from 'request';

export interface ICredentials {
  email: string;
  password: string;
}

/**
 * Devices
 */
export class Devices {
  public static readonly ANDROID: string = 'android';
  public static readonly IPHONE: string = 'iphone';
  public static readonly IPAD: string = 'ipad';
  public static readonly DESKTOP: string = 'desktop';
  public static readonly WINDOWS_PHONE: string = 'winPhone';
  public static readonly BLACKBERRY: string = 'blackberry';
}

/**
 * Endpoints
 */
export class Endpoints {
  private static readonly BASE_URL: string = 'https://affilitest.com';
  public static readonly LOGIN: string = `${ Endpoints.BASE_URL }/user/login`;
  public static readonly LOGOUT: string = `${ Endpoints.BASE_URL }/user/logout`;

  private static readonly API_BASE: string = `${ Endpoints.BASE_URL }/api/v1`;
  public static readonly APP_INFO: string = `${ Endpoints.API_BASE }/appInfo`;
  public static readonly TEST: string = `${ Endpoints.API_BASE }/test`;
}

/**
 * AffiliTestAPI
 */
export class AffiliTestAPI {
  private apiKey: string = '';
  private R: any;

  constructor() {
    this.R = request.defaults({ jar: true });
  }

  /**
   * setApiKey
   * @param {string} key
   * @private
   */
  public set setApiKey(key: string) {
    this.apiKey = key;
  }

  /**
   * apiGet
   * @param {Endpoints} endpoint
   * @param {Object} queryString
   * @returns {Promise}
   */
  public apiGet(endpoint: Endpoints, queryString?: object): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const uri = `${endpoint}?${qs.stringify(queryString)}`;
      console.log('GET >>', uri);

      this.R.get(uri, (error: any, res: RequestResponse, body: any): void => {
        if (!error && res.statusCode === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      });
    });
  }

  /**
   * apiPost
   * @param {Endpoints} endpoint
   * @param payload
   * @param {Object} queryString
   * @returns {Promise}
   */
  public apiPost(endpoint: Endpoints, payload?: any, queryString?: object): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
      const uri = `${endpoint}?${qs.stringify(queryString)}`;
      console.info('POST >>', uri);
      console.info('PAYLOAD >>', payload);

      this.R.post(uri, { form: payload }, (error: any, res: RequestResponse, body: any): void => {
        if (!error && res.statusCode === 200) {
          resolve(body);
        } else {
          reject(body);
        }
      });
    });
  }

  /**
   * login
   * @param {ICredentials} credentials
   * @returns {Promise<Object>}
   */
  public async login(credentials: ICredentials) {
    return await this.apiPost(Endpoints.LOGIN, credentials);
  }

  /**
   * logout
   * @returns {Promise<any>}
   */
  public async logout() {
    return await this.apiPost(Endpoints.LOGOUT);
  }

  /**
   * appInfo
   * @param {string} url
   * @param {string} packageIdentifier
   * @param {string} country
   * @returns {Promise<any>}
   */
  public async appInfo(url: any, packageIdentifier: any = null, country: any = '') {
    if (!url && !packageIdentifier) {
      throw new Error('Missing URL/Package in appInfo call');
    }

    const qs: any = {
      country: country
    };

    qs.package = packageIdentifier;

    if (url) {
      qs.url = url;
      delete qs.package;
    }

    return await this.apiGet(Endpoints.APP_INFO, qs);
  }

  /**
   * test
   * @param {string} url
   * @param {string} country
   * @param {string} device
   * @returns {Promise<any>}
   */
  public async test(url: string, country: string, device: Devices) {
    return await this.apiPost(Endpoints.TEST, null, { url, country, device });
  }
}
