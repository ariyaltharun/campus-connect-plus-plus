from pydantic import BaseModel
from pydantic import EmailStr
from typing import List


class StudentCreationModel(BaseModel):
    """ Student Creation Model """
    sname: str
    usn: str
    email: EmailStr
    dept: str
    aoi: List[str]
    sem: int
    skills: List[str]


class FactultyCreationModel(BaseModel):
    """ Faculty Creation Model """
    fname: str
    email: EmailStr
    dept: str
    aoi: List[str]
    desigtn: str
