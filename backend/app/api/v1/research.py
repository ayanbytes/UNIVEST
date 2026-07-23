from fastapi import APIRouter, Depends, status, BackgroundTasks
from app.schemas.research import ResearchCallCreate, ResearchCallResponse, ResearchApprovalCreate, ResearchApprovalResponse
from app.models.user import User
from app.core.dependencies import get_current_analyst_or_admin, get_current_admin
from app.services.research_service import ResearchService
from app.services.notification_service import NotificationService
from app.core.database import get_db
from app.repositories.research_repository import ResearchRepository
from sqlalchemy.ext.asyncio import AsyncSession
import uuid

router = APIRouter()

def get_research_service(db: AsyncSession = Depends(get_db)) -> ResearchService:
    return ResearchService(ResearchRepository(db))

@router.post("/", response_model=ResearchCallResponse, status_code=status.HTTP_201_CREATED)
async def create_research_call(
    call_data: ResearchCallCreate,
    current_user: User = Depends(get_current_analyst_or_admin),
    research_service: ResearchService = Depends(get_research_service)
):
    """
    Analysts and Admins can create draft research calls.
    """
    return await research_service.create_draft_call(current_user.id, call_data)

@router.post("/{call_id}/approve", response_model=ResearchCallResponse)
async def approve_research_call(
    call_id: uuid.UUID,
    approval_data: ResearchApprovalCreate,
    background_tasks: BackgroundTasks,
    current_admin: User = Depends(get_current_admin),
    research_service: ResearchService = Depends(get_research_service)
):
    """
    Admins can approve and publish a research call.
    This also triggers notifications to subscribers.
    """
    # Ensure ID matches
    approval_data.call_id = call_id
    call = await research_service.approve_and_publish(current_admin.id, approval_data)
    
    # Trigger background notifications
    background_tasks.add_task(NotificationService.notify_new_research_call, call)
    
    return call

@router.get("/feed", response_model=list[ResearchCallResponse])
async def get_research_feed(
    skip: int = 0,
    limit: int = 50,
    research_service: ResearchService = Depends(get_research_service)
    # In production, we'd add `Depends(get_current_user)` to ensure only active subscribers see this
):
    """
    Fetch the published research calls feed for users.
    """
    return await research_service.get_feed(limit=limit, skip=skip)

@router.get("/dashboard", response_model=list[ResearchCallResponse])
async def get_research_dashboard(
    skip: int = 0,
    limit: int = 50,
    current_user: User = Depends(get_current_analyst_or_admin),
    research_service: ResearchService = Depends(get_research_service)
):
    """
    Fetch all research calls (including drafts) for the analyst/admin dashboard.
    """
    return await research_service.get_all_calls(limit=limit, skip=skip)
