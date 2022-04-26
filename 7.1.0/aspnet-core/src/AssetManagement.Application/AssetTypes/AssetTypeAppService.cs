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
        private readonly IRepository<AssetType> _assetTypeRepository;
        public AssetTypeAppService(IRepository<AssetType> assetTypeRepository)
        {
            _assetTypeRepository = assetTypeRepository;
        }
        public async Task<ListResultDto<AssetTypeDto>> GetAssetTypes()
        {
            try {
                var assetTypes = await _assetTypeRepository.GetAll().ToListAsync();
                var assetTypeDtos = ObjectMapper.Map<List<AssetTypeDto>>(assetTypes);
                return new ListResultDto<AssetTypeDto>(assetTypeDtos);
            }
            catch ( Exception e)
            {
                throw (e);

            }
        }

        public async Task<AssetTypeDto> InsertOrUpdateAssetType(AssetTypeInputDto input)
        {
            try
            {
                if (input.Id == 0)
                {
                    var increaseAsset = ObjectMapper.Map<AssetType>(input);
                    await _assetTypeRepository.InsertAsync(increaseAsset);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<AssetTypeDto>(increaseAsset);
                }
                if (input.Id > 0)
                {
                    var increaseAsset = await _assetTypeRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, increaseAsset);
                    return ObjectMapper.Map<AssetTypeDto>(increaseAsset);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }

        public async Task DeleteAssetType(DeleteAssetTypeDto input)
        {
            try
            {
                var assetType = _assetTypeRepository.FirstOrDefault(x => x.Id == input.Id);
                if (assetType == null)
                {
                    throw new Abp.UI.UserFriendlyException("No Data Found");
                }
                assetType.Assets.ForEach(t => t.AssetTypeId = null);
                await _assetTypeRepository.DeleteAsync(assetType);
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
    }
}
