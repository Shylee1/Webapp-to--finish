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
import bleach

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
SECRET_KEY = os.environ.get('JWT_SECRET', 'neurusagi-secret-key-change-in-production')
ADMIN_SECRET_KEY = os.environ.get('ADMIN_JWT_SECRET', 'neurusagi-admin-secret-change-in-production')
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

# ============ INPUT SANITIZATION ============

def sanitize_input(value: str) -> str:
    """Sanitize user input to prevent XSS and injection attacks"""
    if value is None:
        return value
    return bleach.clean(value, tags=[], strip=True)

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
class ArticleCreate(BaseModel):
    title: str
    excerpt: str
    category: str
    content: Optional[str] = None

class ArticleResponse(BaseModel):
    id: str
    title: str
    excerpt: str
    category: str
    content: Optional[str] = None
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

# Admin Models
class AdminLogin(BaseModel):
    username: str
    password: str

class AdminLoginResponse(BaseModel):
    token: str
    requires_password_change: bool

class AdminChangePassword(BaseModel):
    current_password: str
    new_password: str

class AdminStatsResponse(BaseModel):
    total_users: int
    total_articles: int
    total_contacts: int
    total_inquiries: int
    user_growth: Optional[float] = None

# ============ AUTH HELPERS ============

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(user_id: str, secret: str = SECRET_KEY) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    payload = {
        "sub": user_id,
        "exp": expire,
        "iat": datetime.now(timezone.utc)
    }
    return jwt.encode(payload, secret, algorithm=ALGORITHM)

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

async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, ADMIN_SECRET_KEY, algorithms=[ALGORITHM])
        admin_id = payload.get("sub")
        if admin_id is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        
        admin = await db.admins.find_one({"id": admin_id}, {"_id": 0})
        if admin is None:
            raise HTTPException(status_code=401, detail="Admin not found")
        
        return admin
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============ STARTUP - CREATE DEFAULT ADMIN ============

@app.on_event("startup")
async def create_default_admin():
    """Create default admin user: Shylee1 / 123 with password change required"""
    existing = await db.admins.find_one({"username": "Shylee1"})
    if not existing:
        admin_doc = {
            "id": str(uuid.uuid4()),
            "username": "Shylee1",
            "password": hash_password("123"),
            "requires_password_change": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.admins.insert_one(admin_doc)
        logger.info("Default admin user created: Shylee1")

# ============ USER AUTH ROUTES ============

@api_router.post("/auth/register", response_model=AuthResponse)
async def register(user_data: UserCreate):
    # Sanitize inputs
    sanitized_name = sanitize_input(user_data.name)
    sanitized_country = sanitize_input(user_data.country)
    
    # Check if user exists
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create user
    user_id = str(uuid.uuid4())
    user_doc = {
        "id": user_id,
        "name": sanitized_name,
        "email": user_data.email,
        "password": hash_password(user_data.password),
        "country": sanitized_country,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.users.insert_one(user_doc)
    
    token = create_access_token(user_id)
    user_response = UserResponse(
        id=user_id,
        name=sanitized_name,
        email=user_data.email,
        country=sanitized_country,
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

# ============ CONTACT ROUTES (with sanitization) ============

@api_router.post("/contact")
async def submit_contact(contact: ContactCreate):
    contact_doc = {
        "id": str(uuid.uuid4()),
        "name": sanitize_input(contact.name),
        "email": contact.email,
        "subject": sanitize_input(contact.subject),
        "message": sanitize_input(contact.message),
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.contacts.insert_one(contact_doc)
    return {"message": "Contact form submitted successfully"}

# ============ INVESTOR ROUTES (with sanitization) ============

@api_router.post("/investor-inquiries")
async def submit_investor_inquiry(inquiry: InvestorInquiryCreate):
    inquiry_doc = {
        "id": str(uuid.uuid4()),
        "name": sanitize_input(inquiry.name),
        "email": inquiry.email,
        "company": sanitize_input(inquiry.company) if inquiry.company else None,
        "investment_range": sanitize_input(inquiry.investment_range) if inquiry.investment_range else None,
        "message": sanitize_input(inquiry.message) if inquiry.message else None,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    await db.investor_inquiries.insert_one(inquiry_doc)
    return {"message": "Investor inquiry submitted successfully"}

# ============ ARTICLES ROUTES (public, with sanitization for search) ============

@api_router.get("/articles", response_model=ArticlesListResponse)
async def get_articles(
    page: int = 1,
    limit: int = 12,
    search: Optional[str] = None
):
    skip = (page - 1) * limit
    
    # Build query with sanitized search
    query = {}
    if search:
        sanitized_search = sanitize_input(search)
        query["$or"] = [
            {"title": {"$regex": sanitized_search, "$options": "i"}},
            {"excerpt": {"$regex": sanitized_search, "$options": "i"}},
            {"category": {"$regex": sanitized_search, "$options": "i"}}
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

# ============ USER CHAT ROUTES ============

@api_router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, current_user: dict = Depends(get_current_user)):
    # Placeholder - user will integrate their own AI model
    response_text = f"This is a placeholder response. Your AI model integration point. Message: '{sanitize_input(request.message)}'"
    
    # Log chat
    chat_log = {
        "id": str(uuid.uuid4()),
        "user_id": current_user["id"],
        "message": sanitize_input(request.message),
        "response": response_text,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.chat_logs.insert_one(chat_log)
    
    return ChatResponse(response=response_text)

# ============ ADMIN AUTH ROUTES ============

@api_router.post("/admin/login", response_model=AdminLoginResponse)
async def admin_login(credentials: AdminLogin):
    admin = await db.admins.find_one({"username": credentials.username}, {"_id": 0})
    if not admin or not verify_password(credentials.password, admin["password"]):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token(admin["id"], ADMIN_SECRET_KEY)
    
    return AdminLoginResponse(
        token=token,
        requires_password_change=admin.get("requires_password_change", False)
    )

@api_router.post("/admin/change-password")
async def admin_change_password(data: AdminChangePassword, admin: dict = Depends(get_current_admin)):
    # Verify current password
    admin_doc = await db.admins.find_one({"id": admin["id"]}, {"_id": 0})
    if not verify_password(data.current_password, admin_doc["password"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    # Update password
    await db.admins.update_one(
        {"id": admin["id"]},
        {"$set": {
            "password": hash_password(data.new_password),
            "requires_password_change": False
        }}
    )
    
    return {"message": "Password changed successfully"}

# ============ ADMIN DASHBOARD ROUTES (NO sanitization per user request) ============

@api_router.get("/admin/stats", response_model=AdminStatsResponse)
async def get_admin_stats(admin: dict = Depends(get_current_admin)):
    total_users = await db.users.count_documents({})
    total_articles = await db.articles.count_documents({})
    total_contacts = await db.contacts.count_documents({})
    total_inquiries = await db.investor_inquiries.count_documents({})
    
    return AdminStatsResponse(
        total_users=total_users,
        total_articles=total_articles,
        total_contacts=total_contacts,
        total_inquiries=total_inquiries
    )

@api_router.get("/admin/users")
async def get_admin_users(admin: dict = Depends(get_current_admin)):
    users = await db.users.find({}, {"_id": 0, "password": 0}).to_list(length=1000)
    return users

@api_router.get("/admin/articles")
async def get_admin_articles(admin: dict = Depends(get_current_admin)):
    articles = await db.articles.find({}, {"_id": 0}).sort("published_at", -1).to_list(length=1000)
    return articles

@api_router.post("/admin/articles")
async def create_admin_article(article: ArticleCreate, admin: dict = Depends(get_current_admin)):
    # NO SANITIZATION for admin inputs per user request
    article_doc = {
        "id": str(uuid.uuid4()),
        "title": article.title,
        "excerpt": article.excerpt,
        "category": article.category,
        "content": article.content,
        "published_at": datetime.now(timezone.utc).isoformat()
    }
    await db.articles.insert_one(article_doc)
    return {"message": "Article created", "id": article_doc["id"]}

@api_router.put("/admin/articles/{article_id}")
async def update_admin_article(article_id: str, article: ArticleCreate, admin: dict = Depends(get_current_admin)):
    # NO SANITIZATION for admin inputs per user request
    result = await db.articles.update_one(
        {"id": article_id},
        {"$set": {
            "title": article.title,
            "excerpt": article.excerpt,
            "category": article.category,
            "content": article.content
        }}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article updated"}

@api_router.delete("/admin/articles/{article_id}")
async def delete_admin_article(article_id: str, admin: dict = Depends(get_current_admin)):
    result = await db.articles.delete_one({"id": article_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Article not found")
    return {"message": "Article deleted"}

@api_router.get("/admin/contacts")
async def get_admin_contacts(admin: dict = Depends(get_current_admin)):
    contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(length=1000)
    return contacts

@api_router.get("/admin/investor-inquiries")
async def get_admin_investor_inquiries(admin: dict = Depends(get_current_admin)):
    inquiries = await db.investor_inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(length=1000)
    return inquiries

@api_router.post("/admin/chat", response_model=ChatResponse)
async def admin_chat(request: ChatRequest, admin: dict = Depends(get_current_admin)):
    # NO SANITIZATION for admin chat per user request
    # Placeholder for admin AI assistant
    response_text = f"Admin assistant placeholder. Your message: '{request.message}'"
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
