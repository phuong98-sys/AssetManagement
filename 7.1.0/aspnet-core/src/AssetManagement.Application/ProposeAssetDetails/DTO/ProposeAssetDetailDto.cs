using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.ProposeAssetDetails.DTO
{
    [AutoMapFrom(typeof(ProposeAssetDetail))]
    public class ProposeAssetDetailDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; } 
        public int? ProposeAssetId { get; set; }
        public int? AssetId { get; set; }
        public string AssetName { get; set; }
        public string AssetTypeName { get; set; }
        public DateTime DateFound { get; set; }
        public int Quantity { get; set; }
        public string Describe { get; set; }
        public double Estimates { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public DateTime CreationTime { get; set; }
    }
    [AutoMapFrom(typeof(ProposeAssetDetail))]
    public class ProposeAssetDetailListDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public int? ProposeAssetId { get; set; }
        public int? AssetId { get; set; }
        public string AssetName { get; set; }
        public string AssetTypeName { get; set; }
        public DateTime DateFound { get; set; }
        public int Quantity { get; set; }
        public string Describe { get; set; }
        public double Estimates { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public DateTime CreationTime { get; set; }
    }

    [AutoMapTo(typeof(ProposeAssetDetail))]
    public class ProposeAssetDetailInputDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public int? ProposeAssetId { get; set; }
        public int? AssetId { get; set; }
        public string AssetName { get; set; }
        public string AssetTypeName { get; set; }
        public DateTime DateFound { get; set; }
        public int Quantity { get; set; }
        public string Describe { get; set; }
        public double Estimates { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class GetProposeAssetDetailInput
    {
        public int Id { get; set; }
    }
    [AutoMapTo(typeof(ProposeAssetDetail))]
    public class UpdateProposeAssetDetailDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public int? ProposeAssetId { get; set; }
        public int? AssetId { get; set; }
        public string AssetName { get; set; }
        public string AssetTypeName { get; set; }
        public DateTime DateFound { get; set; }
        public int Quantity { get; set; }
        public string Describe { get; set; }
        public double Estimates { get; set; }
        public int? DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class DeleteProposeAssetDetailInput
    {
        public int Id { get; set; }
    }
}
