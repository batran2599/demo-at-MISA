using MISA.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.ApplicationCore.Entitis
{
    public class ServiceResult
    {
        public object Data { get; set; }
        public string Messager { get; set; }
        public ErrorCode MISACode { get; set; }
    }
}
