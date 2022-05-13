using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.PlaneShops.DTO
{
    [AutoMapFrom(typeof(PlaneShop))]
    public class PlaneShopDto : CreationAuditedEntityDto<int?>
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
    [AutoMapFrom(typeof(PlaneShop))]
    public class PlaneShopListDto : CreationAuditedEntityDto<int?>
    {
        //public int? Id { get; set; }
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

    [AutoMapTo(typeof(PlaneShop))]
    public class PlaneShopInputDto : CreationAuditedEntityDto<int?>
    {
        //public int? Id { get; set; }
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
    public class GetPlaneShopInput
    {
        public int Id { get; set; }
    }
    [AutoMapTo(typeof(PlaneShop))]
    public class UpdatePlaneShopDto : CreationAuditedEntityDto<int?>
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
    public class DeletePlaneShopInput
    {
        public int Id { get; set; }
    }
}
