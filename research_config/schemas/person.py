"""Pydantic schema for person extraction - FM/PM/AM Intelligence.

Note: Uses 'title' (=person name) and 'content' for validator.py compatibility.
Persistence.yaml maps title->name, content->bio.
"""

from typing import Optional, List, Literal
from pydantic import BaseModel, Field


class PersonCandidate(BaseModel):
    """Schema for extracted person data."""
    title: str = Field(min_length=2, max_length=200)
    content: Optional[List[str]] = None
    current_company_name: Optional[str] = None
    position_title: Optional[str] = None
    position_category: Optional[Literal[
        "ceo", "coo", "cfo", "cto",
        "fm_director", "pm_director", "am_director",
        "fm_manager", "pm_manager", "am_manager",
        "regional_director", "country_manager",
        "head_of_operations", "head_of_technical",
        "board_member", "partner",
        "business_development", "leasing_manager",
        "other"
    ]] = "other"
    previous_company_name: Optional[str] = None
    linkedin_url: Optional[str] = None
    source_url: Optional[str] = None
