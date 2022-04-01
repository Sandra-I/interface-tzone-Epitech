import axios from 'axios';
import * as config from '../../app.config.json';
import { User } from '../models/user';

export default class UserService {
  private static url = config.nestapi;

  private static popup: Window;

  static user?: User;

  /**
   * API call to connect a user via Google
   */
  static async getGoogleConnexion(setUser: Function): Promise<void> {
    this.popup = window.open(`${this.url}/google`, 'window', 'width=500,height=500') as Window;
    const callback = (result: MessageEvent) => {
      const { token } = result.data;
      if (token) {
        localStorage.setItem('token', token);
        this.getMe(setUser);
      }
    };
    window.addEventListener('message', callback);
    const interval = setInterval(() => {
      if (this.popup?.closed) {
        window.removeEventListener('message', callback);
        clearInterval(interval);
      }
    });
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
  }
}
