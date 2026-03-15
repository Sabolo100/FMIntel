"""Pydantic schema for article extraction - Onjaro Bike Web."""

from typing import Optional, List, Literal
from pydantic import BaseModel, Field


class ArticleCandidate(BaseModel):
    """Schema for extracted article data.

    Matches the Supabase articles table structure.
    """
    title: str = Field(min_length=5, max_length=200)
    type: Literal["cikk", "edzesterv", "felszereles"]
    style: Literal["orszaguti", "mtb", "ciklokrossz", "altalanos"]
    category: str = Field(min_length=2, max_length=100)
    excerpt: str = Field(min_length=20, max_length=500)
    content: List[str] = Field(min_length=1)
    word_count: Optional[int] = None
    date: Optional[str] = None
    category_color: Optional[str] = None
    badge: Optional[dict] = None
    price_badge: Optional[dict] = None
    featured: bool = False
    recovery_time: Optional[dict] = None
    is_new: bool = True
    intensity_zone: Optional[dict] = None
    age_badge: Optional[dict] = None
    gear_level: Optional[dict] = None
    # Training plan specific
    weeks_duration: Optional[int] = None
    sessions_per_week: Optional[int] = None
    difficulty: Optional[Literal["kezdo", "kozephalado", "halado"]] = None
