using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
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
        public async Task<ListResultDto<AssetDto>> GetAssets()
        {
            try
            {
                var assets = await _assetRepository.GetAll()
                    .Include(x => x.AssetStatus)
                    .Include(y => y.AssetType)
                    .Include(y => y.ReasonReduce)
                    .Select(a => new AssetDto
                    {
                        Id = a.Id,
                        AssetCode = a.AssetCode,
                        AssetName = a.AssetName,
                        IncreaseAssetDate = a.IncreaseAssetDate,
                        //NumberOfDayAmortization = 1,
                        NumberOfDayUsedAsset = a.NumberOfDayUsedAsset,
                        NumberOfDayRemaing = a.NumberOfDayRemaing,
                        OrginalPrice = a.OrginalPrice,
                        AmortizationValue = a.AmortizationValue,
                        DepreciationOfAsset = a.DepreciationOfAsset,
                        ResidualValue = a.ResidualValue,
                        UsageStatus = a.AssetStatus.AssetStatusName,
                        ReasonForReduction = a.ReasonReduce.ReasonReduceName,
                        RecoverableValue= a.RecoverableValue,
                        IncreaseAssetId = a.IncreaseAssetId,
                        AssetTypeId = a.AssetTypeId,
                        AssetTypeName = a.AssetType.AssetTypeName,
                        AssetStatusId = a.AssetStatusId,
                        CreationTime = a.CreationTime,
                        ReduceAssetId = a.ReasonReduceId,
                        ReasonReduceId = a.ReasonReduceId,
                        CreatorUserId = a.CreatorUserId
                    }).ToListAsync();
                var assetDtos = ObjectMapper.Map<List<AssetDto>>(assets);
                return new ListResultDto<AssetDto>(assetDtos);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<AssetListDto> InsertOrUpdateAsset(AssetInputDto input)
        {
            try
            {
                if (!input.Id.HasValue)
                {

                    var asset = ObjectMapper.Map<Asset>(input);
                    asset.CreatorUserId = AbpSession.GetUserId();
                    await _assetRepository.InsertAsync(asset);
                    await CurrentUnitOfWork.SaveChangesAsync();
                    return ObjectMapper.Map<AssetListDto>(asset);
                }
                else
                {
                    var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                    ObjectMapper.Map(input, assetForEdit);
                    return ObjectMapper.Map<AssetListDto>(assetForEdit);
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task IncreaseAssetList(List<AssetInputDto> inputList)
        {
            try
            {

                foreach (var asset in inputList)
                {
                    asset.AssetStatusId = 2;
                    var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                    ObjectMapper.Map(asset, assetForEdit);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task ReduceAssetList(List<AssetInputDto> inputList)
        {
            try
            {

                foreach (var asset in inputList)
                {
                    asset.AssetStatusId = 3;
                    var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                    ObjectMapper.Map(asset, assetForEdit);
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task test(List<AssetInputDto> inputList, int index)
        {
            try
            {
                if(index == 1)
                {
                    foreach (var asset in inputList)
                    {
                        asset.IncreaseAssetId = null;
                        asset.AmortizationValue = null;
                        asset.IncreaseAssetDate = null;
                        asset.NumberOfDayUsedAsset = null;
                        asset.AssetStatusId = 1;
                        var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                        ObjectMapper.Map(asset, assetForEdit);
                    }
                }
                if(index == 2)
                {
                    foreach (var asset in inputList)
                    {
                        asset.ReduceAssetId = null;
                        asset.ReduceAssetDate = null;
                        asset.AssetStatusId = 1;
                        asset.ReasonReduceId = null;
                        asset.RecoverableValue = null;
                        asset.ReasonForReduction = null;
                        var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                        ObjectMapper.Map(asset, assetForEdit);
                    }
                }
                
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        //public async Task DeleteListAssetReduced(List<AssetInputDto> inputList)
        //{
        //    try
        //    {

               
        //    }
        //    catch (Exception e)
        //    {
        //        throw (e);
        //    }

        //}


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
        public async Task<ListResultDto<AssetDto>> GetAssetIncreased(int increaseId)
        {
            try
            {
                var assetDtos = await _assetRepository.GetAll().Where(x => x.IncreaseAssetId == increaseId).ToListAsync();

                var assets = ObjectMapper.Map<List<AssetDto>>(assetDtos);
                return new ListResultDto<AssetDto>(assets);
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task<ListResultDto<AssetDto>> GetAssetReduced(int reduceId)
        {
            try
            {
                var assetDtos = await _assetRepository.GetAll().Where(x => x.ReduceAssetId == reduceId).ToListAsync();

                var assets = ObjectMapper.Map<List<AssetDto>>(assetDtos);
                return new ListResultDto<AssetDto>(assets);
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
