from pydantic import BaseModel


class InternshipCreate(BaseModel):
    company: str
    role: str
    location: str
    source: str
    link: str


class InternshipResponse(InternshipCreate):
    id: int

    class Config:
        from_attributes = True