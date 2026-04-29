from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
def read_root():
    return {"status": "ok"}