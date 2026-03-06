"""
Storage Service
Handles file uploading to AWS S3.
"""
import os
import boto3
import logging
from botocore.exceptions import ClientError
from ..config import get_settings

logger = logging.getLogger(__name__)

def get_s3_client():
    settings = get_settings()
    if not settings.AWS_ACCESS_KEY_ID or not settings.AWS_SECRET_ACCESS_KEY:
        return None
        
    return boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION
    )

async def upload_file(file_content: bytes, filename: str, content_type: str) -> str:
    """
    Upload a file to S3. Falls back to local storage if S3 is not configured.
    Returns the URL of the uploaded file.
    """
    settings = get_settings()
    s3_client = get_s3_client()
    
    if s3_client:
        try:
            # Upload to S3
            bucket = settings.S3_BUCKET_NAME
            s3_client.put_object(
                Bucket=bucket,
                Key=filename,
                Body=file_content,
                ContentType=content_type
            )
            # Create a URL for the object
            url = f"https://{bucket}.s3.{settings.AWS_REGION}.amazonaws.com/{filename}"
            return url
        except ClientError as e:
            logger.error(f"Failed to upload to S3: {e}")
            # Fall back to local storage
            logger.warning("Falling back to local storage")

    # Local storage fallback
    upload_dir = os.path.join(os.getcwd(), "uploads", "documents")
    os.makedirs(upload_dir, exist_ok=True)
    
    file_path = os.path.join(upload_dir, filename)
    with open(file_path, 'wb') as out_file:
        out_file.write(file_content)
        
    return f"/uploads/documents/{filename}"

async def delete_file(url: str) -> bool:
    """
    Delete a file from S3 or local storage based on the URL.
    Returns True if successful.
    """
    if not url:
        return True
        
    if "s3" in url and "amazonaws.com" in url:
        # It's an S3 URL
        settings = get_settings()
        s3_client = get_s3_client()
        
        if not s3_client:
            return False
            
        try:
            # Extract filename from URL
            filename = url.split("/")[-1]
            bucket = settings.S3_BUCKET_NAME
            
            s3_client.delete_object(
                Bucket=bucket,
                Key=filename
            )
            return True
        except ClientError as e:
            logger.error(f"Failed to delete from S3: {e}")
            return False
    else:
        # It's a local file URL
        try:
            # Remove leading slash if present
            local_path = url.lstrip("/")
            file_path = os.path.join(os.getcwd(), local_path)
            
            if os.path.exists(file_path):
                os.remove(file_path)
            return True
        except Exception as e:
            logger.error(f"Failed to delete local file: {e}")
            return False
