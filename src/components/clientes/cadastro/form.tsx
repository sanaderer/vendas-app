import { Cliente } from 'app/models/clientes'
import { useFormik } from 'formik'
import { Input, InputCPF } from 'components'

interface ClientFormProps{
    cliente: Cliente;
    onSubmit: (cliente: Cliente) => void;

}

const formScheme: Cliente = {
    register: '',
    cpf: '',
    birth: '',
    email: '',
    address: '',
    id: '',
    name: '',
    number: ''
}


export const ClienteForm: React.FC<ClientFormProps> = ({
    cliente,
    onSubmit
}) => {

    const formik = useFormik<Cliente>({
        initialValues: {...formScheme, ...cliente},
        onSubmit,
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.id &&
            <div className="columns">
                <Input  id="id" 
                        name="id" 
                        label="Código: "
                        autoComplete="off"
                        columnClasses="is-half"
                        value={formik.values.id}/>
                <Input  id="register" 
                        name="register" 
                        label="Data de Cadastro: "
                        autoComplete="off"
                        columnClasses="is-half"
                        value={formik.values.register}/>
            </div>
           }
            <div className="columns">
                <Input  id="name" 
                        name="name" 
                        label="Nome: *"
                        autoComplete="off"
                        columnClasses="is-full"
                        onChange={formik.handleChange}
                        value={formik.values.name}/>
            </div>
            <div className="columns">
                <InputCPF  id="cpf" 
                        name="cpf" 
                        label="CPF: *"
                        autoComplete="off"
                        columnClasses="is-half"
                        onChange={formik.handleChange}
                        value={formik.values.cpf}/>
                <Input  id="birth" 
                        name="birth" 
                        label="Data de Nascimento: *"
                        autoComplete="off"
                        columnClasses="is-half"
                        onChange={formik.handleChange}
                        value={formik.values.birth}/>
            </div>
            <div className="columns">
                <Input  id="address" 
                        name="address" 
                        label="Endereço: *"
                        autoComplete="off"
                        columnClasses="is-full"
                        onChange={formik.handleChange}
                        value={formik.values.address}/>
            </div>
            <div className="columns">
                <Input  id="email" 
                        name="email" 
                        label="E-mail: *"
                        autoComplete="off"
                        columnClasses="is-half"
                        onChange={formik.handleChange}
                        value={formik.values.email}/>
                <Input  id="number" 
                        name="number" 
                        label="Telefone: *"
                        autoComplete="off"
                        columnClasses="is-half"
                        onChange={formik.handleChange}
                        value={formik.values.number}/>
            </div>
            <div className="field is-grouped">
                <div className="control is-link">
                    <button type="submit" className="button is-black">
                        {formik.values.id ? "Atualizar" : "Salvar" }
                    </button>
                </div>
            </div>
        </form>
    )
}