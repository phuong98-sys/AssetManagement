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

namespace AssetManagement.AssetTypes
{
    [Table("AssetType")]
    public class AssetType: Entity, IHasCreationTime
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetTypeCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string AssetTypeName { get; set; }
        public string? Note { get; set; }
        public string? ParentAssetTypeId { get; set; }
        public DateTime CreationTime { get; set; }
        public List<Asset> Assets { get; set; }
        public int NumberOfYearDepreciation { get; set; }
        public AssetType()
        {
            Assets = new List<Asset>();
        }
    }
}
