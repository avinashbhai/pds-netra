"""
API package for PDS Netra backend.

This package aggregates all API routers to be included in the FastAPI
application. The API is versioned under ``/api/v1``.
"""

from fastapi import APIRouter

from .v1.events import router as events_router
from .v1.reports import router as reports_router


api_router = APIRouter()
api_router.include_router(events_router)
api_router.include_router(reports_router)
