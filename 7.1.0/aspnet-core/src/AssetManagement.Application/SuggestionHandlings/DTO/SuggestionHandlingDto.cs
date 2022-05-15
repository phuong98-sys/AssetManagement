using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using AssetManagement.SuggestionHandlingDetails;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagement.SuggestionHandlings.DTO
{
    [AutoMapFrom(typeof(SuggestionHandling))]
    public class SuggestionHandlingDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string SuggestionHandlingCode { get; set; }
        public string SuggestionHandlingName { get; set; }
        public DateTime SuggestionHandlingDate { get; set; }
        public DateTime ImplementationDate { get; set; }
        public string? Description { get; set; }
        public int SuggestionHandlingStatus { get; set; }
        public String SuggestionHandlingStatusName { get; set; }
        public int? ApproverId { get; set; }
        public int? PetitionerId { get; set; }
        public string? PetitionerName { get; set; }
        public int? UserId { get; set; }
        public int? DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
    }
    [AutoMapTo(typeof(SuggestionHandling))]
    public class SuggestionHandlingInputDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string SuggestionHandlingCode { get; set; }
        public string SuggestionHandlingName { get; set; }
        public DateTime SuggestionHandlingDate { get; set; }
        public DateTime ImplementationDate { get; set; }
        public string? Description { get; set; }
        public int SuggestionHandlingStatus { get; set; }
        public String SuggestionHandlingStatusName { get; set; }
        public int? ApproverId { get; set; }
        public int? PetitionerId { get; set; }
        public string? PetitionerName { get; set; }
        public int? UserId { get; set; }
        public int? DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
    }
    public class DeleteSuggestionHandlingInput
    {
        public int Id { get; set; }
    }
    public class GetSuggestionHandlingInput
    {
        public int? Id { get; set; }
    }
    [AutoMapFrom(typeof(SuggestionHandlingDetail))]
    public class SuggestionHandlingDetailDto : CreationAuditedEntityDto<int?>
    {
        public int? Id { get; set; }
        public int SuggestionHandlingId { get; set; }
        public int AssetId { get; set; }
        public string? HandlingMethod { get; set; }
        public int? HandlingMethodId { get; set; }
        public long? CreatorUserId { get; set; }
        public string? CreatorUserName { get; set; }

    }
    [AutoMapTo(typeof(SuggestionHandlingDetail))]
    public class SuggestionHandlingDetailInputDto : CreationAuditedEntityDto<int?>
    {
        public int SuggestionHandlingId { get; set; }
        public int AssetId { get; set; }
        public string? HandlingMethod { get; set; }
        public int? HandlingMethodId { get; set; }
        public long? CreatorUserId { get; set; }
        public string? CreatorUserName { get; set; }

    }
}
