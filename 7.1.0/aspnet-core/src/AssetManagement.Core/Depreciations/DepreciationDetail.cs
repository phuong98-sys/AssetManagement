using Abp.Domain.Entities.Auditing;
using AssetManagement.Assets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Depreciations
{
    [Table("DepreciationDetail")]
    public class DepreciationDetail : FullAuditedEntity
    {
        [ForeignKey(nameof(DepreciationId))]
        public Depreciation Depreciation { get; set; }
        public int? DepreciationId { get; set; }
        [ForeignKey(nameof(AssetId))]
        public Asset Asset { get; set; }
        public int? AssetId { get; set; }
        public string? HandlingMethod { get; set; }
        public int? HandlingMethodId { get; set; }
        public DateTime AmortizationDate { get; set; }
        public double OrginalPrice { get; set; }
        public double MonthlyAmortizationValue { get; set; }
        public double DepreciationOfAsset { get; set; }
        public double ResidualValue { get; set; }
        public int NumberOfDayUsedAsset { get; set; }
    }
}
