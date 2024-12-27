from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import users_router

# Create FastAPI instance
app = FastAPI()

# Add CORS | https://fastapi.tiangolo.com/tutorial/cors/#use-corsmiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add routes
app.include_router(users_router, prefix="/users")
