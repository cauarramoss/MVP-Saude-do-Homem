import "./landingpage.css";
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="landingContainer">
            <header className="landingHeader">
                <h1 className="mainTitle">Vida+</h1>
                <h2 >Seu Bem-Estar, Analisado pela IA.</h2>
                <p className="subtitle">
                    Monitore seu sono, hidratação e alimentação para receber relatórios personalizados
                    e recomendações inteligentes para uma vida mais saudável.
                </p>
            </header>

            <main className="landingMain">
                <div className="featureGrid">
                    <div className="featureCard">
                        <h3>✨ Monitoramento Fácil</h3>
                        <p>Registre seus dados diários de forma rápida.</p>
                    </div>
                    <div className="featureCard">
                        <h3>🧠 Análise Inteligente</h3>
                        <p>Nossa IA transforma seus dados em insights valiosos e recomendações acionáveis.</p>
                    </div>
                    <div className="featureCard">
                        <h3>📈 Progresso Visual</h3>
                        <p>Acompanhe sua evolução ao longo do tempo e veja os resultados do seu esforço.</p>
                    </div>
                </div>

                <div className="callToAction">
                    <p>Pronto para começar sua jornada rumo a uma vida mais equilibrada?</p>
                    <Link to="/register" className="startButton">
                        Comece Agora!
                    </Link>
                </div>

            </main>

            <footer className="landingFooter">
                <p>&copy; {new Date().getFullYear()} Meu App de Saúde. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
