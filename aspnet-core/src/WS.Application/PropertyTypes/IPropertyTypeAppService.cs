using Abp.Application.Services;
using Abp.Application.Services.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WS.PropertyTypes.DTO;

namespace WS.PropertyTypes
{
    public interface IPropertyTypeAppService: IApplicationService
    {
        Task<ListResultDto<PropertyTypeDto>> GetAll();
    }
}
