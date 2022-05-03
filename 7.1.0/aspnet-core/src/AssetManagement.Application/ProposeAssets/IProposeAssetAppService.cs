using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AssetManagement;
using AssetManagement.ProposeAssets;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using AssetManagement.ProposeAssets.DTO;

namespace AssetManagement.ProposeAssets
{
    public class ProposeAssetAppService : AssetManagementAppServiceBase, IProposeAssetAppService
    {
        private readonly IRepository<ProposeAsset> _proposeAsset;
        public ProposeAssetAppService(IRepository<ProposeAsset> proposeAsset)
        {
            _proposeAsset = proposeAsset;
        }
        public async Task<ListResultDto<ProposeAssetDto>> GetAll()
        {
            try
            {
                var proposeAssets = await _proposeAsset.GetAll().ToListAsync();
                var proposeAssetDtos = ObjectMapper.Map<List<ProposeAssetDto>>(proposeAssets);
                return new ListResultDto<ProposeAssetDto>(proposeAssetDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
    }
}