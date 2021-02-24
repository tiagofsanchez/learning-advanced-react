import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';

const Product = ({ product }) => (
  <ItemStyles>
    <img src={product?.photo?.image?.publicUrlTransformed} alt={product.name} />
    <Title>
      <Link href={`/product/${product.id}`}>{product.name}</Link>
    </Title>
    <PriceTag>{product.price}</PriceTag>
  </ItemStyles>
);

export default Product;
