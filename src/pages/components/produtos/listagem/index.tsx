import { Layout } from '../../../components'
import Link from 'next/link'

export const ProductsListing: React.FC = () => {
    return (
        <Layout title="Produtos" >
            <Link href= "/cadastros/produtos">
            <button className="button is-black">Novo</button>
            </Link>
            <br />
            
        </Layout>

    )
}