from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Any

# --- IMPORTAÇÃO DO RADIX SORT (Mantenha o arquivo radix_sort.py na mesma pasta) ---
from .radix_sort import RadixSort 

app = FastAPI()

# --- CONFIGURAÇÃO DE CORS ---
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- MODELO DE DADOS ---
class HealthData(BaseModel):
    idade: str
    peso: str
    altura: str
    dieta: str
    sono: str
    agua: str
    user_id: Optional[str] = None 

# Armazenamento em memória
_processed_data_store = []
sorter = RadixSort() # Instância do algoritmo do professor

# --- FUNÇÕES AUXILIARES ---
def calcular_imc(peso_str, altura_str):
    try:
        p = float(peso_str.replace("kg", "").replace(",", "."))
        a = float(altura_str.replace("m", "").replace(",", "."))
        imc = p / (a ** 2)
        return imc
    except:
        return 0.0

def classificar_imc(imc):
    if imc < 18.5: return "Abaixo do peso"
    if imc < 24.9: return "Eutrofia (Peso Normal)"
    if imc < 29.9: return "Sobrepeso"
    return "Obesidade"

@app.post("/analyze")
async def analyze_health(data: HealthData):
    print(f"Gerando laudo para: {data}")

    # Cálculos
    imc = calcular_imc(data.peso, data.altura)
    classificacao = classificar_imc(imc)
    
    try:
        peso_num = float(data.peso.replace("kg", "").replace(",", "."))
        agua_ideal = (peso_num * 35) / 1000
    except:
        agua_ideal = 2.5

    # --- AQUI ESTÁ A MUDANÇA PARA O RELATÓRIO BONITO ---
    # Criamos um objeto separado por seções
    resumo_estruturado = {
        "titulo": "RELATÓRIO DE ANÁLISE CLÍNICA",
        "perfil": f"Paciente de {data.idade} | IMC: {imc:.2f} ({classificacao})",
        "anamnese": (
            f"Paciente relata rotina de sono de {data.sono}h e ingestão hídrica de {data.agua}L "
            f"(Meta: {agua_ideal:.1f}L). Alimentação base: '{data.dieta}'."
        ),
        "avaliacao": (
            f"Índice de Massa Corporal ({imc:.2f}) compatível com quadro de {classificacao}. "
            f"A ingestão de água está {'adequada' if float(data.agua) >= agua_ideal else 'abaixo do recomendado'}."
        ),
        "conclusao": (
            f"Recomenda-se manutenção de hábitos saudáveis e ajuste dietético para otimização metabólica."
        )
    }

    dicas_medicas = [
        f"Ingerir {agua_ideal:.1f}L de água diariamente.",
        "Evitar telas 1h antes de dormir (Higiene do Sono).",
        "Priorizar alimentos in natura e ricos em fibras."
    ]

    resultado = {
        "resumo": resumo_estruturado, # Agora é um objeto rico!
        "dicas": dicas_medicas,
        "status": "Laudo Gerado",
        "dados_originais": data.dict() # Importante para o Radix Sort
    }

    _processed_data_store.append(resultado)
    return resultado

# --- ENDPOINT DO RADIX SORT (Mantido!) ---
@app.get("/history")
async def get_history_sorted():
    if not _processed_data_store:
        return []

    # 1. Extrair idades
    lista_idades = []
    mapa_dados = {}

    for item in _processed_data_store:
        idade_str = item['dados_originais']['idade']
        try:
            idade_int = int(''.join(filter(str.isdigit, idade_str)))
        except:
            idade_int = 0
        
        lista_idades.append(idade_int)
        
        if idade_int not in mapa_dados:
            mapa_dados[idade_int] = []
        mapa_dados[idade_int].append(item)

    # 2. Ordenar usando Radix Sort
    idades_ordenadas = sorter.sort_asc(lista_idades)

    # 3. Reconstruir lista
    historico_ordenado = []
    import copy
    mapa_temp = copy.deepcopy(mapa_dados)

    for idade in idades_ordenadas:
        if idade in mapa_temp and mapa_temp[idade]:
            relatorio = mapa_temp[idade].pop(0)
            historico_ordenado.append(relatorio)

    return historico_ordenado