using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ProposeAssets.DTO
{
    [AutoMapFrom(typeof(ProposeAsset))]
    public class ProposeAssetDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string NumbersProposeAsset { get; set; }
        public DateTime? DateFound { get; set; }
        public string Proponent { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
    }
    [AutoMapFrom(typeof(ProposeAsset))]
    public class ProposeAssetListDto : CreationAuditedEntityDto<int?>
    {
        //public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string NumbersProposeAsset { get; set; }
        public DateTime? DateFound { get; set; }
        public string Proponent { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
    }

    [AutoMapTo(typeof(ProposeAsset))]
    public class ProposeAssetInputDto : CreationAuditedEntityDto<int?>
    {
        //public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string NumbersProposeAsset { get; set; }
        public DateTime? DateFound { get; set; }
        public string Proponent { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class GetProposeAssetInput
    {
        public int Id { get; set; }
    }
    [AutoMapTo(typeof(ProposeAsset))]
    public class UpdateProposeAssetDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string NumbersProposeAsset { get; set; }
        public DateTime? DateFound { get; set; }
        public string Proponent { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class DeleteProposeAssetInput
    {
        public int Id { get; set; }
    }
}
