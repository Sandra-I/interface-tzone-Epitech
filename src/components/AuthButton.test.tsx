import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import AuthButton from './AuthButton';
import UserService from '../services/user-service';

const setUser = () => null;
window.open = jest.fn();

describe('AccountButton test', () => {
  let component = render(<AuthButton setUser={setUser} />);

  beforeEach(() => {
    component = render(<AuthButton setUser={setUser} />);
  });

  it('renders auth button', () => {
    UserService.user = undefined;
    const element = component.container.querySelector('#auth_button')!;
    expect(element).toContainHTML('login');
  });

  it('should execute login method', () => {
    const spy = jest.spyOn(UserService, 'getGoogleConnexion');
    const button = component.container.getElementsByClassName('myButton')[0];
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
  });

  it('should execute logout method', () => {
    /** @ts-ignore - incomplete object */
    UserService.user = { firstName: 'Toto', lastName: 'Toto' };
    component = render(<AuthButton setUser={setUser} />);
    const spy = jest.spyOn(UserService, 'logout');
    const button = component.container.getElementsByClassName('myButton')[0];
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
  });
});
