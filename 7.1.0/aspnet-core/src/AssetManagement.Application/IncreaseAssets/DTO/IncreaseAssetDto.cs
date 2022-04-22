using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.IncreaseAssets.DTO
{
    [AutoMapFrom(typeof(IncreaseAsset))]
    public class IncreaseAssetDto: EntityDto
    {
        public int Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string IncreaseAssetCode { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime IncreaseAssetDate { get; set; }
        public string Note { get; set; }
        public double TotalAssetValue { get; set; }
    }
    [AutoMapTo(typeof(IncreaseAsset))]
    public class IncreaseAssetInputDto : EntityDto
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string IncreaseAssetCode { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime IncreaseAssetDate { get; set; }
        public string Note { get; set; }
        public double TotalAssetValue { get; set; }
    }
    public class DeleteIncreaseAssetInput
    {
        public int Id { get; set; }
    }
}
