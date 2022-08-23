import { useState } from 'react'
import { Layout, Input} from '/src/pages/components'
import { useProductService } from 'app/services'
import { Product } from 'app/models/product'

export const CadastroProdutos: React.FC = () => {

    const service = useProductService()
    const [ sku, setSku ] = useState<string>('')
    const [ price, setPrice ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ description, setDescription ] = useState<string>('')
    const [ id, setId] = useState<string>('')
    const [register, setRegister ] = useState<string>('')

    const submit = () => {
        const product: Product = {
            id,
            sku, 
            price: parseFloat(price), 
            name, 
            description
        }

        if(id) {
            service
                .update(product)
                .then(response => console.log("Atualizado"))

        }else{

        service
            .save(product)
            .then(productResponse => {
                setId(productResponse.id)
                setRegister(productResponse.register)
            })

        }
    }

    return (
        <Layout tittle="Produtos">
            {id &&  
                <div className="columns">
                    <Input label="Código: *" 
                        columnClasses="is-half"
                        onChange={setSku}
                        value={id}
                        id="inputId"     
                        disabled={true}        
                        />

                    <Input label="Data de Cadastro: *" 
                        columnClasses="is-half"
                        value={register}
                        id="inputDateRegister"
                        disabled           
                        />    
                </div>
            }

            <div className="columns">
                <Input label="SKU: *" 
                    columnClasses="is-half"
                    onChange={setSku}
                    value={sku}
                    id="inputSku"
                    placeholder="Digite o SKU do produto"                
                    />

                <Input label="Preço: *" 
                    columnClasses="is-half"
                    onChange={setPrice}
                    value={price}
                    id="inputPreco"
                    placeholder="Digite o preço do produto"                
                    />    
            </div>

            <div className="columns">
                <Input label="Nome: *" 
                    columnClasses="is-full"
                    onChange={setName}
                    value={name}
                    id="inputNome"
                    placeholder="Digite o nome do produto"                
                    />
            </div>  

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">Descrição: *</label>
                    <div className="control">
                        <textarea className="textarea" 
                            id="inputDesc" value={description} 
                            onChange={ event => setDescription(event.target.value) }
                            placeholder="Digite a descrição detalhada do produto"></textarea>
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button onClick={submit} className="button is-link">
                        {id ? "Atualizar" : "Salvar" }
                    </button>
                </div>
                <div className="control">
                    <button className="button is-link is-light">Voltar</button>
                </div>
            </div>

        </Layout>
    )
}