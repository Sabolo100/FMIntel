"""Pydantic schema for news mention extraction - FM/PM/AM Intelligence."""

from typing import Optional, Literal
from pydantic import BaseModel, Field


class NewsMentionCandidate(BaseModel):
    """Schema for extracted news mention data."""
    title: str = Field(min_length=5, max_length=300)
    url: str
    source_domain: Optional[str] = None
    published_at: Optional[str] = None
    summary: Optional[str] = None
    entity_type: Literal["company", "building", "person"]
    entity_name: str
    sentiment: Optional[Literal["positive", "negative", "neutral"]] = "neutral"
