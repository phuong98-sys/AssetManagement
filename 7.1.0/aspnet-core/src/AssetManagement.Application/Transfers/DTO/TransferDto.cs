using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AssetManagement.TransferDetails;
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
    }
    [AutoMapTo(typeof(Transfer))]
    public class TransferInputDto : CreationAuditedEntityDto<int?>
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
    }
    public class DeleteTransferInput
    {
        public int Id { get; set; }
    }
    public class GetTransferInput
    {
        public int? Id { get; set; }
    }
    [AutoMapFrom(typeof(TransferDetail))]
    public class TransferDetailDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public int TransferId { get; set; }
        public int AssetId { get; set; }
        public string Describe { get; set; }
        public long? CreatorUserId { get; set; }
        public string? CreatorUserName { get; set; }

    }
    [AutoMapTo(typeof(TransferDetail))]
    public class TransferDetailInputDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public int TransferId { get; set; }
        public int AssetId { get; set; }
        public string Describe { get; set; }
        public long? CreatorUserId { get; set; }
        public string? CreatorUserName { get; set; }

    }
}
