import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function List () {
    
    function formatDate(stringDate)
    {
        const arrayDate = stringDate.split("-");
        return arrayDate[2]+ "/" + arrayDate[1] + "/" + arrayDate[0];
    }
    
    const [developers, setDevelopers] = useState([]);


    useEffect(() => {
        async function fetchMyAPI() {
        const result = await api.get('developers');
        setDevelopers(result.data);
        }

        fetchMyAPI()
        
    },[])

    async function handleDeleteDeveloper(id) {

        
        try {
            await api.delete(`developers/${id}`);
        setDevelopers(developers.filter(developer => developer.id !== id));
        } catch (err) {
            alert ('Erro ao deletar desenvolvedor, tente novamente')
            console.log(err.message)
        }
    }

    return <div className="profile-container">
        <header>
            <img src={logoImg} alt="Desenvolvedores"/>
            <span>Desenvolvedores</span>

            <Link className="button" to="/register">Cadastrar novo desenvolvedor</Link>
        
        </header>

        <h1>Desenvolvedores cadastrados</h1>
        <ul>
            {developers.map(developer => (
                <li key={developer.id}>
                
                <strong>ID: </strong>
                <p>{developer.id}</p>

                <strong>NOME: </strong>
                <p>{developer.name}</p>

                <strong>SEXO: </strong>
                <p>{developer.sex}</p>
                
                <strong>IDADE: </strong>
                <p>{developer.age}</p>

                <strong>HOBBY: </strong>
                <p>{developer.hobby}</p>
                
                <strong>DATA NASCIMENTO: </strong>
                <p>{formatDate(developer.dob)}</p>

                <Link className="button" to={`/update/${developer.id}`}>Editar</Link>

                <button onClick={() => handleDeleteDeveloper(developer.id)} type="button">
                    <i><FiTrash2 size={20} color="black"/></i>
                </button>  
            </li>
            ))}
        </ul>
        
    </div>
} 