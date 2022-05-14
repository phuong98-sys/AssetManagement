using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using AssetManagement.AssetStatuses;
using AssetManagement.AssetTypes;
using AssetManagement.Authorization.Users;
using AssetManagement.Departments;
using AssetManagement.Employees;
using AssetManagement.IncreaseAssets;
using AssetManagement.ReasonRuduces;
using AssetManagement.ReduceAssets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Assets
{
    [Table("Asset")]
    public class Asset: FullAuditedEntity, IMayHaveTenant
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
        public double? MonthlyAmortizationValue { get; set; }
        public double? AnnualAmortizationValue { get; set; }
        public double? DepreciationOfAsset { get; set; }
        public double? ResidualValue { get; set; }
        public string UsageStatus { get; set; }
        public string? ReasonForReduction { get; set; }
        public double? RecoverableValue { get; set; }
        [ForeignKey(nameof(IncreaseAssetId))]
        public IncreaseAsset IncreaseAsset { get; set; } // them tu Increase table
        public int? IncreaseAssetId { get; set; }

        [ForeignKey(nameof(AssetTypeId))]
        public AssetType AssetType { get; set; } // them tu AssetType table
        public string AssetTypeName { get; set; }
        public int? AssetTypeId { get; set; }
        [ForeignKey(nameof(AssetStatusId))]
        public AssetStatus AssetStatus { get; set; } // them tu AssetStatus table
        public int AssetStatusId { get; set; }
        [ForeignKey(nameof(ReduceAssetId))]
        public ReduceAsset ReduceAsset { get; set; }
        public int? ReduceAssetId { get; set; }
        [ForeignKey(nameof(ReasonReduceId))]
        public ReasonReduce ReasonReduce { get; set; }
        public int? ReasonReduceId { get; set; }
        public string? ReasonReduceNote { get; set; }
        public int? TenantId { get; set; }
        [ForeignKey(nameof(DepartmentId))]
        public Department Department { get; set; } 
        public string DepartmentName { get; set; }
        public int? DepartmentId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        [ForeignKey(nameof(UserId))]
        public User User { get; set; }
  
        public long? UserId { get; set; }
        public DateTime AmortizationDate { get; set; }
        [ForeignKey(nameof(EmployeeId))]
        public Employee Employee { get; set; }

        public int? EmployeeId { get; set; }
        public double? InitialAmortizationValue { get; set; }

        public Asset()
        {
            AssetStatusId = 1;
            //Id = new Guid();
        }

    }
}
