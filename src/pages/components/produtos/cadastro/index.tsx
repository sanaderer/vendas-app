import { useState } from 'react'
import { Layout, Input, Message} from '/src/pages/components'
import { useProductService } from 'app/services'
import { Product } from 'app/models/product'
import { bigDecimalConverter} from 'app/util/money'
import { Alert } from '/src/pages/components/commom/message'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
    sku: yup.string().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),    
})

export const CadastroProdutos: React.FC = () => {

    const service = useProductService()
    const [ sku, setSku ] = useState<string>('')
    const [ price, setPrice ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ description, setDescription ] = useState<string>('')
    const [ id, setId] = useState<string>('')
    const [register, setRegister ] = useState<string>('')
    const [ messages, setMessages] = useState<Array<Alert>>([])

    const submit = () => {
        const product: Product = {
            id,
            sku, 
            price: bigDecimalConverter(price), 
            name, 
            description
        }

        if(id) {
            service
                .update(product)
                .then(response => {
                    setMessages([{
                        type: "success", text: "Produto atualizado com sucesso!"
                }])
                })

        }else{

        service
            .save(product)
            .then(productResponse => {
                setId(productResponse.id)
                setRegister(productResponse.register)
                setMessages([{
                    type: "success", text: "Produto salvo com sucesso!"
            }])
            })

        }
    }

    return (
        <Layout tittle="Produtos" messages={messages}>
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
                    currency 
                    maxLength={16}               
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