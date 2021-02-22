import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card as CardModel, EditCardDto } from '../../api';
import { useActions } from '../../hooks';
import Button from '../Button';

interface CardProps {
  card: CardModel;
}

const CardEdit: React.FC<CardProps> = ({ card }) => {
  const { id, name, imageUrl } = card;
  const [cardData, setCardData] = useState<EditCardDto>({ name, imageUrl });
  const [error, setError] = useState<{ name: boolean; imageUrl: boolean }>({
    name: false,
    imageUrl: false,
  });
  const history = useHistory();

  const { editCard } = useActions();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: e.target.value.length <= 0 });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!error.imageUrl && !error.name) {
      editCard(id, cardData);
      history.push('/');
    }
  };

  return (
    <form
      data-test="component-card-edit"
      className="CardEdit"
      onSubmit={onSubmit}
    >
      <div className="CardEdit__input">
        <input
          data-test="component-input__name"
          type="text"
          placeholder="Edit card name"
          name="name"
          value={cardData.name}
          onChange={onChange}
        />
        {error.name && (
          <div data-test="component-error__name" className="CardEdit__error">
            Name is required
          </div>
        )}
      </div>

      <div className="CardEdit__input">
        <input
          data-test="component-input__url"
          type="text"
          placeholder="Edit card name"
          name="imageUrl"
          value={cardData.imageUrl}
          onChange={onChange}
        />
        {error.imageUrl && (
          <div data-test="component-error__url" className="CardEdit__error">
            Image url is required
          </div>
        )}
      </div>

      <Button
        logLevel="info"
        category="card"
        prefix="save"
        log={JSON.stringify(card)}
        text="Save"
      />
    </form>
  );
};

export default CardEdit;
