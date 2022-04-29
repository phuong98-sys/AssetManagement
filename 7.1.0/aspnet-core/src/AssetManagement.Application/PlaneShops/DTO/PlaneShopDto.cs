using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using AssetManagement.PlaneShops;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AssetManagement.PlaneShops.DTO
{
    [AutoMapFrom(typeof(PlaneShop))]
    public class PlaneShopDto : EntityDto
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string PlanPeriod { get; set; }
        public DateTime? DateFound { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
    }
}