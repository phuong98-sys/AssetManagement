﻿using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using AssetManagement.AssetTypes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WS.AssetTypes.DTO
{
    [AutoMapFrom(typeof(AssetType))]
    public class AssetTypeDto: EntityDto
    {
        public string Id { get; set; }
        public const int maxLength = 32;
        [Required]
        [StringLength(maxLength)]
        public string AssetTypeCode { get; set; }
        [Required]
        [StringLength(maxLength)]
        public string AssetTypeName { get; set; }
        public string Note { get; set; }
        public string ParentAssetTypeId { get; set; }
        public DateTime CreationTime { get; set; }

    }
}