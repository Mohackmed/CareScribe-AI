from pydantic import BaseModel
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
