import React from 'react';

export const CardWrapper: React.FC<React.PropsWithChildren> = React.memo(
  (props) => {
    return (
      <div className="w-3/4">
        <div
          className="max-w-full border border-black border-opacity-20 rounded-md p-2 bg-black bg-opacity-5 dark:bg-black dark:bg-opacity-10 inline-flex overflow-hidden"
          style={{ minWidth: 240 }}
        >
          {props.children}
        </div>
      </div>
    );
  }
);
CardWrapper.displayName = 'CardWrapper';
