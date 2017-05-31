using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Server.Models.Context
{
    public class DataBaseContext : DbContext
    {

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            
        }
    }
}