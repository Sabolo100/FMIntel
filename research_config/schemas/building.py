"""Pydantic schema for building extraction - FM/PM/AM Intelligence."""

from typing import Optional, List, Literal
from pydantic import BaseModel, Field


class BuildingCandidate(BaseModel):
    """Schema for extracted building data."""
    name: str = Field(min_length=2, max_length=300)
    name_aliases: List[str] = []
    building_type: Literal["iroda", "raktar", "logisztikai", "vegyes"] = "iroda"
    building_class: Optional[Literal["A+", "A", "B+", "B", "C"]] = None
    status: Literal[
        "mukodo", "fejlesztes_alatt", "tervezett", "felujitas_alatt", "ures"
    ] = "mukodo"
    address: Optional[str] = None
    city: str = "Budapest"
    district: Optional[str] = None
    zip_code: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    total_area_sqm: Optional[int] = None
    leasable_area_sqm: Optional[int] = None
    floors: Optional[int] = None
    year_built: Optional[int] = None
    year_renovated: Optional[int] = None
    owner_company_name: Optional[str] = None
    developer_company_name: Optional[str] = None
    description: Optional[str] = None
    source_url: Optional[str] = None
