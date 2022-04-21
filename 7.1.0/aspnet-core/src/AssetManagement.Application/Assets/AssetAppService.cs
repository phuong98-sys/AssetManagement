using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AssetManagement.Assets.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Assets
{
    public class AssetAppService: AssetManagementAppServiceBase, IAssetAppService
    {
        private readonly IRepository<Asset> _assetRepository;
        public AssetAppService(IRepository<Asset> assetRepository)
        {
            _assetRepository = assetRepository;
        }
        public async Task<ListResultDto<AssetDto>> GetAll()
        {
            try
            {
                var assets = await _assetRepository.GetAll().ToListAsync();
                var assetDtos = ObjectMapper.Map<List<AssetDto>>(assets);
                return new ListResultDto<AssetDto>(assetDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<AssetListDto> InsertAsset(AssetInputDto input)
        {
            try
            {
                var asset = ObjectMapper.Map<Asset>(input);
                await _assetRepository.InsertAsync(asset);
                await CurrentUnitOfWork.SaveChangesAsync();
                return ObjectMapper.Map<AssetListDto>(asset);
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public AssetDto GetAsset(GetAssetInput input)
        {
            try
            {
                var employee = _assetRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<AssetDto>(employee);
                return output;
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task UpdateAsset(UpdateAssetDto input)
        {
            try
            {
                var asset = await _assetRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                ObjectMapper.Map(input, asset);
            }
            catch (Exception e)
            {
                throw (e);
            }
        }

        public async Task DeleteAsset(DeleteAssetInput input)
        {
            try
            {
                var task = _assetRepository.FirstOrDefault(x => x.Id == input.Id);
                if (task == null)
                {
                    throw new UserFriendlyException("No Data Found");
                }
                else
                {
                    _assetRepository.Delete(task);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
    }
}
