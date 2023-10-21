import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLElement>;
  bottomRef: React.RefObject<HTMLElement>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({ chatRef, bottomRef, shouldLoadMore, loadMore, count }: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const topElement = chatRef?.current;

    const handleScroll = () => {
      const scrollTop = topElement?.scrollTop;

      if(scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    topElement?.addEventListener("scroll", handleScroll);

    return () => { topElement?.removeEventListener("scroll", handleScroll); }
    
  }, [shouldLoadMore, loadMore, chatRef]);

  useEffect(() => {
    const bottomElement = bottomRef?.current;
    const topElement = chatRef?.current;
    const shouldAutoScroll = () => {
      if (!hasInitialized && bottomElement) {
        setHasInitialized(true);
        return true;
      }

      if (!topElement) {
        return false;
      }

      const distanceFromBottom = topElement.scrollHeight - topElement.scrollTop - topElement.clientHeight;
      return distanceFromBottom <= 100;
    }

    if (shouldAutoScroll()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth"})
      }, 100);
    }
  }, [bottomRef, chatRef, count, hasInitialized]);
}