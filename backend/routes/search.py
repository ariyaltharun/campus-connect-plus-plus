from fastapi import APIRouter
from database import get_database_instance

# Router
router = APIRouter(
    tags=["search"]
)
db = get_database_instance()


@router.get("/find_people")
async def find_people(people: str, area: str):
    query1 = "MATCH (n:" + people + ") WHERE '" + area + "' in n.area_of_interest RETURN n.name, n.student_name, n.department, n.designation, n.usn, n.email_id"
    query2 = "MATCH (n) WHERE '" + area + "' in n.area_of_interest RETURN n.name, n.student_name, n.department, n.designation, n.usn, n.email_id"

    # Incomplete
    # result, meta = db.cypher_query(query)
    # return result


@router.get("/find_projects")
async def find_projects(status: str, area: str):
    query1 = "MATCH (P:PROJECT) WHERE '"+ area +"' IN P.area_of_interest AND P.status= '" + status + "' RETURN P.title, P.area_of_interest, P.description, P.status "
    query2 = "MATCH (P:PROJECT) WHERE '"+ area +"' IN P.area_of_interest RETURN P.title, P.area_of_interest, P.description, P.status "
    # ???    
    if status =='All':
        result, meta = db.cypher_query(query2)
        print(result)
    else:
        result, meta = db.cypher_query(query1)
        print(result)
    return result


@router.get("/find_students")
async def find_students(areaOfInterest: str, skill: str):
    query = """
    MATCH (s:STUDENT)
    WHERE $areaOfInterest IN s.area_of_interest OR $skill IN s.skills
    RETURN s.student_name, s.department, s.area_of_interest, s.skills, s.email_id
    """
    parameters = {
        'areaOfInterest': areaOfInterest,
        'skill': skill
    }
    result, meta = db.cypher_query(query, params=parameters)
    print(result)
    return result

