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
        public EmployeeRepository(IConfiguration configuration) : base(configuration)
        {

        }

        public IEnumerable<Employee> GetByDepartmentId(Guid? departmentId)
        {
            var employees = _dbConnection.Query<Employee>("Proc_GetEmployeeByDepartmentId", new { DepartmentId =  departmentId.ToString()}, commandType: CommandType.StoredProcedure);
            return employees;
        }

        public IEnumerable<Employee> GetByPositionId(Guid? positionId)
        {
            var employees = _dbConnection.Query<Employee>("Proc_GetEmployeeByPositionId", new { PositionId = positionId.ToString()}, commandType: CommandType.StoredProcedure);
            return employees;
        }

        public IEnumerable<Employee> GetLastEmployeeCode()
        {
            var employeeCode = _dbConnection.Query<Employee>("Proc_GetLastEmployeeCode", commandType: CommandType.StoredProcedure);
            return employeeCode;
        }

        public IEnumerable<Employee> UpdateEmployee(Employee infoEmployee)
        {
            var status = _dbConnection.Query<Employee>("Proc_UpdateEmployee", MappingDbType<Employee>(infoEmployee), commandType: CommandType.StoredProcedure);
            return status;
        }
    }
}
