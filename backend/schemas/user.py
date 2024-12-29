from pydantic import BaseModel
from pydantic import EmailStr
from typing import List


class StudentCreationModel(BaseModel):
    """ Student Creation Model """
    student_name: str
    uid: str = None
    usn: str
    email_id: EmailStr
    department: str
    aoi: List[str]
    sem: int
    skills: List[str]
    password: str
    

class FactultyCreationModel(BaseModel):
    """ Faculty Creation Model """
    name: str
    uid: str = None
    email_id: EmailStr
    department: str
    aoi: List[str]
    designation: str
    password: str
