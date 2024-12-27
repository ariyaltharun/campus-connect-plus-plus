from pydantic import BaseModel
from pydantic import EmailStr


class UserCreationModel(BaseModel):
    username: str
    password: str
    usn: str
    email: EmailStr
