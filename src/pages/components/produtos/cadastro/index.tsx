import { useState } from 'react'
import { Layout } from '../../layout'
import { Input, Message } from '../../common'
import { useProductService } from 'app/services'
import { Product } from '../../../../app/models/products'
import { bigDecimalConverter} from 'app/util/money'
import { Alert } from '../../common/message'
import * as yup from 'yup'
import Link from 'next/link'

const msgRequiredField = "Campo Obrigatório";

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(msgRequiredField),
    name: yup.string().trim().required(msgRequiredField),
    description: yup.string().trim().required(msgRequiredField),
    price: yup.number().required(msgRequiredField).moreThan(0, "Valor deve ser maior que 0.00 (Zero)"),    
})

interface FormErrors {
    sku?: string;
    name?: string;
    price?: string;
    description?: string;
}

export const CadastroProdutos: React.FC = () => {

    const service = useProductService()
    const [ sku, setSku ] = useState<string>('')
    const [ price, setPrice ] = useState<string>('')
    const [ name, setName ] = useState<string>('')
    const [ description, setDescription ] = useState<string>('')
    const [ id, setId] = useState<string>('')
    const [register, setRegister ] = useState<string>('')
    const [ messages, setMessages] = useState<Array<Alert>>([])
    const [ errors, setErrors ] = useState<FormErrors>({}) 

    const submit = () => {
        const product: Product = {
            id,
            sku, 
            price: bigDecimalConverter(price), 
            name, 
            description
        }

        validationSchema.validate(product).then(obj => {
            setErrors({})

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
        
        }).catch(err => {
        const field = err.path;
        const message = err.message;

        setErrors({
            [field]: message
        })

        })

    }


    return (
        <Layout title="Produtos" messages={messages}>
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
                    error={errors.sku}               
                    />

                <Input label="Preço: *" 
                    columnClasses="is-half"
                    onChange={setPrice}
                    value={price}
                    id="inputPreco"
                    placeholder="Digite o preço do produto"
                    currency 
                    maxLength={16} 
                    error={errors.price}              
                    />    
            </div>

            <div className="columns">
                <Input label="Nome: *" 
                    columnClasses="is-full"
                    onChange={setName}
                    value={name}
                    id="inputNome"
                    placeholder="Digite o nome do produto"         
                    error={errors.name}       
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
                        {errors.description &&
                            <p className="help is-danger">{errors.description}</p>  
                        }  
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button onClick={submit} className="button is-black">
                        {id ? "Atualizar" : "Salvar" }
                    </button>
                </div>
                <div className="control">
                    <Link href="/consultas/produtos">
                    <button className="button is-light">Voltar</button>
                    </Link>
                </div>
            </div>

        </Layout>
    )
}