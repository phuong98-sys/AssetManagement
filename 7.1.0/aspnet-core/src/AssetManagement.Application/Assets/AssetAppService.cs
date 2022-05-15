using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using AssetManagement.Assets.DTO;
using AssetManagement.SuggestionHandlingDetails;
using AssetManagement.SuggestionHandlings;
using AssetManagement.SuggestionHandlings.DTO;
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
        private readonly IRepository<SuggestionHandlingDetail> _suggestionHandlingDetailRepository;
        public AssetAppService(IRepository<Asset> assetRepository,
            IRepository<SuggestionHandlingDetail> suggestionHandlingDetailRepository)
        {
            _assetRepository = assetRepository;
            _suggestionHandlingDetailRepository = suggestionHandlingDetailRepository;
        }
        public async Task<ListResultDto<AssetDto>> GetAssets()
        {
            try
            {
                var assets = await _assetRepository.GetAll()
                    .Include(x => x.User)
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
                        MonthlyAmortizationValue = a.MonthlyAmortizationValue,
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
                        ReasonReduceName = a.ReasonReduce.ReasonReduceName,
                        ReasonReduceId = a.ReasonReduceId,
                        ReasonReduceNote = a.ReasonReduceNote,
                        CreatorUserId = a.CreatorUserId,
                        DepartmentName = a.Department.DepartmentName,
                        EmployeeName = a.Employee.EmployeeName,
                        StartDate = a.StartDate,
                        AnnualAmortizationValue = a.AnnualAmortizationValue,
                        CreatorUserName = a.User.Name
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
        public async Task IncreaseAssetList(List<AssetInputDto> inputList, int index)
        {
            try
            {
                //var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == input.Id);
                //ObjectMapper.Map(input, assetForEdit);
                //return ObjectMapper.Map<AssetListDto>(assetForEdit);
                if(index == 0)
                {
                    foreach (var asset in inputList)
                    {
                        asset.AssetStatusId = 2;
                        asset.ReduceAssetId = null;
                        var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                        ObjectMapper.Map(asset, assetForEdit);
                    }
                }
                
                if (index == 1)
                {
                    foreach (var asset in inputList)
                    {
                        asset.IncreaseAssetId = null;
                        asset.AssetStatusId = 1;
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
       
        public async Task ReduceAssetList(List<AssetInputDto> inputList, int index)
        {
            try
            {

                if( index == 0)
                {
                    foreach (var asset in inputList)
                    {
                        asset.AssetStatusId = 3;
                        var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                        ObjectMapper.Map(asset, assetForEdit);
                    }
                }
               
                if (index == 1)
                {
                    foreach (var asset in inputList)
                    {
                        asset.ReduceAssetId = null;
                        asset.ReduceAssetDate = null;
                        if (asset.IncreaseAssetId.HasValue)
                        {
                            asset.AssetStatusId = 2;
                        }
                        else
                        {
                            asset.AssetStatusId = 1;
                        }
                        asset.ReasonReduceId = null;
                        asset.RecoverableValue = null;
                        asset.ReasonForReduction = null;
                        asset.ReasonReduceNote = null;
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
      
        public AssetDto GetAsset(GetAssetInput input)
        {
            try
            {
                var asset = _assetRepository.FirstOrDefault(x => x.Id == input.Id);
                var output = ObjectMapper.Map<AssetDto>(asset);
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
                var assetDtos = await _assetRepository.GetAll().Where(x => x.IncreaseAssetId == increaseId)
                .Select(a => new AssetDto
                 {
                     Id = a.Id,
                     AssetCode = a.AssetCode,
                     AssetName = a.AssetName,
                     IncreaseAssetDate = a.IncreaseAssetDate,
                     NumberOfDayUsedAsset = a.NumberOfDayUsedAsset,
                     NumberOfDayRemaing = a.NumberOfDayRemaing,
                     OrginalPrice = a.OrginalPrice,
                     MonthlyAmortizationValue = a.MonthlyAmortizationValue,
                     DepreciationOfAsset = a.DepreciationOfAsset,
                     ResidualValue = a.ResidualValue,
                     UsageStatus = a.AssetStatus.AssetStatusName,
                     ReasonForReduction = a.ReasonReduce.ReasonReduceName,
                     RecoverableValue = a.RecoverableValue,
                     IncreaseAssetId = a.IncreaseAssetId,
                     AssetTypeId = a.AssetTypeId,
                     AssetTypeName = a.AssetType.AssetTypeName,
                     AssetStatusId = a.AssetStatusId,
                     CreationTime = a.CreationTime,
                     ReduceAssetId = a.ReasonReduceId,
                     ReasonReduceId = a.ReasonReduceId,
                     CreatorUserId = a.CreatorUserId,
                     DepartmentName = a.Department.DepartmentName,
                     EmployeeName = a.Employee.EmployeeName,
                     StartDate = a.StartDate,
                     AnnualAmortizationValue = a.AnnualAmortizationValue,
                    ReasonReduceNote = a.ReasonReduceNote,
                     CreatorUserName = a.User.Name,
                     DepartmentId = a.DepartmentId,
                     EmployeeId = a.EmployeeId
                 }).ToListAsync();
                var assets = ObjectMapper.Map<List<AssetDto>>(assetDtos);
                return new ListResultDto<AssetDto>(assets);
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task<ListResultDto<SuggestionHandlingDetailDto>> SuggestionHandlingList(List<AssetInputDto> inputList, int suggestionHandlingId)
        {
            try
            {


                var suggestionHandlingDetailList = new List<SuggestionHandlingDetail>();
                foreach (var asset in inputList)
                {
                    var suggestionHandlingDetailForEdit = await _suggestionHandlingDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.SuggestionHandlingId == suggestionHandlingId);
                    if (suggestionHandlingDetailForEdit != null)
                    {
                        // edit asser
                        var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                        ObjectMapper.Map(asset, assetForEdit);
                        // edit suggestionHandling

                        var suggestionHandlingDetail = new SuggestionHandlingDetailInputDto();
                        ObjectMapper.Map<SuggestionHandlingDetail>(suggestionHandlingDetailForEdit);
                        suggestionHandlingDetailForEdit.HandlingMethodId = asset.ReasonReduceId;
                        suggestionHandlingDetailForEdit.HandlingMethod = asset.ReasonReduceNote;
                        await CurrentUnitOfWork.SaveChangesAsync();
                        suggestionHandlingDetailList.Add(suggestionHandlingDetailForEdit);
                    }
                    else
                    {
                        var suggestionHandlingDetail = new SuggestionHandlingDetailInputDto();
                        suggestionHandlingDetail.AssetId = (int)asset.Id;
                        suggestionHandlingDetail.SuggestionHandlingId = suggestionHandlingId;
                        suggestionHandlingDetail.HandlingMethodId = asset.ReasonReduceId;
                        suggestionHandlingDetail.HandlingMethod = asset.ReasonReduceNote;
                        suggestionHandlingDetail.CreatorUserId = AbpSession.GetUserId();
                        var suggestionHandlingDetail2 = ObjectMapper.Map<SuggestionHandlingDetail>(suggestionHandlingDetail);
                        suggestionHandlingDetailList.Add(suggestionHandlingDetail2);
                        await _suggestionHandlingDetailRepository.InsertAsync(suggestionHandlingDetail2);
                        await CurrentUnitOfWork.SaveChangesAsync();
                        ObjectMapper.Map<SuggestionHandlingDetail>(suggestionHandlingDetail2);
                        //insert
                    }

                }
                var suggestionHandlingDetailList2 = ObjectMapper.Map<List<SuggestionHandlingDetailDto>>(suggestionHandlingDetailList);
                return new ListResultDto<SuggestionHandlingDetailDto>(suggestionHandlingDetailList2);
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task<ListResultDto<AssetDto>> GetSuggestionHandling(int suggestionHandlingId)
        {
            try
            {
                var query = _assetRepository.GetAll();
                var queryLeftJoin = from s in _suggestionHandlingDetailRepository.GetAll().Where(x => x.SuggestionHandlingId == suggestionHandlingId)
                                    join a in query on s.AssetId equals a.Id into ps
                                    from u in ps.DefaultIfEmpty()
                                    select new { query = u  };
                var assets = await queryLeftJoin
                    .Select(t => new AssetDto()
                    {
                        Id = t.query.Id,
                        AssetCode = t.query.AssetCode,
                        AssetName = t.query.AssetName,
                        IncreaseAssetDate = t.query.IncreaseAssetDate,
                        NumberOfDayUsedAsset = t.query.NumberOfDayUsedAsset,
                        NumberOfDayRemaing = t.query.NumberOfDayRemaing,
                        OrginalPrice = t.query.OrginalPrice,
                        MonthlyAmortizationValue = t.query.MonthlyAmortizationValue,
                        DepreciationOfAsset = t.query.DepreciationOfAsset,
                        ResidualValue = t.query.ResidualValue,
                        UsageStatus = t.query.AssetStatus.AssetStatusName,
                        ReasonForReduction = t.query.ReasonReduce.ReasonReduceName,
                        RecoverableValue = t.query.RecoverableValue,
                        IncreaseAssetId = t.query.IncreaseAssetId,
                        AssetTypeId = t.query.AssetTypeId,
                        AssetTypeName = t.query.AssetType.AssetTypeName,
                        AssetStatusId = t.query.AssetStatusId,
                        CreationTime = t.query.CreationTime,
                        ReduceAssetId = t.query.ReasonReduceId,
                        ReasonReduceId = t.query.ReasonReduceId,
                        CreatorUserId = t.query.CreatorUserId,
                        DepartmentName = t.query.Department.DepartmentName,
                        EmployeeName = t.query.Employee.EmployeeName,
                        StartDate = t.query.StartDate,
                        AnnualAmortizationValue = t.query.AnnualAmortizationValue,
                        ReasonReduceNote = t.query.ReasonReduceNote,
                        CreatorUserName = t.query.User.Name,
                        DepartmentId = t.query.DepartmentId,
                        EmployeeId = t.query.EmployeeId
                    })
                .ToListAsync();
                var assetDtos = ObjectMapper.Map<List<AssetDto>>(assets);
                return new ListResultDto<AssetDto>(assetDtos);
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task DeleteSuggestionHandling(List<AssetInputDto> inputList , int suggestionHandlingId)
        {
            try
            {
                foreach (var asset in inputList)
                {
                    var suggestionHandlingDetailForEdit = await _suggestionHandlingDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.SuggestionHandlingId == suggestionHandlingId);
                    if (suggestionHandlingDetailForEdit != null)
                    {
                        _suggestionHandlingDetailRepository.Delete(suggestionHandlingDetailForEdit);
                        await CurrentUnitOfWork.SaveChangesAsync();
                    }
                   
                }
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
