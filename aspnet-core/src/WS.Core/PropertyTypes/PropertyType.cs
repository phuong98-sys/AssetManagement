using Abp.Domain.Entities;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace WS.PropertyTypes
{
    [Table("PropertyType")]
    public class PropertyType: Entity, IHasCreationTime
    {
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
        public PropertyType()
        {
        }
    }
}
