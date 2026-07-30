from fastapi.middleware.cors import CORSMiddleware
from app.routers import user

from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.database.database import engine, get_db

from app.models.internship import Base, Internship
from app.models.user import User

from app.schemas.internship import (
    InternshipCreate,
    InternshipResponse,
)

from app.auth.dependencies import (
    get_current_user,
    recruiter_required,
    student_required,
)

app = FastAPI(title="Internship Tracker API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)

# Create database tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Internship Tracker API is running 🚀"}


# ----------------------------
# CREATE INTERNSHIP
# Recruiter Only
# ----------------------------
@app.post("/internships", response_model=InternshipResponse)
def create_internship(
    internship: InternshipCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(recruiter_required)
):

    new_internship = Internship(
        company=internship.company,
        role=internship.role,
        location=internship.location,
        source=internship.source,
        link=internship.link,
    )

    db.add(new_internship)
    db.commit()
    db.refresh(new_internship)

    return new_internship


# ----------------------------
# GET ALL INTERNSHIPS
# Logged-in Users
# ----------------------------
@app.get("/internships", response_model=list[InternshipResponse])
def get_internships(
    company: str | None = Query(default=None),
    role: str | None = Query(default=None),
    location: str | None = Query(default=None),
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    query = db.query(Internship)

    if company:
        query = query.filter(
            Internship.company.ilike(f"%{company}%")
        )

    if role:
        query = query.filter(
            Internship.role.ilike(f"%{role}%")
        )

    if location:
        query = query.filter(
            Internship.location.ilike(f"%{location}%")
        )

    internships = (
        query
        .offset(skip)
        .limit(limit)
        .all()
    )

    return internships


# ----------------------------
# GET INTERNSHIP BY ID
# Logged-in Users
# ----------------------------
@app.get("/internships/{internship_id}", response_model=InternshipResponse)
def get_internship(
    internship_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    internship = (
        db.query(Internship)
        .filter(Internship.id == internship_id)
        .first()
    )

    if internship is None:
        raise HTTPException(
            status_code=404,
            detail="Internship not found"
        )

    return internship


# ----------------------------
# UPDATE INTERNSHIP
# Recruiter Only
# ----------------------------
@app.put("/internships/{internship_id}", response_model=InternshipResponse)
def update_internship(
    internship_id: int,
    updated_data: InternshipCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(recruiter_required)
):

    internship = (
        db.query(Internship)
        .filter(Internship.id == internship_id)
        .first()
    )

    if internship is None:
        raise HTTPException(
            status_code=404,
            detail="Internship not found"
        )

    internship.company = updated_data.company
    internship.role = updated_data.role
    internship.location = updated_data.location
    internship.source = updated_data.source
    internship.link = updated_data.link

    db.commit()
    db.refresh(internship)

    return internship


# ----------------------------
# DELETE INTERNSHIP
# Recruiter Only
# ----------------------------
@app.delete("/internships/{internship_id}")
def delete_internship(
    internship_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(recruiter_required)
):

    internship = (
        db.query(Internship)
        .filter(Internship.id == internship_id)
        .first()
    )

    if internship is None:
        raise HTTPException(
            status_code=404,
            detail="Internship not found"
        )

    db.delete(internship)
    db.commit()

    return {
        "message": "Internship deleted successfully"
    }
