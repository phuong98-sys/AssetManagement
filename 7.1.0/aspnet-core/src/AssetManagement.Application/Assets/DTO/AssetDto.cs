using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Assets.DTO
{
    [AutoMapFrom(typeof(Asset))]
    public class AssetDto: CreationAuditedEntityDto<int?>
    {
        public int Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public DateTime? IncreaseAssetDate { get; set; }
        public DateTime? ReduceAssetDate { get; set; }
        public int? NumberOfDayAmortization { get; set; }
        public int? NumberOfDayUsedAsset { get; set; }
        public int? NumberOfDayRemaing { get; set; }
        public double OrginalPrice { get; set; }
        public double? AmortizationValue { get; set; }
        public double? DepreciationOfAsset { get; set; }
        public double? ResidualValue { get; set; }
        public string UsageStatus { get; set; }
        public string? ReasonForReduction { get; set; }
        public double? RecoverableValue { get; set; }
        public int? IncreaseAssetId { get; set; }
        public int? ReduceAssetId { get; set; }
        public int? AssetTypeId { get; set; }
        public string AssetTypeName { get; set; }
        public int AssetStatusId { get; set; }
        public int? ReasonReduceId { get; set; }
        public string? LastModifierUserName { get; set; }
        public string? CreatorUserName { get; set; }
        public DateTime? LastModificationTime { get; set; }
    }
    [AutoMapFrom(typeof(Asset))]
    public class AssetListDto: CreationAuditedEntityDto<int?>
    { 
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public DateTime? IncreaseAssetDate { get; set; }
        public DateTime? ReduceAssetDate { get; set; }
        public int? NumberOfDayAmortization { get; set; }
        public int? NumberOfDayUsedAsset { get; set; }
        public int? NumberOfDayRemaing { get; set; }
        public double OrginalPrice { get; set; }
        public double? AmortizationValue { get; set; }
        public double? DepreciationOfAsset { get; set; }
        public double? ResidualValue { get; set; }
        public string UsageStatus { get; set; }
        public string? ReasonForReduction { get; set; }
        public double? RecoverableValue { get; set; }
        public int? IncreaseAssetId { get; set; }
        public int? ReduceAssetId { get; set; }
        public int AssetTypeId { get; set; }
        public int AssetStatusId { get; set; }
        public int? ReasonReduceId { get; set; }
    }

    [AutoMapTo(typeof(Asset))]
    public class AssetInputDto: CreationAuditedEntityDto<int?>
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public DateTime? IncreaseAssetDate { get; set; }
        public DateTime? ReduceAssetDate { get; set; }
        public int? NumberOfDayAmortization { get; set; }
        public int? NumberOfDayUsedAsset { get; set; }
        public int? NumberOfDayRemaing { get; set; }
        public double OrginalPrice { get; set; }
        public double? AmortizationValue { get; set; }
        public double? DepreciationOfAsset { get; set; }
        public double? ResidualValue { get; set; }
        public string UsageStatus { get; set; }
        public string? ReasonForReduction { get; set; }
        public double? RecoverableValue { get; set; }
        public int? IncreaseAssetId { get; set; }
        public int? ReduceAssetId { get; set; }
        public int AssetTypeId { get; set; }
        public int AssetStatusId { get; set; }
        public int? ReasonReduceId { get; set; }
    }
    public class GetAssetInput
    {
        public int Id { get; set; }
    }
    [AutoMapTo(typeof(Asset))]
    public class UpdateAssetDto : CreationAuditedEntityDto<int?>
    {
        public int Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public DateTime? IncreaseAssetDate { get; set; }
        public DateTime? ReduceAssetDate { get; set; }
        public int? NumberOfDayAmortization { get; set; }
        public int? NumberOfDayUsedAsset { get; set; }
        public int? NumberOfDayRemaing { get; set; }
        public double OrginalPrice { get; set; }
        public double? AmortizationValue { get; set; }
        public double? DepreciationOfAsset { get; set; }
        public double? ResidualValue { get; set; }
        public string UsageStatus { get; set; }
        public string? ReasonForReduction { get; set; }
        public double? RecoverableValue { get; set; }
        public int? IncreaseAssetId { get; set; }
        public int? ReduceAssetId { get; set; }
        public int? AssetTypeId { get; set; }
        public int? AssetStatusId { get; set; }
    }
    public class DeleteAssetInput
    {
        public int Id { get; set; }
    }
}
