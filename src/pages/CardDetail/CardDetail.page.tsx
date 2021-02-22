import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useActions } from '../../hooks';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useTypedSelector } from '../../hooks';
import { getCard } from '../../state';
import CardEdit from '../../components/CardEdit';

const CardDetail = () => {
  const history = useHistory();

  // Extract query str from url, parse it and convert to boolean
  const isEditing = queryString.parse(useLocation().search).edit === 'true';

  const { id } = useParams<{ id: string }>();
  const { fetchCard, clearCard } = useActions();
  const card = useTypedSelector(getCard);

  useEffect(() => {
    fetchCard(id);

    return () => {
      clearCard();
    };
  }, [fetchCard, id, clearCard]);

  const configureComponent = () => {
    if (card) {
      if (isEditing) {
        return <CardEdit card={card} />;
      } else {
        return <Card card={card} />;
      }
    }
  };

  return (
    <div data-test="component-card-detail" className="CardDetail">
      <div className="CardDetail__nav">
        <Button
          logLevel="info"
          category="navigate"
          prefix="back"
          log={history.location.pathname}
          text="Back"
          onClick={() => history.goBack()}
        />
      </div>
      <div className="CardDetail__content">{configureComponent()}</div>
    </div>
  );
};

export default CardDetail;
