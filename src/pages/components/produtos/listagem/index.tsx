import { Layout } from '../../../components'
import Link from 'next/link'
import { ProductTable } from './tabela'
import { Product} from 'app/models/products'

export const ProductsListing: React.FC = () => {

    const products: Product[] = [{
        id: "1", sku: "HGUTW67", name: "Impressora", price: 5000
    }]

    return (
        <Layout title="Produtos" >
            <Link href= "/cadastros/produtos">
            <button className="button is-black">Novo</button>
            </Link>
            <br />
            <ProductTable products={products} />
            
        </Layout>

    )
}