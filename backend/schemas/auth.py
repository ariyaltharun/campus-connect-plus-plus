from pydantic import BaseModel


class UserAuth(BaseModel):
    username: str
    password: str


class TokenModel(BaseModel):
    access_token: str
    token_type: str
