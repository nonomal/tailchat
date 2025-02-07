import { Button } from 'antd';
import React, { PropsWithChildren } from 'react';
import { t } from 'tailchat-shared';
import { Problem } from './Problem';

interface ErrorBoundaryProps {
  message?: React.ReactNode;
  description?: string;
}

const defaultState = {
  error: undefined,
  info: {
    componentStack: '',
  },
};

export class ErrorBoundary extends React.Component<
  PropsWithChildren<ErrorBoundaryProps>,
  {
    error?: Error | null;
    info: {
      componentStack?: string;
    };
  }
> {
  state = defaultState;

  componentDidCatch(error: Error | null, info: any) {
    this.setState({ error, info });
  }

  reset = () => {
    this.setState(defaultState);
  };

  render() {
    const { message, description, children } = this.props;
    const { error, info } = this.state;
    const componentStack =
      info && info.componentStack ? info.componentStack : null;
    const errorMessage =
      typeof message === 'undefined' ? (error || '').toString() : message;
    const errorDescription =
      typeof description === 'undefined' ? componentStack : description;

    if (error) {
      return (
        <Problem
          text={
            <>
              <h3>{t('页面出现了一些问题')}</h3>
              <p title={errorDescription ?? ''}>{errorMessage}</p>
              <Button size="small" onClick={this.reset}>
                {t('重试')}
              </Button>
            </>
          }
        />
      );
    }

    return children;
  }
}
