from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import JSONResponse
# Schemas
from schemas.user import UserCreationModel
from schemas.auth import TokenModel, UserAuth
# Utils
from utils import (
    hash_password, 
    create_access_token, 
    verify_password, 
    verify_token
)


# Router
router = APIRouter(
    tags=["user"]
)

# Variables
fake_db = {}

# Routes
@router.get("/")
def index():
    return { "route": "User's Routes" }


@router.post("/register")
async def create_user(user: UserCreationModel):
    if user.username in fake_db:
        raise HTTPException(status_code=400, detail="User already exists")
    user.password = hash_password(user.password)
    fake_db[user.username] = user
    return fake_db[user.username]


@router.post("/login", response_model=TokenModel)
def token(form_data: UserAuth):
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

# @router.get("/get_user")
# async def get_user(username, _: str = Depends(get_current_user)):
#     return fake_db.get(username, None)
