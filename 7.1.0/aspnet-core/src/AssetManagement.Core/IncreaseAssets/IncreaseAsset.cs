using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using AssetManagement.Assets;
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
    public class IncreaseAsset: FullAuditedEntity
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string IncreaseAssetCode { get; set; }
        public DateTime IncreaseAssetDate { get; set; }
        public string Note { get; set; }
        public double TotalAssetValue { get; set; }
        public List<Asset> Assets { get; set; }

        public IncreaseAsset()
        {
            Assets = new List<Asset>();
        }
    }
}
