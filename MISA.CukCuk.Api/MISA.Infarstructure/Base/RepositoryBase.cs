using Dapper;
using MISA.Entity;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using MISA.ApplicationCore.Interface;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Reflection;

namespace MISA.Infarstructure
{
    public class RepositoryBase<T> : IRespositoryBase<T>
    {
        #region Declare
        protected IConfiguration _configuration;
        protected IDbConnection _dbConnection = null;
        protected string _tableName = string.Empty;
        #endregion

        #region Constructor
        public RepositoryBase(IConfiguration configuration)
        {
            _configuration = configuration;
            _dbConnection = new MySqlConnection(_configuration.GetConnectionString("MISACukCuk"));
            _tableName = typeof(T).Name;
        }
        #endregion
        #region Method
        public int Add(T obj)
        {        
            var rowAffect = _dbConnection.Execute($"Proc_Insert{_tableName}", MappingDbType<T>(obj), commandType: CommandType.StoredProcedure);

            return rowAffect;
        }

        public T GetById(Guid? objId)
        {

            // Khởi tạo các commandText:
            var objects = _dbConnection.Query<T>($"Proc_Get{_tableName}ById", new { objId =  objId.ToString() }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return objects;
        }

        public T GetByCode(string objCode)
        {

            // Khởi tạo các commandText:
            var objects = _dbConnection.Query<T>($"Proc_Get{_tableName}ByCode", new { objCode = objCode.ToString() }, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return objects;
        }

        public IEnumerable<T> GetAll()
        {

            // Khởi tạo các commandText:
            var data = _dbConnection.Query<T>($"Proc_Get{_tableName}", commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return data;
        }

        public int Delete(Guid? objId)
        {
            var rowAffect = _dbConnection.Execute($"Proc_Delete{_tableName}", new { objId = objId.ToString() },commandType: CommandType.StoredProcedure);
            return rowAffect;
        }

        public int Update(T obj)
        {
            var rowAffect = _dbConnection.Execute($"Proc_Update{_tableName}", MappingDbType<T>(obj), commandType: CommandType.StoredProcedure);
            return rowAffect;
        }

        /// <summary>
        /// Gắn giá trị vào các param
        /// </summary>
        /// <typeparam name="Object"></typeparam>
        /// <param name="obj"></param>
        /// <returns></returns>
        /// CreatedBy: Trần Duy Bá
        protected DynamicParameters MappingDbType<Object>(Object obj)
        {
            var properties = obj.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(obj);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"@{propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"@{propertyName}", propertyValue);
                }
            }

            return parameters;
        }
        #endregion
    }
}
