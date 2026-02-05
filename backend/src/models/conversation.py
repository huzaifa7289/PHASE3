from __future__ import annotations
from sqlmodel import SQLModel, Field, Relationship, Column
from sqlalchemy import JSON
from datetime import datetime
from typing import Optional, Any
from uuid import UUID, uuid4
from enum import Enum


class MessageRole(str, Enum):
    USER = "user"
    ASSISTANT = "assistant"


class Conversation(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)

    user_id: UUID = Field(nullable=False, index=True, foreign_key="user.id")

    title: Optional[str] = Field(default=None, max_length=255)

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    messages: list["Message"] = Relationship(
        back_populates="conversation",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )


class Message(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)

    conversation_id: UUID = Field(
        nullable=False,
        index=True,
        foreign_key="conversation.id",
    )

    user_id: UUID = Field(
        nullable=False,
        index=True,
        foreign_key="user.id",
    )

    role: MessageRole = Field(nullable=False)

    content: str = Field(nullable=False, max_length=50000)

    # ✅ SQLite-compatible JSON
    tool_calls: Optional[dict[str, Any]] = Field(
        default=None,
        sa_column=Column(JSON),
    )

    created_at: datetime = Field(default_factory=datetime.utcnow)

    conversation: Optional[Conversation] = Relationship(back_populates="messages")
