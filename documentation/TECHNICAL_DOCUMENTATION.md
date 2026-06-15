# E-Commerce Inventory API — Complete Technical Documentation

**Course:** PROG315 — Object-Oriented Programming 2  
**Institution:** Limkokwing University of Creative Technology, Sierra Leone  
**Semester:** 4 (March 2026 – July 2026)  
**Project Title:** FastAPI Industry-Standard Application  
**Domain:** E-Commerce Inventory API  
**SDG Alignment:** SDG 8 — Decent Work and Economic Growth  

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture & Design Choices](#2-architecture--design-choices)
3. [Step-by-Step Development Process](#3-step-by-step-development-process)
4. [File-by-File Code Explanation](#4-file-by-file-code-explanation)
5. [Database Schema](#5-database-schema)
6. [API Endpoints Reference](#6-api-endpoints-reference)
7. [Authentication & Authorization Flow](#7-authentication--authorization-flow)
8. [Testing & Deployment](#8-testing--deployment)
9. [Challenges & Solutions](#9-challenges--solutions)
10. [GitHub Submission Guide](#10-github-submission-guide)

---

## 1. Project Overview

### 1.1 Objective
Build a FastAPI-based E-Commerce Inventory Management System that follows industry-standard practices including:
- RESTful API design
- PostgreSQL database with SQLAlchemy ORM
- OAuth2 + JWT authentication
- Role-based access control
- Dependency injection
- Async programming
- Auto-generated documentation (Swagger UI / ReDoc)
- Open-source licensing (MIT)
- SDG 8 alignment for Sierra Leone context

### 1.2 Why E-Commerce Inventory?
Sierra Leone's growing digital economy needs tools for local businesses to manage stock efficiently. This API reduces waste, improves cash flow, and supports economic growth — directly aligning with SDG 8.

### 1.3 Tech Stack
| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | FastAPI | High-performance async web framework |
| Database | PostgreSQL 15 | Relational data storage |
| ORM | SQLAlchemy 2.0 | Object-relational mapping |
| Auth | OAuth2 + JWT | Stateless token authentication |
| Password Hashing | bcrypt (passlib) | Secure password storage |
| Validation | Pydantic v2 | Request/response validation |
| Docs | Swagger UI / ReDoc | Auto-generated API documentation |
| Container | Docker + Docker Compose | Easy deployment |

---

## 2. Architecture & Design Choices

### 2.1 Project Structure (Modular Design)
```
ecommerce_inventory_api/
├── app/                          # Main application package
│   ├── __init__.py               # Makes 'app' a Python package
│   ├── main.py                   # FastAPI app instance, lifespan, middleware
│   ├── database.py               # DB engine, session factory, Base, get_db()
│   ├── models.py                 # SQLAlchemy ORM models (6 tables)
│   ├── schemas.py                # Pydantic models (20+ schemas)
│   ├── auth.py                   # JWT, password hashing, RBAC dependencies
│   └── routers/                  # Feature-based route modules
│       ├── __init__.py
│       ├── auth.py               # Register, login, me endpoints
│       ├── users.py              # User CRUD (admin only)
│       ├── categories.py         # Category CRUD
│       ├── products.py           # Product CRUD + inventory features
│       └── orders.py             # Order CRUD with stock management
├── .env                          # Environment variables (masked)
├── .env.example                  # Template for environment setup
├── requirements.txt              # Python dependencies
├── docker-compose.yml            # PostgreSQL + API containers
├── Dockerfile                    # API container build instructions
├── init_db.py                    # Database setup + seed data
├── .gitignore                    # Files to exclude from Git
├── LICENSE                       # MIT License
└── README.md                     # Project overview & usage
```

### 2.2 Why This Architecture?

**Separation of Concerns:** Each file has a single responsibility. Routers handle HTTP, models handle DB, schemas handle validation, auth handles security.

**Dependency Injection:** `get_db()` yields sessions automatically. FastAPI injects them into endpoints. This ensures proper resource cleanup (sessions always close).

**Router Pattern:** Feature-based routing (`/auth`, `/products`, `/orders`) makes the codebase scalable. Adding new features means adding new router files without touching existing code.

**Type Safety:** Every function has type annotations. Pydantic validates all requests automatically. This catches bugs at development time, not runtime.

---

## 3. Step-by-Step Development Process

### Step 1: Environment Setup
**What we did:** Created `requirements.txt` with all dependencies.

**Why:** Pinning versions ensures reproducibility across team members' machines.

```
fastapi==0.115.0          # Core framework
uvicorn[standard]==0.32.0  # ASGI server (handles HTTP)
sqlalchemy==2.0.36       # ORM for database
psycopg2-binary==2.9.10  # PostgreSQL adapter
python-jose[cryptography]==3.3.0  # JWT encoding/decoding
passlib[bcrypt]==1.7.4   # Password hashing
python-multipart==0.0.17 # Form data parsing (for OAuth2)
pydantic==2.9.2          # Data validation
pydantic-settings==2.6.1 # Settings management
alembic==1.14.0          # Database migrations
python-dotenv==1.0.1     # Load .env files
httpx==0.27.2            # HTTP client (for async tasks)
pytest==8.3.3            # Testing framework
pytest-asyncio==0.24.0   # Async test support
```

### Step 2: Database Configuration (`database.py`)
**What we did:** Set up SQLAlchemy engine, session factory, declarative base, and dependency injection function.

**Key Code:**
```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.pool import NullPool

# Create engine — NullPool means no connection pooling (good for dev)
engine = create_engine(DATABASE_URL, poolclass=NullPool, future=True)

# Session factory — autocommit=False means we control transactions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all ORM models
Base = declarative_base()

# Dependency injection function — yields DB sessions
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db          # Hand session to endpoint
    finally:
        db.close()        # ALWAYS closes, even on errors
```

**Why NullPool:** In development, connection pooling can cause issues. In production, you'd use `QueuePool`.

**Why `yield`:** FastAPI's dependency injection system calls this as a generator. The `finally` block guarantees cleanup — no memory leaks.

### Step 3: ORM Models (`models.py`)
**What we did:** Defined 6 database tables using SQLAlchemy ORM with relationships, enums, and constraints.

**Tables Created:**
1. **users** — Stores user accounts with roles
2. **categories** — Product categories
3. **products** — Inventory items with stock tracking
4. **orders** — Customer orders
5. **order_items** — Individual products within orders

**Key Design Decisions:**
- **Enums for roles/status:** `UserRole` (admin/manager/viewer) and `OrderStatus` (pending/processing/shipped/delivered/cancelled) ensure data integrity.
- **Relationships:** `User.orders`, `Category.products`, `Product.order_items` enable easy navigation between related data.
- **Timestamps:** `created_at` (server_default) and `updated_at` (onupdate) track record lifecycle.
- **Soft delete via `is_active`:** Instead of hard-deleting users/products, we deactivate them. Preserves referential integrity.

**The `User` Model Explained:**
```python
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(200), nullable=True)
    role = Column(Enum(UserRole), default=UserRole.viewer, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    orders = relationship("Order", back_populates="user")
```
- `index=True` on email/username: Speeds up lookups during login.
- `unique=True`: Prevents duplicate accounts.
- `nullable=False`: Database-level validation.
- `relationship("Order")`: Lets us access `user.orders` without writing SQL joins.

### Step 4: Pydantic Schemas (`schemas.py`)
**What we did:** Created 20+ Pydantic models for request validation and response serialization.

**Schema Categories:**
- **Base schemas:** Common fields shared by create/update/response
- **Create schemas:** Required fields for new records
- **Update schemas:** Optional fields (using `exclude_unset=True` for partial updates)
- **Response schemas:** Include computed fields like `id`, `created_at`
- **List schemas:** Paginated responses with metadata

**Example — Product Schemas:**
```python
class ProductBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    sku: str = Field(..., min_length=1, max_length=50)
    price: float = Field(..., gt=0)        # Must be > 0
    quantity: int = Field(default=0, ge=0)  # Must be >= 0
    category_id: Optional[int] = None

class ProductCreate(ProductBase):
    pass  # Inherits all required fields

class ProductUpdate(BaseModel):
    name: Optional[str] = None           # All fields optional
    price: Optional[float] = Field(None, gt=0)
    quantity: Optional[int] = Field(None, ge=0)

class ProductResponse(ProductBase):
    model_config = ConfigDict(from_attributes=True)  # SQLAlchemy → Pydantic
    id: int
    created_at: Optional[datetime] = None
```

**Why `ConfigDict(from_attributes=True)`:** Tells Pydantic to read SQLAlchemy object attributes directly. Without this, you'd need manual conversion.

**Why separate Create/Update schemas:** `ProductCreate` requires all fields. `ProductUpdate` allows partial updates. This is REST standard.

### Step 5: Authentication System (`auth.py`)
**What we did:** Built a complete OAuth2 + JWT authentication system with role-based access control.

**Components:**

#### 5.1 Password Hashing
```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)
```
- **bcrypt:** Industry-standard hashing algorithm. Slow by design — resistant to brute force.
- **passlib:** Python library that wraps bcrypt with a clean API.

#### 5.2 JWT Token Creation
```python
from jose import jwt
from datetime import datetime, timedelta, timezone

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=30)

    to_encode.update({"exp": expire})  # Add expiration claim
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
```
- **JWT Structure:** Header (algorithm) + Payload (claims: sub, role, exp) + Signature (HMAC-SHA256)
- **Claims:** `sub` = subject (username), `exp` = expiration time
- **Why HS256:** Fast symmetric signing. For distributed systems, RS256 (asymmetric) is better.

#### 5.3 Current User Dependency
```python
async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.username == username).first()
    if user is None or not user.is_active:
        raise credentials_exception

    return user
```
- **OAuth2PasswordBearer:** Tells FastAPI to expect `Authorization: Bearer <token>` header.
- **JWTError handling:** Catches expired tokens, invalid signatures, malformed tokens.
- **Database lookup:** Verifies the user still exists and is active.

#### 5.4 Role-Based Access Control
```python
def require_role(required_roles: list[UserRole]):
    async def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in required_roles:
            raise HTTPException(
                status_code=403,
                detail=f"Requires roles: {[r.value for r in required_roles]}"
            )
        return current_user
    return role_checker

# Pre-configured dependencies
require_admin = require_role([UserRole.admin])
require_manager_or_admin = require_role([UserRole.admin, UserRole.manager])
```
- **Higher-Order Function:** `require_role()` returns a dependency function. This is a closure pattern.
- **403 vs 401:** 401 = not authenticated. 403 = authenticated but not authorized.

### Step 6: Router Implementation

#### 6.1 Auth Router (`routers/auth.py`)
**Endpoints:**
- `POST /auth/register` — Creates user with hashed password
- `POST /auth/login` — Validates credentials, returns JWT
- `GET /auth/me` — Returns current user profile

**Registration Flow:**
1. Check email uniqueness → 400 if exists
2. Check username uniqueness → 400 if exists
3. Hash password with bcrypt
4. Create User record
5. Commit to database
6. Return user (password excluded via schema)

**Login Flow:**
1. Accept OAuth2 form data (username + password)
2. Find user by username
3. Verify password with bcrypt
4. Create JWT with 30-minute expiration
5. Return `{access_token, token_type, expires_in}`

#### 6.2 Products Router (`routers/products.py`)
**Endpoints:**
- `GET /products/` — List with filters (category, price range, search, stock status) + pagination
- `GET /products/{id}` — Single product
- `POST /products/` — Create (Manager/Admin only)
- `PUT /products/{id}` — Update (Manager/Admin only)
- `DELETE /products/{id}` — Delete (Manager/Admin only)
- `GET /products/inventory/alerts` — Low stock items
- `POST /products/{id}/restock` — Add inventory
- `POST /products/{id}/restock-async` — Async restock with notification
- `GET /products/stats/overview` — Dashboard statistics

**Filtering Implementation:**
```python
query = db.query(Product)
if category_id:
    query = query.filter(Product.category_id == category_id)
if min_price is not None:
    query = query.filter(Product.price >= min_price)
if search:
    query = query.filter(
        (Product.name.ilike(f"%{search}%")) | 
        (Product.description.ilike(f"%{search}%"))
    )
```
- **Query building:** Filters are applied conditionally. No SQL injection risk — SQLAlchemy uses parameterized queries.
- **Pagination:** `offset(skip).limit(limit)` with total count for frontend pagination.

**Async I/O Demonstration:**
```python
async def _send_restock_notification(product_name: str, amount: int) -> None:
    await asyncio.sleep(0.5)  # Simulate network I/O
    print(f"[NOTIFICATION] {product_name} restocked: +{amount}")
```
- **Why async:** Real notifications (email/SMS) involve network I/O. `await` lets the server handle other requests during the wait.
- **Assignment Requirement #8:** Demonstrates async/await for I/O-bound tasks.

#### 6.3 Orders Router (`routers/orders.py`)
**Key Feature:** Automatic stock deduction + role-based visibility.

**Order Creation Flow:**
1. Validate each product exists and is active
2. Check sufficient stock → 400 if insufficient
3. Deduct stock from products
4. Create Order record
5. Create OrderItem records
6. Commit all in one transaction

**Role-Based Visibility:**
```python
if current_user.role.value == "viewer":
    query = query.filter(Order.user_id == current_user.id)
```
- Viewers only see their own orders. Managers/Admins see all.

### Step 7: Main Application (`main.py`)
**What we did:** Assembled all routers, configured middleware, set up lifespan events, and added root/health/sdg endpoints.

**Lifespan Handler:**
```python
@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)  # Create tables on startup
    yield
    # Cleanup on shutdown
```
- **Why asynccontextmanager:** Modern FastAPI pattern replacing `on_event("startup")`.
- **create_all:** Creates tables if they don't exist. For production, use Alembic migrations.

**CORS Middleware:**
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (restrict in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```
- Enables frontend (React/Vue) to call the API from different domains.

**Router Registration:**
```python
app.include_router(auth.router, prefix="/api/v1")
app.include_router(products.router, prefix="/api/v1")
# ... etc
```
- All endpoints prefixed with `/api/v1` for versioning.

### Step 8: Docker & Deployment Setup

**Dockerfile:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
RUN apt-get update && apt-get install -y gcc libpq-dev
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```
- **Multi-stage not needed:** For a university project, simplicity wins.
- **libpq-dev:** Required to build psycopg2 (PostgreSQL C library).

**docker-compose.yml:**
- `db` service: PostgreSQL 15 Alpine (lightweight)
- `api` service: FastAPI app with auto-reload
- `depends_on` with `condition: service_healthy`: API waits for Postgres to be ready
- `volumes`: Persist data across container restarts

### Step 9: Database Initialization (`init_db.py`)
**What it does:**
1. Creates all tables using `Base.metadata.create_all()`
2. Seeds sample data:
   - 3 users (admin, manager, viewer)
   - 5 categories (Electronics, Clothing, Food, Home, Books)
   - 10 products with realistic Sierra Leone context (palm oil, cassava flour)

**Why seed data:** Allows immediate testing without manual data entry. The palm oil and cassava flour products show SDG 8 alignment with local agriculture.

### Step 10: Environment Configuration
**`.env` (masked credentials):**
```
DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce_db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**`.env.example`:** Template showing all options including SQLite fallback.

**Security note:** `.env` is in `.gitignore` so real credentials never reach GitHub.

---

## 4. File-by-File Code Explanation

### `requirements.txt`
Lists all Python packages with pinned versions. Pinning prevents "it works on my machine" issues.

### `.env`
Stores sensitive configuration outside source code. Loaded by `python-dotenv` at runtime.

### `app/__init__.py`
Empty file making `app` a Python package. Required for imports like `from app.database import get_db`.

### `app/database.py`
**Lines explained:**
- `load_dotenv()`: Reads `.env` file into environment variables
- `create_engine()`: Creates SQLAlchemy engine (connection pool to PostgreSQL)
- `NullPool`: No connection pooling (development-friendly)
- `SessionLocal`: Factory that creates new sessions
- `Base`: Declarative base — all models inherit from this
- `get_db()`: Generator yielding sessions. FastAPI calls this for each request.

### `app/models.py`
**Lines explained:**
- `enum.Enum`: Python enums for type-safe constants
- `Column()`: Defines table columns with types and constraints
- `primary_key=True`: Unique identifier
- `index=True`: Database index for fast lookups
- `unique=True`: Prevents duplicates
- `ForeignKey()`: Establishes referential integrity
- `relationship()`: ORM-level link between tables
- `back_populates`: Bidirectional relationship (User.orders ↔ Order.user)
- `server_default=func.now()`: Auto-set creation timestamp
- `onupdate=func.now()`: Auto-set update timestamp

### `app/schemas.py`
**Lines explained:**
- `BaseModel`: Pydantic base class for data validation
- `Field(...)`: Rich field definitions with constraints
- `ConfigDict(from_attributes=True)`: Maps SQLAlchemy objects to Pydantic
- `Optional[]`: Nullable fields
- `model_dump()`: Converts Pydantic model to dict (replaces old `.dict()`)
- `exclude_unset=True`: Only includes fields that were explicitly set

### `app/auth.py`
**Lines explained:**
- `CryptContext`: passlib's unified interface for multiple hash schemes
- `OAuth2PasswordBearer`: FastAPI security scheme for bearer tokens
- `jwt.encode()`: Creates signed JWT
- `jwt.decode()`: Verifies signature and extracts claims
- `JWTError`: Catches all JWT-related errors
- `Depends()`: FastAPI dependency injection
- `closure pattern`: `require_role()` returns a function that FastAPI calls

### `app/routers/auth.py`
**Lines explained:**
- `APIRouter`: FastAPI's modular routing. Prefix and tags group endpoints.
- `OAuth2PasswordRequestForm`: FastAPI's built-in login form parser
- `db.query(User).filter(...)`: SQLAlchemy query builder
- `db.add()`, `db.commit()`, `db.refresh()`: ORM CRUD operations
- `status_code=201`: Returns 201 Created for successful registration

### `app/routers/products.py`
**Lines explained:**
- `Query(...)`: FastAPI's query parameter with validation
- `db.query(Product).count()`: Aggregate query for pagination
- `ilike()`: Case-insensitive SQL LIKE
- `BackgroundTasks`: FastAPI's background task runner
- `func.sum()`: SQLAlchemy aggregate function

### `app/routers/orders.py`
**Lines explained:**
- `uuid.uuid4().hex[:8]`: Generates short unique order numbers
- `db.flush()`: Sends pending changes to DB without committing (gets IDs)
- Stock deduction happens within the same transaction as order creation — atomic.

### `app/main.py`
**Lines explained:**
- `FastAPI(...)`: App instance with metadata for docs
- `lifespan=`: Modern startup/shutdown handler
- `docs_url="/docs"`: Swagger UI path
- `redoc_url="/redoc"`: ReDoc path
- `include_router()`: Mounts router modules
- `CORSMiddleware`: Cross-Origin Resource Sharing for frontend apps
- `JSONResponse`: Custom error format

### `docker-compose.yml`
**Lines explained:**
- `version: "3.8"`: Docker Compose file format
- `services`: Defines containers
- `image: postgres:15-alpine`: Official lightweight Postgres image
- `environment`: Sets DB credentials
- `volumes`: Persistent storage
- `healthcheck`: Ensures DB is ready before API starts
- `depends_on`: Service startup order

### `Dockerfile`
**Lines explained:**
- `FROM python:3.11-slim`: Base image (Python + minimal OS)
- `WORKDIR /app`: Sets working directory
- `apt-get install libpq-dev`: PostgreSQL client libraries
- `pip install --no-cache-dir`: Installs without caching (smaller image)
- `EXPOSE 8000`: Documents the port
- `CMD`: Default command when container starts

### `init_db.py`
**Lines explained:**
- `sys.path.insert()`: Allows importing `app` modules when running standalone
- `Base.metadata.create_all()`: Creates all tables from models
- `get_password_hash()`: Hashes passwords before storage
- `db.flush()`: Gets auto-generated IDs without committing
- `db.commit()`: Saves all changes permanently

### `README.md`
Comprehensive project documentation with:
- Feature overview
- Tech stack
- Installation instructions
- API endpoint reference
- Authentication examples
- Role permissions table
- SDG alignment explanation
- Design choices and challenges

### `LICENSE`
MIT License — permissive open-source license. Allows free use, modification, and distribution.

---

## 5. Database Schema

### Entity Relationship Diagram (Text)

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    users    │       │   orders    │       │ order_items │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────┤ user_id(FK) │       │ id (PK)     │
│ email       │       │ id (PK)     │◄──────┤ order_id(FK)│
│ username    │       │ order_number│       │ product_id  │
│ hashed_pw   │       │ status      │       │ quantity    │
│ role        │       │ total_amount│       │ unit_price  │
│ is_active   │       │ created_at  │       │ subtotal    │
│ created_at  │       └─────────────┘       └──────┬──────┘
└─────────────┘                                    │
                                                   │
┌─────────────┐       ┌─────────────┐             │
│ categories  │       │   products  │◄─────────────┘
├─────────────┤       ├─────────────┤
│ id (PK)     │◄──────┤ category_id │
│ name        │       │ id (PK)     │
│ description │       │ name        │
│ slug        │       │ sku         │
└─────────────┘       │ price       │
                       │ quantity    │
                       │ reorder_lvl │
                       │ is_active   │
                       └─────────────┘
```

### Relationships
- **User → Order:** One-to-Many (a user has many orders)
- **Order → OrderItem:** One-to-Many (an order has many items)
- **Product → OrderItem:** One-to-Many (a product appears in many order items)
- **Category → Product:** One-to-Many (a category has many products)

---

## 6. API Endpoints Reference

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/auth/register` | No | Create new user account |
| POST | `/api/v1/auth/login` | No | Login, receive JWT token |
| GET | `/api/v1/auth/me` | Bearer | Get current user profile |

### Users (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/users/?skip=0&limit=100` | List all users |
| GET | `/api/v1/users/{id}` | Get user by ID |
| PUT | `/api/v1/users/{id}` | Update user |
| DELETE | `/api/v1/users/{id}` | Delete user |

### Categories
| Method | Endpoint | Auth Required |
|--------|----------|---------------|
| GET | `/api/v1/categories/` | Any role |
| GET | `/api/v1/categories/{id}` | Any role |
| POST | `/api/v1/categories/` | Manager/Admin |
| PUT | `/api/v1/categories/{id}` | Manager/Admin |
| DELETE | `/api/v1/categories/{id}` | Manager/Admin |

### Products
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/products/?skip=0&limit=20` | Any | List with pagination |
| GET | `/api/v1/products/?category_id=1` | Any | Filter by category |
| GET | `/api/v1/products/?min_price=10&max_price=100` | Any | Price range filter |
| GET | `/api/v1/products/?search=headphones` | Any | Search by name/description |
| GET | `/api/v1/products/?in_stock=true` | Any | Stock filter |
| GET | `/api/v1/products/{id}` | Any | Get single product |
| POST | `/api/v1/products/` | Manager/Admin | Create product |
| PUT | `/api/v1/products/{id}` | Manager/Admin | Update product |
| DELETE | `/api/v1/products/{id}` | Manager/Admin | Delete product |
| GET | `/api/v1/products/inventory/alerts` | Manager/Admin | Low stock alerts |
| POST | `/api/v1/products/{id}/restock?amount=50` | Manager/Admin | Add stock |
| GET | `/api/v1/products/stats/overview` | Manager/Admin | Dashboard stats |

### Orders
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/orders/?status=pending` | Any* | List orders |
| GET | `/api/v1/orders/{id}` | Any* | Get order |
| POST | `/api/v1/orders/` | Any | Create order |
| PUT | `/api/v1/orders/{id}` | Manager/Admin | Update status |
| DELETE | `/api/v1/orders/{id}` | Manager/Admin | Delete order |

*Viewers see only their own orders

### System
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | API info & navigation |
| GET | `/health` | No | Health check |
| GET | `/sdg` | No | SDG 8 alignment info |
| GET | `/docs` | No | Swagger UI |
| GET | `/redoc` | No | ReDoc documentation |
| GET | `/openapi.json` | No | OpenAPI schema |

---

## 7. Authentication & Authorization Flow

### Login Sequence
```
┌─────────┐                    ┌─────────┐                    ┌─────────┐
│ Client  │ ──POST /login────► │ FastAPI │ ──verify bcrypt──► │  User   │
│         │  username+password   │         │                    │  Table  │
│         │                    │         │ ◄─────user row─────│         │
│         │ ◄───JWT token──────│         │                    │         │
└─────────┘                    └─────────┘                    └─────────┘
```

### Protected Request Sequence
```
┌─────────┐                    ┌─────────┐                    ┌─────────┐
│ Client  │ ──GET /products──► │ FastAPI │ ──decode JWT─────► │  Auth   │
│         │  Authorization:    │         │  verify signature  │  Module │
│         │  Bearer <token>    │         │                    │         │
│         │                    │         │ ◄────username──────│         │
│         │                    │         │                    │         │
│         │                    │         │ ──query user──────►│   DB    │
│         │                    │         │ ◄────User obj──────│         │
│         │                    │         │                    │         │
│         │                    │         │ ──check role──────►│  RBAC   │
│         │                    │         │ ◄──authorized?─────│         │
│         │ ◄───response───────│         │                    │         │
└─────────┘                    └─────────┘                    └─────────┘
```

### Token Structure (Decoded JWT)
```json
{
  "sub": "admin",
  "role": "admin",
  "exp": 1716645600
}
```

---

## 8. Testing & Deployment

### Local Development
```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Set up database (Option A: Docker)
docker-compose up -d db

# 3. Or use local PostgreSQL
# Create database and user, update .env

# 4. Initialize database
python init_db.py

# 5. Start server
uvicorn app.main:app --reload

# 6. Test endpoints
curl http://localhost:8000/health
curl http://localhost:8000/docs
```

### Using Docker Compose (Full Stack)
```bash
docker-compose up
# Starts PostgreSQL + API automatically
# Access at http://localhost:8000
```

### Testing with curl
```bash
# Register
curl -X POST "http://localhost:8000/api/v1/auth/register"   -H "Content-Type: application/json"   -d '{"email":"test@example.com","username":"test","password":"Test123!","role":"manager"}'

# Login
curl -X POST "http://localhost:8000/api/v1/auth/login"   -d "username=test&password=Test123!"

# Get products (with token)
curl -X GET "http://localhost:8000/api/v1/products/"   -H "Authorization: Bearer <token_from_login>"
```

---

## 9. Challenges & Solutions

| Challenge | Solution | Code Location |
|-----------|----------|---------------|
| Database session leaks | `get_db()` generator with `finally: db.close()` | `database.py` |
| Password security | bcrypt hashing via passlib | `auth.py` |
| Token expiration | JWT `exp` claim with configurable timeout | `auth.py` |
| Role-based permissions | `require_role()` closure returning dependencies | `auth.py` |
| Stock consistency | Atomic transactions (order + stock deduction) | `orders.py` |
| Partial updates | `exclude_unset=True` in Pydantic | all routers |
| API documentation | Auto-generated by FastAPI from type hints | `main.py` |
| Cross-origin requests | CORS middleware | `main.py` |
| Environment security | `.env` file + `.gitignore` | root directory |
| Container orchestration | Docker Compose with health checks | `docker-compose.yml` |

---

## 10. GitHub Submission Guide

### Step 1: Initialize Repository
```bash
cd ecommerce_inventory_api
git init
git add .
git commit -m "Initial commit: E-Commerce Inventory API"
```

### Step 2: Create GitHub Repository
1. Go to github.com → New Repository
2. Name: `ecommerce-inventory-api`
3. Add README (or push existing)
4. Make it **Public** (required for open-source)

### Step 3: Push Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/ecommerce-inventory-api.git
git branch -M main
git push -u origin main
```

### Step 4: Add Lecturer as Collaborator
1. Repository → Settings → Collaborators
2. Add `amandus.bcoker@limkokwing.edu.sl`
3. Set permission: **Write** (or **Maintain**)

### Step 5: Add Open-Source License
Already included: `LICENSE` file with MIT License.

### Step 6: Document in README
Already included: `README.md` with setup instructions and API reference.

### Step 7: Take Screenshots
1. Run the API: `uvicorn app.main:app --reload`
2. Open `http://localhost:8000/docs`
3. Screenshot: Swagger UI showing endpoints
4. Open `http://localhost:8000/redoc`
5. Screenshot: ReDoc documentation
6. Test endpoints and screenshot responses

### Step 8: Prepare Report
Format per assignment requirements:
- **Font:** Tahoma
- **Size:** 10
- **Line Spacing:** 1.15
- **Alignment:** Justify
- **Length:** 2–3 pages covering design choices and challenges

---

## Appendix: Assessment Criteria Mapping

| Criteria | Marks | How We Addressed It |
|----------|-------|---------------------|
| API Design & Endpoints | 10 | RESTful design, proper HTTP methods, pagination, filtering |
| Database Integration | 10 | PostgreSQL + SQLAlchemy ORM with relationships |
| Authentication & Security | 15 | OAuth2 + JWT, bcrypt hashing, RBAC with 3 roles |
| Approved open-source license | 5 | MIT License included |
| Dependency Injection | 5 | `get_db()` injected in all endpoints |
| Documentation & GitHub quality | 10 | Swagger UI, ReDoc, README, this documentation |
| Relevance to SDGs and Sierra Leone | 10 | SDG 8 endpoint, local product examples, economic growth focus |
| Individual Presentation & Demonstration | 35 | PowerPoint + live demo ready |
| **Total** | **100** | **All criteria addressed** |

---

*End of Technical Documentation*
