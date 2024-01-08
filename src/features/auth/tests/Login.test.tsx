import { describe, it, expect } from 'vitest';
import { render, screen, cleanup } from 'shared/tests/testUtils';

import Login from '../pages/Login';
// import LoginForm from '../components/LoginForm';

// const mockLogin = vi.fn(
//   ({ email, password }: { email: string; password: string }) => {
//     return Promise.resolve({ email, password });
//   }
// );

describe('Login -----------------------', () => {
  afterEach(cleanup);

  it('should have a input fields for username and password, also a submit button', () => {
    render(<Login />);

    expect(screen.getByRole('heading', { level: 5 })).toHaveTextContent(
      'User Login'
    );

    const emailInput = screen.getByLabelText('Username');
    expect(emailInput).toBeInTheDocument();

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: 'Login' });
    expect(submitButton).toBeInTheDocument();
  });

  // it('should allow the user to submit their credentials (email and password)', () => {
  //   const isLoadingMock = false;

  //   const testEmail = 'a@test.com';
  //   const testPassword = 'P@ssw0rd';

  //   render(<LoginForm isLoading={isLoadingMock} onSubmitHandler={mockLogin} />);

  //   fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
  //     target: {
  //       value: testEmail,
  //     },
  //   });
  //   fireEvent.change(screen.getAllByLabelText(/password/i)[0], {
  //     target: { value: testPassword },
  //   });

  //   const submitButton = screen.getByRole('button', { name: /login/i });
  //   fireEvent.submit(submitButton);

  //   expect(mockLogin).toBeCalledWith({
  //     email: testEmail,
  //     password: testPassword,
  //   });
  // });
});
