import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import "./styles/main.scss";
import Header from './components/Header';
import Loader from './components/ui/Loader';
import MyRecipes from './pages/MyRecipes';
import MyFavorites from './pages/MyFavorites';

const Home = lazy(() => import('./pages/Home'));
const Recipe = lazy(() => import('./pages/Recipe'));
const AddEditRecipe = lazy(() => import('./pages/AddEditRecipe'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));

const App = () => {

  return (
    <div>
      <Header />
      <Switch>
        <Suspense fallback={<Loader />}>
          <Route exact path='/' component={Home} />
          <Route path='/recipe' component={Recipe} />
          <Route path='/myRecipes' component={MyRecipes} />
          <Route path='/myFavorites' component={MyFavorites} />
          <Route path='/addEditRecipe' component={AddEditRecipe} />
          <Route path='/login' component={Login} />
          <Route path='/signUp' component={SignUp} />
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
