using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using AssetManagement;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using WS.PropertyTypes.DTO;

namespace WS.PropertyTypes
{
    public class PropertyTypeAppService: AssetManagementAppServiceBase, IPropertyTypeAppService
    {
        private readonly IRepository<PropertyType> _propertyType;
        public PropertyTypeAppService(IRepository<PropertyType> propertyType)
        {
            _propertyType = propertyType;
        }
        public async Task<ListResultDto<PropertyTypeDto>> GetAll()
        {
            try {
                var propertyTypes = await _propertyType.GetAll().ToListAsync();
                var propertyTypeDtos = ObjectMapper.Map<List<PropertyTypeDto>>(propertyTypes);
                return new ListResultDto<PropertyTypeDto>(propertyTypeDtos);
            }
            catch ( Exception e)
            {
                throw (e);

            }
        }
    }
}
