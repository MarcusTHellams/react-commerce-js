import { Route, Switch } from 'react-router-dom';
import { ProductsListView } from './views/ProductsListView';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <ProductsListView />
        </Route>
      </Switch>
    </>
  );
}

export default App;
