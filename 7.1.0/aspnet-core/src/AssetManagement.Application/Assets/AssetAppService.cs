using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
using AssetManagement.Assets.DTO;
using AssetManagement.SuggestionHandlingDetails;
using AssetManagement.SuggestionHandlings;
using AssetManagement.SuggestionHandlings.DTO;
using AssetManagement.TransferDetails;
using AssetManagement.Transfers.DTO;
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
        private readonly IRepository<TransferDetail> _transferDetailRepository;
        public AssetAppService(IRepository<Asset> assetRepository,
            IRepository<SuggestionHandlingDetail> suggestionHandlingDetailRepository,
            IRepository<TransferDetail> transferDetailRepository)
        {
            _assetRepository = assetRepository;
            _suggestionHandlingDetailRepository = suggestionHandlingDetailRepository;
            _transferDetailRepository = transferDetailRepository;
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
                        ReduceAssetId = a.ReduceAssetId,
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
                     ReduceAssetId = a.ReduceAssetId,
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
        public async Task<ListResultDto<SuggestionHandlingDetailDto>> SuggestionHandlingList(List<AssetSuggestionHandlingDto> inputList, int suggestionHandlingId, int index)
        {
            try
            {
                if(index == 0)
                {
                    var suggestionHandlingDetailList = new List<SuggestionHandlingDetail>();
                    foreach (var asset in inputList)
                    {
                        var suggestionHandlingDetailForEdit = await _suggestionHandlingDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.SuggestionHandlingId == suggestionHandlingId);
                        if (suggestionHandlingDetailForEdit != null)
                        {
                            // edit asser
                            //var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                            //ObjectMapper.Map(asset, assetForEdit);
                            // edit suggestionHandling

                            var suggestionHandlingDetail = new SuggestionHandlingDetailInputDto();
                            suggestionHandlingDetailForEdit.HandlingMethodId = asset.HandlingMethodId;
                            suggestionHandlingDetailForEdit.HandlingMethod = asset.HandlingMethod;
                            //ObjectMapper.Map<SuggestionHandlingDetail>(suggestionHandlingDetailForEdit);
                            await _suggestionHandlingDetailRepository.UpdateAsync(suggestionHandlingDetailForEdit);
                            //await CurrentUnitOfWork.SaveChangesAsync();
                            suggestionHandlingDetailList.Add(suggestionHandlingDetailForEdit);
                        }
                        else
                        {
                            var suggestionHandlingDetail = new SuggestionHandlingDetailInputDto();
                            suggestionHandlingDetail.AssetId = (int)asset.Id;
                            suggestionHandlingDetail.SuggestionHandlingId = suggestionHandlingId;
                            suggestionHandlingDetail.HandlingMethodId = asset.HandlingMethodId;
                            suggestionHandlingDetail.HandlingMethod = asset.HandlingMethod;
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
                if(index == 1){
                    foreach (var asset in inputList)
                    {
                        var suggestionHandlingDetailForEdit = await _suggestionHandlingDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.SuggestionHandlingId == suggestionHandlingId);
                        if (suggestionHandlingDetailForEdit != null)
                        {
                            _suggestionHandlingDetailRepository.Delete(suggestionHandlingDetailForEdit);
                            //await CurrentUnitOfWork.SaveChangesAsync();
                        }
                        

                    }
                    return null;
                }
                return null;
               
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task<ListResultDto<AssetSuggestionHandlingDto>> GetSuggestionHandling(int suggestionHandlingId)
        {
            try
            {
                var query = _assetRepository.GetAll();
                var queryLeftJoin = from s in _suggestionHandlingDetailRepository.GetAll().Where(x => x.SuggestionHandlingId == suggestionHandlingId)
                                    join a in query on s.AssetId equals a.Id into ps
                                    from u in ps.DefaultIfEmpty()
                                    select new { query = u , HandlingMethodId = s.HandlingMethodId, HandlingMethod = s.HandlingMethod };
                var assets = await queryLeftJoin
                    .Select(t => new AssetSuggestionHandlingDto
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
                        ReduceAssetId = t.query.ReduceAssetId,
                        ReasonReduceId = t.query.ReasonReduceId,
                        CreatorUserId = t.query.CreatorUserId,
                        DepartmentName = t.query.Department.DepartmentName,
                        EmployeeName = t.query.Employee.EmployeeName,
                        StartDate = t.query.StartDate,
                        AnnualAmortizationValue = t.query.AnnualAmortizationValue,
                        ReasonReduceNote = t.query.ReasonReduceNote,
                        CreatorUserName = t.query.User.Name,
                        DepartmentId = t.query.DepartmentId,
                        EmployeeId = t.query.EmployeeId,
                        HandlingMethodId = t.HandlingMethodId,
                        HandlingMethod = t.HandlingMethod
                    })
                .ToListAsync();
                var assetDtos = ObjectMapper.Map<List<AssetSuggestionHandlingDto>>(assets);
                return new ListResultDto<AssetSuggestionHandlingDto>(assetDtos);
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task DeleteSuggestionHandling(List<AssetSuggestionHandlingDto> inputList , int suggestionHandlingId)
        {
            try
            {
                foreach (var asset in inputList)
                {
                    var suggestionHandlingDetailForEdit = await _suggestionHandlingDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.SuggestionHandlingId == suggestionHandlingId);
                    if (suggestionHandlingDetailForEdit != null)
                    {
                        _suggestionHandlingDetailRepository.Delete(suggestionHandlingDetailForEdit);
                        //await CurrentUnitOfWork.SaveChangesAsync();
                    }
                   
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        //
        public async Task<ListResultDto<TransferDetailDto>> TransferList(List<AssetTransferDto> inputList, int transferId, int index)
        {
            try
            {
                if (index == 0)
                {
                    var transferDetailList = new List<TransferDetail>();
                    foreach (var asset in inputList)
                    {
                        var transferDetailForEdit = await _transferDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.TransferId == transferId);
                        if (transferDetailForEdit != null)
                        {
                            // edit asser
                            //var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                            //ObjectMapper.Map(asset, assetForEdit);
                            // edit transfer

                            var transferDetail = new TransferDetailInputDto();
                            transferDetailForEdit.Describe = asset.Describe;
                            //ObjectMapper.Map<transferDetail>(transferDetailForEdit);
                            await _transferDetailRepository.UpdateAsync(transferDetailForEdit);
                            //await CurrentUnitOfWork.SaveChangesAsync();
                            transferDetailList.Add(transferDetailForEdit);
                        }
                        else
                        {
                            var transferDetail = new TransferDetailInputDto();
                            transferDetail.AssetId = (int)asset.Id;
                            transferDetail.TransferId = transferId;
                            transferDetail.Describe = asset.Describe;
                            transferDetail.CreatorUserId = AbpSession.GetUserId();
                            var transferDetail2 = ObjectMapper.Map<TransferDetail>(transferDetail);
                            transferDetailList.Add(transferDetail2);
                            await _transferDetailRepository.InsertAsync(transferDetail2);
                            await CurrentUnitOfWork.SaveChangesAsync();
                            ObjectMapper.Map<TransferDetail>(transferDetail2);
                            //insert
                        }

                    }
                    var transferDetailList2 = ObjectMapper.Map<List<TransferDetailDto>>(transferDetailList);
                    return new ListResultDto<TransferDetailDto>(transferDetailList2);
                }
                if (index == 1)
                {
                    foreach (var asset in inputList)
                    {
                        var transferDetailForEdit = await _transferDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.TransferId == transferId);
                        if (transferDetailForEdit != null)
                        {
                            _transferDetailRepository.Delete(transferDetailForEdit);
                            //await CurrentUnitOfWork.SaveChangesAsync();
                        }


                    }
                    return null;
                }
                return null;

            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task<ListResultDto<AssetTransferDto>> GetTransfer(int transferId)
        {
            try
            {
                var query = _assetRepository.GetAll();
                var queryLeftJoin = from s in _transferDetailRepository.GetAll().Where(x => x.TransferId == transferId)
                                    join a in query on s.AssetId equals a.Id into ps
                                    from u in ps.DefaultIfEmpty()
                                    select new { query = u, Describe = s.Describe };
                var assets = await queryLeftJoin
                    .Select(t => new AssetTransferDto
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
                        ReduceAssetId = t.query.ReduceAssetId,
                        ReasonReduceId = t.query.ReasonReduceId,
                        CreatorUserId = t.query.CreatorUserId,
                        DepartmentName = t.query.Department.DepartmentName,
                        EmployeeName = t.query.Employee.EmployeeName,
                        StartDate = t.query.StartDate,
                        AnnualAmortizationValue = t.query.AnnualAmortizationValue,
                        ReasonReduceNote = t.query.ReasonReduceNote,
                        CreatorUserName = t.query.User.Name,
                        DepartmentId = t.query.DepartmentId,
                        EmployeeId = t.query.EmployeeId,
                        Describe = t.Describe
                    })
                .ToListAsync();
                var assetDtos = ObjectMapper.Map<List<AssetTransferDto>>(assets);
                return new ListResultDto<AssetTransferDto>(assetDtos);
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public async Task DeleteTransfer(List<AssetTransferDto> inputList, int transferId)
        {
            try
            {
                foreach (var asset in inputList)
                {
                    var transferDetailForEdit = await _transferDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.TransferId == transferId);
                    if (transferDetailForEdit != null)
                    {
                        _transferDetailRepository.Delete(transferDetailForEdit);
                        //await CurrentUnitOfWork.SaveChangesAsync();
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
