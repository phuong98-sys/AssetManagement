﻿using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using AssetManagement.AssetTypes;
using AssetManagement.IncreaseAssets;
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
    public class Asset: Entity, IHasCreationTime
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
        [ForeignKey(nameof(IncreaseAssetId))]
        public IncreaseAsset IncreaseAsset { get; set; } // them tu Increase table
        public int? IncreaseAssetId { get; set; }
        [ForeignKey(nameof(AssetTypeId))]
        public AssetType AssetType { get; set; } // them tu AssetType table
        public int AssetTypeId { get; set; }
        public DateTime CreationTime { get; set; }
        //public Asset()
        //{
        //    IncreaseAssets = new List<IncreaseAsset>();
        //}

    }
}
