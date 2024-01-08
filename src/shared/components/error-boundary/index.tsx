import React from 'react';

import { IComposeError } from 'shared/interfaces/http';

import ErrorFallBack from './ErrorFallback';

interface IState extends IComposeError {
  hasError: boolean;
}

interface IProps {
  children: React.ReactNode;
  onReset: () => void;
}

interface IErrorBoundaryContext {
  triggerError(args: IComposeError): void;
  resetError(): void;
}

// Non-null assertion is safe here
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const ErrorBoundaryContext = React.createContext<IErrorBoundaryContext>(null!);

export default class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error & IComposeError) {
    const { message, status } = error;
    this.setState({ message, status });
  }

  triggerError = (args: IComposeError) => {
    this.setState({ hasError: true, ...args });
  };

  resetError = () => {
    this.setState({ hasError: false });
    const { onReset } = this.props;

    if (typeof onReset === 'function') {
      onReset();
    }
  };

  render() {
    const { hasError, ...rest } = this.state;
    const { children } = this.props;
    return (
      <ErrorBoundaryContext.Provider
        // TODO: Fix ESLint Issue (Linter suggests to use `useMemo` but this is a class component)
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{ triggerError: this.triggerError, resetError: this.resetError }}
      >
        {hasError ? (
          <ErrorFallBack resetError={this.resetError} {...rest} />
        ) : (
          children
        )}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export const useErrorBoundary = () => React.useContext(ErrorBoundaryContext);
