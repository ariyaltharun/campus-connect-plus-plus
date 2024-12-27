from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
# Schemas
from schemas.user import StudentCreationModel, FactultyCreationModel
from schemas.auth import TokenModel, UserAuth
# Utils
from utils import (
    hash_password, 
    create_access_token, 
    verify_password, 
    verify_token
)
from database import get_database_instance


# Router
router = APIRouter(
    tags=["user"]
)
db = get_database_instance()

# Variables
fake_db = {}

# Routes
@router.get("/")
def index():
    return { "route": "User's Routes" }


@router.post("/student/register")
async def create_student_user(user: StudentCreationModel):
    # check if user already exists
    # query = """
    # MATCH (u:User {username: $username})
    # RETURN u
    # """
    query = """
    MATCH (s:STUDENT {student_name: $sname, usn: $usn, email_id: $email, department: $dept, area_of_interest: $aoi, semester: $sem, skills: $skills})
    """  
    result, meta = db.cypher_query(query, user.model_dump())
    if result:
        raise HTTPException(status_code=400, detail="User already exists")
    # hash password and create user
    # user.password = hash_password(user.password)
    # query = """
    # CREATE (u:User {username: $username, password: $password})
    # """
    result, meta = db.cypher_query(query, user.model_dump())
    return result


@router.post("/faculty/register")
async def create_faculty_user(user: FactultyCreationModel):
    # check if user already exists
    # query = """
    # MATCH (u:User {username: $username})
    # RETURN u
    # """
    query = """
    CREATE (f:FACULTY {name: $fname, email_id: $email, department: $dept, area_of_interest: $aoi, designation: $desigtn})
    """  
    result, meta = db.cypher_query(query, user.model_dump())
    if result:
        raise HTTPException(status_code=400, detail="User already exists")
    # hash password and create user
    # user.password = hash_password(user.password)
    # query = """
    # CREATE (u:User {username: $username, password: $password})
    # """
    result, meta = db.cypher_query(query, user.model_dump())
    return result


@router.post("/login", response_model=TokenModel)
def login(form_data: UserAuth):
    user = fake_db.get(form_data.username, None)
    if user is None or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid Credentials")
    token_model = TokenModel(
        access_token=create_access_token({"sub": form_data.username}),
        token_type="bearer"
    )
    return token_model 


@router.get("/verify_token")
def token_verification(request: Request):
    authorization = request.headers.get("Authorization")
    if authorization is None:
        raise HTTPException(status_code=401, detail="Invalid Token")
    bearer, authorization_token = authorization.split(" ")
    verify_token(authorization_token)
    return { "message": "Token is Valid" }
