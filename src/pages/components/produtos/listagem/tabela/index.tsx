import { Product } from 'app/models/products'

interface ProductsTableProps {
    products: Array<Product>;
}

export const ProductTable: React.FC<ProductsTableProps> = ({
    products
}) => {
    return (
        <table className="table is-hoverable is-fullwidth is-striped">
            <thead>
                <tr>
                    <th>Código</th>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    products?.map( product => <ProductRow key={product.id} product={product} />)
                }
            </tbody>
        </table>
    )
}

interface ProductRowProps {
    product: Product;
}

const ProductRow: React.FC<ProductRowProps> = ({
    product
}) => {
    return(
        <tr>
            <td>{ product.id }</td>
            <td>{ product.sku }</td>
            <td>{ product.name }</td>
            <td>{ product.price }</td>
            <td>
                <button className="button is-black"> Editar </button>
                <button className="button is-light"> Deletar </button>
            </td>
        </tr>
    )
}