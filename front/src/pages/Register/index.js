import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css';
import logoImg from '../../assets/logo.png';

export default function Register() {
    
    const [name, setName] = useState('');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('');
    const [hobby, setHobby] = useState('');
    const [dob, setDob] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {name, sex, age, hobby, dob};

        console.log(data)
        try {
            await api.post('developers', {
                name: name,
                sex: sex,
                age: age,
                hobby: hobby,
                dob: dob
            });
            alert(`Desenvolvedor cadastrado com sucesso`);

            history.push('/')
        } catch (err) {
            let errors = Object.values(err.response.data);
            let allErrors = "";
            errors.forEach(element => {
                allErrors += element[0] + "\n"
            });
            alert(allErrors);
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Desenvolvedores"/>
                    <h1>Cadastrar</h1>
                    <p>Preencha os dados do desenvolvedor:</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#15aae6"/>
                        Lista de desenvolvedores
                    </Link>

                </section>
                
                <form onSubmit={handleRegister}>

                <input value={name} onChange={e => setName(e.target.value)} placeholder="Nome"/>
                <input value={sex} onChange={e => setSex(e.target.value)} placeholder="Sexo" maxLength="1"/>
                <input value={age} onChange={e => setAge(e.target.value)} placeholder="Idade" type="number"/>
                <input value={hobby} onChange={e => setHobby(e.target.value)} placeholder="Hobby" />
                <input value={dob} onChange={e => setDob(e.target.value)} type="date"/>
                
                
                <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}