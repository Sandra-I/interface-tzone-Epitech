import { render } from '@testing-library/react';
import * as React from 'react';
import selectEvent from 'react-select-event';
import LanguageSelection from './LanguageSelection';
import '@testing-library/jest-dom/extend-expect';

describe('LanguageSelection Test', () => {
  let component = render(<LanguageSelection />);

  beforeEach(() => { component = render(<LanguageSelection />); });
  afterEach(() => { jest.clearAllMocks(); });

  it('renders language selection input', () => {
    const element = component.container.querySelector('#langSelector')!;
    expect(element).toBeInTheDocument();
  });

  it('should change i18n language', async () => {
    localStorage.setItem = jest.fn();
    await selectEvent.select(component.container.querySelector('#langSelectorInput')!, ['EN']);
    expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'en');
  });

  it('should not change i18n language', async () => {
    localStorage.setItem = jest.fn();
    await selectEvent.select(component.container.querySelector('#langSelectorInput')!, ['']);
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
