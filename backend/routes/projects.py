from fastapi import APIRouter
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from database import get_mongodb_instance
from schemas.projects import KanbanBoard


# Initialize variables
router = APIRouter(
    tags=["Projects"]
)
db = get_mongodb_instance("projects")

# Define routes
#################### fantasy code ############################
@router.get("/")
async def get_all_project():
    data = {
        'projects': db.list_collections()
    }
    return JSONResponse(content=data, status_code=200)


@router.get("/{project_name}")
async def get_project(project_name: str):
    project_details = db[project_name]["project_details"]
    project_detail = {
        'title': project_details.title
    }
    return JSONResponse(content=project_detail, status_code=200)
######################### fantasy code ############################


########################### KANBAN ########################################
@router.get("/{project_name}/kanban")
async def get_kanban(project_name: str):
    project_kanban = db[project_name]["kanban"]
    return JSONResponse(content=project_kanban, status_code=200)

################ Get all kanban data ####################
@router.get("/{project_name}/kanban", response_model=KanbanBoard)
async def get_all_kanban(project_name: str):
    todo = db[project_name]['kanban']['todo'].find({}, {'_id': False})
    inprogress = db[project_name]['kanban']["inProgress"].find({}, {'_id': False})
    done = db[project_name]['kanban']['done'].find({}, {'_id': False})
    return {"todo": todo, "inProgress": inprogress, "done": done}


######################### Add items ##################
@router.get("/{project_name}/kanban/{task}/add")
def add_item(project_name: str, task: str, item: str):
    db[project_name]['kanban'][task].insert_one({'item': item})
    return {"message": f"Success todo_add_item"}


################## Remove #############
@router.get("/{project_name}/kanban/{task}/remove")
def remove_item(project_name: str, task: str, item: str):
    db[project_name]['kanban'][task].delete_one({'item': item})
    return {"message": f"Success remove"}


################## Move ###################
@router.get("/{project_name}/kanban/{from_task}/to/{to_task}/move")
def move_item(project_name: str, from_task: str, to_task: str, item: str):
    db[project_name]['kanban'][from_task].delete_one({'item': item})
    db[project_name]['kanban'][to_task].insert_one({'item': item})
    return {"message": f"Success move"}
