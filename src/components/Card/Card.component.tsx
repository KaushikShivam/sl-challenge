import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card as CardModel } from '../../api';
import { useActions } from '../../hooks';
import Button from '../Button';

export interface CardProps {
  card: CardModel;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const { deleteCard } = useActions();
  const history = useHistory();

  return (
    <div data-test="component-card" className="Card">
      <div className="Card__img">
        <img
          data-test="component-card__img"
          src={card.imageUrl}
          alt={card.name}
          loading="lazy"
        />
      </div>
      <div className="Card__info">
        <h2 data-test="component-card__heading" className="heading-3">
          {card.name}
        </h2>
        <h5 className="heading-5">Count: {card.count.total}</h5>
        <div data-test="component-card__btns" className="Card__btns">
          <Button
            logLevel="info"
            category="card"
            prefix="delete"
            log={JSON.stringify(card)}
            onClick={() => deleteCard(card.id)}
            text="Delete"
          />
          <Button
            logLevel="info"
            category="card"
            prefix="edit"
            log={JSON.stringify(card)}
            onClick={() =>
              history.push({
                pathname: card.id,
                search: '?edit=true',
              })
            }
            text="Edit"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
