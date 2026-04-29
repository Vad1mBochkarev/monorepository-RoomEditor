from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.core.database import get_db
from app.api.dtos import ProjectResponse, ProjectCreate
from app.models import Project, ProjectItem

router = APIRouter()

# получить все проекты пользователя
@router.get("/projects")
def get_projects(user_id: UUID, db: Session = Depends(get_db)) -> list[ProjectResponse]:
    # Выполняем запрос к БД: получаем все проекты конкретного пользователя
    projects = db.query(Project).filter(Project.user_id == user_id).all()
    # Преобразуем результат в список Pydantic моделей для ответа
    return [ProjectResponse(
        id=proj.id,
        name=proj.name,
        description=proj.description,
        user_id=proj.user_id,
        items=[item.id for item in proj.items]
    ) for proj in projects]

# создать проект
@router.post("/projects/create")
def create_project(data: ProjectCreate, db: Session = Depends(get_db)) -> ProjectResponse:
    # Создаем новый объект проекта с данными из запроса
    new_project = Project(
        name=data.name,
        description=data.description,
        user_id=data.user_id
    )

    # Добавляем проект в БД
    db.add(new_project)
    # Сохраняем изменения
    db.commit()
    # Обновляем объект новыми данными из БД
    db.refresh(new_project)

    # Возвращаем созданный проект (Pydantic схема ProjectResponse)
    return ProjectResponse(
        id=new_project.id,
        name=new_project.name,
        description=new_project.description,
        user_id=new_project.user_id,
        items=[]
    )

# изменить проект (название, описание)
@router.patch("/projects/{id}")
def update_project(id: UUID, data: ProjectCreate, db: Session = Depends(get_db)) -> ProjectResponse:
    # Выполняем запрос к БД: ищем проект по ID
    project = db.query(Project).filter(Project.id == id).first()

    # Если проект не найден — выбрасываем 404 ошибку
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    # Обновляем название и описание проекта
    project.name = data.name
    project.description = data.description
    # Сохраняем изменения
    db.commit()
    # Обновляем объект новыми данными из БД
    db.refresh(project)
    
    # Возвращаем обновленный проект (Pydantic схема ProjectResponse)
    return ProjectResponse(
        id=project.id,
        name=project.name,
        description=project.description,
        user_id=project.user_id,
        items=[item.id for item in project.items]
    )

# удалить проект
@router.delete("/projects/{id}")
def delete_project(id: UUID, db: Session = Depends(get_db)):
    # Выполняем запрос к БД: ищем проект по ID
    project = db.query(Project).filter(Project.id == id).first()

    # Если проект не найден — выбрасываем 404 ошибку
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        
    # Удаляем проект из БД
    db.delete(project)
    # Сохраняем изменения
    db.commit()
    
    # Возвращаем сообщение об успешном удалении
    return {"message": "Project deleted successfully"}