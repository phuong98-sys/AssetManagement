using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using AssetManagement.ProposeAssets;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AssetManagement.ProposeAssets.DTO
{
    [AutoMapFrom(typeof(ProposeAsset))]
    public class ProposeAssetDto : EntityDto
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
}