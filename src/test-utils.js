// https://testing-library.com/docs/example-react-redux
import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import { StateProvider, initialState } from './store';

function render(ui, { initValues = initialState, ...renderOptions } = {}) {
  const Wrapper = ({ children }) => (
    <StateProvider initValues={() => initValues}>{children}</StateProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
