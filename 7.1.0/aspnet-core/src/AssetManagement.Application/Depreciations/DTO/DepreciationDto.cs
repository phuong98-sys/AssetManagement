using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Depreciations.DTO
{
   [AutoMapFrom(typeof(Depreciation))]
    public class DepreciationDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string DepreciationCode { get; set; }
        public DateTime DepreciationDate { get; set; }
        public string? Description { get; set; }
        public int? UserId { get; set; }
        public string? CreatorUserName { get; set; }

        public int Month { get; set; }
        public int Year { get; set; }
    }
    [AutoMapTo(typeof(Depreciation))]
    public class DepreciationInputDto : CreationAuditedEntityDto<int?>
    {
         public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string DepreciationCode { get; set; }
        public DateTime DepreciationDate { get; set; }
        public string? Description { get; set; }
        public int? UserId { get; set; }
        public string? CreatorUserName { get; set; }

        public int Month { get; set; }
        public int Year { get; set; }
    }
    public class DeleteDepreciationInput
    {
        public int Id { get; set; }
    }
    public class GetDepreciationInput
    {
        public int? Id { get; set; }
    }
    [AutoMapFrom(typeof(DepreciationDetail))]
    public class DepreciationDetailDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public int DepreciationId { get; set; }
        public int AssetId { get; set; }
        public long? UserId { get; set; }
        public string? CreatorUserName { get; set; }

        public DateTime AmortizationDate { get; set; }
        public double OrginalPrice { get; set; }
        public double MonthlyAmortizationValue { get; set; }
        public double DepreciationOfAsset { get; set; }
        public double ResidualValue { get; set; }
        public int NumberOfDayUsedAsset { get; set; }


    }
    [AutoMapTo(typeof(DepreciationDetail))]
    public class DepreciationDetailInputDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public int DepreciationId { get; set; }
        public int AssetId { get; set; }
        public long? UserId { get; set; }
        public string? CreatorUserName { get; set; }

        public DateTime AmortizationDate { get; set; }
        public double OrginalPrice { get; set; }
        public double MonthlyAmortizationValue { get; set; }
        public double DepreciationOfAsset { get; set; }
        public double ResidualValue { get; set; }
        public int NumberOfDayUsedAsset { get; set; }

    }
}
