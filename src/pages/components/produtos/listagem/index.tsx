import { Layout } from '../../../components'
import Link from 'next/link'
import { ProductTable } from './tabela'
import { Product} from 'app/models/products'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { AxiosResponse } from 'axios'

export const ProductsListing: React.FC = () => {

    const { data: result, error } = useSWR<AxiosResponse<Product[]>>
                    ('api/products', url => httpClient.get(url))

    if (!result){
            return (
                <div>Carregando</div>
            )
    }

    return (
        <Layout title="Produtos" >
            <Link href= "/cadastros/produtos">
                <button className="button is-black">Novo</button>
            </Link>
            <br />
            <ProductTable products={result.data} />
            
        </Layout>

    )
}