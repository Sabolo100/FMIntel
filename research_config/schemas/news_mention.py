"""Pydantic schema for news mention extraction - FM/PM/AM Intelligence.

Note: Uses 'content' field for validator.py compatibility (mapped to summary).
'title' already matches validator expectations.
"""

from typing import Optional, List, Literal
from pydantic import BaseModel, Field


class NewsMentionCandidate(BaseModel):
    """Schema for extracted news mention data."""
    title: str = Field(min_length=5, max_length=300)
    content: Optional[List[str]] = None
    url: str = ""
    source_domain: Optional[str] = None
    published_at: Optional[str] = None
    entity_type: Literal["company", "building", "person"] = "company"
    entity_name: str = ""
    sentiment: Optional[Literal["positive", "negative", "neutral"]] = "neutral"
