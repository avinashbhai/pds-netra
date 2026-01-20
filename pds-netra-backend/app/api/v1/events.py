"""
API endpoints for accessing raw events and alerts.

This module defines HTTP routes for listing events and alerts and
retrieving alert details. It uses FastAPI and SQLAlchemy sessions.
"""

from __future__ import annotations

from typing import List, Optional
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from ..core.db import get_db
from ..models.event import Event, Alert, AlertEventLink
from ..schemas.event import EventOut
from ..schemas.alert import AlertOut


router = APIRouter(prefix="/api/v1", tags=["events", "alerts"])


@router.get("/events", response_model=List[EventOut])
def list_events(
    godown_id: Optional[str] = Query(None),
    event_type: Optional[str] = Query(None),
    start_time: Optional[datetime] = Query(None),
    end_time: Optional[datetime] = Query(None),
    db: Session = Depends(get_db),
) -> List[EventOut]:
    """List raw events with optional filters."""
    query = db.query(Event)
    if godown_id:
        query = query.filter(Event.godown_id == godown_id)
    if event_type:
        query = query.filter(Event.event_type == event_type)
    if start_time:
        query = query.filter(Event.timestamp_utc >= start_time)
    if end_time:
        query = query.filter(Event.timestamp_utc <= end_time)
    events = query.order_by(Event.timestamp_utc.desc()).limit(1000).all()
    return events


@router.get("/alerts", response_model=List[AlertOut])
def list_alerts(
    godown_id: Optional[str] = Query(None),
    alert_type: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db),
) -> List[AlertOut]:
    """List alerts with optional filters."""
    query = db.query(Alert)
    if godown_id:
        query = query.filter(Alert.godown_id == godown_id)
    if alert_type:
        query = query.filter(Alert.alert_type == alert_type)
    if status:
        query = query.filter(Alert.status == status)
    alerts = query.order_by(Alert.start_time.desc()).limit(1000).all()
    result: List[AlertOut] = []
    for alert in alerts:
        linked_ids = [link.event_id for link in alert.events]
        result.append(
            AlertOut(
                id=alert.id,
                godown_id=alert.godown_id,
                camera_id=alert.camera_id,
                alert_type=alert.alert_type,
                severity_final=alert.severity_final,
                start_time=alert.start_time,
                end_time=alert.end_time,
                status=alert.status,
                summary=alert.summary,
                zone_id=alert.zone_id,
                count_events=len(linked_ids),
                linked_event_ids=linked_ids,
            )
        )
    return result


@router.get("/alerts/{alert_id}", response_model=AlertOut)
def get_alert(alert_id: int, db: Session = Depends(get_db)) -> AlertOut:
    """Retrieve a single alert with its linked events."""
    alert = db.get(Alert, alert_id)
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    linked_ids = [link.event_id for link in alert.events]
    return AlertOut(
        id=alert.id,
        godown_id=alert.godown_id,
        camera_id=alert.camera_id,
        alert_type=alert.alert_type,
        severity_final=alert.severity_final,
        start_time=alert.start_time,
        end_time=alert.end_time,
        status=alert.status,
        summary=alert.summary,
        zone_id=alert.zone_id,
        count_events=len(linked_ids),
        linked_event_ids=linked_ids,
    )
