using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    public class EmployeesController : ControllerBaseX<Employee>
    {
        IEmployeeService _employeeService;
        public EmployeesController(IEmployeeService employeeService) : base(employeeService)
        {
            _employeeService = employeeService;
        }

        /// <summary>
        /// Lấy thông nhân viên theo mã phòng ban
        /// </summary>
        /// <param name="departmentId">Mã phòng ban</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá (24/01/20201)
        [HttpGet ("byDepartmentId/{DepartmentId}")]
        public IActionResult GetByDepartmentId(Guid? departmentId)
        {
            var employees = _employeeService.GetByDepartmentId(departmentId);
            return Ok(employees);
        }

        /// <summary>
        /// Lấy thông tin nhân viên theo mã vị trí làm việc
        /// </summary>
        /// <param name="positionId">Mã vị trí làm việc</param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá (24/01/20201)
        [HttpGet ("byPositionId/{positionId}")]
        public IActionResult GetByPositionId(Guid? positionId)
        {
            var employees = _employeeService.GetByPositionId(positionId);
            return Ok(employees);
        }

        /// <summary>
        /// Lấy mã nhân viên được thêm vào cuối cùng
        /// </summary>
        /// <returns></returns>
        [HttpGet("getLastEmployeeCode")]
        public IActionResult GetLastEmployeeCode()
        {
            var employeeCode = _employeeService.GetLastEmployeeCode();
            return Ok(employeeCode);
        }

        [HttpPut]
        public IActionResult UpdateEmployee(Employee infoEmployee)
        {
            var status = _employeeService.UpdateEmployee(infoEmployee);
            return Ok(status);
        }
    }
}
