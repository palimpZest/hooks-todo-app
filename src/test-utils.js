// https://testing-library.com/docs/example-react-redux
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';

import { StateProvider, initialState } from './store';

function renderWithRouter(
  ui,
  { initValues = initialState, route = '/', path = '/', ...renderOptions } = {},
) {
  const Wrapper = ({ children }) => (
    <StateProvider initValues={() => initValues}>
      <MemoryRouter initialEntries={[route]}>
        <Route path={`${path}`}>{children}</Route>
      </MemoryRouter>
    </StateProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { renderWithRouter };
