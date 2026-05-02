import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from core.interfaces import IDatabase
from core.domain import ROI
from infrastructure.models import Base, ROIRecord
from typing import List

class PostgresDatabase(IDatabase):
    def __init__(self, database_url: str):
        if database_url.startswith("sqlite"):
            self.engine = create_engine(database_url, connect_args={"check_same_thread": False})
        else:
            self.engine = create_engine(database_url)
        Base.metadata.create_all(bind=self.engine)
        self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)

    def save_roi(self, roi: ROI) -> None:
        db: Session = self.SessionLocal()
        try:
            db_record = ROIRecord(
                x_min=roi.x_min,
                y_min=roi.y_min,
                width=roi.width,
                height=roi.height,
                timestamp=roi.timestamp
            )
            db.add(db_record)
            db.commit()
        except Exception as e:
            db.rollback()
            print(f"Error saving ROI: {e}")
        finally:
            db.close()

    def get_latest_rois(self, limit: int = 10) -> List[ROI]:
        db: Session = self.SessionLocal()
        try:
            records = db.query(ROIRecord).order_by(ROIRecord.timestamp.desc()).limit(limit).all()
            return [
                ROI(
                    x_min=r.x_min,
                    y_min=r.y_min,
                    width=r.width,
                    height=r.height,
                    timestamp=r.timestamp
                )
                for r in records
            ]
        finally:
            db.close()
