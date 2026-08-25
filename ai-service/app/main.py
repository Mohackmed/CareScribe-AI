from fastapi import FastAPI, HTTPException, UploadFile, File
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
