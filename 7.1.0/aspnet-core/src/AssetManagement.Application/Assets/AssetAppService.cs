using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.Timing;
using Abp.UI;
using AssetManagement.Assets.DTO;
using AssetManagement.Depreciations;
using AssetManagement.Depreciations.DTO;
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
         private readonly IRepository<DepreciationDetail> _depreciationDetailRepository;
        public AssetAppService(IRepository<Asset> assetRepository,
            IRepository<SuggestionHandlingDetail> suggestionHandlingDetailRepository,
            IRepository<TransferDetail> transferDetailRepository,
            IRepository<DepreciationDetail> depreciationDetailRepository)
        {
            _assetRepository = assetRepository;
            _suggestionHandlingDetailRepository = suggestionHandlingDetailRepository;
            _transferDetailRepository = transferDetailRepository;
            _depreciationDetailRepository = depreciationDetailRepository;
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
                        OrginalPrice = a.OrginalPrice,                  //  nguyên giá
                        MonthlyAmortizationValue = a.MonthlyAmortizationValue, // giá trị khấu hao tháng
                        DepreciationOfAsset = a.DepreciationOfAsset,            // khấu hao lũy kế
                        ResidualValue = a.ResidualValue,                    // giá trị còn lại
                        NumberOfDayUsedAsset = a.NumberOfDayUsedAsset,      // số năm sử dụng
                        AmortizationDate = a.AmortizationDate,                 // ngày bắt đầu tính khấu hao
                        NumberOfDayRemaing = a.NumberOfDayRemaing,
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
                     EmployeeId = a.EmployeeId,
                     isDepreciation = a.isDepreciation
                 }).ToListAsync();
                var assets = ObjectMapper.Map<List<AssetDto>>(assetDtos);
                return new ListResultDto<AssetDto>(assets);
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
        public double SetDepreciation(DateTime Date)
        {
            var Today = Clock.Now;
            var DifferenceMonth = ((Today.Year - Date.Year) * 12) + Today.Month - Date.Month - 1;
            var NumberDayOfMonth1 = DateTime.DaysInMonth(Today.Year, Today.Month);
            var NumberDayOfMonth2 = DateTime.DaysInMonth(Date.Month, Date.Month);
            var NumberOfDay1 = Today.Day;
            var NumberOfDay2 = NumberDayOfMonth2 - Date.Day + 1;
            var Month1 = (double)NumberOfDay1 / NumberDayOfMonth1;
            var Month2 = (double)NumberOfDay2 / NumberDayOfMonth2;

            var TotalMonth = Month1 + DifferenceMonth + Month2;
            if (TotalMonth < 0)
            {
                return 0;
            }
            else
            {
                return Math.Round(TotalMonth, 3, MidpointRounding.AwayFromZero);
            }

        }
        public double SetDepreciationByMonth(DateTime Date, int Month, int Year)
        {
            var DifferenceMonth = ((Year - Date.Year) * 12) + Month - Date.Month;
            var NumberDayOfMonth2 = DateTime.DaysInMonth(Date.Month, Date.Month);
            var NumberOfDay2 = NumberDayOfMonth2 - Date.Day + 1;
            var Month2 = (double)NumberOfDay2 / NumberDayOfMonth2;

            var TotalMonth = DifferenceMonth + Month2;
            if (TotalMonth < 0)
            {
                return 0;
            }
            else
            {
                return Math.Round(TotalMonth, 3, MidpointRounding.AwayFromZero);
            }


        }
        public async Task<ListResultDto<AssetDto>> GetAssetDepreciations(List<AssetDto> assetList)
        {
            try
            {
                //var query = _assetRepository.GetAll();
                //var queryLeftJoin = from q in query
                //                    join a in assetList on q.Id equals a.Id into ps
                //                    from u in ps.DefaultIfEmpty()
                //                    select new { query = q };
                //var assets = await queryLeftJoin
                //    .Select(a => new AssetDto
                //    {
                //        Id = a.query.Id,
                //        AssetCode = a.query.AssetCode,
                //        AssetName = a.query.AssetName,
                //        IncreaseAssetDate = a.query.IncreaseAssetDate,
                //        NumberOfDayRemaing = a.query.NumberOfDayRemaing,

                //        AmortizationDate = a.query.AmortizationDate,                 // ngày bắt đầu tính khấu hao
                //        OrginalPrice = a.query.OrginalPrice,                  //  nguyên giá
                //        MonthlyAmortizationValue = a.query.MonthlyAmortizationValue, // giá trị khấu hao tháng
                //        DepreciationOfAsset = a.query.DepreciationOfAsset,          // khấu hao lũy kế
                //        ResidualValue = a.query.OrginalPrice,                    // giá trị còn lại
                //        NumberOfDayUsedAsset = a.query.NumberOfDayUsedAsset,      // số năm sử dụng


                //        UsageStatus = a.query.AssetStatus.AssetStatusName,
                //        ReasonForReduction = a.query.ReasonReduce.ReasonReduceName,
                //        RecoverableValue = a.query.RecoverableValue,
                //        IncreaseAssetId = a.query.IncreaseAssetId,
                //        AssetTypeId = a.query.AssetTypeId,
                //        AssetTypeName = a.query.AssetType.AssetTypeName,
                //        AssetStatusId = a.query.AssetStatusId,
                //        CreationTime = a.query.CreationTime,
                //        ReduceAssetId = a.query.ReduceAssetId,
                //        ReasonReduceName = a.query.ReasonReduce.ReasonReduceName,
                //        ReasonReduceId = a.query.ReasonReduceId,
                //        ReasonReduceNote = a.query.ReasonReduceNote,
                //        CreatorUserId = a.query.CreatorUserId,
                //        DepartmentName = a.query.Department.DepartmentName,
                //        EmployeeName = a.query.Employee.EmployeeName,
                //        StartDate = a.query.StartDate,
                //        AnnualAmortizationValue = a.query.AnnualAmortizationValue,
                //        CreatorUserName = a.query.User.Name
                //    }).ToListAsync();
                //foreach (  var assetDepreciation in assets)
                // {
                //     ass
                // }
                 assetList.ForEach(asset =>
                {
                    asset.AmortizationDate = asset.AmortizationDate;              // ngày bắt đầu tính khấu hao
                    asset.OrginalPrice = asset.OrginalPrice;          //  nguyên giá
                    asset.MonthlyAmortizationValue = asset.MonthlyAmortizationValue; // giá trị khấu hao tháng
                    asset.DepreciationOfAsset = asset.DepreciationOfAsset + (SetDepreciation(asset.AmortizationDate) * asset.MonthlyAmortizationValue);            // khấu hao lũy kế
                    asset.ResidualValue = asset.OrginalPrice - asset.DepreciationOfAsset;                 // giá trị còn lại
                    asset.NumberOfDayUsedAsset = asset.NumberOfDayUsedAsset;      // số năm sử dụng
                });
                //var assetDtos = ObjectMapper.Map<List<AssetDto>>(assetList);
                return new ListResultDto<AssetDto>(assetList);
            }
            catch (Exception e)
            {
                throw (e);

            }
        }
        public async Task<ListResultDto<AssetDto>> GetAssetDepreciationsByMonth(List<AssetDto> assetList, int month, int year)
        {
            try
            {

                var query = _assetRepository.GetAll();
                var queryLeftJoin = from q in query
                                    join a in assetList on q.Id equals a.Id into ps
                                    from u in ps.DefaultIfEmpty()
                                    select new { query = q};
                var assets = await queryLeftJoin
                    .Select(a => new AssetDto
                    {
                        Id = a.query.Id,
                        AssetCode = a.query.AssetCode,
                        AssetName = a.query.AssetName,
                        IncreaseAssetDate = a.query.IncreaseAssetDate,
                        NumberOfDayRemaing = a.query.NumberOfDayRemaing,

                        AmortizationDate = a.query.AmortizationDate,                 // ngày bắt đầu tính khấu hao
                        OrginalPrice = a.query.OrginalPrice,                  //  nguyên giá
                        MonthlyAmortizationValue = a.query.MonthlyAmortizationValue, // giá trị khấu hao tháng
                        DepreciationOfAsset = a.query.DepreciationOfAsset,          // khấu hao lũy kế
                        ResidualValue = a.query.OrginalPrice,                    // giá trị còn lại
                        NumberOfDayUsedAsset = a.query.NumberOfDayUsedAsset,      // số năm sử dụng


                        UsageStatus = a.query.AssetStatus.AssetStatusName,
                        ReasonForReduction = a.query.ReasonReduce.ReasonReduceName,
                        RecoverableValue = a.query.RecoverableValue,
                        IncreaseAssetId = a.query.IncreaseAssetId,
                        AssetTypeId = a.query.AssetTypeId,
                        AssetTypeName = a.query.AssetType.AssetTypeName,
                        AssetStatusId = a.query.AssetStatusId,
                        CreationTime = a.query.CreationTime,
                        ReduceAssetId = a.query.ReduceAssetId,
                        ReasonReduceName = a.query.ReasonReduce.ReasonReduceName,
                        ReasonReduceId = a.query.ReasonReduceId,
                        ReasonReduceNote = a.query.ReasonReduceNote,
                        CreatorUserId = a.query.CreatorUserId,
                        DepartmentName = a.query.Department.DepartmentName,
                        EmployeeName = a.query.Employee.EmployeeName,
                        StartDate = a.query.StartDate,
                        AnnualAmortizationValue = a.query.AnnualAmortizationValue,
                        CreatorUserName = a.query.User.Name
                    }).ToListAsync();
                //foreach (  var assetDepreciation in assets)
                // {
                //     ass
                // }
                assets.ForEach(asset =>
                {
                    asset.AmortizationDate = asset.AmortizationDate;              // ngày bắt đầu tính khấu hao
                    asset.OrginalPrice = asset.OrginalPrice;          //  nguyên giá
                    asset.MonthlyAmortizationValue = asset.MonthlyAmortizationValue; // giá trị khấu hao tháng
                    asset.DepreciationOfAsset = asset.DepreciationOfAsset + (SetDepreciationByMonth(asset.AmortizationDate, month, year) * asset.MonthlyAmortizationValue);            // khấu hao lũy kế
                    asset.ResidualValue = asset.OrginalPrice - asset.DepreciationOfAsset;                 // giá trị còn lại
                    asset.NumberOfDayUsedAsset = asset.NumberOfDayUsedAsset;      // số năm sử dụng
                });
                var assetDtos = ObjectMapper.Map<List<AssetDto>>(assets);
                return new ListResultDto<AssetDto>(assetDtos);
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
                            suggestionHandlingDetail.AssetId = asset.Id;
                            suggestionHandlingDetail.SuggestionHandlingId = (int)suggestionHandlingId;
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
        public async Task<ListResultDto<DepreciationDetailDto>> DepreciationList(List<AssetDto> inputList, int depreciationId, int index)
        {
            try
            {
                if (index == 0)
                {
                    var depreciationDetailList = new List<DepreciationDetail>();
                    foreach (var asset in inputList)
                    {
                        var depreciationDetailForEdit = await _depreciationDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.DepreciationId == depreciationId);
                        if (depreciationDetailForEdit != null)
                        {
                            //edit asser
                            //var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                            //assetForEdit.isDepreciation = true;
                            //ObjectMapper.Map(asset, assetForEdit);
                            // edit depreciation

                            var depreciationDetail = new DepreciationDetailInputDto();
                            depreciationDetailForEdit.AmortizationDate = asset.AmortizationDate;
                            depreciationDetailForEdit.OrginalPrice = asset.OrginalPrice;
                            depreciationDetailForEdit.MonthlyAmortizationValue = asset.MonthlyAmortizationValue == null ? 0 : (double)asset.MonthlyAmortizationValue;
                            depreciationDetailForEdit.DepreciationOfAsset = asset.DepreciationOfAsset == null ? 0 : (double)asset.DepreciationOfAsset;
                            depreciationDetailForEdit.ResidualValue = asset.ResidualValue == null ? 0 : (double)asset.ResidualValue;
                            depreciationDetailForEdit.NumberOfDayUsedAsset = (int)asset.NumberOfDayUsedAsset;
                            //ObjectMapper.Map<DepreciationDetail>(depreciationDetailForEdit);
                            await _depreciationDetailRepository.UpdateAsync(depreciationDetailForEdit);
                            //await CurrentUnitOfWork.SaveChangesAsync();
                            depreciationDetailList.Add(depreciationDetailForEdit);
                        }
                        else
                        {
                            var depreciationDetail = new DepreciationDetailInputDto();
                            depreciationDetail.AssetId = (int)asset.Id;
                            depreciationDetail.DepreciationId = depreciationId;
                            depreciationDetail.AmortizationDate = asset.AmortizationDate;
                            depreciationDetail.OrginalPrice = asset.OrginalPrice;
                            depreciationDetail.MonthlyAmortizationValue = asset.MonthlyAmortizationValue == null ?0 : (double)asset.MonthlyAmortizationValue;
                            depreciationDetail.DepreciationOfAsset = asset.DepreciationOfAsset == null ? 0 :  (double)asset.DepreciationOfAsset;
                            depreciationDetail.ResidualValue = asset.ResidualValue == null ? 0 : (double)asset.ResidualValue;
                            depreciationDetail.NumberOfDayUsedAsset = (int)asset.NumberOfDayUsedAsset;
                            depreciationDetail.CreatorUserId = AbpSession.GetUserId();
                            var depreciationDetail2 = ObjectMapper.Map<DepreciationDetail>(depreciationDetail);
                            depreciationDetailList.Add(depreciationDetail2);
                            await _depreciationDetailRepository.InsertAsync(depreciationDetail2);
                            await CurrentUnitOfWork.SaveChangesAsync();
                            ObjectMapper.Map<DepreciationDetail>(depreciationDetail2);
                            //insert
                            //edit asset
                            var assetForEdit = await _assetRepository.FirstOrDefaultAsync(x => x.Id == asset.Id);
                                var a = assetForEdit;
                            a.isDepreciation = true;
                            ObjectMapper.Map(a, assetForEdit);
                        }

                    }
                    var depreciationDetailList2 = ObjectMapper.Map<List<DepreciationDetailDto>>(depreciationDetailList);
                    return new ListResultDto<DepreciationDetailDto>(depreciationDetailList2);
                }
                if (index == 1)
                {
                    foreach (var asset in inputList)
                    {
                        var depreciationDetailForEdit = await _depreciationDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.DepreciationId == depreciationId);
                        if (depreciationDetailForEdit != null)
                        {
                            _depreciationDetailRepository.Delete(depreciationDetailForEdit);
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
        public async Task<ListResultDto<AssetDto>> test(List<AssetDto> inputList, int year, int month)
        {
            if( year > 0 && month > 0)
            {
                inputList.ForEach(asset =>
                {
                    asset.AmortizationDate = asset.AmortizationDate;              // ngày bắt đầu tính khấu hao
                    asset.OrginalPrice = asset.OrginalPrice;          //  nguyên giá
                    asset.MonthlyAmortizationValue = asset.MonthlyAmortizationValue; // giá trị khấu hao tháng
                    asset.DepreciationOfAsset = asset.DepreciationOfAsset + (SetDepreciationByMonth(asset.AmortizationDate, month, year) * asset.MonthlyAmortizationValue);            // khấu hao lũy kế
                    asset.ResidualValue = asset.OrginalPrice - asset.DepreciationOfAsset;                 // giá trị còn lại
                    asset.NumberOfDayUsedAsset = asset.NumberOfDayUsedAsset;      // số năm sử dụng
                });
            }
            else
            {
                inputList.ForEach(asset =>
                {
                    asset.AmortizationDate = asset.AmortizationDate;              // ngày bắt đầu tính khấu hao
                    asset.OrginalPrice = asset.OrginalPrice;          //  nguyên giá
                    asset.MonthlyAmortizationValue = asset.MonthlyAmortizationValue; // giá trị khấu hao tháng
                    asset.DepreciationOfAsset = asset.DepreciationOfAsset + (SetDepreciation(asset.AmortizationDate) * asset.MonthlyAmortizationValue);            // khấu hao lũy kế
                    asset.ResidualValue = asset.OrginalPrice - asset.DepreciationOfAsset;                 // giá trị còn lại
                    asset.NumberOfDayUsedAsset = asset.NumberOfDayUsedAsset;      // số năm sử dụng
                });
            }
            
            var assetDtos = ObjectMapper.Map<List<AssetDto>>(inputList);
            return new ListResultDto<AssetDto>(assetDtos);
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
        public async Task<ListResultDto<AssetDto>> GetDepreciation(int depreciationId)
        {
            try
            {
                var query = _assetRepository.GetAll();
                var d = _depreciationDetailRepository.GetAll().Where(x => x.DepreciationId == depreciationId);
   
                    var queryLeftJoin = from s in d
                                        join a in query on s.AssetId equals a.Id into ps
                                        from u in ps.DefaultIfEmpty()
                                        select new { query = u, depreciation = s };
                    var assets = await queryLeftJoin
                        .Select(t => new AssetDto
                        {
                            Id = t.query.Id,
                            AssetCode = t.query.AssetCode,
                            AssetName = t.query.AssetName,
                            IncreaseAssetDate = t.query.IncreaseAssetDate,
                            NumberOfDayRemaing = t.query.NumberOfDayRemaing,
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
                            AmortizationDate = t.depreciation.AmortizationDate,
                            OrginalPrice = t.depreciation.OrginalPrice,
                            MonthlyAmortizationValue = t.depreciation.MonthlyAmortizationValue == null ? 0 : t.depreciation.MonthlyAmortizationValue,
                            DepreciationOfAsset = t.depreciation.DepreciationOfAsset == null ? 0 : t.depreciation.DepreciationOfAsset,
                            ResidualValue = t.depreciation.ResidualValue == null ? 0 : t.depreciation.ResidualValue,
                            NumberOfDayUsedAsset = t.depreciation.NumberOfDayUsedAsset == null ? 0 : t.depreciation.NumberOfDayUsedAsset
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
        public async Task DeleteDepreciation(List<AssetDto> inputList, int depreciationId)
        {
            try
            {
                foreach (var asset in inputList)
                {
                    var depreciationDetailForEdit = await _depreciationDetailRepository.FirstOrDefaultAsync(x => x.AssetId == asset.Id && x.DepreciationId == depreciationId);
                    if (depreciationDetailForEdit != null)
                    {
                        _depreciationDetailRepository.Delete(depreciationDetailForEdit);
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
        public async Task<bool> DeleteAsset(DeleteAssetInput input)
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
                    if(task.IncreaseAssetId == null || task.ReduceAssetId != null)
                    {
                        // xóa ở depreciation List Detail
                        var DepreciationDetailList = _depreciationDetailRepository.GetAll().Where(x => x.DepreciationId == input.Id);
                        foreach (var DepreciationDetail in DepreciationDetailList)
                        {
                            _depreciationDetailRepository.Delete(DepreciationDetail);
                            //await CurrentUnitOfWork.SaveChangesAsync();
                        }
                        _assetRepository.Delete(task);
                        return true;
                    }
                    return false;
                }
            }
            catch (Exception e)
            {
                throw (e);
            }

        }
       
    }
}
