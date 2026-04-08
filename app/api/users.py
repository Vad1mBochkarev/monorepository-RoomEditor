from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from app.api.dtos import UserCreate, UserResponse, UserBase
from app.models import User
from app.core.database import get_db

router = APIRouter()


# вход пользователя
@router.post("/auth/login")
def login_user(data: UserBase, db: Session = Depends(get_db)) -> UserResponse:
    # Выполняем запрос к БД: ищем пользователя по логину
    user = db.query(User).filter(User.login == data.login).first()
    #  Если пользователь не найден — выбрасываем 401 ошибку
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный логин или пароль"
        )
    
    #  Возвращаем объект пользователя (Pydantic схема UserResponse отфильтрует лишнее, например, пароль)
    return UserResponse(id=user.id, login=user.login)


# регистрация нового пользователя (исправлена опечатка в слове регистрация)
@router.post("/auth/register")
def register_user(data: UserCreate, db: Session = Depends(get_db)) -> UserResponse:
    # Выполняем запрос к БД: проверяем, есть ли пользователь с таким логином
    existing_user = db.query(User).filter(User.login == data.login).first()
    # Если пользователь уже существует — выбрасываем 400 ошибку
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким логином уже существует"
        )
    
    # Создаем нового пользователя с данными из запроса
    new_user = User(login=data.login, password=data.password)

    # Добавляем пользователя в БД
    db.add(new_user)
    # Сохраняем изменения
    db.commit()
    # Обновляем объект новыми данными из БД
    db.refresh(new_user)

    # Возвращаем созданного пользователя (Pydantic схема UserResponse)
    return UserResponse(id=new_user.id, login=new_user.login)


# # получить данные текущего пользователя
# @router.get("/users/me")
# def get_user() -> UserResponse:
#     ...








