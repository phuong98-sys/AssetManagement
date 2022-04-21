using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.IncreaseAssets
{
    [Table("IncreaseAsset")]
    public class IncreaseAsset: Entity, IHasCreationTime
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string IncreaseAssetCode { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime IncreaseAssetDate { get; set; }
        public string Note { get; set; }
    }
}
