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
        public async Task<ListResultDto<AssetDto>> GetAssets()
        {
            try
            {
                var assets = await _assetRepository.GetAll()
                    .Include(x => x.AssetStatus)
                    .Include(y => y.AssetType)
                    .Select(a => new AssetDto
                    {
                        Id = a.Id,
                        AssetCode = a.AssetCode,
                        AssetName = a.AssetName,
                        IncreaseAssetDate = a.IncreaseAssetDate,
                        AmortizationDate = a.AmortizationDate,
                        NumberOfDayUsedAsset = a.NumberOfDayUsedAsset,
                        NumberOfDayRemaing = a.NumberOfDayRemaing,
                        OrginalPrice = a.OrginalPrice,
                        AmortizationValue = a.AmortizationValue,
                        DepreciationOfAsset = a.DepreciationOfAsset,
                        ResidualValue = a.ResidualValue,
                        UsageStatus = a.AssetStatus.AssetStatusName,
                        ReasonForReduction = a.ReasonForReduction,
                        RecoverableValue= a.RecoverableValue,
                        IncreaseAssetId = a.IncreaseAssetId,
                        AssetTypeId = a.AssetTypeId,
                        AssetTypeName = a.AssetType.AssetTypeName,
                        AssetStatusId = a.AssetStatusId,
                        CreationTime = a.CreationTime
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


            //try
            //{
            //    var asset = ObjectMapper.Map<Asset>(input);
            //    await _assetRepository.InsertAsync(asset);
            //    await CurrentUnitOfWork.SaveChangesAsync();
            //    return ObjectMapper.Map<AssetListDto>(asset);
            //}
            //catch (Exception e)
            //{
            //    throw (e);
            //}

        }
        //public async Task<AssetListDto> InsertAsset(AssetInputDto input)
        //{
        //    try
        //    {
        //        var asset = ObjectMapper.Map<Asset>(input);
        //        await _assetRepository.InsertAsync(asset);
        //        await CurrentUnitOfWork.SaveChangesAsync();
        //        return ObjectMapper.Map<AssetListDto>(asset);
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
