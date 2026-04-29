from typing import Optional
from datetime import datetime
from uuid import UUID, uuid4
from sqlalchemy import ForeignKey, String, DateTime, UUID, Uuid, LargeBinary
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import func

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = 'users'

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    login: Mapped[str] = mapped_column(String(30), unique=True, index=True)
    password: Mapped[str] = mapped_column(String(60))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    projects: Mapped[list["Project"]] = relationship(back_populates="user")

class Project(Base):
    __tablename__ = 'projects'
    
    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(30))
    description: Mapped[Optional[str]] = mapped_column(String(200))
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    
    user_id: Mapped[UUID] = mapped_column(ForeignKey("users.id"))
    user: Mapped["User"] = relationship(back_populates="projects")
    
    items: Mapped[list["ProjectItem"]] = relationship(back_populates="project", cascade="all, delete-orphan")


class ProjectItem(Base):
    __tablename__ = 'project_items'
    
    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    x: Mapped[float] = mapped_column()
    y: Mapped[float] = mapped_column()
    z: Mapped[float] = mapped_column()
    scale: Mapped[float] = mapped_column()
    rotation: Mapped[float] = mapped_column()
    
    project_id: Mapped[UUID] = mapped_column(ForeignKey("projects.id"))
    project: Mapped["Project"] = relationship(back_populates="items")

    furniture_id: Mapped[UUID] = mapped_column(ForeignKey('furniture.id'))
    furniture: Mapped["Furniture"] = relationship(back_populates="project_items")

class Furniture(Base):
    __tablename__ = "furniture"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String())
    description: Mapped[Optional[str]] = mapped_column(String)
    file_size: Mapped[int] = mapped_column()
    file_url: Mapped[str] = mapped_column(String)
    preview: Mapped[Optional[bytes]] = mapped_column(LargeBinary, nullable=True)

    category_id: Mapped[UUID] = mapped_column(ForeignKey("furniture_categories.id"))
    category: Mapped["FurnitureCategories"] = relationship(back_populates="furniture")

    project_items: Mapped[list["ProjectItem"]] = relationship(back_populates="furniture")


class FurnitureCategories(Base):
    __tablename__ = "furniture_categories"

    id: Mapped[UUID] = mapped_column(Uuid, primary_key=True, default=uuid4)
    name: Mapped[str] = mapped_column(String(60))

    furniture: Mapped[list["Furniture"]] = relationship(back_populates="category")