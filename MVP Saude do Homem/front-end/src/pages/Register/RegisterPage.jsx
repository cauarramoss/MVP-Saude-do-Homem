import './registerpage.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/auth';
import { login } from '../../services/auth';

function Register() {
    const [inputValueName, setInputValueName] = useState('');
    const [inputValueEmail, setInputValueEmail] = useState('');
    const [inputValuePassword, setInputValuePassword] = useState('');
    const [inputValueUsername, setInputValueUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Validações
    const validateName = (name) => {
        return name.length >= 3; 
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (pwd) => {
        return pwd.length >= 8;
    };

    const handleInputChangeName = (event) => {
        setInputValueName(event.target.value);
        setError('');
    };

    const handleInputChangeEmail = (event) => {
        setInputValueEmail(event.target.value);
        setError('');
    };


    const handleInputChangeUsername = (event) => {
        setInputValueUsername(event.target.value);
        setError('');
    };

    const handleInputChangePassword = (event) => {
        setInputValuePassword(event.target.value);
        setError('');
    };


    const validateUsername = (username) => {
        const re = /^[a-zA-Z0-9_]{3,20}$/;
        return re.test(username);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!validateName(inputValueName)) {
            setError('Nome deve ter pelo menos 3 caracteres');
            return;
        }

        if (!validateEmail(inputValueEmail)) {
            setError('Por favor, insira um email válido');
            return;
        }

        if (!validateUsername(inputValueUsername)) {
            setError('Usuário deve ter entre 3 e 20 caracteres, sem espaços ou caracteres especiais.');
            return;
        }

        if (!validatePassword(inputValuePassword)) {
            setError('Senha deve ter pelo menos 8 caracteres');
            return;
        }

        setLoading(true);

        try {
            const created = await registerUser({
                name: inputValueName,
                email: inputValueEmail,
                username: inputValueUsername,
                password: inputValuePassword,
            });
            const auth = await login(inputValueEmail, inputValuePassword);
            localStorage.setItem('user', JSON.stringify({
                name: inputValueName,
                email: inputValueEmail,
                username: inputValueUsername,
                access_token: auth.access_token,
            }));
            navigate('/home');
        } catch (error) {
            let msg = 'Erro ao conectar ao servidor. Tente novamente mais tarde.';
            if (error.response && error.response.data) {
                if (typeof error.response.data === 'string') {
                    msg = error.response.data;
                } else if (error.response.data.message) {
                    msg = Array.isArray(error.response.data.message)
                        ? error.response.data.message.join(' | ')
                        : error.response.data.message;
                }
            }
            // Checa erro de duplicidade de username
            if (
                (error.response && error.response.data && typeof error.response.data === 'object' &&
                (error.response.data.message?.includes('UNIQUE constraint failed: users.username') ||
                error.response.data.message?.includes('username') && error.response.data.message?.includes('unique')))
            ) {
                msg = 'Nome de usuário já está em uso. Escolha outro.';
            }
            setError(msg);
            console.error('Erro ao cadastrar:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="all">
            <h1 className='logo'>Vida+</h1>
            <span>Um novo olhar na sua rotina!</span>
            <form onSubmit={handleSubmit} className="form-register">
                <h1>Faça o seu cadastro</h1>

                {error && <div className="error-message">{error}</div>}

                <input
                    type="text"
                    value={inputValueName}
                    onChange={handleInputChangeName}
                    placeholder="Nome completo"
                    name='nome'
                    required
                    disabled={loading}
                />
                <input
                    type="email"
                    value={inputValueEmail}
                    onChange={handleInputChangeEmail}
                    placeholder="E-mail"
                    name='email'
                    required
                    disabled={loading}
                />

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
                    className="register-button" 
                    type='submit'
                    disabled={loading}
                >
                    {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>

                <Link to='/login' className='link-log'>
                    Já possui uma conta? Faça o login!
                </Link>
            </form>
        </div>
    );
}

export default Register;