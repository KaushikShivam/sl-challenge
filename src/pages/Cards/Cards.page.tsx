import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import useInfiniteScroll from 'react-infinite-scroll-hook';

import Card from '../../components/Card';
import { useActions } from '../../hooks';
import { useTypedSelector } from '../../hooks';
import {
  getCards,
  getCardsError,
  getCardsLoading,
  getKeyword,
  getHasMore,
} from '../../state/selectors';
import Navbar from '../../layout/Navbar';
import Progress from '../../layout/Progress';
import { CARDS_LIMIT } from '../../api';

const Cards: React.FC = () => {
  const { fetchCards, searchCards, clearCards } = useActions();
  const cards = useTypedSelector(getCards);
  const isLoading = useTypedSelector(getCardsLoading);
  const error = useTypedSelector(getCardsError);
  const keyword = useTypedSelector(getKeyword);
  const hasMore = useTypedSelector(getHasMore);

  const queryStr = useLocation().search;
  const queryKeyword = queryString.parse(queryStr).keyword;

  const infiniteRef: React.RefObject<HTMLDivElement> = useInfiniteScroll({
    loading: isLoading,
    hasNextPage: hasMore,
    onLoadMore: () => {
      let keyword = typeof queryKeyword === 'string' ? queryKeyword : undefined;
      cards.length >= CARDS_LIMIT && fetchCards(keyword, cards.length);
    },
    scrollContainer: 'window',
  });

  useEffect(() => {
    if (typeof queryKeyword === 'string') searchCards(queryKeyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // MARK: Custom debounce to reduce API overhead
    let timer: number | undefined;
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fetchCards(keyword);
    }, 500);

    return () => {
      clearTimeout(timer);
      clearCards();
    };
  }, [fetchCards, keyword, clearCards]);

  return (
    <section data-test="component-cards" className="Cards">
      <Progress isAnimating={isLoading} />
      <Navbar />
      <div className="Cards__feed" ref={infiniteRef}>
        {error && <div className="heading-5 Cards__error">{error}</div>}
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
};

export default Cards;
