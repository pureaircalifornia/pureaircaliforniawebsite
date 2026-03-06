"""
Seed Admin User Script
Creates an initial super_admin user in MongoDB for the Pure Air California
Business Management System.

Usage:
    python seed_admin.py
"""
import asyncio
import uuid
from datetime import datetime
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
import os

# Load .env from the same directory
load_dotenv()

# Password hashing (same context as the app)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Configuration
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "pureaircalifornia")

# Default admin credentials
ADMIN_EMAIL = "admin@pureaircalifornia.com"
ADMIN_PASSWORD = "PureAir2025!"
ADMIN_FIRST_NAME = "Admin"
ADMIN_LAST_NAME = "User"


async def seed_admin():
    """Create the initial admin user if one does not already exist."""
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    users = db.users

    # Check if admin already exists
    existing = await users.find_one({"email": ADMIN_EMAIL})
    if existing:
        print(f"✓ Admin user already exists: {ADMIN_EMAIL}")
        client.close()
        return

    user_id = str(uuid.uuid4())
    user_doc = {
        "_id": user_id,
        "email": ADMIN_EMAIL,
        "password_hash": pwd_context.hash(ADMIN_PASSWORD),
        "first_name": ADMIN_FIRST_NAME,
        "last_name": ADMIN_LAST_NAME,
        "phone": "",
        "role": "super_admin",
        "franchise_id": None,
        "is_active": True,
        "is_verified": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "last_login": None,
        "skills": [],
        "certifications": [],
    }

    await users.insert_one(user_doc)
    print(f"✓ Admin user created successfully!")
    print(f"  Email:    {ADMIN_EMAIL}")
    print(f"  Password: {ADMIN_PASSWORD}")
    print(f"  Role:     super_admin")
    print(f"\n  ⚠  Change the password after first login!")

    client.close()


if __name__ == "__main__":
    asyncio.run(seed_admin())
