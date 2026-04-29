from typing import Optional, List
from uuid import UUID, uuid4
from pydantic import BaseModel, Field, ConfigDict


# Схемы для пользователя
class UserBase(BaseModel):
    login: str

class UserCreate(UserBase):
    login: str
    password: str

class UserResponse(UserBase):
    id: UUID

    model_config = ConfigDict(from_attributes=True)


# Схемы для проектов
class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    user_id: UUID
    items: List[UUID] = Field(default_factory=list)

class ProjectResponse(ProjectBase):
    id: UUID
    user_id: UUID
    items: List[UUID] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)


# Схемы для мебели
class FurnitureResponse(BaseModel):
    id: UUID
    name: str
    category_id: UUID
    file_size: int
    file_url: str

class CategoryResponse(BaseModel):
    id: UUID
    name: str

    model_config = ConfigDict(from_attributes=True)