using Abp.Application.Services.Dto;
using Abp.AutoMapper;
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
}
