import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './reportpage.css';

const ReportPage = () => {
    const location = useLocation();

    const { formData, aiResult } = location.state || {};
    const [history, setHistory] = useState([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const [historyLoaded, setHistoryLoaded] = useState(false);

    // Função do Radix Sort (Botão)
    const handleOrdenarHistorico = async () => {
        setIsLoadingHistory(true);
        try {
            const response = await fetch('http://127.0.0.1:8000/history');
            const data = await response.json();
            setHistory(data);
            setHistoryLoaded(true);
        } catch (error) {
            console.error("Erro ao buscar histórico:", error);
            alert("Erro ao conectar com o algoritmo de ordenação.");
        } finally {
            setIsLoadingHistory(false);
        }
    };

    if (!aiResult || !formData) {
        return (
            <div className="report-container-error">
                <h2>Nenhum relatório encontrado.</h2>
                <p>Por favor, preencha o formulário na página inicial primeiro.</p>
                <Link to="/home">Ir para Home</Link>
            </div>
        );
    }

    return (
        <div className="report-container">
            <Link to="/home" className="back-button">← Voltar ao Início</Link>

            {/* --- CABEÇALHO DO RELATÓRIO --- */}
            <div className="report-card full-width" style={{ marginTop: '20px', textAlign: 'center', borderLeft: '5px solid #05c6e1' }}>
                <h1 className="report-title" style={{ marginBottom: '10px' }}>{aiResult.resumo.titulo}</h1>
                <p style={{ fontSize: '1.2rem', color: '#c7a7ff' }}>
                    <strong>{aiResult.resumo.perfil}</strong>
                </p>
            </div>

            <div className="report-grid">

                {/* --- SEÇÃO DO LAUDO DETALHADO (NOVO VISUAL) --- */}
                <div className="report-card full-width ai-section">

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ color: '#fff', borderBottom: '1px solid #05c6e1', paddingBottom: '5px' }}>
                            1. Anamnese e Hábitos
                        </h3>
                        <p>{aiResult.resumo.anamnese}</p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ color: '#fff', borderBottom: '1px solid #05c6e1', paddingBottom: '5px' }}>
                            2. Avaliação Antropométrica
                        </h3>
                        <p>{aiResult.resumo.avaliacao}</p>
                    </div>

                    <div>
                        <h3 style={{ color: '#fff', borderBottom: '1px solid #05c6e1', paddingBottom: '5px' }}>
                            3. Conclusão Médica
                        </h3>
                        <p style={{ fontWeight: 'bold', color: '#fff' }}>{aiResult.resumo.conclusao}</p>
                    </div>

                </div>

                {/* --- RECOMENDAÇÕES --- */}
                <div className="report-card">
                    <h3>💡 Plano Terapêutico</h3>
                    {aiResult.dicas && aiResult.dicas.length > 0 ? (
                        <ul style={{ paddingLeft: '20px' }}>
                            {aiResult.dicas.map((dica, index) => (
                                <li key={index} style={{ marginBottom: '10px' }}>✅ {dica}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>Sem recomendações específicas.</p>
                    )}
                </div>

                {/* --- DADOS INFORMADOS --- */}
                <div className="report-card">
                    <h3>📊 Dados Vitais</h3>
                    <p><strong>Altura:</strong> {formData.altura}</p>
                    <p><strong>Sono:</strong> {formData.sono}h</p>
                    <p><strong>Água:</strong> {formData.agua}L</p>
                </div>
            </div>

            {/* --- SEÇÃO DO RADIX SORT (MANTIDA) --- */}
            <div style={{ marginTop: '50px', borderTop: '2px solid #05c6e1', paddingTop: '30px', textAlign: 'center' }}>
                <h2 style={{ color: '#05c6e1', marginBottom: '10px' }}>
                    📚 Banco de Dados de Pacientes
                </h2>
                <p style={{ color: '#ccc', marginBottom: '20px' }}>
                    Utilize o algoritmo abaixo para organizar a fila de atendimento por idade.
                </p>

                {!historyLoaded && (
                    <button
                        onClick={handleOrdenarHistorico}
                        disabled={isLoadingHistory}
                        style={{
                            backgroundColor: '#0986b2',
                            color: 'white',
                            border: 'none',
                            padding: '15px 30px',
                            fontSize: '1.1rem',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 15px #0986b2aa',
                            transition: 'transform 0.2s'
                        }}
                    >
                        {isLoadingHistory ? 'Ordenando...' : '🔄 Executar Radix Sort (Ordenar por Idade)'}
                    </button>
                )}

                <div className="report-grid" style={{ marginTop: '30px' }}>
                    {history.length > 0 && (
                        history.map((item, index) => (
                            <div key={index} className="report-card" style={{ background: '#252538', animation: 'fadeIn 0.5s' }}>
                                <div style={{
                                    background: '#05c6e1', color: 'white', width: '30px', height: '30px',
                                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    margin: '0 auto 10px auto', fontWeight: 'bold'
                                }}>
                                    {index + 1}º
                                </div>
                                <h3 style={{ fontSize: '1.1rem', color: '#fff' }}>
                                    Idade: {item.dados_originais.idade}
                                </h3>
                                <p style={{ fontSize: '0.9rem' }}>
                                    <strong>Paciente:</strong> {item.resumo.perfil}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportPage;