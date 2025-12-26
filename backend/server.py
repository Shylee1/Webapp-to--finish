from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
SECRET_KEY = os.environ.get('JWT_SECRET', 'neurusagi-secret-key-change-in-production')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

# Create the main app without a prefix
app = FastAPI(title="NeurusAGi API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ============ MODELS ============

# User Models
class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    country: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    country: str
    created_at: str

class AuthResponse(BaseModel):
    token: str
    user: UserResponse

# Contact Models
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str

# Investor Inquiry Models
class InvestorInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    investment_range: Optional[str] = None
    message: Optional[str] = None

# Article Models
class ArticleResponse(BaseModel):
    id: str
    title: str
    excerpt: str
    category: str
    published_at: str

class ArticlesListResponse(BaseModel):
    articles: List[ArticleResponse]
    total: int
    page: int
    total_pages: int

# Chat Models
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

# ============ AUTH HELPERS ============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(user_id: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {
        "sub": user_id,
        "exp": expire,
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============ AUTH ROUTES ============

@api_router.post("/auth/register", response_model=AuthResponse)
async def register(user_data: UserCreate):
    # Check if user exists
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_id = str(uuid.uuid4())
    user_doc = {
        "id": user_id,
        "name": user_data.name,
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "country": user_data.country,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.users.insert_one(user_doc)
    
    token = create_access_token(user_id)
    user_response = UserResponse(
        id=user_id,
        name=user_data.name,
        email=user_data.email,
        country=user_data.country,
        created_at=user_doc["created_at"]
    )
    
    return AuthResponse(token=token, user=user_response)

@api_router.post("/auth/login", response_model=AuthResponse)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(user["id"])
    user_response = UserResponse(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        country=user["country"],
        created_at=user["created_at"]
    )
    
    return AuthResponse(token=token, user=user_response)

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return UserResponse(
        id=current_user["id"],
        name=current_user["name"],
        email=current_user["email"],
        country=current_user["country"],
        created_at=current_user["created_at"]
    )

# ============ CONTACT ROUTES ============

@api_router.post("/contact")
async def submit_contact(contact: ContactCreate):
    contact_doc = {
        "id": str(uuid.uuid4()),
        "name": contact.name,
        "email": contact.email,
        "subject": contact.subject,
        "message": contact.message,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.contacts.insert_one(contact_doc)
    return {"message": "Contact form submitted successfully"}

# ============ INVESTOR ROUTES ============

@api_router.post("/investor-inquiries")
async def submit_investor_inquiry(inquiry: InvestorInquiryCreate):
    inquiry_doc = {
        "id": str(uuid.uuid4()),
        "name": inquiry.name,
        "email": inquiry.email,
        "company": inquiry.company,
        "investment_range": inquiry.investment_range,
        "message": inquiry.message,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.investor_inquiries.insert_one(inquiry_doc)
    return {"message": "Investor inquiry submitted successfully"}

# ============ ARTICLES ROUTES ============

@api_router.get("/articles", response_model=ArticlesListResponse)
async def get_articles(
    page: int = 1,
    limit: int = 12,
    search: Optional[str] = None
):
    skip = (page - 1) * limit
    
    # Build query
    query = {}
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"excerpt": {"$regex": search, "$options": "i"}},
            {"category": {"$regex": search, "$options": "i"}}
        ]
    
    # Get total count
    total = await db.articles.count_documents(query)
    
    # Get articles
    articles_cursor = db.articles.find(query, {"_id": 0}).sort("published_at", -1).skip(skip).limit(limit)
    articles = await articles_cursor.to_list(length=limit)
    
    total_pages = max(1, (total + limit - 1) // limit)
    
    return ArticlesListResponse(
        articles=[ArticleResponse(**a) for a in articles],
        total=total,
        page=page,
        total_pages=total_pages
    )

# ============ CHAT ROUTES ============

@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    # This is a placeholder - user will integrate their own AI model
    # For now, return a placeholder response indicating the system is ready
    response_text = f"This is a placeholder response. The NeurusAGi backend is ready to receive your AI model integration. Your message was: '{request.message}'"
    
    # Log the chat for analytics
    chat_log = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"],
        "message": request.message,
        "response": response_text,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.chat_logs.insert_one(chat_log)
    
    return ChatResponse(response=response_text)

# ============ HEALTH CHECK ============

@api_router.get("/")
async def root():
    return {"message": "NeurusAGi API is running", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
