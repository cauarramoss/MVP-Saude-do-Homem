from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any, List, Optional
import uvicorn
import random

# Initialize FastAPI
app = FastAPI(title="Health AI Service", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class FoodItem(BaseModel):
    name: str
    calories: float
    protein: float
    carbs: float
    fat: float

class HealthData(BaseModel):
    age: int
    weight: float
    height: float
    gender: str
    activity_level: str
    symptoms: List[str] = []
    goals: List[str] = []
    consumed_foods: List[FoodItem] = []
    calculated_metrics: Dict[str, Any] = {} # bmi, water, bmr, tdee

class AnalysisResult(BaseModel):
    nutritional_summary: str
    health_risks: List[str]
    recommendations: List[str]
    dietary_suggestions: List[str]
    score: int

# --- LangChain / AI Logic (Mocked) ---

def process_with_langchain(data: HealthData) -> AnalysisResult:
    """
    Simulates a LangChain processing pipeline for a comprehensive report.
    """
    # 1. Analyze Nutrition
    total_cals = sum(f.calories for f in data.consumed_foods)
    total_protein = sum(f.protein for f in data.consumed_foods)
    target_cals = data.calculated_metrics.get("tdee", 2000)
    
    cal_diff = total_cals - target_cals
    
    nutritional_summary = (
        f"You have consumed {total_cals:.0f} kcal, which is "
        f"{'above' if cal_diff > 0 else 'below'} your target of {target_cals} kcal. "
        f"Protein intake is {total_protein:.1f}g."
    )

    # 2. Identify Risks
    risks = []
    bmi = data.calculated_metrics.get("bmi", 0)
    if bmi > 25:
        risks.append("BMI indicates overweight category.")
    elif bmi < 18.5:
        risks.append("BMI indicates underweight category.")
    
    if total_cals > target_cals * 1.2:
        risks.append("Caloric surplus may lead to weight gain.")
    
    if "stress" in data.symptoms:
        risks.append("High stress levels reported.")

    # 3. Recommendations
    recommendations = [
        f"Drink at least {data.calculated_metrics.get('water', 2000)}ml of water daily.",
        "Aim for 7-8 hours of sleep."
    ]
    if "sedentary" in data.activity_level:
        recommendations.append("Try to incorporate 30 mins of walking daily.")
    
    # 4. Dietary Suggestions
    suggestions = []
    if total_protein < (data.weight * 1.6):
        suggestions.append("Increase protein intake (chicken, fish, tofu).")
    if cal_diff > 0:
        suggestions.append("Reduce portion sizes or limit high-sugar foods.")
    else:
        suggestions.append("Ensure you are eating enough to fuel your body.")

    score = max(0, 100 - (len(risks) * 10))

    return AnalysisResult(
        nutritional_summary=nutritional_summary,
        health_risks=risks,
        recommendations=recommendations,
        dietary_suggestions=suggestions,
        score=int(score)
    )

# --- Endpoints ---

@app.get("/")
def read_root():
    return {"status": "online", "service": "Health AI v2"}

@app.post("/analyze", response_model=AnalysisResult)
def analyze_health(data: HealthData):
    try:
        result = process_with_langchain(data)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("src.main:app", host="0.0.0.0", port=8000, reload=True)
