import { useEffect } from 'react'
import { Layout, Loader } from '../..'
import Link from 'next/link'
import { ProductTable } from './tabela'
import { Product} from 'app/models/products'
import useSWR from 'swr'
import { httpClient } from 'app/http'
import { AxiosResponse } from 'axios'
import Router from 'next/router'
import { useProductService } from 'app/services'
import { useState } from 'react'
import { Alert } from 'components/common/message'

export const ProductsListing: React.FC = () => {

    const service = useProductService();
    const [ messages, setMessages] = useState<Array<Alert>>([])
    const { data: result, error } = useSWR<AxiosResponse<Product[]>>
                    ('api/products', url => httpClient.get(url))
    
    const [ list, setList ] = useState<Product[]>()

    useEffect(() => {
        setList(result?.data || [])
    }, [result])

    const edit = (product: Product) => {
        const url = `/cadastros/produtos?id=${product.id}`
        Router.push(url)
    }

    const Delete = (product: Product) => {
        service.Delete(product.id).then(response => {
            setMessages([
                { type: "success", text: "Produto excluido com sucesso!" }
            ])
            const alterList: Product[] = list?.filter( p => p.id != product.id)
            setList(alterList)
    })
}

    return (
        <Layout title="Produtos" messages={messages}>
            <Link href= "/cadastros/produtos">
                <button className="button is-black">Novo</button>
            </Link>
            <br /><br />
            <Loader show={!result} />
            <ProductTable onEdit={edit} onDelete={Delete} products={list} />
            
        </Layout>

    )
}