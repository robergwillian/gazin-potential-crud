import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

import "../Register/styles.css";
import logoImg from "../../assets/logo.png";

export default function Update() {
  const [developer, setDeveloper] = useState([]);
  const { id } = useParams();

  //   async function getDeveloper() {
  //       const result = await api.get(`developers/${id}`);

  //       setDeveloper(result.data);
  //   }

  //   getDeveloper();

  useEffect(() => {
    async function fetchMyAPI() {
      const result = await api.get(`developers/${id}`);
      setDeveloper(result.data);
    }
    fetchMyAPI();
  }, []);

  const [name, setName] = useState(developer.name);
  const [sex, setSex] = useState(developer.sex);
  const [age, setAge] = useState(developer.age);
  const [hobby, setHobby] = useState(developer.hobby);
  const [dob, setDob] = useState(developer.dob);

  const history = useHistory();

  async function handleUpdate(e) {
    e.preventDefault();

    try {
      await api.put(`/developers/${id}`, {
        name,
        sex,
        age,
        hobby,
        dob,
      });
      alert(`Desenvolvedor alterado com sucesso`);

      history.push("/");
    } catch (err) {
      console.log(err.message);
      alert(err);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Desenvolvedores" />
          <h1>Editar</h1>
          <p>Altere os dados do desenvolvedor:</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#15aae6" />
            Lista de desenvolvedores
          </Link>
        </section>

        <form onSubmit={handleUpdate}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={developer.name}
            type="text"
          />
          <input
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            placeholder={developer.sex}
            maxLength="1"
          />
          <input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder={developer.age}
            type="number"
          />
          <input
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            placeholder={developer.hobby}
            type="text"
          />
          <input
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            type="text"
            placeholder={developer.dob}
            onFocus={(e) => (e.currentTarget.type = "date")}
            onBlur={(e) => (e.currentTarget.type = "text")}
          />

          <button className="button" type="submit">
            Editar
          </button>
        </form>
      </div>
    </div>
  );
}
