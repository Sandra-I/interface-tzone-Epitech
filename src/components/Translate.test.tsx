import {
  act,
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Translate from './Translate';
import OptionsService from '../utils/optionsService';

describe('Translate Test', () => {
  let component: any;

  beforeEach(async () => {
    await act(async () => { component = render(<Translate setPreviewDisabled={() => null} />); });
  });

  afterEach(() => { jest.clearAllMocks(); });
  /** @ts-ignore */
  OptionsService.getOptions = jest.fn(() => Promise.resolve({ checkOptions: { preview: true } }));
  OptionsService.updateOptions = jest.fn();

  it('renders Translate input', async () => {
    const element = () => component.container.querySelector('#translatedLangSelector');
    expect(element()).toBeInTheDocument();
  });

  it('should update option', async () => {
    const input = component.container.querySelector('#translatedLangSelector')!;
    await act(async () => { fireEvent.change(input, { target: { value: 'COUOCU' } }); });
    await waitFor(() => expect(OptionsService.updateOptions).toHaveBeenCalledTimes(1));
  });
});
