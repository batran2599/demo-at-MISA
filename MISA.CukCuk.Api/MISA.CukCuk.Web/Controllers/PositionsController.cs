using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.ApplicationCore.Entities;
using MISA.ApplicationCore.Interface;
using MISA.CukCuk.Web.ControllerBaseX;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.CukCuk.Web.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBaseX<Position>
    {
        public PositionsController(IServiceBase<Position> serviceBase) : base(serviceBase)
        {

        }
    }
}
