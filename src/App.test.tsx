import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import App from './App';
import UserService from './services/user-service';
import '@testing-library/jest-dom/extend-expect';
import { UserMockFull } from './tests/user-mock';

describe('App component tests', () => {
  let component = render(<App />);

  beforeEach(() => { component = render(<App />); });

  it('renders auth button', () => {
    const element = component.container.getElementsByClassName('tz-body')[0];
    expect(element).toBeInTheDocument();
  });

  it('should render account button', async () => {
    const element = () => component.container.getElementsByClassName('accountButton')[0];
    expect(element()).toBeUndefined();
    const button = component.container.querySelector('#auth_button')!;
    UserService.getGoogleConnexion = jest.fn((setUser) => setUser(UserMockFull));
    fireEvent.click(button);
    await waitFor(() => expect(element()).toBeInTheDocument());
  });

  it('should call chrome.tabs.query', () => {
    chrome.tabs.query = jest.fn();
    const button = component.container.querySelector('#screenshot_button')!;
    fireEvent.click(button);
    expect(chrome.tabs.query).toHaveBeenCalled();
  });

  it('should call chrome.tabs.sendMessage', async () => {
    /** @ts-ignore - incomplete implementation for testing */
    chrome.tabs.query = jest.fn((options, callback) => callback([{ id: 123 }]));
    chrome.tabs.sendMessage = jest.fn();
    const button = component.container.querySelector('#screenshot_button')!;
    fireEvent.click(button);
    await waitFor(() => expect(chrome.tabs.sendMessage).toHaveBeenCalled());
  });

  it('should be loading', async () => {
    localStorage.setItem('token', '123');
    UserService.getMe = jest.fn(async () => new Promise((res) => setTimeout(() => res(), 100)));
    component = render(<App />);
    const loading = () => component.container.getElementsByClassName('ring_loader')[0];
    expect(loading()).toBeTruthy();
    await waitFor(() => expect(loading()).toBeUndefined());
  });
});
