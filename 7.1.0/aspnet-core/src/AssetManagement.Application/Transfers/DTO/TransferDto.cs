using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.Transfers.DTO
{
    [AutoMapFrom(typeof(Transfer))]
    public class TransferDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string NumbersTransfer { get; set; }
        public DateTime? DateFound { get; set; }
        public string DepartmentName { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
    }
    [AutoMapFrom(typeof(Transfer))]
    public class TransferListDto : CreationAuditedEntityDto<int?>
    {
        //public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string NumbersTransfer { get; set; }
        public DateTime? DateFound { get; set; }
        public string DepartmentName { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
    }

    [AutoMapTo(typeof(Transfer))]
    public class TransferInputDto : CreationAuditedEntityDto<int?>
    {
        //public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string NumbersTransfer { get; set; }
        public DateTime? DateFound { get; set; }
        public string DepartmentName { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class GetTransferInput
    {
        public int Id { get; set; }
    }
    [AutoMapTo(typeof(Transfer))]
    public class UpdateTransferDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string NumbersTransfer { get; set; }
        public DateTime? DateFound { get; set; }
        public string DepartmentName { get; set; }
        public string Content { get; set; }
        public string Approver { get; set; }
        public string ApprovalStatus { get; set; }
        public string UserCode { get; set; }
        public DateTime CreationTime { get; set; }
    }
    public class DeleteTransferInput
    {
        public int Id { get; set; }
    }
}
