from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
import os
from dotenv import load_dotenv
from fastapi import HTTPException

# Load environment variables
load_dotenv()

# Variables
password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.environ.get("SECRET_KEY")
ALGORITHM = os.environ.get("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES"))


# Utilities
def hash_password(password: str):
    return password_context.hash(password)


def create_access_token(data: dict):
    to_enc = data.copy()
    to_enc["exp"] = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    encoded_jwt = jwt.encode(payload=to_enc, key=SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def verify_password(plain_password, hashed_password):
    return password_context.verify(plain_password, hashed_password)


def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Token is Invalid or Expired")
        return payload
    except jwt.PyJWTError:
        raise HTTPException(status_code=403, detail="Token is Invalid or Expired")
