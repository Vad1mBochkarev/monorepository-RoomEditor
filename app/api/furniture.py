from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session
from uuid import UUID, uuid4

from app.models import Furniture, FurnitureCategories
from app.api.dtos import FurnitureResponse,  CategoryResponse
from app.core.database import get_db

router = APIRouter()

# получить категории мебели
@router.get("/categories")
def get_categories(db: Session = Depends(get_db)) -> list[CategoryResponse]:
    # Выполняем запрос к БД: получаем все категории мебели
    categories = db.query(FurnitureCategories).all()
    # Преобразуем результат в список Pydantic моделей для ответа
    return [CategoryResponse(id=cat.id, name=cat.name) for cat in categories]

# получить всю мебель
@router.get("/furniture")
def get_all_furniture(data: FurnitureResponse, db: Session = Depends(get_db)) -> list[FurnitureResponse]:
    # Выполняем запрос к БД: получаем мебель по ID из запроса
    furniture = db.query(Furniture).filter(Furniture.id == data.id).first()
    # Возвращаем найденную мебель
    return furniture

# получить мебель по айди
@router.get("/furniture/{id}")
def get_furniture_by_id(id: UUID, db: Session = Depends(get_db)) -> FurnitureResponse:
    # Выполняем запрос к БД: ищем мебель по ID
    furniture = db.query(Furniture).filter(Furniture.id == id).first()
    # Если мебель не найдена — выбрасываем 404 ошибку
    if not furniture:
        raise HTTPException(status_code=404, detail="Мебель не найдена")
    # Возвращаем объект мебели (Pydantic схема FurnitureResponse)
    return FurnitureResponse(
        id=furniture.id,
        name=furniture.name,
        category_id=furniture.category_id,
        file_size=furniture.file_size,
        file_url=furniture.file_url
    )