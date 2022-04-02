import { render } from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { UserMockFull } from '../tests/user-mock';
import Parameters from './Parameters';

const renderComponent = (user = UserMockFull) => render(
  <Router>
    <Switch>
      <Route>
        <Parameters user={user} />
      </Route>
    </Switch>
  </Router>,
);

describe('Parameters test', () => {
  let component = renderComponent();

  beforeEach(() => { component = renderComponent(); });

  it('renders History component', () => {
    const element = component.container.getElementsByClassName('params')[0];
    expect(element).toBeInTheDocument();
  });
});
