import { fireEvent, render, waitFor } from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import SwitchCheckbox from './SwitchCheckbox';
import OptionsService from '../utils/optionsService';

describe('SwitchCheckbox Test', () => {
  let component = render(<SwitchCheckbox />);
  /** @ts-ignore */
  OptionsService.getOptions = jest.fn(() => Promise.resolve({ checkOptions: { preview: true } }));
  OptionsService.updateOptions = jest.fn();

  beforeEach(() => { component = render(<SwitchCheckbox />); });
  afterEach(() => { jest.clearAllMocks(); });

  it('renders SwitchCheckbox input', () => {
    const element = component.container.getElementsByClassName('react-switch-checkbox')[0];
    expect(element).toBeInTheDocument();
  });

  it('should set localstorage options', () => {
    localStorage.setItem('options', JSON.stringify({ checkOptions: { preview: false } }));
    Array.from = jest.fn(() => ['preview']);
    component = render(<SwitchCheckbox />);
    expect(Array.from).toHaveBeenCalled();
  });

  it('should switch option', async () => {
    const input = component.container.querySelector('#preview')!;
    fireEvent.click(input);
    await waitFor(() => expect(OptionsService.updateOptions).toHaveBeenCalledTimes(1));
  });
});
