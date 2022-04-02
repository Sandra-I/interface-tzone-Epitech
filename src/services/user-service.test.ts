import axios from "axios";
import UserService from "./user-service";
import * as config from '../../app.config.json';
import { fireEvent } from "@testing-library/react";

jest.mock("axios");

describe('User service test', () => {

    beforeEach(() => jest.clearAllMocks());

    it("should open a window", () => {
        window.open = jest.fn();
        UserService.getGoogleConnexion(() => null);
        expect(window.open).toHaveBeenCalled();
    })
    it("should call axios.get with specific token", () => {
        localStorage.setItem('token', "123456")
        /** @ts-ignore */
        axios.get.mockResolvedValue({data: {}});
        return UserService.getMe(() => null).then(() => {
            expect(axios.get).toHaveBeenCalledWith(
                `${config.nestapi}/user/me`, {
                headers: {
                  Authorization: `Bearer 123456`,
                },
              })
        })
    })

    it("should not call getMe", () => {
        UserService.getMe = jest.fn();
        /** @ts-ignore */
        UserService.logCallback({ data: { token: null } }, () => null);
        expect(UserService.getMe).not.toHaveBeenCalledWith();
    })
    
    it("should call getMe", () => {
        UserService.getMe = jest.fn();
        const callback = jest.fn();
        /** @ts-ignore */
        UserService.logCallback({ data: { token: "123" } }, callback);
        expect(UserService.getMe).toHaveBeenCalledWith(callback);
    })

    it("should not remove the enventEmitter", () => {
        window.removeEventListener = jest.fn();
        /** @ts-ignore - execute this private method for testing purpose */
        UserService.intervalFunction();
        expect(window.removeEventListener).not.toHaveBeenCalled();
    })

    it("should remove the enventEmitter", () => {
        const callback = () => null;
        window.removeEventListener = jest.fn();
        window.addEventListener('message', callback);
        /** @ts-ignore - access this private property for testing purpose */
        UserService.popup =  {closed: true};
        /** @ts-ignore - execute this private method for testing purpose */
        UserService.intervalFunction(callback, setInterval());
        expect(window.removeEventListener).toHaveBeenCalledWith('message', callback)
    })

    it("should disconnect the user", () => {
        localStorage.setItem('token', "123456");
        /** @ts-ignore - incomplete value */
        UserService.user = { firstName: 'Toto' }
        const callback = jest.fn();
        UserService.logout(callback);
        expect(callback).toHaveBeenCalled();
        expect(localStorage.getItem('token')).toBeUndefined();
        expect(UserService.user).toBeUndefined();
    })

    it("should call intervalFunction method", () => {
        jest.useFakeTimers();
        window.open = jest.fn();
        window.addEventListener = jest.fn();
        /** @ts-ignore - mock this private method for testing purpose */
        UserService.intervalFunction = jest.fn();
        UserService.getGoogleConnexion(() => null);
        jest.advanceTimersByTime(0);
        /** @ts-ignore - mock this private method for testing purpose */
        expect(UserService.intervalFunction).toHaveBeenCalled();
        jest.useRealTimers();
    })

})