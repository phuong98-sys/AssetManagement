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
    public class AssetDto: EntityDto
    {
        public int Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public DateTime? IncreaseAssetDate { get; set; }
        public DateTime? AmortizationDate { get; set; }
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
        public int AssetTypeId { get; set; }
        public DateTime CreationTime { get; set; }
    }
    [AutoMapFrom(typeof(Asset))]
    public class AssetListDto
    { 
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public DateTime? IncreaseAssetDate { get; set; }
        public DateTime? AmortizationDate { get; set; }
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
        public int AssetTypeId { get; set; }
        public DateTime CreationTime { get; set; }
    }

    [AutoMapTo(typeof(Asset))]
    public class AssetInputDto: EntityDto
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public DateTime? IncreaseAssetDate { get; set; }
        public DateTime? AmortizationDate { get; set; }
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
        public int AssetTypeId { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class GetAssetInput
    {
        public int Id { get; set; }
    }
    [AutoMapTo(typeof(Asset))]
    public class UpdateAssetDto : EntityDto
    {
        public int Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public DateTime? IncreaseAssetDate { get; set; }
        public DateTime? AmortizationDate { get; set; }
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
        public int AssetTypeId { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class DeleteAssetInput
    {
        public int Id { get; set; }
    }
}
