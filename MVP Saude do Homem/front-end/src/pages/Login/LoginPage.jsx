import './loginpage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';

function Login() {
    const [inputValueUsername, setInputValueUsername] = useState('');
    const [inputValuePassword, setInputValuePassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Validação do username: obrigatório, mínimo 3, máximo 20, sem espaços
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (pwd) => {
        return pwd.length >= 8;
    };

    const handleInputChangeUsername = (event) => {
        setInputValueUsername(event.target.value);
        setError('');
    };

    const handleInputChangePassword = (event) => {
        setInputValuePassword(event.target.value);
        setError('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!validateEmail(inputValueUsername)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }

        if (!validatePassword(inputValuePassword)) {
            setError('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        setLoading(true);

        try {
            const data = await login(inputValueUsername, inputValuePassword);
            localStorage.setItem('user', JSON.stringify({
                name: data.name,           // O Back-end agora manda o nome real
                username: data.username,   // O Back-end agora manda o usuário correto (VinizinhoDoGrau)
                email: data.email,
                access_token: data.access_token
            }));
            navigate('/home');
        } catch (error) {
            setError('Erro ao conectar ao servidor. Tente novamente mais tarde.');
            console.error('Erro ao fazer login:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="all">
            <h1 className='logo'>Vida+</h1>
            <span>Um novo olhar na sua rotina!</span>
            <form onSubmit={handleSubmit} className="form-login">
                <h1>Entre em sua conta</h1>

                {error && <div className="error-message">{error}</div>}

                <input
                    type="text"
                    value={inputValueUsername}
                    onChange={handleInputChangeUsername}
                    placeholder="Usuário"
                    name='username'
                    required
                    disabled={loading}
                />
                <input
                    type="password"
                    value={inputValuePassword}
                    onChange={handleInputChangePassword}
                    placeholder="Senha"
                    name='password'
                    required
                    disabled={loading}
                />

                <button
                    className="login-button"
                    type='submit'
                    disabled={loading}
                >
                    {loading ? 'Carregando...' : 'Entrar'}
                </button>

                <Link to='/register' className='link-reg'>
                    Não tem uma conta? Cadastre-se!
                </Link>
            </form>
        </div>
    );
}

export default Login;