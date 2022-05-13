using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.PlaneMaintains.DTO
{
    [AutoMapFrom(typeof(PlaneMaintain))]
    public class PlaneMaintainDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public DateTime? ExpectedDate { get; set; }
        public double Estimates { get; set; }
        public string MaintenanceType { get; set; }
        public string Describe { get; set; }
        public int? AssetId { get; set; }
        public string AssetCode { get; set; }
        public string AssetName { get; set; }
        public string AssetTypeName { get; set; }
        public string DepartmentName { get; set; }
        public DateTime CreationTime { get; set; }
    }
    [AutoMapFrom(typeof(PlaneMaintain))]
    public class PlaneMaintainListDto : CreationAuditedEntityDto<int?>
    {
        //public int? Id { get; set; }
        public DateTime? ExpectedDate { get; set; }
        public double Estimates { get; set; }
        public string MaintenanceType { get; set; }
        public string Describe { get; set; }
        public int? AssetId { get; set; }
        //public string AssetCode { get; set; }
        //public string AssetName { get; set; }
        public string AssetTypeName { get; set; }
        public string DepartmentName { get; set; }
        public DateTime CreationTime { get; set; }
    }

    [AutoMapTo(typeof(PlaneMaintain))]
    public class PlaneMaintainInputDto : CreationAuditedEntityDto<int?>
    {
        //public int? Id { get; set; }
        public DateTime? ExpectedDate { get; set; }
        public double Estimates { get; set; }
        public string MaintenanceType { get; set; }
        public string Describe { get; set; }
        public int? AssetId { get; set; }
        public string AssetTypeName { get; set; }
        public string DepartmentName { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class GetPlaneMaintainInput
    {
        public int Id { get; set; }
    }
    [AutoMapTo(typeof(PlaneMaintain))]
    public class UpdatePlaneMaintainDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public DateTime? ExpectedDate { get; set; }
        public double Estimates { get; set; }
        public string MaintenanceType { get; set; }
        public string Describe { get; set; }
        public int? AssetId { get; set; }
        public string AssetTypeName { get; set; }
        public string DepartmentName { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class DeletePlaneMaintainInput
    {
        public int Id { get; set; }
    }
}
