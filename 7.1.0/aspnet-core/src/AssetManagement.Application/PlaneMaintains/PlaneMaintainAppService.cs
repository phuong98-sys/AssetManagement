using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AssetManagement.PlaneMaintains.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.PlaneMaintains
{
    public class PlaneMaintainAppService : AssetManagementAppServiceBase, IPlaneMaintainAppService
    {
        private readonly IRepository<PlaneMaintain> _planeMaintainRepository;
        public PlaneMaintainAppService(IRepository<PlaneMaintain> planeMaintainRepository)
        {
            _planeMaintainRepository = planeMaintainRepository;
        }
        public async Task<ListResultDto<PlaneMaintainDto>> GetPlaneMaintains()
        {
            try
            {
                var planeMaintains = await _planeMaintainRepository.GetAll()
                    
                    .Select(a => new PlaneMaintainDto
                    {
                        Id = a.Id,
                        ExpectedDate = a.ExpectedDate,
                        Estimates = a.Estimates,
                        MaintenanceType = a.MaintenanceType,
                        Describe=a.Describe,
                        AssetId=a.AssetId,
                        AssetCode=a.Asset.AssetCode,
                        AssetName=a.Asset.AssetName,
                        AssetTypeName=a.Asset.AssetTypeName,
                        DepartmentName = a.Asset.DepartmentName,
                        CreationTime = a.CreationTime
                    }).ToListAsync();
                var planeMaintainDtos = ObjectMapper.Map<List<PlaneMaintainDto>>(planeMaintains);
                return new ListResultDto<PlaneMaintainDto>(planeMaintainDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<PlaneMaintainListDto> InsertOrUpdatePlaneMaintain(PlaneMaintainInputDto input)
        {
            try
            {
                if (!input.Id.HasValue)
                {

                    var planeMaintain = ObjectMapper.Map<PlaneMaintain>(input);
                    await _planeMaintainRepository.InsertAsync(planeMaintain);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<PlaneMaintainListDto>(planeMaintain);
                }
                else
                {


                    var planeMaintainForEdit = await _planeMaintainRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, planeMaintainForEdit);
                    return ObjectMapper.Map<PlaneMaintainListDto>(planeMaintainForEdit);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public PlaneMaintainDto GetPlaneMaintain(GetPlaneMaintainInput input)
        {
            try
            {
                var employee = _planeMaintainRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<PlaneMaintainDto>(employee);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task DeletePlaneMaintain(DeletePlaneMaintainInput input)
        {
            try
            {
                var task = _planeMaintainRepository.FirstOrDefault(x => x.Id == input.Id);
                if (task == null)
                {
                    throw new UserFriendlyException("No Data Found");
                }
                else
                {
                    _planeMaintainRepository.Delete(task);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
    }
}
