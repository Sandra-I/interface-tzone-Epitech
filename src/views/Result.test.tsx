import { render, screen } from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import UserService from '../services/user-service';
import Result from './Result';

describe('AccountButton test', () => {
  render(<Result text="test result" />);

  it('renders result', () => {
    UserService.user = undefined;
    const element = screen.getByText(/test result/i);
    expect(element).toBeInTheDocument();
  });
});
