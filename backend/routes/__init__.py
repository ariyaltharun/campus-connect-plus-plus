from .user import router as users_router
from .statistics import router as statistics_router
from .search import router as search_router


# Exporting the routers for use in the main FastAPI app
__all__ = [
    "users_router",
    "statistics_router",
    "search_router"
]
