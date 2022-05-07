using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AssetManagement.ProposeAssets.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ProposeAssets
{
    public class ProposeAssetAppService : AssetManagementAppServiceBase, IProposeAssetAppService
    {
        private readonly IRepository<ProposeAsset> _proposeAssetRepository;
        public ProposeAssetAppService(IRepository<ProposeAsset> proposeAssetRepository)
        {
            _proposeAssetRepository = proposeAssetRepository;
        }
        public async Task<ListResultDto<ProposeAssetDto>> GetProposeAssets()
        {
            try
            {
                var proposeAssets = await _proposeAssetRepository.GetAll()
                    .Select(a => new ProposeAssetDto
                    {
                        Id = a.Id,
                        NumbersProposeAsset=a.NumbersProposeAsset,
                        DateFound=a.DateFound,
                        Proponent=a.Proponent,
                        Content =a.Content,
                        Approver =a.Approver,
                        ApprovalStatus=a.ApprovalStatus,
                        UserCode=a.UserCode,
                        CreationTime = a.CreationTime
                    }).ToListAsync();
                var proposeAssetDtos = ObjectMapper.Map<List<ProposeAssetDto>>(proposeAssets);
                return new ListResultDto<ProposeAssetDto>(proposeAssetDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<ProposeAssetListDto> InsertOrUpdateProposeAsset(ProposeAssetInputDto input)
        {
            try
            {
                if (!input.Id.HasValue)
                {

                    var proposeAsset = ObjectMapper.Map<ProposeAsset>(input);
                    await _proposeAssetRepository.InsertAsync(proposeAsset);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<ProposeAssetListDto>(proposeAsset);
                }
                else
                {


                    var proposeAssetForEdit = await _proposeAssetRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, proposeAssetForEdit);
                    return ObjectMapper.Map<ProposeAssetListDto>(proposeAssetForEdit);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public ProposeAssetDto GetProposeAsset(GetProposeAssetInput input)
        {
            try
            {
                var employee = _proposeAssetRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<ProposeAssetDto>(employee);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task DeleteProposeAsset(DeleteProposeAssetInput input)
        {
            try
            {
                var task = _proposeAssetRepository.FirstOrDefault(x => x.Id == input.Id);
                if (task == null)
                {
                    throw new UserFriendlyException("No Data Found");
                }
                else
                {
                    _proposeAssetRepository.Delete(task);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
    }
}
