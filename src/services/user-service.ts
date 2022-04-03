import axios from 'axios';
import * as config from '../../app.config.json';
import { User } from '../models/user';
import OptionsService from '../utils/optionsService';

export default class UserService {
  private static url = config.nestapi;

  private static popup: Window;

  static user?: User;

  /**
   * API call to connect a user via Google
   */
  static async getGoogleConnexion(setUser: Function): Promise<void> {
    this.popup = window.open(`${this.url}/google`, 'window', 'width=500,height=500') as Window;
    const callback = (res: MessageEvent) => this.logCallback(res, setUser);
    window.addEventListener('message', callback);
    const interval = setInterval(() => { this.intervalFunction(callback, interval); });
  }

  // eslint-disable-next-line no-undef
  private static intervalFunction(callback: Function, interval: NodeJS.Timer) {
    if (this.popup?.closed) {
      clearInterval(interval);
      // eslint-disable-next-line no-undef
      window.removeEventListener('message', callback as EventListenerOrEventListenerObject);
    }
  }

  static logCallback(result: MessageEvent, setUser: Function) {
    const { token } = result.data;
    if (token) {
      localStorage.setItem('token', token);
      this.getMe(setUser);
    }
  }

  /**
   * API call to get user data
   */
  static async getMe(setUser: Function) {
    const myToken = localStorage.getItem('token')!;
    const response = await axios.get<User>(`${this.url}/user/me`, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    });
    this.user = response.data;
    setUser(this.user);
  }

  /**
   * API call to logout user
   */
  static async logout(setUser: Function) {
    this.user = undefined;
    setUser(undefined);
    localStorage.removeItem('token');
    localStorage.setItem('options', '{"checkOptions":{"preview":true},"translateLanguage":null}');
    OptionsService.updateOptions({ checkOptions: { preview: true }, translateLanguage: null });
  }

  /**
 * API update history of user
 */
  static async updateHistory(text: string) {
    const myToken = localStorage.getItem('token')!;
    const response = await axios.post<User>(`${this.url}/user/history`, { text }, {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    });
    this.user!.history = response.data.history;
  }
}
