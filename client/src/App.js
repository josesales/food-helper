import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import "./styles/main.scss";
import Header from './components/Header';
import Loader from './components/ui/Loader';
import AddEditRecipe from './pages/AddEditRecipe';

const Home = lazy(() => import('./pages/Home'));
const Recipe = lazy(() => import('./pages/Recipe'));

const App = () => {

  return (
    <div>
      <Header />
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route exact path='/' component={Home} />
          <Route path='/recipe' component={Recipe} />
          <Route path='/addEditRecipe' component={AddEditRecipe} />
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
