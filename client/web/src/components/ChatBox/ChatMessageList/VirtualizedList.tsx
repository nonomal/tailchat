import React, { useEffect, useMemo, useRef, useState } from 'react';
import { buildMessageItemRow } from './Item';
import type { MessageListProps } from './types';
import {
  FollowOutputScalarType,
  Virtuoso,
  VirtuosoHandle,
} from 'react-virtuoso';
import {
  ChatMessage,
  useMemoizedFn,
  useSharedEventHandler,
} from 'tailchat-shared';
import { ScrollToBottom } from './ScrollToBottom';

const PREPEND_OFFSET = 10 ** 7;

const virtuosoStyle: React.CSSProperties = {
  height: '100%',
};

const overscan = {
  main: 1000,
  reverse: 1000,
};

/**
 * 新版的虚拟列表
 * 参考: https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageList/VirtualizedMessageList.tsx
 */
export const VirtualizedMessageList: React.FC<MessageListProps> = React.memo(
  (props) => {
    const listRef = useRef<VirtuosoHandle>(null);
    const scrollerRef = useRef<HTMLElement>();
    const numItemsPrepended = usePrependedMessagesCount(props.messages);

    const scrollToBottom = useMemoizedFn(() => {
      listRef.current?.scrollTo({
        top: scrollerRef.current?.scrollHeight,
        behavior: 'smooth',
      });
    });

    useSharedEventHandler('sendMessage', scrollToBottom);

    const handleLoadMore = useMemoizedFn(() => {
      if (props.isLoadingMore) {
        return;
      }

      if (props.hasMoreMessage) {
        props.onLoadMore();
      }
    });

    const followOutput = useMemoizedFn(
      (isAtBottom: boolean): FollowOutputScalarType => {
        if (isAtBottom) {
          setTimeout(() => {
            // 这里 Virtuoso 有个动态渲染高度的bug, 因此需要异步再次滚动到底部以确保代码功能work
            listRef.current?.autoscrollToBottom();
          }, 20);
        }

        /**
         * 如果有新的内容，且当前处于最底部时, 保持在最底部
         */
        return isAtBottom ? 'smooth' : false;
      }
    );

    const computeItemKey = useMemoizedFn(
      (index: number, item?: ChatMessage) => {
        if (!item) {
          return index;
        }

        return item._id;
      }
    );

    const itemContent = useMemoizedFn((virtuosoIndex: number) => {
      const index = virtuosoIndex + numItemsPrepended - PREPEND_OFFSET;

      return buildMessageItemRow(props.messages, index);
    });

    const [showScrollToBottom, setShowScrollToBottom] = useState(false);
    const atBottomStateChange = useMemoizedFn((atBottom: boolean) => {
      if (atBottom) {
        setShowScrollToBottom(false);
      } else {
        setShowScrollToBottom(true);
      }
    });

    return (
      <div className="flex-1">
        <Virtuoso
          style={virtuosoStyle}
          ref={listRef}
          scrollerRef={(ref) => (scrollerRef.current = ref as HTMLElement)}
          firstItemIndex={PREPEND_OFFSET - numItemsPrepended}
          initialTopMostItemIndex={Math.max(props.messages.length - 1, 0)}
          computeItemKey={computeItemKey}
          totalCount={props.messages.length}
          overscan={overscan}
          itemContent={itemContent}
          alignToBottom={true}
          startReached={handleLoadMore}
          atBottomStateChange={atBottomStateChange}
          followOutput={followOutput}
          defaultItemHeight={25}
          atTopThreshold={100}
          atBottomThreshold={40}
          useWindowScroll={false}
        />

        {showScrollToBottom && <ScrollToBottom onClick={scrollToBottom} />}
      </div>
    );
  }
);
VirtualizedMessageList.displayName = 'VirtualizedMessageList';

function usePrependedMessagesCount(messages: ChatMessage[]) {
  const currentFirstMessageId = messages?.[0]?._id;
  const firstMessageId = useRef(currentFirstMessageId);
  const earliestMessageId = useRef(currentFirstMessageId);
  const previousNumItemsPrepended = useRef(0);

  const numItemsPrepended = useMemo(() => {
    if (!messages || !messages.length) {
      return 0;
    }
    // if no new messages were prepended, return early (same amount as before)
    if (currentFirstMessageId === earliestMessageId.current) {
      return previousNumItemsPrepended.current;
    }

    if (!firstMessageId.current) {
      firstMessageId.current = currentFirstMessageId;
    }
    earliestMessageId.current = currentFirstMessageId;
    // if new messages were prepended, find out how many
    // start with this number because there cannot be fewer prepended items than before
    for (
      let i = previousNumItemsPrepended.current;
      i < messages.length;
      i += 1
    ) {
      if (messages[i]._id === firstMessageId.current) {
        previousNumItemsPrepended.current = i;
        return i;
      }
    }
    return 0;
    // TODO: there's a bug here, the messages prop is the same array instance (something mutates it)
    // that's why the second dependency is necessary
  }, [messages, messages?.length]);

  return numItemsPrepended;
}
