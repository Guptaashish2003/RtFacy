from sqlalchemy import Column, Integer, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()

class ROIRecord(Base):
    __tablename__ = 'rois'

    id = Column(Integer, primary_key=True, index=True)
    x_min = Column(Integer, nullable=False)
    y_min = Column(Integer, nullable=False)
    width = Column(Integer, nullable=False)
    height = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
