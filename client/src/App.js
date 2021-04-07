import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import "./styles/main.scss";
import Header from './components/Header';
import Loader from './components/ui/Loader';
import Home from './pages/Home';

//it seems history.push doesn't work well when the page is lazy loaded
import MyRecipes from './pages/MyRecipes';
import MyFavorites from './pages/MyFavorites';
import Filter from './pages/Filter';
import FilteredRecipes from './pages/FilteredRecipes';

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
          <Route path='/filteredRecipes' component={FilteredRecipes} />
          <Route path='/addEditRecipe' component={AddEditRecipe} />
          <Route path='/login' component={Login} />
          <Route path='/signUp' component={SignUp} />
          <Route exact path='/filter' component={Filter} />
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
