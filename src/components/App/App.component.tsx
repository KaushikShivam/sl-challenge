import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import Loading from '../Loading';

const CardsPage = lazy(() => import('../../pages/Cards'));
const CardDetail = lazy(() => import('../../pages/CardDetail'));

const App: React.FC = () => {
  return (
    <main className="App">
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={CardsPage} />
            <Route path="/:id" component={CardDetail} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default App;
