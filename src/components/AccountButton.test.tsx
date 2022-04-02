import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import AccountButton from './AccountButton';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';

describe("AccountButton test", () => {
  let component: any;

  beforeEach(() => {
    component = render(<AccountButton name='Florent' />)
  });

  it('renders account button', () => {
    const linkElement = screen.getByText(/FL/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('should execute showAccount method', () => {
    window.open = jest.fn();
    let button = component.container.getElementsByClassName('accountButton')[0];
    fireEvent.click(button);
    expect(window.open).toHaveBeenCalled();
  });

})

