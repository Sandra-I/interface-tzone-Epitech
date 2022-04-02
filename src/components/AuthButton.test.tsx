import { fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AuthButton from './AuthButton';
import UserService from '../services/user-service';


const setUser = () => null;
window.open = jest.fn();

describe("AccountButton test", () => {
  let component: any;

  beforeEach(() => {
    component = render(<AuthButton setUser={setUser}/>)
  });

  it('renders auth button', () => {
    const linkElement = screen.getByText(/Connexion/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should execute login method', () => {
    let spy = jest.spyOn(UserService, 'getGoogleConnexion');
    let button = component.container.getElementsByClassName('myButton')[0];
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
  });

  it('should execute logout method', () => {
    /** @ts-ignore - incomplete object */
    UserService.user = { firstName: "Toto", lastName: "Toto" }
    component = render(<AuthButton setUser={setUser}/>)
    let spy = jest.spyOn(UserService, 'logout');
    let button = component.container.getElementsByClassName('myButton')[0];
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
  });

})

