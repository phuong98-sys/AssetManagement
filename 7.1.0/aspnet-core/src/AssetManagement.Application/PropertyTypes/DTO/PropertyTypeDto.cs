using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WS.PropertyTypes.DTO
{
    [AutoMapFrom(typeof(PropertyType))]
    public class PropertyTypeDto: EntityDto
    {
        public string Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string PropertyTypeCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string PropertyTypeName { get; set; }
        public string Note { get; set; }
        public string ParentPropertyTypeId { get; set; }
        public DateTime CreationTime { get; set; }

    }
}
