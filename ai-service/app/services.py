from .schemas import ClinicalRecordResponse, ExtractionRequest

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
