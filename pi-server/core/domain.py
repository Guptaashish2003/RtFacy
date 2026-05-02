from pydantic import BaseModel, Field
from datetime import datetime

class ROI(BaseModel):
    x_min: int
    y_min: int
    width: int
    height: int
    timestamp: datetime = Field(default_factory=datetime.utcnow)
