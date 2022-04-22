using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using AssetManagement.Assets.DTO;
using AssetManagement.IncreaseAssets.DTO;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.IncreaseAssets
{
    public class IncreaseAssetAppService: AssetManagementAppServiceBase, IIncreaseAssetAppService
    {
        private readonly IRepository<IncreaseAsset> _increaseAssetRepository;
        public IncreaseAssetAppService(IRepository<IncreaseAsset> increaseAssetRepository)
        {
            _increaseAssetRepository = increaseAssetRepository;
        }
        public async Task<ListResultDto<IncreaseAssetDto>> GetIncreaseAssets()
        {
            try
            {
                var increaseAssets = await _increaseAssetRepository.GetAll().ToListAsync();
                var increaseAssetsDtos= ObjectMapper.Map<List<IncreaseAssetDto>>(increaseAssets);
                return new ListResultDto<IncreaseAssetDto>(increaseAssetsDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<IncreaseAssetDto> InsertOrUpdateIncreaseAsset(IncreaseAssetInputDto input)
        {
            try
            {
                if (input.Id == 0)
                {
                    var increaseAsset = ObjectMapper.Map<IncreaseAsset>(input);
                    await _increaseAssetRepository.InsertAsync(increaseAsset);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<IncreaseAssetDto>(increaseAsset);
                }
                if (input.Id > 0)
                {
                    var increaseAsset = await _increaseAssetRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, increaseAsset);
                    return ObjectMapper.Map<IncreaseAssetDto>(increaseAsset);
                }
                return null;
               
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        //public AssetDto GetAsset(GetAssetInput input)
        //{
        //    try
        //    {
        //        var employee = _assetRepository.FirstOrDefault(x => x.Id == input.Id);
        //        var output = ObjectMapper.Map<AssetDto>(employee);
        //        return output;
        //    }
        //    catch (Exception e)
        //    {
        //        throw (e);
        //    }

        //}
        //public async Task UpdateAsset(UpdateAssetDto input)
        //{
        //    try
        //    {
        //        var asset = await _assetRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
        //        ObjectMapper.Map(input, asset);
        //    }
        //    catch (Exception e)
        //    {
        //        throw (e);
        //    }
        //}

        public async Task DeleteIncreaseAsset(DeleteIncreaseAssetInput input)
        {
            try
            {
                var increaseAsset = _increaseAssetRepository.FirstOrDefault(x => x.Id == input.Id);
                if (increaseAsset == null)
                {
                    throw new UserFriendlyException("No Data Found");
                }
                increaseAsset.Assets.ForEach(t => t.IncreaseAssetId = null);
                await _increaseAssetRepository.DeleteAsync(increaseAsset);
            }
            catch (Exception e)
            {
                throw (e);
            }
        }
    }
}
