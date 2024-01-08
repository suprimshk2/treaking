import { describe, it } from 'vitest';
import { render } from './shared/tests/testUtils';

import { App } from './App';

describe('App', () => {
  it('Renders <App /> component', () => {
    render(<App />);
  });
});
