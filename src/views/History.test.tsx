import { render, screen } from '@testing-library/react';
import * as React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import History from './History';
import { UserMockWithHistory, UserMockWithoutHistory } from '../tests/user-mock';

const renderComponent = (user = UserMockWithHistory) => render(
  <Router>
    <Switch>
      <Route>
        {/** @ts-ignore */}
        <History user={user} />
      </Route>
    </Switch>
  </Router>,
);

describe('History Test', () => {
  /** @ts-ignore */
  let component = renderComponent();

  beforeEach(() => { component = renderComponent(); });

  it('renders History component', () => {
    const element = component.container.getElementsByClassName('containerHistory')[0];
    expect(element).toBeInTheDocument();
  });

  it('renders no history', () => {
    component = renderComponent(UserMockWithoutHistory);
    const element = screen.getByText(/Votre historique est vide./i);
    expect(element).toBeInTheDocument();
  });
});
