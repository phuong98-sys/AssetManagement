using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Depreciations
{
    [Table("Depreciation")]
    public class Depreciation : FullAuditedEntity
    {
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
        public List<DepreciationDetail> DepreciationDetails { get; set; }
        public Depreciation()
        {
            DepreciationDetails = new List<DepreciationDetail>();
        }
    }
}
