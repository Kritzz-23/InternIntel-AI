from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Internship(Base):
    __tablename__ = "internships"

    id = Column(Integer, primary_key=True, index=True)

    company = Column(String)

    role = Column(String)

    location = Column(String)

    source = Column(String)

    link = Column(String)