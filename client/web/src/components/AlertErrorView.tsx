import React, { useState } from 'react';
import { Alert, Button } from 'antd';
import clsx from 'clsx';
import { t } from 'tailchat-shared';

/**
 * 用于接口错误显示的组件
 * @deprecated 请使用 ErrorView
 */
export const AlertErrorView: React.FC<{
  error: Error;
}> = React.memo(({ error }) => {
  const [show, setShow] = useState(false);

  const description = (
    <div>
      <span>{String(error.message)}</span>
      <Button
        className={clsx({
          'opacity-0': show,
        })}
        type="link"
        onClick={() => setShow(true)}
      >
        {t('显示详情')}
      </Button>
      {show && <pre>{String(error.stack)}</pre>}
    </div>
  );

  return (
    <Alert
      className="w-full h-full select-text"
      type="error"
      message={String(error.name)}
      description={description}
    />
  );
});
AlertErrorView.displayName = 'AlertErrorView';
