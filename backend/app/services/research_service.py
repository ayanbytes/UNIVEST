import uuid
from datetime import datetime, timezone
from app.models.research import ResearchCall, CallStatus, ResearchApproval
from app.repositories.research_repository import ResearchRepository
from app.schemas.research import ResearchCallCreate, ResearchApprovalCreate
from app.exceptions.handlers import AppError
from app.core.logger import logger

class ResearchService:
    def __init__(self, research_repo: ResearchRepository):
        self.research_repo = research_repo

    async def create_draft_call(self, analyst_id: uuid.UUID, data: ResearchCallCreate) -> ResearchCall:
        call = ResearchCall(
            analyst_id=analyst_id,
            **data.model_dump()
        )
        call.status = CallStatus.PENDING_APPROVAL
        
        logger.info(f"Analyst {analyst_id} created a new research call for {call.symbol}")
        return await self.research_repo.create_call(call)

    async def approve_and_publish(self, admin_id: uuid.UUID, approval_data: ResearchApprovalCreate) -> ResearchCall:
        call = await self.research_repo.get_call_by_id(approval_data.call_id)
        if not call:
            raise AppError("Research call not found", status_code=404)
            
        if call.status != CallStatus.PENDING_APPROVAL:
            raise AppError("Only calls pending approval can be published", status_code=400)

        # 1. Update Call
        call.status = CallStatus.PUBLISHED
        call.published_at = datetime.now(timezone.utc)
        
        await self.research_repo.update_call(call)
        
        # 2. Add Approval Record (would ideally be in a transaction via repo)
        approval = ResearchApproval(
            call_id=call.id,
            admin_id=admin_id,
            status="APPROVED",
            comments=approval_data.comments
        )
        self.research_repo.session.add(approval)
        await self.research_repo.session.commit()
        
        logger.info(f"Admin {admin_id} published research call {call.id}")
        
        # 3. Trigger Notification (handled in the router via NotificationService)
        return call

    async def get_feed(self, limit: int = 50, skip: int = 0):
        return await self.research_repo.get_published_calls(limit, skip)

    async def get_all_calls(self, limit: int = 50, skip: int = 0):
        return await self.research_repo.get_all_calls(limit, skip)
