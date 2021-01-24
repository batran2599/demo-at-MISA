using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using MISA.CukCuk.Web.ControllerBaseX;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBaseX<Department>
    {
        public DepartmentsController(IServiceBase<Department> serviceBase) : base(serviceBase)
        {

        }
    }
}
