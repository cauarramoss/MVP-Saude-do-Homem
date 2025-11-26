import {useEffect, useState} from "react";
import "./homepage.css"
import { Link, useNavigate } from "react-router-dom";
import logoImg from '../../assets/logo.png';

function Home() {
    const [inputValueIdade, setInputValueIdade] = useState("");
    const [inputValuePeso, setInputValuePeso] = useState("");
    const [inputValueAltura, setInputValueAltura] = useState("");
    const [inputValueDieta, setInputValueDieta] = useState("");
    const [inputValueSono, setInputValueSono] = useState("");
    const [inputValueAgua, setInputValueAgua] = useState("");
    const [userName, setUserName] = useState("");
    
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleGerarRelatorio = async () => {
        setIsLoading(true);

        const dadosDoFormulario = {
            idade: inputValueIdade,
            peso: inputValuePeso,
            altura: inputValueAltura,
            dieta: inputValueDieta,
            sono: inputValueSono,
            agua: inputValueAgua
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosDoFormulario)
            });

            const resultadoDaIA = await response.json();

            navigate('/report', {
                state: {
                    formData: dadosDoFormulario,
                    aiResult: resultadoDaIA
                }
            });
        } catch (error) {
            console.error('Erro ao chamar a IA:', error);
            alert("Desculpe, não foi possível gerar o seu relatório.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData) {
            setUserName(userData.username);
        }
    }, []);



    return (
        <div className="home">
            <header className="hp-header">
                <img src={logoImg} alt="logo vida+" />
                <div>
                    <span>Olá, {userName || 'Visitante'} </span>
                    <Link to="/register" className="logout-button">
                    Sair
                    </Link>
                </div>
            </header>

            <div className="content-wrapper">
                <main className="hp-main">
                    <div className="boas-vindas">
                        <h2>Bem-vindo à Vida+</h2>
                        <p>Seu portal para uma vida mais saudável e equilibrada.</p>
                    </div>
                    <div className="cards-container">
                        <div className="imc">
                            <label htmlFor="info">👴 Primeiro de tudo, nos informe sua idade:</label>
                            <textarea
                            id="info"
                            value={inputValueIdade}
                            onChange={(e) => setInputValueIdade(e.target.value)}
                            placeholder="Exemplo: 25 anos"
                            rows="2"
                            />
                        </div>
                
                        <div className="imc">
                            <label htmlFor="info">💪 Informe seu peso:</label>
                            <textarea
                            id="info"
                            value={inputValuePeso}
                            onChange={(e) => setInputValuePeso(e.target.value)}
                            placeholder="Exemplo: 70kg"
                            rows="2"
                            />
                        </div>

                        <div className="imc">
                            <label htmlFor="info">📏 Informe sua altura:</label>
                            <textarea
                            id="info"
                            value={inputValueAltura}
                            onChange={(e) => setInputValueAltura(e.target.value)}
                            placeholder="Exemplo: 1.75m"
                            rows="2"
                            />
                        </div>

                        <div className="alimentacao">
                            <label htmlFor="dieta"> 🥗 O que você geralmente come durante a semana?</label>
                            <textarea
                            id="dieta"
                            value={inputValueDieta}
                            onChange={(e) => setInputValueDieta(e.target.value)}
                            placeholder="Ex:Café da manhã: pão com queijo. Almoço: arroz, feijão e frango. Jantar: sopa de legumes."
                            rows="4"
                            />
                        </div>
                
                        <div className="sono">
                            <label htmlFor="sono-info">😴 Quantas horas você dorme por noite, em média?</label>
                            <input
                            type="number"
                            id="sono-info"
                            value={inputValueSono}
                            onChange={(e) => setInputValueSono(e.target.value)}
                            placeholder="Ex: 7"
                            />
                        </div>
                
                        <div className="hidratacao">
                            <label htmlFor="agua-info"> 💧 Quantos litros de água você bebe por dia, em média?</label>
                            <input
                            type="number"
                            id="agua-info"
                            value={inputValueAgua}
                            onChange={(e) => setInputValueAgua(e.target.value)}
                            placeholder="Ex: 2"
                            step="0.1"
                            />
                        </div>
                    </div>
                    <br />
                    <button className="IA-button" onClick={handleGerarRelatorio} disabled={isLoading}>
                        {isLoading ? 'Gerando Relatório...' : 'Gerar Relatório com IA'}
                    </button>
                </main>
            </div>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()} Vida+. Todos os direitos reservados.</p>
            </footer>
        </div>
    )
}

export default Home;