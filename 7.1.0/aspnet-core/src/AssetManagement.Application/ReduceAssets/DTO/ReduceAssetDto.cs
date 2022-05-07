using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ReduceAssets.DTO
{
    [AutoMapFrom(typeof(ReduceAsset))]
    public class ReduceAssetDto : CreationAuditedEntityDto<int?>
    {
        public int Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string ReduceAssetCode { get; set; }
        public DateTime ReduceAssetDate { get; set; }
        public string Note { get; set; }
        public double TotalRecovery { get; set; }
    }
    [AutoMapTo(typeof(ReduceAsset))]
    public class ReduceAssetInputDto : CreationAuditedEntityDto<int?>
    {
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string ReduceAssetCode { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ReduceAssetDate { get; set; }
        public string Note { get; set; }
        public double TotalRecovery { get; set; }
    }
    public class DeleteReduceAssetInput
    {
        public int Id { get; set; }
    }
    public class GetReduceAssetInput
    {
        public int Id { get; set; }
    }
}
