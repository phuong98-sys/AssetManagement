using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AssetManagement;
using AssetManagement.AssetTypes;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WS.AssetTypes.DTO;

namespace WS.AssetTypes
{
    public class AssetTypeAppService: AssetManagementAppServiceBase, IAssetTypeAppService
    {
        private readonly IRepository<AssetType> _assetType;
        public AssetTypeAppService(IRepository<AssetType> assetType)
        {
            _assetType = assetType;
        }
        public async Task<ListResultDto<AssetTypeDto>> GetAll()
        {
            try {
                var assetTypes = await _assetType.GetAll().ToListAsync();
                var assetTypeDtos = ObjectMapper.Map<List<AssetTypeDto>>(assetTypes);
                return new ListResultDto<AssetTypeDto>(assetTypeDtos);
            }
            catch ( Exception e)
            {
                throw (e);

            }
        }
    }
}
