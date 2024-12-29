from pydantic import BaseModel


class UserAuth(BaseModel):
    email_id: str
    password: str


class TokenModel(BaseModel):
    access_token: str
    token_type: str
