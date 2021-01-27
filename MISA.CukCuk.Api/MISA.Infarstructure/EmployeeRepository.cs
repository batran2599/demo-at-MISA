using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using MISA.ApplicationCore.Interface;

namespace MISA.Infarstructure
{
    public class EmployeeRepository : RepositoryBase<Employee>, IEmployeeRepository
    {
        #region method
        public EmployeeRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public IEnumerable<Employee> GetLastEmployeeCode()
        {
            var employeeCode = _dbConnection.Query<Employee>("Proc_GetLastEmployeeCode", commandType: CommandType.StoredProcedure);
            return employeeCode;
        }

        public IEnumerable<Employee> SearchEmployee(string info)
        {
            var employees = _dbConnection.Query<Employee>("Proc_SearchEmployees", new { info = info }, commandType: CommandType.StoredProcedure);
            return employees;
        }

        public IEnumerable<Employee> EmployeeFiltering(Guid? departmentId, Guid? positionId)
        {
            var employees = _dbConnection.Query<Employee>("Proc_EmployeeFiltering", new { DepartmentId = departmentId.ToString(), PositionId = positionId.ToString() }, commandType: CommandType.StoredProcedure);
            return employees;
        }
        #endregion

    }
}
