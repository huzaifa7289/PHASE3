from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/api/chat", tags=["chat"])

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

@router.post("")
async def chat(request: ChatRequest):
    """Chat endpoint for task management"""
    try:
        message = request.message.lower()
        
        # Simple keyword matching for now
        if "create" in message or "add" in message:
            reply = "Task creation feature coming soon! For now, use the manual form."
        elif "list" in message or "show" in message:
            reply = "Here are your tasks. Use the Tasks tab to view them all."
        elif "delete" in message or "remove" in message:
            reply = "You can delete tasks using the delete button on each task."
        elif "help" in message:
            reply = "I can help you with: create, list, update, or delete tasks. Try saying 'create a task' or 'show my tasks'."
        else:
            reply = f"You said: {request.message}. I'm learning - tell me more about what you need!"
        
        return ChatResponse(reply=reply)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))