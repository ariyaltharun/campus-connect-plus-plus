from pydantic import BaseModel
from typing import List, Dict


class KanbanBoard(BaseModel):
    todo: List[Dict[str, str]]
    inProgress: List[Dict[str, str]]
    done: List[Dict[str, str]]
