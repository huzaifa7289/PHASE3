"""Chat API routes for task management assistance."""
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/chat", tags=["chat"])


class ChatRequest(BaseModel):
    """Chat request model."""
    message: str


class ChatResponse(BaseModel):
    """Chat response model."""
    reply: str


@router.post("")
async def chat(request: ChatRequest):
    """
    Chat endpoint for task management assistance.
    
    Args:
        request: ChatRequest with user message
        
    Returns:
        ChatResponse with AI reply
    """
    try:
        if not request.message or not request.message.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Message cannot be empty"
            )
        
        message = request.message.lower().strip()
        
        # Simple keyword matching for task operations
        if any(word in message for word in ["create", "add", "new"]):
            reply = "Great! You can add a task manually using the form on the Tasks tab. What's the task about?"
        elif any(word in message for word in ["list", "show", "all", "my tasks"]):
            reply = "All your tasks are displayed in the Tasks tab. You can filter them by status!"
        elif any(word in message for word in ["delete", "remove"]):
            reply = "You can delete tasks by clicking the delete button on each task card."
        elif any(word in message for word in ["update", "edit", "change"]):
            reply = "You can update task status using the dropdown on each task."
        elif any(word in message for word in ["help", "how", "what can you do"]):
            reply = "I can help you with:\n• Creating tasks\n• Listing your tasks\n• Updating task status\n• Deleting tasks\n\nWhat would you like to do?"
        elif any(word in message for word in ["hello", "hi", "hey"]):
            reply = "Hello! 👋 I'm your task assistant. How can I help you manage your tasks today?"
        else:
            reply = f"You said: \"{request.message}\"\n\nI'm learning to understand task commands better. Try asking me to create, list, or manage your tasks!"
        
        logger.info(f"Chat message processed: {request.message[:50]}...")
        return ChatResponse(reply=reply)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Chat error: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error processing chat message"
        )


@router.get("/health")
async def chat_health():
    """Chat endpoint health check."""
    return {"status": "chat_api_healthy"}
