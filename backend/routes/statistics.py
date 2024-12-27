from fastapi import APIRouter
from database import get_database_instance

# Router
router = APIRouter(
    tags=["statistics"]
)
db = get_database_instance()


# total people
@router.get("/stat_count_total_ppl")
def stat_count_student_faculty():
    query = """
    MATCH (s:STUDENT)
    WITH count(s) AS total_students
    MATCH (f:FACULTY)
    RETURN total_students, count(f) AS total_faculty
    """
    result, meta = db.cypher_query(query)
    print(result)
    return result


# labs
@router.get("/stat_count_labs")
def stat_count_labs():
    query = """
    MATCH (l:LABORATORY)
    RETURN count(l) AS total_laboratories
    """
    result, meta = db.cypher_query(query)
    print(result)
    return result


# ppl engaged in projects
@router.get("/stat_count_engaged_ppl")
def stat_count_engaged_ppl():
    query = """
    MATCH (s:STUDENT)-[:WORKING_ON]->(p:PROJECT)
    WITH count(DISTINCT s) AS students_engaged
    MATCH (f:FACULTY)-[:WORKING_ON]->(p:PROJECT)
    RETURN students_engaged, count(DISTINCT f) AS faculty_engaged
    """
    result, meta = db.cypher_query(query)
    print(result)
    return result


# projects
@router.get('/stat_count_projects')
def stat_count_projects():
    query = """
    MATCH (p:PROJECT)
    RETURN 
        count(CASE WHEN p.status = 'Ongoing' THEN 1 END) AS ongoing_projects, 
        count(CASE WHEN p.status = 'Planned' THEN 1 END) AS planned_projects, 
        count(CASE WHEN p.status = 'Completed' THEN 1 END) AS completed_projects
    """
    result, meta = db.cypher_query(query)
    print(result)
    return result
