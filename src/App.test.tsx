import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "./App";
import * as React from 'react';
import UserService from "./services/user-service";
import '@testing-library/jest-dom/extend-expect';

describe("App component tests", () => {
    let component: any;

    beforeEach(() => component = render(<App />));

    it('renders auth button', () => {
        let element = component.container.getElementsByClassName('tz-body')[0];
        expect(element).toBeInTheDocument();
    });

    it('should render account button', async () => {
        let element = () => component.container.getElementsByClassName('accountButton')[0];
        expect(element()).toBeUndefined();
        let button = component.container.getElementsByClassName('myButton')[0];
        UserService.getGoogleConnexion = jest.fn((setUser) => setUser({ firstName: 'Toto' }))
        fireEvent.click(button);
        await waitFor(() => expect(element()).toBeInTheDocument());
    });
})