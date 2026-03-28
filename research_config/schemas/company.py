"""Pydantic schema for company extraction - FM/PM/AM Intelligence.

Note: Uses 'title' and 'content' field names for compatibility with the
validator.py business rules (which hardcodes checks for these fields).
The persistence.yaml mapping converts title->name and content->description.
"""

from typing import Optional, List, Literal
from pydantic import BaseModel, Field


class CompanyCandidate(BaseModel):
    """Schema for extracted company data."""
    title: str = Field(min_length=2, max_length=200)
    content: Optional[List[str]] = None
    name_aliases: List[str] = []
    service_types: List[Literal["fm", "pm", "am"]] = []
    website: Optional[str] = None
    headquarters_city: Optional[str] = None
    headquarters_address: Optional[str] = None
    founded_year: Optional[int] = None
    employee_count_estimate: Optional[int] = None
    is_international: bool = False
    parent_company_name: Optional[str] = None
    status: str = "active"
    source_url: Optional[str] = None
