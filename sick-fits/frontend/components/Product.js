import Link from 'next/link';
import PropTypes from 'prop-types';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';

const Product = ({ product }) => (
  <ItemStyles>
    <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
    <Title>
      <Link href={`/product/${product.id}`}>{product.name}</Link>
    </Title>
    <PriceTag>{formatMoney(product.price)}</PriceTag>
    <p>{product.description}</p>
    {/* TODO: add buttons to do edit and delete item */}
    <div className="buttonList">
      <Link
        href={{
          pathname: '/update',
          query: {
            id: product.id,
          },
        }}
      >
        <button type="button">Edit 💅</button>
      </Link>
      <AddToCart id={product.id} />
      <DeleteProduct id={product.id} productId={product?.photo?.id}>
        delete this{' '}
      </DeleteProduct>
    </div>
  </ItemStyles>
);

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
