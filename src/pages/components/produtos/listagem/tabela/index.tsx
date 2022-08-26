import { Product } from 'app/models/products'
import { useState } from 'react'

interface ProductsTableProps {
    products: Array<Product>;
    onEdit: (product) => void;
    onDelete: (product) => void;
}

export const ProductTable: React.FC<ProductsTableProps> = ({
    products,
    onDelete,
    onEdit
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
                    products?.map( product => (
                            <ProductRow onDelete={onDelete} 
                                        onEdit={onEdit}     
                                        key={product.id} 
                                        product={product} />
                        )
                    )
                }
            </tbody>
        </table>
    )
}

interface ProductRowProps {
    product: Product;
    onEdit: (product) => void;
    onDelete: (product) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
    product,
    onDelete,
    onEdit
}) => {

    const [ deleting, setDeleting ] = useState<boolean>(false) 

    const onDeleteClick = (product: Product) => {
        if(deleting){
            onDelete(product)
            setDeleting(false)
        }else{
            setDeleting(true)
        }
    }

    const cancelDelete = () => setDeleting(false)

    return(
        <tr>
            <td>{ product.id }</td>
            <td>{ product.sku }</td>
            <td>{ product.name }</td>
            <td>{ product.price }</td>
            <td>
                {!deleting && 
                    <button onClick={e => onEdit(product) } 
                    className="button is-black is-small m-1"> Editar  </button>
                }
                    <button onClick={e => onDeleteClick(product) } 
                    className="button is-light is-small m-1"> { deleting ? "Confirmar" : "Deletar" } </button>
                { deleting && 
                    <button onClick={cancelDelete} 
                    className="button is-black is-small m-1"> Cancelar </button>
                }
            </td>
        </tr>
    )
}