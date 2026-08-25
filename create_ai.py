import os

base_path = 'ai-service/app'
files = {
    'schemas.py': '''from pydantic import BaseModel
from typing import List, Optional

class PatientInfo(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None

class VitalsInfo(BaseModel):
    temperature: Optional[float] = None
    bloodPressure: Optional[str] = None
    heartRate: Optional[int] = None
    spo2: Optional[int] = None
    respiratoryRate: Optional[int] = None

class ClinicalRecordResponse(BaseModel):
    patient: PatientInfo
    chiefComplaint: Optional[str] = None
    symptoms: List[str] = []
    symptomDuration: Optional[str] = None
    vitals: VitalsInfo
    medicalHistory: List[str] = []
    currentMedications: List[str] = []
    allergies: List[str] = []
    observations: List[str] = []
    missingInformation: List[str] = []
    extractionWarnings: List[str] = []

class TranscriptionRequest(BaseModel):
    audio_b64: str
    language: str = "en"

class ExtractionRequest(BaseModel):
    text: str
''',
    'services.py': '''from .schemas import ClinicalRecordResponse, ExtractionRequest

def extract_clinical_info(text: str) -> ClinicalRecordResponse:
    # MOCK LLM EXTRACTION FOR DEMO
    # In a real app, this uses google-genai or openai API
    import json
    
    # Very basic naive extraction for demo
    resp = ClinicalRecordResponse(
        patient={"name": "Ravi Kumar", "age": 42, "gender": "Male"},
        chiefComplaint="Fever",
        symptoms=["Headache", "Body pain"],
        symptomDuration="3 days",
        vitals={"temperature": 101.2, "bloodPressure": "130/85", "heartRate": 78},
        missingInformation=["Respiratory Rate", "SpO2"]
    )
    return resp

def transcribe_audio(audio_bytes: bytes, language: str) -> str:
    # MOCK WHISPER TRANSCRIPTION FOR DEMO
    return "Ravi Kumar is 42 years old. He has had fever for three days with headache and body pain. His temperature is 101.2 degrees Fahrenheit and his blood pressure is 130 over 85. No vomiting."
''',
    'main.py': '''from fastapi import FastAPI, HTTPException, UploadFile, File
from .schemas import TranscriptionRequest, ExtractionRequest, ClinicalRecordResponse
from .services import extract_clinical_info, transcribe_audio

app = FastAPI(title='CareScribe AI Service')

@app.get('/health')
def health():
    return {'status': 'ok'}

@app.post('/api/ai/transcribe')
async def transcribe(file: UploadFile = File(...)):
    try:
        content = await file.read()
        text = transcribe_audio(content, "en")
        return {"text": text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/api/ai/extract', response_model=ClinicalRecordResponse)
def extract_clinical(req: ExtractionRequest):
    try:
        return extract_clinical_info(req.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
'''
}

for filename, content in files.items():
    with open(os.path.join(base_path, filename), 'w') as f:
        f.write(content)

print("AI setup done.")
