import { Layout } from '../components/common/Layout';
import { Query } from '../components/common/Query';
import { ProductsListComponent } from '../components/products/ProductsListComponent';
import { PRODUCTS_LIST } from '../constants/queryKeys/productsList';
import { commerce } from '../lib/commerce';

const queryFn = async () => {
  const { data } = await commerce.products.list();
  return data;
};

const queryKey = PRODUCTS_LIST;

export const ProductsListView = () => {
  return (
    <>
      <Layout>
        <Query
          {...{ queryFn, queryKey }}
          render={({ data: products }) => {
            return <ProductsListComponent {...{products}} />
          }}
        />
      </Layout>
    </>
  );
};
