using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AssetManagement.PlaneMaintains.DTO;
using Abp.Application.Services;

namespace AssetManagement.PlaneMaintains
{
    public interface IPlaneMaintainAppService : IApplicationService
    {
        Task<ListResultDto<PlaneMaintainDto>> GetPlaneMaintains();
        PlaneMaintainDto GetPlaneMaintain(GetPlaneMaintainInput input);
        Task<PlaneMaintainListDto> InsertOrUpdatePlaneMaintain(PlaneMaintainInputDto input);
    }
}