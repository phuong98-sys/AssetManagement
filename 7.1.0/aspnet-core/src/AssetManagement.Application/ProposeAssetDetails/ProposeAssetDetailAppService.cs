using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AssetManagement.ProposeAssetDetails.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ProposeAssetDetails
{
    public class ProposeAssetDetailAppService : AssetManagementAppServiceBase, IProposeAssetDetailAppService
    {
        private readonly IRepository<ProposeAssetDetail> _proposeAssetDetailRepository;
        public ProposeAssetDetailAppService(IRepository<ProposeAssetDetail> proposeAssetDetailRepository)
        {
            _proposeAssetDetailRepository = proposeAssetDetailRepository;
        }
        public async Task<ListResultDto<ProposeAssetDetailDto>> GetProposeAssetDetails()
        {
            try
            {
                var proposeAssetDetails = await _proposeAssetDetailRepository.GetAll()
                    .Select(a => new ProposeAssetDetailDto
                    {
                        Id = a.Id,
                        ProposeAssetId=a.ProposeAssetId,
                        AssetId=a.AssetId,
                        AssetName=a.Asset.AssetName,
                        AssetTypeName=a.Asset.AssetTypeName,
                        DateFound =a.DateFound,
                        Quantity=a.Quantity,
                        Describe=a.Describe,
                        DepartmentId=a.DepartmentId,
                        DepartmentName=a.Department.DepartmentName,
                        CreationTime = a.CreationTime
                    }).ToListAsync();
                var proposeAssetDetailDtos = ObjectMapper.Map<List<ProposeAssetDetailDto>>(proposeAssetDetails);
                return new ListResultDto<ProposeAssetDetailDto>(proposeAssetDetailDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<ProposeAssetDetailListDto> InsertOrUpdateProposeAssetDetail(ProposeAssetDetailInputDto input)
        {
            try
            {
                if (!input.Id.HasValue)
                {

                    var proposeAssetDetail = ObjectMapper.Map<ProposeAssetDetail>(input);
                    await _proposeAssetDetailRepository.InsertAsync(proposeAssetDetail);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<ProposeAssetDetailListDto>(proposeAssetDetail);
                }
                else
                {


                    var proposeAssetDetailForEdit = await _proposeAssetDetailRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, proposeAssetDetailForEdit);
                    return ObjectMapper.Map<ProposeAssetDetailListDto>(proposeAssetDetailForEdit);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public ProposeAssetDetailDto GetProposeAssetDetail(GetProposeAssetDetailInput input)
        {
            try
            {
                var employee = _proposeAssetDetailRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<ProposeAssetDetailDto>(employee);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task DeleteProposeAssetDetail(DeleteProposeAssetDetailInput input)
        {
            try
            {
                var task = _proposeAssetDetailRepository.FirstOrDefault(x => x.Id == input.Id);
                if (task == null)
                {
                    throw new UserFriendlyException("No Data Found");
                }
                else
                {
                    _proposeAssetDetailRepository.Delete(task);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
    }
}
