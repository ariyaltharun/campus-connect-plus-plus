from fastapi import APIRouter
from database import get_mongodb_instance
from schemas.projects import KanbanBoard

router = APIRouter(tags=["Kanban"])

db = get_mongodb_instance(collection_name="kanban")


###################################################### Get all kanban data ###########################################################
@router.get("/all", response_model=KanbanBoard)
async def get_all_kanban():
    todo = db['todo'].find({}, {'_id': False})
    inprogress = db["inProgress"].find({}, {'_id': False})
    done = db['done'].find({}, {'_id': False})
    return {"todo": todo, "inProgress": inprogress, "done": done}


########################################################### Add items ###########################################################
@router.get("/{task}/add")
def add_item(task: str, item: str):
    db[task].insert_one({'item': item})
    return {"message": f"Success todo_add_item"}


################################## Remove ###########################################################
@router.get("/{task}/remove")
def remove_item(task: str, item: str):
    db[task].delete_one({'item': item})
    return {"message": f"Success remove"}


################################### Move ###########################################################
@router.get("/{from_task}/to/{to_task}/move")
def move_item(from_task: str, to_task: str, item: str):
    db[from_task].delete_one({'item': item})
    db[to_task].insert_one({'item': item})
    return {"message": f"Success move"}
